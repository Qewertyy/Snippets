$em = "$env:USERPROFILE\AppData\Local\Android\Sdk\emulator\emulator.exe"
$avd = Read-Host "Enter AVD Name"
Start-Process -FilePath $em -ArgumentList "-avd `"$avd`"" -WindowStyle Hidden
Start-Sleep -Seconds 1
Write-Output "Emulator started"
Get-Process | Where-Object { $_.ProcessName -like "emulator*" } | Select-Object -Property Id
