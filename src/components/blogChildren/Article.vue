<template>
  <article class="post post-list">
    <div class="meta">
      <div class="date">
        <time>{{blog.createDateStr}}</time>
      </div>
      <div class="comment" v-if="blog.commentCount"><a :href="'/blog/' + blog.originalFileName + '#comments'">{{blog.commentCount}} Comments</a></div>
    </div>
    <h1 class="title"><a :href="'/blog/' + blog.originalFileName">{{blog.title}}</a></h1>
    <div class="entry-content">
      <p v-html="blog.abstract"></p>
      <p>Tags: <el-tag v-for="(tag, i) in blog.tags" :key="i" style="margin-left: 5px;">{{tag}}</el-tag></p>
      <p><a :href="'/blog/' + blog.originalFileName" class="more-link">继续阅读 »</a></p>
    </div>
  </article>
</template>

<script>
  export default {
    name: 'Article',
    props: {
      blog: {
        type: Object,
        require: true,
      }
    },
    data () {
      return {

      }
    }
  }
</script>

<style>
  article {
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #fff;
    padding: 30px 0;
    position: relative;
  }
  article .meta {
    color: #555;
    float: right;
    font-size: .9em;
    line-height: 2;
    position: relative;
    text-align: right;
    width: auto;
  }
  article .meta .date, article .meta .comment, article .meta .tags {
    position: relative;
  }
  article .meta a {
    color: #999;
  }
  article h1.title {
    color: #333;
    font-size: 2em;
    font-weight: 300;
    line-height: 35px;
    margin-bottom: 25px;
  }
  article h1.title a {
    color: #333;
    transition: color .3s;
  }
  article .entry-content {
    color: #444;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    line-height: 1.8;
    word-wrap: break-word;
  }
  article .entry-content p {
    margin-top: 15px;
  }
  a {
    color: #2479CC;
    text-decoration: none;
  }
</style>
