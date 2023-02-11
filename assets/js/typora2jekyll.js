$(function() {
    $("#markdown-content img").each(function(){
        if($(this).attr("src").startsWith("..")){
            $(this).attr("src", $(this).attr('src').slice(2));
        };
        if($(this).attr("src").startsWith("/")){
            $(this).attr("src", $(this).attr('src').slice(1));
        }
    });
});