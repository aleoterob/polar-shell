//go:build windows

package terminal

import (
	"context"
	"sync"
	"unicode/utf8"

	"github.com/google/uuid"
	"github.com/polarshell/polarshell/backend/models"
)

type OutputHandler func(payload models.TerminalOutputPayload)
type ExitHandler func(payload models.TerminalExitPayload)

type Session struct {
	ID      string
	ShellID string
	Cols    int
	Rows    int

	pty    *Pty
	mu     sync.Mutex
	closed bool

	cancel context.CancelFunc
	wg     sync.WaitGroup

	onOutput OutputHandler
	onExit   ExitHandler
}

func NewSession(shellID string, cols, rows int, onOutput OutputHandler, onExit ExitHandler) (*Session, error) {
	command, err := ResolveShell(shellID)
	if err != nil {
		return nil, err
	}

	pty, err := NewPty(command, cols, rows)
	if err != nil {
		return nil, err
	}

	ctx, cancel := context.WithCancel(context.Background())

	session := &Session{
		ID:       uuid.NewString(),
		ShellID:  shellID,
		Cols:     cols,
		Rows:     rows,
		pty:      pty,
		cancel:   cancel,
		onOutput: onOutput,
		onExit:   onExit,
	}

	session.wg.Add(1)
	go session.readLoop(ctx)

	session.wg.Add(1)
	go session.waitLoop(ctx)

	return session, nil
}

func (s *Session) Info() models.SessionInfo {
	s.mu.Lock()
	defer s.mu.Unlock()

	return models.SessionInfo{
		ID:     s.ID,
		Shell:  s.ShellID,
		Cols:   s.Cols,
		Rows:   s.Rows,
		Active: !s.closed,
	}
}

func (s *Session) Write(data string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if s.closed {
		return ErrSessionClosed
	}

	_, err := s.pty.Write([]byte(data))
	return err
}

func (s *Session) Resize(cols, rows int) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if s.closed {
		return ErrSessionClosed
	}

	if err := s.pty.Resize(cols, rows); err != nil {
		return err
	}

	s.Cols = cols
	s.Rows = rows
	return nil
}

func (s *Session) Close() {
	s.mu.Lock()
	if s.closed {
		s.mu.Unlock()
		return
	}
	s.closed = true
	s.mu.Unlock()

	s.cancel()
	_ = s.pty.Close()
	s.wg.Wait()
}

func (s *Session) readLoop(ctx context.Context) {
	defer s.wg.Done()

	buf := make([]byte, 4096)
	for {
		select {
		case <-ctx.Done():
			return
		default:
		}

		n, err := s.pty.Read(buf)
		if n > 0 && s.onOutput != nil && !s.isClosed() {
			chunk := sanitizeUTF8(buf[:n])
			if chunk != "" {
				s.onOutput(models.TerminalOutputPayload{
					SessionID: s.ID,
					Data:      chunk,
				})
			}
		}

		if err != nil {
			return
		}
	}
}

func (s *Session) waitLoop(ctx context.Context) {
	defer s.wg.Done()

	exitCode, err := s.pty.Wait(ctx)
	if err != nil {
		exitCode = 1
	}

	s.mu.Lock()
	alreadyClosed := s.closed
	s.closed = true
	s.mu.Unlock()

	if s.onExit != nil && !alreadyClosed {
		s.onExit(models.TerminalExitPayload{
			SessionID: s.ID,
			ExitCode:  int(exitCode),
		})
	}
}

func (s *Session) isClosed() bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.closed
}

func sanitizeUTF8(data []byte) string {
	if utf8.Valid(data) {
		return string(data)
	}

	valid := make([]byte, 0, len(data))
	for len(data) > 0 {
		r, size := utf8.DecodeRune(data)
		if r == utf8.RuneError && size == 1 {
			valid = append(valid, '?')
		} else {
			valid = append(valid, data[:size]...)
		}
		data = data[size:]
	}

	return string(valid)
}
