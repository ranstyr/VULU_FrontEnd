param(
[string]$buildId,
[string]$serverUrl,
[string]$JSONFileLocation,
[string]$RevisionID
)

function Execute-HTTPPostCommand() {
 param(
 [string] $target = $null
 )
   $webRequest = [System.Net.WebRequest]::Create($target)
    $webRequest.ContentType = "application/xml"
    $PostStr = [System.Text.Encoding]::UTF8.GetBytes($Post)
    $webrequest.ContentLength = $PostStr.Length
    $webRequest.ServicePoint.Expect100Continue = $false
    $webRequest.Headers.Add("AUTHORIZATION", "Basic aWRvLnNoZWZmZXI6MTA="); #basic authentication using base 64 encoded username and password: [user]:[pass]

    $webRequest.PreAuthenticate = $true
    $webRequest.Method = "POST"

    $requestStream = $webRequest.GetRequestStream()
    $requestStream.Write($PostStr, 0,$PostStr.length)
    $requestStream.Close()

    [System.Net.WebResponse] $resp = $webRequest.GetResponse();
    $rs = $resp.GetResponseStream();
}

if ([string]::IsNullOrEmpty($JSONFileLocation) -eq $false)
{

	$JSONFile = ConvertFrom-Json "$(get-content $JSONFileLocation)"

    # Use the following xml for TeamCity 8.x:
    # $post = "<tags><tag>" + $productNumber + "</tag></tags>"

    # Use the following xml for TeamCity 9.x:
    $post = "<tags count=`"1`"><tag name=`"" + $JSONFile.releaseVersion + "." + $RevisionID + "`"></tag></tags>"
    $URL = $serverUrl + "/httpAuth/app/rest/builds/id:" + $buildId + "/tags"
    Execute-HTTPPostCommand $URL
}