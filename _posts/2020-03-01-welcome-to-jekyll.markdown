---
layout: post
title:  "Theme Showcase"
subtitle: "Features and yaml configuration demo" #optional 
author: "RiinoSite"    #optional
date:   2022-06-04 10:08:09 +0800
tags:           #optional
- jekyll 
- doc
status: doc     #optional,if status is 'WIP', will display a WIP banner
last-modify: 2020-07-10 10:30:00 +0000 #optional
toc: true       #default: true
sticky : true   #default: false
hide: false     #default: false (hide from Home page only)
mathjax: true   #default: true
mermaid: true   #default: true
banner-title: THEME DOC #optional
banner-subtitle: Readme.md #optional, must be with banner-title
never-expired: true
# toc options: inline, true, false
---


# Introduction

You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, while `Bundle exec jekyll serve ` is recommended, which launches a web server and auto-regenerates your site when a file is updated. 

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

# Features

- Auto archive based on tags management
- Multi-type posts :
  - post (for markdown articles)
  - album (for displaying a series of pictures)
  - preset (for introducing LR/PS presets or similar ones)
  - visio (for displaying visio files in htm file type)
- Attribution control via yaml data in post type:
  - Optional TOC style configuration : inline, hidden, auto
  - Hide posts in home page
  - Make article pinned at home page
  - Mark a custom status symbol
- Auto/Manual Dark/Light Mode 
- Responsive design, optimized for mobile devices
- Global search bar for articles and tags
- `xml` subscribe
- Code highlights & Optional Latex support
- Mermaid support
- Multilanguage Support
- Emoji Support
- Highly custom config in header and footer

# Site Configuration

```yaml
title: jekyll-theme-panda #replace it with yours
author: riino #replace it with yours
email: riino@gmail.com #replace it with yours
SEOTitle: jekyll-theme-panda demo #replace it with yours
baseurl: "/jekyll-theme-panda" # the subpath of your site, e.g. /blog
url: "https://riino.site" # the base hostname & protocol for your site, e.g. http://example.com
twitter_username: sorphwer #replace it with yours
github_username: sorphwer #replace it with yours
github_url: https://github.com/sorphwer #replace it with yours
repo_url: https://github.com/sorphwer/jekyll-theme-panda #replace it with yours
theme_version: 0.2.5
permalink: /:year-:month-:day-:title:output_ext #please keep using single route schema

markdown: kramdown
kramdown:
   syntax_highlighter_opts:
      disable : true
plugins:
  - jekyll-feed
  - jekyll-paginate
  - jemoji
  - jekyll-seo-tag
paginate: 10

toc:
  min_level: 1 # default: 1
  max_level: 4 # default: 6
sass:
    sass_dir: _sass
    style: compressed

navigation: #you musch specifiy layout value to make nav bar shows current page. If you deploy in example.com/blog you have to use bare url as below:
- text: Blogs #text displayed in nav
  url: index.html #url target when click nav
  layout: home #value used to compare with current layout to implement dynamic dot in nav
- text: Archive
  url: Archive
  layout: forarchive
- text: About
  url: About1 
  layout: about
#if you deploy jekyll in root domain (example.com)
#you can add '/' in url to ensure root level redirection
#- text: profile
#  url: /about
#  layout: about
# you can also declare 'default' layout as one slot for your custom page, since none of out-of-box page using this layout:

#- text: yourpage
#  url: /yoururl
#  layout: default


dropdown_header: Theme #default text in dropdrown, it will only exist if dropdown array below has item(s)
dropdown: #replace it with yours
- text: BLOG
  url: https://riino.site

footer_text: #replace it with yours
- jekyll-theme-panda demo by Riino
- All Rights Reserved.

footer_html: <a href="{{ site.baseurl }}/feed.xml">RSS Subscribe |</a><span></span><a href="{{ site.baseurl }}/policy/">Policy</a> #a list as injected html, you can inject google GA or other scripts here if you want.

banner_img: /assets/img/banner.gif
hoster_logo: /assets/img/logo_Nest.png #replace it with yours
hoster_logo_link: https://github.com/sorphwer #replace it with yours
hoster_logo_alt: Github
hoster_text: #replace it with yours
- Nest of Etamine - 10th Anniversary
- 2012-2022
```



# Front Matter Configurations

