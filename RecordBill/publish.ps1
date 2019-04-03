$targetVersion = "Publish"#Publish Development
$codeDir = "E:\Project\RecordBill\Project\RecordBill"
$publishDir = "E:\Project\RecordBill\Application"
$version = "Release"#Debug Release
$applications = "User.IdentityServer","RecordBill.WebAPI"
Remove-Item -Path:"$publishDir\*" -Recurse:$true
for($i=0;$i -lt $applications.Length; $i++){
    $application = $applications[$i]
    $csproj = "$codeDir\$application\$application.csproj"
    $targetDir = "$publishDir\$application"
    dotnet publish $csproj -o $targetDir -c $version
    ren $publishDir\$application\appsettings.$targetVersion.json $publishDir\$application\appsettings.json
}
$datetTimeNow = Get-Date
$dateTimeNowString = $datetTimeNow.ToString('yyyyMMddHHmmss')
rar a -r -ep1 "$publishDir\$dateTimeNowString.rar" "$publishDir\"
Write-Output "������� $publishDir"
explorer("$publishDir")
Write-Output "��������˳�.........."
[Console]::ReadKey("?")