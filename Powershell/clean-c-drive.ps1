#running as an administrator
if (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Output "Restarting script with administrator permissions..."
    Start-Process powershell.exe "-File `"$PSCommandPath`"" -Verb RunAs
    exit
}

# temp/junk folders
$prefetchPath = "$env:SystemRoot\Prefetch"
$tempPath1 = "$env:SystemRoot\Temp"
$tempPath2 = "$env:TEMP"

function Clear-FolderContents {
    param (
        [string]$folderPath
    )
    
    if (Test-Path $folderPath) {
        Write-Output "Clearing contents from: $folderPath"
        
        # Remove all files and subfolders
        # by using -Force the deleted contents wont go to recycle bin.
        Get-ChildItem -Path $folderPath -Recurse -Force | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
        Write-Output "Cleared contents of $folderPath"
    } else {
        Write-Output "$folderPath does not exist or is inaccessible."
    }
}

# Clear contents from each specified folder
Clear-FolderContents -folderPath $prefetchPath
Clear-FolderContents -folderPath $tempPath1
Clear-FolderContents -folderPath $tempPath2

Write-Output "cleaned your C drive"
