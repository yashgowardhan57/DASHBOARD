@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Install Node.js 18 or newer, then run this file again.
  pause
  exit /b 1
)
start "PracticalOS Local Hub" cmd /k "cd /d ""%~dp0das"" && node hub-server.js"
timeout /t 2 /nobreak >nul
start "" "http://localhost:3000"
endlocal
