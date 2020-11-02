/*  
SPDX-FileCopyrightText: 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 
*/

const { Base64 } = require("js-base64")

exports.handler = async (event)=>{
    
     let blogLink =event.BlogUrl
     let exist = 1; 
     let jsonBlogs = event.RepoBlogs.body.jsonBlogs
     
    try {
            //check that blog does not exist already
            if(!blogExists(jsonBlogs,blogLink)){
                 let code=200
                 exist =0
            }else{
                let code=404
            }

      } catch (err) {
        console.error(err)
      }   
        return {exist:exist};
}
const blogExists= function (json, value) {
    var blogs=JSON.parse(json)

    for(var i = 0; i < blogs.length; i++){
      if(blogs[i].link==value){
             return true
         }
    }
    return false;
}
