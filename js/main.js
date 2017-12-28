var clicked = false;
$(function(){
    $("#event").hide();
    $("#effect").hide();
    $("#ajax").hide();
    $(".content").hide();

    $("#linkHome").click({id:$("#linkHome").attr("href")},showAndHide);
    $("#linkEvent").click({id:$("#linkEvent").attr("href")},showAndHide);
    $("#linkEffect").click({id:$("#linkEffect").attr("href")},showAndHide);

    $("#attachingEvents").click(changeColor);

    $("#attachingEvents").mouseover({color:'lightgrey'},changeBackgroundColor).mouseout({color:'transparent'},changeBackgroundColor);
    $("#buttonOff").click(function(){
        $("#attachingEvents").off();
    });

    $("#buttonOn").click(function(){
        $("#attachingEvents").on("click",changeColor);
        $("#attachingEvents").on("mouseover",{color:'lightgrey'},changeBackgroundColor);
        $("#attachingEvents").on("mouseout",{color:'transparent'},changeBackgroundColor);
    });

    $("#inputText").change(function(){
        $("<span>Input Changed</span>").insertAfter(this).fadeOut(1500);
    });
    $("#inputText").focus(function(){
        $("<span>Input Focused</span>").insertAfter(this).fadeOut(1500);
    });

    $("#inputText").select(function(){
        $("<span>Input Select</span>").insertAfter(this).fadeOut(1500);
    });

    $("#bFadeIn").click(function(){
        $("#fadeBox").fadeIn("slow");
    });

    $("#bFadeOut").click(function(){
        $("#fadeBox").fadeOut("slow");
    });

    $("#bFadeTo").click(function(){
       $("#fadeBox").fadeTo(3000, 1);
    });

    $("#bFadeToggle").click(function(){
        $("#fadeBox").fadeToggle("slow");
    });

    $("#bSlideUp").click(function(){
        $("#slideBox").slideUp();
    });

    $("#bSlideDown").click(function(){
        $("#slideBox").slideDown();
    });

    $("#bSlideToggle").click(function(){
        $("#slideBox").slideToggle();
    });
});

function changeColor(){
    var color = clicked ? "black" : "red";
    $("#attachingEvents").css("color", color);
    clicked = !clicked;
}

function changeBackgroundColor(event){
    $("#attachingEvents").css('background-color',event.data.color);
}

function showAndHide(selector){
    var selectorId = selector.data.id;
    $("section").hide();
    $("section ul").remove();
    $(selectorId).show();
    getSubMenu(selectorId);
}

function getSubMenu(name){
    var jsonFile = "ajax/";
    if(name == "#event")
        jsonFile += "menuEvent.json";
    else if(name == "#effect")
        jsonFile += "menuEffect.json";
    else
        jsonFile = null;

    if(jsonFile != null){
        $.getJSON( jsonFile, function( data ) {
            var items = "";
            $.each(data, function (key, val) {
                items += "<li><a onclick='showContent(&#39;"+key+"&#39;)'>" + val + "</a></li>";
            });
            $(name).prepend("<ul>"+items+"</ul>");
        });
    }else{
        $(name).append("Home Sweet Home");
    }
}

function showContent(key){
    $(".content").hide();
    $("#"+key).show();
}