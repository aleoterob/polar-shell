//go:build windows

package terminal

import (
	"sync"

	"github.com/polarshell/polarshell/backend/models"
)

type Manager struct {
	mu       sync.RWMutex
	sessions map[string]*Session

	onOutput OutputHandler
	onExit   ExitHandler
}

func NewManager(onOutput OutputHandler, onExit ExitHandler) *Manager {
	return &Manager{
		sessions: make(map[string]*Session),
		onOutput: onOutput,
		onExit:   onExit,
	}
}

func (m *Manager) Create(shellID string, cols, rows int) (models.SessionInfo, error) {
	if cols < 1 {
		cols = 80
	}
	if rows < 1 {
		rows = 24
	}

	session, err := NewSession(shellID, cols, rows, m.onOutput, m.onExit)
	if err != nil {
		return models.SessionInfo{}, err
	}

	m.mu.Lock()
	m.sessions[session.ID] = session
	m.mu.Unlock()

	return session.Info(), nil
}

func (m *Manager) Get(sessionID string) (models.SessionInfo, error) {
	session, err := m.get(sessionID)
	if err != nil {
		return models.SessionInfo{}, err
	}
	return session.Info(), nil
}

func (m *Manager) Write(sessionID, data string) error {
	session, err := m.get(sessionID)
	if err != nil {
		return err
	}
	return session.Write(data)
}

func (m *Manager) Resize(sessionID string, cols, rows int) error {
	session, err := m.get(sessionID)
	if err != nil {
		return err
	}
	return session.Resize(cols, rows)
}

func (m *Manager) Close(sessionID string) error {
	session, err := m.get(sessionID)
	if err != nil {
		return err
	}

	session.Close()

	m.mu.Lock()
	delete(m.sessions, sessionID)
	m.mu.Unlock()

	return nil
}

func (m *Manager) CloseAll() {
	m.mu.Lock()
	sessions := make([]*Session, 0, len(m.sessions))
	for _, session := range m.sessions {
		sessions = append(sessions, session)
	}
	m.sessions = make(map[string]*Session)
	m.mu.Unlock()

	for _, session := range sessions {
		session.Close()
	}
}

func (m *Manager) get(sessionID string) (*Session, error) {
	m.mu.RLock()
	session, ok := m.sessions[sessionID]
	m.mu.RUnlock()
	if !ok {
		return nil, ErrSessionNotFound
	}
	return session, nil
}
