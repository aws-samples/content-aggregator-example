/*  
SPDX-FileCopyrightText: 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 
*/
<template>
  <div class="container">
    <div>
      <Logo />
          <h1>New Blog Posts</h1>
      <ul>
        <li v-for="blog in blogPosts" :key="blog">
          <Post :post="blog" />
          </li>
      </ul>

    </div>
  </div>
</template>

<script>

import blogPosts from '../assets/content.json'

export default {
  name: 'App',
  data(){
    return{
      blogPosts:[]
    }
  },
  mounted(){
    this.blogPosts= blogPosts
  },

}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
ul{display: relative;}

li{
  width: 400px;
  display: inline-block;
  padding: 20px;

  top: 0px;
  overflow:hidden;
  border:solid 1px #eee;
  margin: 10px;;
  text-align: left;
}



</style>
