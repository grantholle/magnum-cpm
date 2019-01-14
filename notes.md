## Get tree

`GET /ws/cpm/tree?maxDepth=1&path=%2F&rnd=6223694639`
`GET /ws/cpm/tree?maxDepth=1&path=%2Fscripts&rnd=1747568438`

```js
$j.ajax({
  method: 'get',
  url: '/ws/cpm/tree',
  data: {
    path: '/',
    rnd: 9529784006,
    maxDepth: 99
  },
  success: (data) => {
    const print = (dir, parent = '') => {
      console.log(`${parent}/${dir.text}`)

      if (dir.subFolders) {
        dir.subFolders.forEach(sub => {
          print(sub, `${parent}/${dir.text}`)
        })
      }
    }

    print(data.folder)
  }
})
```

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

## Delete file

`POST /ws/cpm/deleteFile`

Form Data
```
path: //scripts/re-enroll-v2/ab/asdf.html
```

## Logging in

Have to include `/admin/javascript/md5.js`

```js
setInterval(function(){
    var url="/ws/session/seconds-remaining?_="+new Date().getTime();
    $.ajax(url,{
        context: document.body,
          success: function(timeJSON) {
              loggedInState=true;
              $("#adminLogoutMessage").html("").removeClass("error");
              $("#loginDia").dialog("close");
            },
      statusCode: {
          401: function() {
                  loggedInState=true;

                  loggin(null,null,true);
                  $("#adminLogoutMessage").html("Admin Logged out. Plugin filter, save state, and export may not work as expected <a href=\"/admin/\" target=\"_blank\">Log In</a>").addClass("error");
          }
    }
    })
}, 30000);
```

```js
function loggin(success,failure,modal){
    if(modal===undefined){
        modal=false;
    }
    if(success===undefined || success===null){
        var successFunction=null;
        var successParameters=null;
    }else{
        switch(typeof(success)){
            case "function":
                successFunction=success;
                successParameter=null;
                break;
            case "object":
                successFunction=success.callback;
                switch(typeof(success.parameter)){
                    case "undefined":
                        successParameter=null;
                        break;
                    case "object":
                    case "array":
                        successParameter=success.parameter;
                        break;
                    default:
                        successParameter=null;
                }
                break;
            default:
        }
    }
    $("#loginDia").dialog("option","buttons",null);
    $("#loginDia").dialog("option","buttons",[
        {
            id:"loginBtn",
            text:"Log In",
            "modal":modal,
            click:function(){
                if($("#username").val()=="" || $("#password").val()==""){
                    $("#loginError").html("Please fill in both fields").addClass("ui-state-error");
                    return;
                }
                $("span.ui-button-text:contains('Log In')").html($("<img src=\"images/ajax-loader.gif\" />"));

                $.ajax("/admin/pw.html",{
                    success:function(data){
                        let psKey=data.match(/var pskey = "[a-zA-Z0-9]*"/)[0].match(/"[a-zA-Z0-9]*"/)[0].replace(/"/g,"")
                        let psToken=$j((data.match(/<input type="hidden" name="pstoken" value="[a-zA-Z0-9]*">/)[0])).val()
                        let loginData={
                            ldappassword:$("#password").val(),
                            pstoken: psToken,
                            username: $("#username").val(),
                            password: hex_hmac_md5(psKey, b64_md5($("#password").val()))
                        };
                        $.ajax("/admin/home.html",{
                            method:"POST",
                            data:loginData,
                            success:function(data,status,jxhr){
                                if(data.search("PS Server Uptime")>-1){
                                    $("#loginError").html("Log in failed. Please try again").addClass("ui-state-error");
                                    $("span.ui-button-text").has("img").each(function(){
                                        $(this).html("Log In");
                                    });

                                }else{
                                    if(successFunction!=null){
                                        successFunction.apply(this,successParameter);
                                    }
                                    $(dialog).dialog("close");
                                }
                            },
                            failure:function(data){
                                $("#loginError").html("There was an issue contacting server.2a");
                            },
                            error:function(data){
                                if(successFunction!=null){
                                    successFunction.apply(this,successParameter);
                                }
                                $("#adminLogoutMessage").html("").removeClass("error");
                                $("#loginDia").dialog("close");
                            },
                            statusCode:{
                                302:function(){
                                    if(successFunction!=null){
                                        successFunction.apply(this,successParameter);
                                    }
                                    $(dialog).dialog("close");
                                }
                            }
                        });
                    }
                })
            }
        },
        {
            id:"cancelLoginBtn",
            text:"Cancel",
            click:function(){
                $(this).dialog("close");
            }
        }
    ]);
    $("#loginDia").dialog("open");
}
```
