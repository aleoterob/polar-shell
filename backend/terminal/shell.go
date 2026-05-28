package terminal

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/polarshell/polarshell/backend/models"
)

func ListShells() []models.ShellProfile {
	profiles := []models.ShellProfile{
		{
			ID:      "powershell",
			Name:    "PowerShell",
			Command: buildShellCommand("powershell", resolveExecutable("powershell.exe")),
		},
		{
			ID:      "cmd",
			Name:    "Command Prompt",
			Command: buildShellCommand("cmd", resolveExecutable("cmd.exe")),
		},
		{
			ID:      "wsl",
			Name:    "WSL",
			Command: buildShellCommand("wsl", resolveExecutable("wsl.exe")),
		},
		{
			ID:      "git-bash",
			Name:    "Git Bash",
			Command: buildShellCommand("git-bash", resolveGitBash()),
		},
	}

	for i := range profiles {
		profiles[i].Available = profiles[i].Command != ""
	}

	return profiles
}

func ResolveShell(shellID string) (string, error) {
	for _, profile := range ListShells() {
		if profile.ID != shellID {
			continue
		}
		if !profile.Available {
			return "", ErrShellUnavailable
		}
		return profile.Command, nil
	}

	return "", ErrUnknownShell
}

func buildShellCommand(shellID, executable string) string {
	if executable == "" {
		return ""
	}

	quoted := quoteCommandPath(executable)

	switch shellID {
	case "powershell":
		return quoted + " -NoLogo -NoExit"
	case "cmd":
		return quoted
	case "wsl":
		return quoted
	case "git-bash":
		return quoted + " --login -i"
	default:
		return quoted
	}
}

func quoteCommandPath(path string) string {
	if strings.Contains(path, " ") {
		return fmt.Sprintf(`"%s"`, path)
	}
	return path
}

func resolveExecutable(name string) string {
	if path, err := exec.LookPath(name); err == nil {
		return path
	}

	systemRoot := os.Getenv("SystemRoot")
	if systemRoot == "" {
		systemRoot = `C:\Windows`
	}

	candidate := filepath.Join(systemRoot, "System32", name)
	if _, err := os.Stat(candidate); err == nil {
		return candidate
	}

	// Windows PowerShell 5.1 default location when not on PATH.
	if name == "powershell.exe" {
		legacy := filepath.Join(
			systemRoot,
			"System32",
			"WindowsPowerShell",
			"v1.0",
			"powershell.exe",
		)
		if _, err := os.Stat(legacy); err == nil {
			return legacy
		}
	}

	return ""
}

func resolveGitBash() string {
	programFiles := os.Getenv("ProgramFiles")
	if programFiles == "" {
		programFiles = `C:\Program Files`
	}

	candidates := []string{
		filepath.Join(programFiles, "Git", "bin", "bash.exe"),
		filepath.Join(programFiles, "Git", "usr", "bin", "bash.exe"),
	}

	programFilesX86 := os.Getenv("ProgramFiles(x86)")
	if programFilesX86 != "" {
		candidates = append(candidates,
			filepath.Join(programFilesX86, "Git", "bin", "bash.exe"),
		)
	}

	for _, candidate := range candidates {
		if _, err := os.Stat(candidate); err == nil {
			return candidate
		}
	}

	return ""
}