TOC is enabled automatically, you can set such yaml head to disable it with `toc:false`. When enabled, a toc at top of the article or the sidebar will be created automatically, and you do not need to add anything, any standard markdown titles will be recognized.

You can edit these attribution in yaml data of your markdown file:

Available front matter parameters for `post` layout:

```yaml
layout: post # must be 'post'
title:  "Welcome to RiinoSite3!"
subtitle: "Features of RiinoSite3 Blog" #optional 
author: "RiinoSite"    #optional
date:   2020-03-01 17:08:09 +0800
tags:           #optional
- jekyll 
- doc
status: doc     #optional,if status is 'WIP', will display a WIP banner
last-modify: 2020-01-04 10:30:00 +0000 #optional
toc: true       #default: true
sticky : true   #default: false
hide: false     #default: false (hide from home page only)(old)
hidden: false   #default: false (hide from both Home page and paginator, by jekyll-pagninate)
mathjax: true   #default: true
mermaid: true   #default: true
banner-title: RiinoSite Blog #optional
banner-subtitle: Readme.md #optional, must be with banner-title
# toc options: inline, true, false
```
<center> Current version DO NOT support space or '/' in tag.</center>

Available front matter parameters for `album` layout:

```yaml
---
layout: album # must be 'album'
title: title #optional, when not defined, title will be your filename, and if you do not need a title in album page, USE [].
hidden: true # MUST be hidden if you dont want this to be shown in 'BLOGS'
description: ['text1','text2'] # array, each element will be in a <p> tag
cover_number: 0 #decide which photo in photos below will be the cover, default as 0
photos:
 - url: /img/ttt.img
 - description: photo description
---
```
Available front matter parameters for `preset` layout:

```yaml
---
layout: preset #MUST be preset
title: title
hidden: true # MUST be hidden if you dont want this to be shown in 'BLOGS'
description: ['text1','text2']
download_url: google.com
derivation: ['text1','text2']
samples:
 - title: title
   subtitle: description
   img_url: anyurl
   img_text: img text
---
```

To edit min & max level of generated outline, please check `_config.yml`. Max level is 3 now.

*You have to manually input last modify date since github page do not support related plugins. (https://tomkadwill.com/adding-last-modified-date-to-jekyll)

# Content Scripts

## Code Highlight

Code highlight is supported by `prismjs`.

```python
def print_hi(name):
  print('Hi,',name)
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
```
Supported prismjs plugins list:

![image](/jekyll-theme-panda/img/prism-plugins.png)

## Latex

Latex formatter is supported by `mathjax`, such latex block need two extra enter to create isolated paragraph.

$$
f(x)'=lim_{x\rightarrow0}\frac{f(x)}{x}
$$



To use inline latex like $\theta$ , $\pi$ , $\frac{18^2}{5}$, please check the config in head label, which is supposed to be:

```html
<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
        tex2jax: {
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
        inlineMath: [['$','$']]
        }
    });
</script>
<script type="text/javascript"
   src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
```



## Mermaid 

UML Seq Diagram

```mermaid
sequenceDiagram

Alice->>John: Hello John, how are you?
loop Healthcheck
    John->>John: Fight against hypochondria
end
Note right of John: Rational thoughts!
     John-->>Alice: Great!
     John->>Bob   : How about you?
     Bob-->>John  : Jolly good!
```
Gantt Diagram
```mermaid
gantt

section Section
          Completed: done,   des1,       2014-01-06, 2014-01-08
          Active   : active, des2,       2014-01-07, 3d
         Parallel 1        : des3,   after des1, 1d
         Parallel 2        : des4,   after des1, 1d
         Parallel 3        : des5,   after des3, 1d
         Parallel 4        : des6,   after des4, 1d
```

Pie Chart

```mermaid
pie

  title Key elements in Product X
  "Calcium" : 42.96
  "Potassium" : 50.05
  "Magnesium" : 10.01
  "Iron" :  5
```

## Language & Quote

Currently we don't fully support Chinese display.


> English Word Display Test
> 中文语言显示测试/中文語言顯示測試
> 日本語表示テスト/にほんごひょうじテスト

## Emoji

Gone camping! :tent: Be back soon.

That is so funny! :joy:

# Dev Backlog

Please visit our [theme demo page](https://riino.site/jekyll-theme-panda)

# Jekyll Doc

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/