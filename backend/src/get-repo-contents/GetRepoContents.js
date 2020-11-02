/*  
SPDX-FileCopyrightText: 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 
*/
const { Octokit } = require("@octokit/rest")
const { Base64 } = require("js-base64")
const AWS = require('aws-sdk');
const SSM = new AWS.SSM();


exports.handler = async (event)=>{
     let Filesha='';
     let jsonBlogs=''
    
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
      jsonBlogs = await  octokit.repos.getContent({
          owner: owner,
          repo: repo,
          path: process.env.JSONFile,
      }).then(result => {
          // content will be base64 encoded
          Filesha = result.data.sha
          const content = Buffer.from(result.data.content, 'base64').toString()
          return content
      })
      } catch (err) {
        console.error(err)
      }
        return {statusCode: 200, body:{sha:Filesha, jsonBlogs:jsonBlogs}};
}
