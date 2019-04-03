$targetVersion = "Publish"#Publish Development
$codeDir = "E:\Project\RecordBill\Project\Gateway"
$publishDir = "E:\Project\RecordBill\Application"
$version = "Release"#Debug Release
$application = 
"Gateway"
Remove-Item -Path:"$publishDir\*" -Recurse:$true
$csproj = "$codeDir\$application\$application.csproj"
$targetDir = "$publishDir\$application"
dotnet publish $csproj -o $targetDir -c $version
ren $publishDir\$application\ocelot.$targetVersion.json $publishDir\$application\ocelot.json
$datetTimeNow = Get-Date
$dateTimeNowString = $datetTimeNow.ToString('yyyyMMddHHmmss')
rar a -r -ep1 "$publishDir\$dateTimeNowString.rar" "$publishDir\"
Write-Output "������� $publishDir"
explorer("$publishDir")
Write-Output "��������˳�.........."
[Console]::ReadKey("?")