package settings

import (
	"encoding/json"
	"errors"
	"os"
	"path/filepath"
	"sync"

	"github.com/polarshell/polarshell/backend/models"
)

var (
	ErrSettingsUnavailable = errors.New("settings directory is unavailable")
)

type Store struct {
	mu   sync.RWMutex
	path string
}

func NewStore() (*Store, error) {
	configDir, err := os.UserConfigDir()
	if err != nil {
		return nil, ErrSettingsUnavailable
	}

	appDir := filepath.Join(configDir, "PolarShell")
	if err := os.MkdirAll(appDir, 0o755); err != nil {
		return nil, err
	}

	return &Store{
		path: filepath.Join(appDir, "config.json"),
	}, nil
}

func (s *Store) Load() models.AppSettings {
	s.mu.RLock()
	defer s.mu.RUnlock()

	settings := models.DefaultSettings()

	data, err := os.ReadFile(s.path)
	if err != nil {
		return settings
	}

	if err := json.Unmarshal(data, &settings); err != nil {
		return models.DefaultSettings()
	}

	if settings.DefaultShell == "" {
		settings.DefaultShell = "powershell"
	}
	if settings.FontFamily == "" {
		settings.FontFamily = models.DefaultSettings().FontFamily
	}
	if settings.FontSize < 8 {
		settings.FontSize = models.DefaultSettings().FontSize
	}
	if settings.Scrollback < 1000 {
		settings.Scrollback = models.DefaultSettings().Scrollback
	}

	return settings
}

func (s *Store) Save(settings models.AppSettings) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	data, err := json.MarshalIndent(settings, "", "  ")
	if err != nil {
		return err
	}

	return os.WriteFile(s.path, data, 0o644)
}
