//go:build windows

package terminal

import (
	"context"
	"fmt"
	"os"
	"sync"

	"github.com/rurreac/conpty"
)

type Pty struct {
	inner     *conpty.LocalConPty
	cols      int
	rows      int
	closeOnce sync.Once
	closeErr  error
}

func NewPty(command string, cols, rows int) (*Pty, error) {
	if !conpty.IsConPtyAvailable() {
		return nil, fmt.Errorf("conpty is not available on this system")
	}

	inner, err := conpty.StartConPty(
		command,
		cols,
		rows,
		os.Environ(),
		conpty.WithInheritCursor(true),
	)
	if err != nil {
		return nil, fmt.Errorf("start conpty: %w", err)
	}

	return &Pty{
		inner: inner,
		cols:  cols,
		rows:  rows,
	}, nil
}

func (p *Pty) Read(buf []byte) (int, error) {
	return p.inner.Read(buf)
}

func (p *Pty) Write(buf []byte) (int, error) {
	return p.inner.Write(buf)
}

func (p *Pty) Resize(cols, rows int) error {
	if cols < 1 {
		cols = 1
	}
	if rows < 1 {
		rows = 1
	}

	if err := p.inner.Resize(cols, rows); err != nil {
		return err
	}

	p.cols = cols
	p.rows = rows
	return nil
}

func (p *Pty) Close() error {
	p.closeOnce.Do(func() {
		if p.inner == nil {
			return
		}
		p.closeErr = p.inner.Close()
		p.inner = nil
	})
	return p.closeErr
}

func (p *Pty) Wait(ctx context.Context) (uint32, error) {
	return p.inner.Wait(ctx)
}
