/*  
SPDX-FileCopyrightText: 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 
*/

exports.handler = async (event)=>{
    
     //understand which users file to update
    let blog =event.BlogMeta.body[0].blogMeta;
    return {statusCode: 200, body:{ToCommit:blog}};

}

