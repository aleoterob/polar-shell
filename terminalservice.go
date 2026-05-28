//go:build windows

package main

import (
	"context"
	"log"

	"github.com/polarshell/polarshell/backend/events"
	"github.com/polarshell/polarshell/backend/models"
	"github.com/polarshell/polarshell/backend/settings"
	"github.com/polarshell/polarshell/backend/terminal"
	"github.com/wailsapp/wails/v3/pkg/application"
)

const (
	eventTerminalOutput = events.TerminalOutput
	eventTerminalExit   = events.TerminalExit
)

type TerminalService struct {
	app     *application.App
	manager *terminal.Manager
	store   *settings.Store
}

func (s *TerminalService) ServiceStartup(ctx context.Context, options application.ServiceOptions) error {
	s.app = application.Get()
	s.manager = terminal.NewManager(s.emitOutput, s.emitExit)

	store, err := settings.NewStore()
	if err != nil {
		log.Printf("settings store unavailable: %v", err)
	} else {
		s.store = store
	}

	return nil
}

func (s *TerminalService) ServiceShutdown() error {
	if s.manager != nil {
		s.manager.CloseAll()
	}
	return nil
}

func (s *TerminalService) CreateSession(shellID string, cols, rows int) (models.SessionInfo, error) {
	if shellID == "" {
		shellID = s.defaultShellID()
	}
	return s.manager.Create(shellID, cols, rows)
}

func (s *TerminalService) Write(sessionID, data string) error {
	return s.manager.Write(sessionID, data)
}

func (s *TerminalService) Resize(sessionID string, cols, rows int) error {
	return s.manager.Resize(sessionID, cols, rows)
}

func (s *TerminalService) CloseSession(sessionID string) error {
	return s.manager.Close(sessionID)
}

func (s *TerminalService) GetSession(sessionID string) (models.SessionInfo, error) {
	return s.manager.Get(sessionID)
}

func (s *TerminalService) ListShells() []models.ShellProfile {
	return terminal.ListShells()
}

func (s *TerminalService) LoadSettings() models.AppSettings {
	if s.store == nil {
		return models.DefaultSettings()
	}
	return s.store.Load()
}

func (s *TerminalService) SaveSettings(appSettings models.AppSettings) error {
	if s.store == nil {
		return settings.ErrSettingsUnavailable
	}
	return s.store.Save(appSettings)
}

func (s *TerminalService) emitOutput(payload models.TerminalOutputPayload) {
	if s.app == nil {
		return
	}
	s.app.Event.Emit(eventTerminalOutput, payload)
}

func (s *TerminalService) emitExit(payload models.TerminalExitPayload) {
	if s.app == nil {
		return
	}
	s.app.Event.Emit(eventTerminalExit, payload)
}

func (s *TerminalService) defaultShellID() string {
	if s.store != nil {
		return s.store.Load().DefaultShell
	}
	return "powershell"
}
