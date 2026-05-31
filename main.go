//go:build windows

package main

import (
	"embed"
	"log"

	"github.com/polarshell/polarshell/backend/models"
	"github.com/wailsapp/wails/v3/pkg/application"
)

//go:embed all:frontend/dist
var assets embed.FS

func init() {
	application.RegisterEvent[models.TerminalOutputPayload]("terminal:output")
	application.RegisterEvent[models.TerminalExitPayload]("terminal:exit")
}

func main() {
	app := application.New(application.Options{
		Name:        "PolarShell",
		Description: "Modern Windows terminal desktop app",
		Services: []application.Service{
			application.NewService(&TerminalService{}),
		},
		Assets: application.AssetOptions{
			Handler: application.AssetFileServerFS(assets),
		},
		Mac: application.MacOptions{
			ApplicationShouldTerminateAfterLastWindowClosed: true,
		},
	})

	app.Window.NewWithOptions(application.WebviewWindowOptions{
		Title:     "PolarShell",
		Width:     1280,
		Height:    800,
		MinWidth:  640,
		MinHeight: 400,
		Frameless: true,
		Windows: application.WindowsWindow{
			DisableFramelessWindowDecorations: true,
		},
		StartState:       application.WindowStateMaximised,
		BackgroundColour: application.NewRGB(12, 12, 12),
		URL:              "/",
	})

	if err := app.Run(); err != nil {
		log.Fatal(err)
	}
}
