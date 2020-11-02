/*  
SPDX-FileCopyrightText: 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 
*/
const axios = require('axios');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();


exports.handler = async (event)=>{

    const blogResult = await getBlog(event.feedUrl)
    const response = {
        statusCode: 200,
        body: blogResult
      };
    return response;
}

const getBlog = async (url) => {
  try {
    const response = await axios.get(url)
        var blogs=[];
         parser.parseString(response.data, function(err, result) {
            var items = result.rss.channel[0].item
            for(var i=0; i<= items.length; i++){
                    blogs.push(items[i].link[0])
            }
         });
    } catch (error) {
        console.error(error)
    }
    return blogs;
          
}
