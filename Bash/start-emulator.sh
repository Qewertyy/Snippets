#!/bin/bash
emulator_path="$HOME/Android/Sdk/emulator/emulator"
read -p "Enter AVD Name: " avd

"$emulator_path" -avd "$avd" &
sleep 1

echo "Emulator started with PID: "
pgrep -f "emulator" 
