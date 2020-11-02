/*  
SPDX-FileCopyrightText: 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 
*/
const { Octokit } = require("@octokit/rest")
const { Base64 } = require("js-base64")
const AWS = require('aws-sdk');
const SSM = new AWS.SSM();

exports.handler = async (event)=>{
    let newBlogs=toCommit(event.mapResults)
    const Filesha=event.RepoBlogs.body.sha
    newBlogs.push(JSON.parse(event.RepoBlogs.body.jsonBlogs))

    //get Github API Key and Authenticate
    const singleParam = { Name: '/GitHubAPIKey ',WithDecryption: true };
    const GITHUB_ACCESS_TOKEN = await SSM.getParameter(singleParam).promise();
    const octokit = await  new Octokit({
      auth: GITHUB_ACCESS_TOKEN.Parameter.Value,
    })


    const repoarray = process.env.GitHubRepo.split('/')
    const repo = repoarray.pop()
    const owner = repoarray.pop()
    
    try {
        const contentEncoded =  Base64.encode(JSON.stringify(newBlogs))
        const data = await octokit.repos.createOrUpdateFileContents({ 
            sha: Filesha,
            owner: owner,
            repo: repo,
            path: process.env.JSONFile,
            message:'Updated content file' ,
            content: contentEncoded,
            committer: {
                name: "Octokit Bot",
                email: "Octokit@example.com",
            },
            author: {
                name: "Octokit Bot",
                email: "Octokit@example.com",
            }
        });
    } catch (err) {   
        console.error(err)
    }    
    return {statusCode: 200, body:newBlogs};

}


const toCommit= function (arr, value) {
    let merged =[]
    for(var i = 0; i < arr.length; i++){
        if(arr[i].statusCode==200){
                merged.push(JSON.parse(arr[i].body.ToCommit))
        }
    }
    return merged;
}