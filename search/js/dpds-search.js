
    const substringMatcher = function (strs) {
        return function findMatches(q, cb) {
            let matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function (i, str) {
                if (substrRegex.test(str.title)) {
                    matches.push(str);
                }

            });

            cb(matches);
        };
    };
    const fuzzystringMatcher = function (strs) {
        return function findMatches(q, cb) {
            let matches, substringRegex;
            ngram = FuzzySet(strs, false);
            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function (i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });
            // match any similar words in ngram set compared with `q`
            if (q.length > 3) {
                ngramSet = ngram.get(q)
                for (let i in ngramSet) {
                    if (ngramSet[i][0] > 0.5) {
                        if ($.inArray(ngramSet[i][1], matches) === -1) {
                            matches.push(ngramSet[i][1]);
                        }
                    }
                }
            }

            cb(matches);
        };
    };
    function assembleArtilce(articleProps) {
        return `<section class="js-fadein js-fadein-anime">
                <div class="home-message__ttl"><a href="/${articleProps.id}/">
                    <h2> +${articleProps.title}</h2>
                    <!--<div class="post-content-preview">
                        <p class="u-txt__label"></p>'
                    </div>-->
                </a>
                </div>
                <p class="post-meta">
                    Posted by ${articleProps.author} on ${articleProps.published_at}, reading times: ${articleProps.reading_time} min.
                </p>
            </section>`

    }
    function generateTagButton(tagName) {
        return `<a href="/archive/?tag=${tagName}" data-sort="0008" data-encode="${tagName}" class="tag" title="${tagName}" rel="1">${tagName}</a>`
    }
    function updateTypehead(data) {
        let tagList = Array();
        for(post of data){
            tags = post['tags'].split('_');
            tagList = tagList.concat(tags);
        }
        $("#cb-search-content").typeahead(
            {
                hint: true,
                highlight: true,
                minLength: 1
            },
            {
                name: 'data',
                display: 'title',
                source: substringMatcher(data),
                templates: {
                    header: '<h4 class="row-name">Article</h4>',
                    // empty: [
                    //     '<div class="text">',
                    //     'unable to find any data that match the current query',
                    //     '</div>'
                    // ].join('\n'),
                    suggestion: function (data) {
                        tags = data.tags.split('_');
                        tagHTML = '';
                        for (let i in tags) {
                            tagHTML += generateTagButton(tags[i]);
                        }
                        return '<div class="typehead-list d-flex justify-content-between align-items-end"><a class="article" href="' + data.url + '">' + data.title + '</a><div class="d-flex flex-row">' + tagHTML + '</div></div>';
                    }
                },
            },
            {
                name: 'data',
                source: fuzzystringMatcher(tagList),
                templates: {
                    header: '<h4 class="row-name">Tags</h4>',
                    suggestion: function (data) {
                        // for (let i in tags) {
                        //     tagHTML += generateTagButton(tags[i]);
                        // }
                        return generateTagButton(data);
                    }
                }
            }
        );
    }
    $(document).ready(function () {
        // $Tags = getTags();
        // $Authors = getAuthors();
        $("#noResult").hide();
        $('.tt-meanu').css('backdrop-filter', 'blur(9px)');

        $(document).keyup(function (e) {
        let time2 = new Date().getTime();
        if (e.keyCode == 17) {
            let gap = time2 - time1;
            time1 = time2;
            if (gap < 500) {
                if (show) {
                    $(".cb-search-tool").css("display", "none");
                    show = false;
                } else {
                    $(".cb-search-tool").css("display", "block");
                    show = true;
                    $("#cb-search-content").val("");
                    $("#cb-search-content").focus();
                }
                time1 = 0;
            }
        } else if (e.keyCode == 27) {
            $(".cb-search-tool").css("display", "none");
            show = false;
            time1 = 0;
        }
    });

    $("#cb-search-content").keyup(function (e) {
        let time2 = new Date().getTime();
        if (e.keyCode == 17) {
            let gap = time2 - time1;
            time1 = time2;
            if (gap < 500) {
                if (show) {
                    $(".cb-search-tool").css("display", "none");
                    show = false;
                } else {
                    $(".cb-search-tool").css("display", "block");
                    show = true;
                    $("#cb-search-content").val("");
                    $("#cb-search-content").focus();
                }
                time1 = 0;
            }
        }
    });

    $("#cb-close-btn").click(function () {
        $(".cb-search-tool").css("display", "none");
        show = false;
        time1 = 0;
    });

    $("#cb-search-btn").click(function () {
        $(".cb-search-tool").css("display", "block");
        show = true;
        $("#cb-search-content").val("");
        $("#cb-search-content").focus();
        time1 = 0;
    });

        $.ajax({
            type: "GET",
            url: "/search/dpds-search.json",
            success: function (result) {
                updateTypehead(result.data);
            },
            error: function (xhr, state, errorThrown) {
                console.log(state);
                console.log(errorThrown);
            }
        })
    });
