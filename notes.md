## Get tree

`GET /ws/cpm/tree?maxDepth=1&path=%2F&rnd=6223694639`
`GET /ws/cpm/tree?maxDepth=1&path=%2Fscripts&rnd=1747568438`

## Get file

`GET /ws/cpm/builtintext?LoadFolderInfo=false&path=%2F%2Fscripts%2Fpowermenu-plus-v21%2Fclient-creds.js&rnd=9820389028`

## Save file

`POST /ws/cpm/customPageContent`

Request payload
```
------WebKitFormBoundaryaB9AqZSCBcBXzG1l
Content-Disposition: form-data; name="customContentId"

31643
------WebKitFormBoundaryaB9AqZSCBcBXzG1l
Content-Disposition: form-data; name="customContent"

'use strict'

define(require => {
  const angular = require('angular')
  require('components/shared/index')
  console.log('hi mom')

  return angular.module('EccGraderModule', ['powerSchoolModule'])
})

------WebKitFormBoundaryaB9AqZSCBcBXzG1l
Content-Disposition: form-data; name="customContentPath"

//scripts/ecc-grader-v01/EccGrader.js
------WebKitFormBoundaryaB9AqZSCBcBXzG1l
Content-Disposition: form-data; name="keyPath"

scripts.ecc-grader-v01.EccGrader
------WebKitFormBoundaryaB9AqZSCBcBXzG1l
Content-Disposition: form-data; name="keyValueMap"

{}
------WebKitFormBoundaryaB9AqZSCBcBXzG1l
Content-Disposition: form-data; name="publish"

true
------WebKitFormBoundaryaB9AqZSCBcBXzG1l--
```

## Create folder

`POST /ws/cpm/createAsset`

Form Data
```
newAssetName: ab
newAssetPath: //scripts/re-enroll-v2
newAssetType: folder
newAssetRoot:
```

## Create file

`POST /ws/cpm/createAsset`

Form Data
```
newAssetName: asdf.html
newAssetPath: //scripts/re-enroll-v2/ab
newAssetType: file
newAssetRoot:
```

## Upload file

`POST /ws/cpm/fileUpload`

Payload
```
------WebKitFormBoundary2VgpOK94ZXmSwEyb
Content-Disposition: form-data; name="upload"; filename="ui-boostrap-0-10-0.js"
Content-Type: text/javascript


------WebKitFormBoundary2VgpOK94ZXmSwEyb
Content-Disposition: form-data; name="filePath"

//scripts/re-enroll-v2/ab
------WebKitFormBoundary2VgpOK94ZXmSwEyb
Content-Disposition: form-data; name="fileRoot"

null
------WebKitFormBoundary2VgpOK94ZXmSwEyb--
```

Response
```
{"returnMessage":"The file was uploaded successfully"}
```

## Delete folder

`POST /ws/cpm/deleteFolder`

Form Data
```
path: //scripts/powermenu-plus-v16
forceDelete: false
```

```
path: //scripts/powermenu-plus-v16
forceDelete: true
```

Responses
```
{ "returnMessage": "folder_not_empty" }
{ "returnMessage": "The folder was deleted sucessfully" }
```

