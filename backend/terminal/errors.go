package terminal

import "errors"

var (
	ErrShellUnavailable = errors.New("shell is not available on this system")
	ErrUnknownShell     = errors.New("unknown shell profile")
	ErrSessionNotFound  = errors.New("terminal session not found")
	ErrSessionClosed    = errors.New("terminal session is closed")
)
