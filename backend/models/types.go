package models

type ShellProfile struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Command   string `json:"command"`
	Available bool   `json:"available"`
}

type SessionInfo struct {
	ID     string `json:"id"`
	Shell  string `json:"shell"`
	Cols   int    `json:"cols"`
	Rows   int    `json:"rows"`
	Active bool   `json:"active"`
}

type TerminalSize struct {
	Cols int `json:"cols"`
	Rows int `json:"rows"`
}

type TerminalOutputPayload struct {
	SessionID string `json:"sessionId"`
	Data      string `json:"data"`
}

type TerminalExitPayload struct {
	SessionID string `json:"sessionId"`
	ExitCode  int    `json:"exitCode"`
}

type AppSettings struct {
	DefaultShell string `json:"defaultShell"`
	FontFamily   string `json:"fontFamily"`
	FontSize     int    `json:"fontSize"`
	Scrollback   int    `json:"scrollback"`
}

func DefaultSettings() AppSettings {
	return AppSettings{
		DefaultShell: "powershell",
		FontFamily:   "Cascadia Mono, Consolas, monospace",
		FontSize:     14,
		Scrollback:   10000,
	}
}
