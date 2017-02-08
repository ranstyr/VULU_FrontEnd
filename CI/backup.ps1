param(
[string]$deployPath,
[string]$backupPath,
[string]$RevisionID
)

if ([string]::IsNullOrEmpty($deployPath) -eq $false)
{
	$JSONFile = ConvertFrom-Json "$(get-content $deployPath\package.json)"
        $folderName = $JSONFile.releaseVersion + "." + ($RevisionID - 1)
	$copyToPath = join-path $backupPath $folderName
        Copy-Item $deployPath -destination $copyToPath -recurse -force
}