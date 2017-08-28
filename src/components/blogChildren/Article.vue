<template>
  <article class="post post-list">
    <div class="meta">
      <div class="date">
        <time>Aug 06, 2017</time>
      </div>
      <div class="comment"><a href="/post/enable-tls-1-3.html#comments">25 Comments</a></div>
    </div>
    <h1 class="title"><a href="/post/enable-tls-1-3.html">本博客开始支持 TLS 1.3</a></h1>
    <div class="entry-content"><p>
      几个月前，我在升级本博客所用 Nginx 时，顺手加上了对 TLS 1.3 的支持，本文贴出详细的步骤和注意事项。有关 TLS 1.3 的介绍可以看 CloudFlare 的这篇文章：An overview of TLS 1.3 and Q&amp;A。需要注意目前 Chrome 和 Firefox 支持的是 TLS 1.3 draft 18，暂时不要用在生产环境。 [...]</p>
      <p><a href="/post/enable-tls-1-3.html" class="more-link">继续阅读 »</a></p></div>
  </article>
</template>

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
