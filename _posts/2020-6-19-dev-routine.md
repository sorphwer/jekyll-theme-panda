---
layout: post
title: Update Information
tags: 
- jekyll 
- doc
toc: false
status: Live
sticky : true
banner-title: THEME DOC
banner-subtitle: Dev Backlog
last-modify: 2022-06-04 10:30:00 +0000
never-expired: true

---
## Ver. Panda-0.2.3

 - Fix: Floating TOC panel is back as old version works when `toc` is true or default.

 - Fix: `mathjax` is now deployed **completely** in local, no more CDN issues.

 - Refactor: Remove rouge highlight

 - Feat: Completely new Code Snippet Style, supported by prism.js, including:

   - Better syntax highlight theme, auto clickable url, show language name
   - Copy to clipboard button
   - Line number
   - Tree view/Diff view/Terminal view

   For full feature please visit *Theme Showcase* , to customize prism plugin please refer to https://prismjs.com/
   
- Known issues:

  - Since path issue (all assets file will be wrapped by remote-theme), `mathjax` font can not load successfully.
  
  - User have to manually disable default rouge by editing `_config`:
  
    ```yml
    markdown: kramdown
    kramdown:
       syntax_highlighter_opts:
          disable : true
    ```
  
  - Scroll bar style of code block is missing
  
   


## Ver. Panda-0.2.2 


 - New Ymal attribution `never-expired`

## Ver. Panda-0.2.1

 - Fix: Mathjax.js issue by replace CDN url



## Ver. Panda-0.2.0 

- Feat: New layout : blank (default layout without header and footer)
- Feat: New layout : album
- Feat: New layout : albumlist
- Feat: New layout : preset
- Feat: New layout : presetlist
- Feat/Dependency: smooth in-page jump via jquery-ui 
- Refactor: Config refactor
- Fix: dropdown liquid issue
- Dependency:  add skroll.js

## Ver. Panda-0.1.0

- Rename theme

- Refactor:  link to [jekyll-search-bar](https://github.com/sorphwer/jekyll-theme-panda)

- Feat: Add [theme doc](https://github.com/sorphwer/jekyll-theme-panda)

- Feat: Add theme [demo](https://riino.site/jekyll-theme-panda/)

## Ver. 3.2

- Transform css into sass

- Delete more ES5 codes

- Now this blog is using `remote_theme` with [riinosite theme](https://github.com/sorphwer/jekyll-theme-panda)

- Better config control



## Ver. 3.1

-  Enhanced search 
   
   Seach panel (can be opened by clicking the search icon in the right botton corner or by double-clicking ctrl) now support title name seach with tag search. Also `n-gram` is used for matching.

-  Some refactors

-  Remove 'lab'

## Ver. 3.0

-  Smart Banners

    Automatically add banner, depends on the content and ymal config of each post. First version will contain `GS`(Gauzier Shield), `Expired`(for old posts), and `WIP`.

-  Custom Banner

    Custom banner can be added via `yaml` info, user can override banner title and subtitle. Currently the pattern of banner can not be modified.

-  'Lab'

    The tag 'Lab' in nav bar is an another independent project of mine, when we release first demo, it will be fully available. Currently We just put an interesting demo made by p5.js there.

-  Local JavaScript library support
