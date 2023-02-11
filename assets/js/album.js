$(function() {
    $("img.album").each(function(){
        if($(this).attr("src").startsWith("/")){
            $(this).attr("src", $(this).attr('src').slice(1));
        }
    });
});