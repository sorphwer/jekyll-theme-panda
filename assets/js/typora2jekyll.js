$(function() {
    $("#markdown-content img").each(function(){
        $(this).attr("src", $(this).attr('src').slice(2))
    });
});