/*  
SPDX-FileCopyrightText: 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 
*/
const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async (url)=>{

    const blogResult = await getBlog(url)
    const response = {
        statusCode: 200,
        body: blogResult
      };
    return response;
}

//designed to scrape the AWS compute blog. 
const getBlog = async (url) => {
  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)
    let blogobj ={}
    $title = $('head title').text()
    $intro = $('meta[property="og:description"]').attr('content')
    $author1 = $('meta[name="twitter:creator"]').attr('content')
    $author = $('footer.blog-post-meta').children().eq(0).text()
    $date = $('meta[property="article:published_time"]').attr('content')
    $link = $('meta[property="og:url"]').attr('content')
    $image = $('meta[property="og:image"]').attr('content')
    $tags = $('meta[property="article:tag"]')

    if ($title) {
        blogobj.title = $title;
    }

    if ($intro) {
        blogobj.intro = $intro;
    }

    if ($author) {
        blogobj.author = $author;
    }

    if ($date) {
        const formatter = new Intl.DateTimeFormat('en', { month: "short", day: "2-digit", year: "numeric" });
        blogobj.date = formatter.format(new Date($date));
    }

    if ($link) {
        blogobj.link = $link;
    }

    if ($image) {
        blogobj.image = $image;
    }

    if ($tags) {
        let mySet = new Set()
        for (var i = 0; i < $tags.length; i++) {
            mySet.add($($tags[i]).attr('content'));
        }
        blogobj.tags = Array.from(mySet)
    }
    return [{"blogMeta":JSON.stringify(blogobj, null, '\t')}];

    } catch (error) {
        console.error(error)
    }
          
}
