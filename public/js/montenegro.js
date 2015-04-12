/*
 *  Montenegro (HTML) 1.0
 *  Copyright 2015, Limitless LLC
 *  www.limitless.company
 */

var windowHeight;
var windowWidth;
var settings;

settings = {
  closeButton: 'Close',
  defaultDisplay: 'grid',
  enableAlbums: true,
  enableGrid: true,
  enableList: true,
  enableSharing: true,
  gridColumns: 3, //Disabled
  homeLink: "index.html",
  sharingEmail: true,
  sharingFacebook: true,
  sharingGoogle: true,
  sharingTwitter: true
}

jQuery(document).ready(function($) {
  'use strict';

  //Navigate
  $("header.header .navigation li, header.header .logo, .link").click(function(){
    var type = $(this).attr("data-type");
    var url = $(this).attr("data-url");
    if(!url==""){
      if(type=="in") {
        $('html,body').stop().animate({scrollTop: $(url).position().top-80}, 'slow');
        $('header.header').removeClass("active", "fast", "swing");
      } else {
        window.open(url, "_self");	
      }
    }
  });

  $(document).scroll(function() { 
    if(!$('#home').length) {
      var pageY = $(this).scrollTop();
      var pageH = 100;
      var c = pageY/pageH;
      $('.header').css("background", "rgba(238,238,238,"+c+")");
    }
  });
  //Navigate


  //Header
  $("header.header .main .menu").click(function(){
    if($("header.header").hasClass("active")) {
      $("header.header").removeClass("active");
      $("header.header, header.header .navigation").removeClass("fullscreen");
      $("header.header, header.header .navigation").css("height", "");
    } else {
      $("header.header").addClass("active");
      $("header.header, header.header .navigation").addClass("fullscreen");
    }
    fixSizes();
  });
  //Header


  //Home
  $("section.home .image, section.home .slide").each(function() {
    $(this).css("background-image", "url("+$(this).attr("data-url")+")");
  });

  $('section.home .slider').flexslider({
    animation: "fade",
    animationLoop: true,
    animationSpeed: 1500,
    controlNav: true,
    directionNav: false,
    easing: "easeOutBack",
    pauseOnHover: false,
    selector: ".slides > .slide",
    slideshow: true
  });
  //Home


  //Work
  $("section.work .file .embed").each(function() {
    $(this).css("background-image", "url("+$(this).attr("data-thumb")+")");
  });

  $("section.work .file").hover(function(e){
    $(this).find(".thumb, .info").stop().animate({ opacity: 0.75 }, 'slow');
  }, function(){ 
    $(this).find(".thumb, .info").stop().animate({ opacity: 1 }, 'slow');
  });

  $("section.work .tools .albums .selected").click(function(){
    if($(this).hasClass("active")) {
      $(this).removeClass("active");
      $("section.work .albums .items").slideUp(200, "easeInOutQuad");
    } else {
      $(this).addClass("active");
      $("section.work .albums .items").stop().slideDown(200, "easeInOutQuad");
    }
  });

  $(document).mouseup(function(e){
    var container = $("section.work .tools .albums .selected");
    if (!container.is(e.target)  && container.has(e.target).length === 0) {
      container.removeClass("active");
      $("section.work .albums .items").slideUp(200, "easeInOutQuad");
    }
  });

  $("section.work .tools .albums .items li").click(function(){
    filterAlbum($(this));
    $("section.work .albums .items").slideUp(200, "easeInOutQuad");
  });

  $("section.work .tools .views .view").click(function(){
    var type = $(this).attr("data-type");
    $("section.work .tools .views .view").removeClass("active");
    $(this).addClass("active");
    $("section.work .files").removeClass("list grid animated fadeInUp");
    $("section.work .files").addClass(type);
    setTimeout(function(){$("section.work .files").addClass('animated fadeInUp')},200);
  });

  $("section.work .file").click(function(){
    var file = $(this);
    preview(file);
  });
  //Work

  //Blog
  $("section.blog .post").hover(function(e){
    $(this).find(".entry-header, .entry-content").stop().animate({ opacity: 0.75 }, 'slow');
  }, function(){ 
    $(this).find(".entry-header, .entry-content").stop().animate({ opacity: 1 }, 'slow');
  });

  $("section.blog .post .entry-thumbnail, section.blog .post .entry-title").click(function(){
    var url = $(this).parent().parent().attr("data-url");
    if(!url=="") {
      $.magnificPopup.open({
        closeOnBgClick: false,
        closeOnContentClick: false,
        items: {
          src: url,
          type: "ajax"
        },
        mainClass: "article-preview"
      });
      var meta = "<div class='container'><div class='meta row unselectable'><div class='logo six columns'><img src='./images/misc/header-logo.png' alt=''></div><div class='close six columns'><button>"+settings.closeButton+"</button></div></div></div>";
      $(".article-preview .mfp-content").append(meta);
      $(".article-preview .meta .logo").css('margin-top', ($(".article-preview .meta").height() - $(".article-preview .meta .logo").height()) / 2);

      $('.article-preview .close button').click(function(e){
        var magnificPopup = $.magnificPopup.instance;
        magnificPopup.close();
      });
      $('.article-preview .logo').click(function(e){
        window.open(settings.homeLink, "_self");	
      });
    }
  });
  //Blog

});

$(window).load(function() {

  console.log('window loaded');

  //Load Defaults & Settings
  $("section.work .tools .views .view").removeClass("active");
  $("section.work .tools .views .view[data-type='"+ settings.defaultDisplay +"']").addClass("active");
  $("section.work .files").removeClass("list grid");
  $("section.work .files").addClass(settings.defaultDisplay);

  filterAlbum($("section.work .albums .items li.default"));

  //Fixes
  fixSizes();

  //Check parameters
  var file = getUrlParameter('f');
  if(!file=="") {
    $("section.work .file").each(function() {
      var f;
      if($(this).find("img").length) f = $(this).find("img").attr("src");
      if($(this).find("video").length) f = $(this).find("video").attr("src");
      if($(this).find(".vimeo").length) f = $(this).find(".vimeo").attr("data-url");
      if($(this).find(".youtube").length) f = $(this).find(".youtube").attr("data-url");
      if(f==file){
        preview($(this));
      } else {
        console.log("The file you are looking for doesn't exist.");
      }
    });
  } else {
    console.log("the file parameter is incorrect.");
  }

  //Loader
  var timeOut = 0;
  if($('.loader').length) {
    $(".loader").delay(250).fadeOut(250, function() {
      $(".wrapper").animate({ opacity: 1 }, 500);
    });
    timeOut = 500;
  } else {
    $(".wrapper").animate({ opacity: 1 }, 300);
  }

  //Animations
  $('header.header, section.home .title, section.home .text, section.home .buttons').css("opacity", 0);
  //$('section.work .tools').css("opacity", 0);
  $('section.about, section.about .content').css("opacity", 0);
  $('section.contact, section.contact .content').css("opacity", 0);
  $('section.blog .post').css("opacity", 0);

  setTimeout(function(){$('header.header').addClass('animated fadeInDown')},timeOut);
  setTimeout(function(){$('section.home .title').addClass('animated fadeInDown')}, timeOut);
  setTimeout(function(){$('section.home .text').addClass('animated fadeInUp')},timeOut );
  setTimeout(function(){$('section.home .buttons').addClass('animated fadeInUp')}, timeOut);

  //setTimeout(function(){$('section.work .tools').addClass('animated fadeInDown')},2500);
  setTimeout(function(){$('section.work .files').addClass('animated fadeInUp')}, timeOut);

  setTimeout(function(){$('section.about').addClass('animated fadeInDown')}, timeOut);
  setTimeout(function(){$('section.about .content').addClass('animated fadeInUp')}, timeOut);

  setTimeout(function(){$('section.contact').addClass('animated fadeInDown')}, timeOut);
  setTimeout(function(){$('section.contact .content').addClass('animated fadeInUp')}, timeOut);

  setTimeout(function(){$('section.blog .post').addClass('animated fadeInUp')}, timeOut);
});

$(window).resize(function() {
  fixSizes();
});

function fixVideo() {

  //Fix fullscreen video
  var rat = windowWidth / windowHeight;
  if (rat > (16/9)) {
    var v = windowWidth * (16/9);
    $(".fullscreen video").css('width', windowWidth);
    $(".fullscreen video").css('height', v);
    var vc = ($(".fullscreen video").height() - windowHeight) / 2;
    $(".fullscreen video").css('margin-top', '-'+vc+'px');
    $(".fullscreen video").css('margin-left', '0px');
  } else {
    var v = windowHeight * (16/9);
    $(".fullscreen video").css('height', windowHeight);
    $(".fullscreen video").css('width', v);
    var vc = ($(".fullscreen video").width() - windowWidth) / 2;
    $(".fullscreen video").css('margin-top', '0px');
    $(".fullscreen video").css('margin-left', '-'+vc+'px');
  }

}

function fixSizes() {

  windowHeight = $(window).height();
  windowWidth = $(window).width();

  //Fullscreen
  $(".fullscreen").css('height', windowHeight);
  $(".min").css('min-height', windowHeight);
  fixVideo();


  //Vertical Center
  $("section.home .main").css('margin-bottom', ($("section.home").height() - $("section.home .main").height()) / 2);
  $("section.home .main").css('margin-top', ($("section.home").height() - $("section.home .main").height()) / 2);
  $("section.home .flex-control-nav").css('margin-top', -($("section.home .flex-control-nav").height()) / 2);
  $(".vertical-center").each(function() {
    $(this).css('margin-top', ($(this).parent().height() - $(this).height()) / 2);
  });

}

function filterAlbum(album) {
  var album = album;
  if(!album.hasClass("active")) {
    var selAlbum = album.attr("data-slug");
    $("section.work .albums .items li").removeClass("active");
    album.addClass("active");
    $("section.work .file").each(function() {
      var fileAlbum = $(this).attr("data-album");
      if(fileAlbum!=selAlbum && selAlbum!="all") {
        $(this).fadeOut(400, "easeInOutQuad");
        $(this).removeClass("active");
      } else {
        $(this).addClass("active");
        $(this).fadeIn(400, "easeInOutQuad");
      }
    });
    $("section.work .albums .selected").text(album.text());
    $("section.work .albums .selected").removeClass("active");
    $("section.work .albums .items").slideUp(200, "easeInOutQuad");
  } else {
    $("section.work .albums .items").slideDown(200, "easeInOutQuad");
  }

}

function preview(file) {

  //Type & Source
  var file = file;

  var source = file.find(".thumb").html();

  var path;
  if(file.find("img").length) path = file.find("img").attr("src");
  if(file.find("video").length) path = file.find("video").attr("src");
  if(file.find(".vimeo").length) path = file.find(".vimeo").attr("data-url");
  if(file.find(".youtube").length) path = file.find(".youtube").attr("data-url");

  //File info
  var caption = file.find(".info").text();
  var album = file.attr("data-album");
  var details = "";
  file.find(".details span").each(function() {
    details+= "<div class='detail'><span class='name'>"+$(this).attr("data-title")+"</span><span class='value'>"+$(this).text()+"</span></div>";
  });

  //Data for Navigation
  var current = $('section.work .file.active').index(file);
  var total = $('section.work .file.active').length;

  //Data for Display
  var fHeight = windowHeight - 220;
  var marg = ((windowHeight - 100) / 2) + 40;

  var m = "<div class='meta row unselectable'><div class='logo six columns'><img src='./images/misc/header-logo.png' alt=''></div><div class='close six columns'><button>"+settings.closeButton+"</button></div></div>";
  var p = "<div class='preview row unselectable' style='height:"+fHeight+"px'><div class='frame' style='height:"+fHeight+"px'>"+source+"</div></div>";
  var i = "<div class='info line-1 row'><div class='caption six columns'><h4 class='title'>"+caption+"</h4></div><div class='navigate six columns'><div class='prev unselectable'></div><div class='next unselectable'></div></div></div>";
  var d = "<div class='info line-2 row'><div class='details six columns'>"+details+"</div><div class='share six columns unselectable'><div class='link facebook'><span class='name'>Share</span><span class='value'>Facebook</span></div><div class='link twitter'><span class='name'>Share</span><span class='value'>Twitter</span></div><div class='link google'><span class='name'>Share</span><span class='value'>Google+</span></div><div class='link email'><span class='name'>Share</span><span class='value'>Email</span></div></div></div>";

  $.magnificPopup.open({
    closeOnBgClick: false,
    closeOnContentClick: false,
    items: {
      src: "<div class='container'>"+m+p+i+d+"</div>",
      type: "inline"
    },
    mainClass: "work-preview"
  });

  //DISABLE PREV IF FIRST IMAGE
  if(current==0) {
    $('.work-preview .preview .prev').addClass("disabled");
  }

  //IF VIDEO THN LOAD IT
  fixPlayer();

  //FIX SHARING
  if(settings.enableSharing){
    var u = window.location.href;
    var p = u+"?f="+path;
    fixSharing(p);
    if(!settings.sharingEmail) $(".work-preview .share .email").remove();
    if(!settings.sharingFacebook) $(".work-preview .share .facebook").remove();
    if(!settings.sharingGoogle) $(".work-preview .share .google").remove();
    if(!settings.sharingTwitter) $(".work-preview .share .twitter").remove();
  } else {
    $(".work-preview .share .link").remove();
  }

  //FIX VERTICAL CENTER
  $(".work-preview .meta .logo").css('margin-top', ($(".work-preview .meta").height() - $(".work-preview .meta .logo").height()) / 2);
  $('.work-preview .preview img').css('margin-top', - ($('.work-preview .preview img').height()/2));
  $('.work-preview .preview video').css('margin-top', - ($('.work-preview .preview video').height()/2));

  $('.work-preview .close button').click(function(e){
    var magnificPopup = $.magnificPopup.instance;
    magnificPopup.close();
  });

  $('.work-preview .logo').click(function(e){
    window.open(settings.homeLink, "_self");	
  });

  $('.work-preview .next').click(function(e){

    if(current<total-1) {

      current++;

      //Type & Source
      var i = $('section.work .files .active').eq(current);
      if(i.find("img").length) type = "image";
      if(i.find("video").length) type = "video";
      if(i.find(".vimeo").length) type = "vimeo";
      if(i.find(".youtube").length) type = "youtube";

      var source = i.find(".thumb").html();

      //File info
      var caption = i.find(".info").text();
      var details = "";
      i.find(".details span").each(function() {
        details+= "<div class='detail'><span class='name'>"+$(this).attr("data-title")+"</span><span class='value'>"+$(this).text()+"</span></div>";
      });

      var i = "<h4 class='title'>"+caption+"</h4>";
      $('.work-preview .info .caption .title').replaceWith(i);
      var d = "<div class='details six columns'>"+details+"</div>";
      $('.work-preview .info .details').replaceWith(d);
      var f = "<div class='frame' style='height:"+fHeight+"px'>"+source+"</div>";
      $('.work-preview .frame').replaceWith(f);

      //Load Embed Player
      fixPlayer();

      //FIX SHARING
      var u = window.location.href;
      var p = u+"?f="+path;
      fixSharing(p);

      //FIX VERTICAL CENTER
      $('.work-preview .preview img').css('margin-top', - ($('.work-preview .preview img').height()/2));
      $('.work-preview .preview video').css('margin-top', - ($('.work-preview .preview video').height()/2));

      //FIX PREV BUTTON
      if(!current==0) {
        $('.work-preview .prev').removeClass("disabled");
      }

      //DISABLE IF LAST IMAGE
      if(current==total-1) {
        $(this).addClass("disabled");
      }

    }

  });

  $('.work-preview .prev').click(function(e){

    if(current>0) {

      current--;

      //Type & Source
      var i = $('section.work .files .active').eq(current);
      if(i.find("img").length) type = "image";
      if(i.find("video").length) type = "video";
      if(i.find(".vimeo").length) type = "vimeo";
      if(i.find(".youtube").length) type = "youtube";

      var source = i.find(".thumb").html();

      //File info
      var caption = i.find(".info").text();
      var details = "";
      i.find(".details span").each(function() {
        details+= "<div class='detail'><span class='name'>"+$(this).attr("data-title")+"</span><span class='value'>"+$(this).text()+"</span></div>";
      });

      var i = "<h4 class='title'>"+caption+"</h4>";
      $('.work-preview .info .caption .title').replaceWith(i);
      var d = "<div class='details six columns'>"+details+"</div>";
      $('.work-preview .info .details').replaceWith(d);
      var f = "<div class='frame' style='height:"+fHeight+"px'>"+source+"</div>";
      $('.work-preview .frame').replaceWith(f);

      //Load Embed Player
      fixPlayer();

      //FIX SHARING
      var u = window.location.href;
      var p = u+"?f="+path;
      fixSharing(p);

      //FIX VERTICAL CENTER
      $('.work-preview .preview img').css('margin-top', - ($('.work-preview .preview img').height()/2));
      $('.work-preview .preview video').css('margin-top', - ($('.work-preview .preview video').height()/2));

      if(current==0) {
        $(this).addClass("disabled");
      }

      if(current<total) {
        $('.work-preview .next').removeClass("disabled");
      }

    }

  });

  $(document).keydown(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '39'){

      if(current<total-1) {

        current++;

        //Type & Source
        var i = $('section.work .files .active').eq(current);
        if(i.find("img").length) type = "image";
        if(i.find("video").length) type = "video";
        if(i.find(".vimeo").length) type = "vimeo";
        if(i.find(".youtube").length) type = "youtube";

        var source = i.find(".thumb").html();

        //File info
        var caption = i.find(".info").text();
        var details = "";
        i.find(".details span").each(function() {
          details+= "<div class='detail'><span class='name'>"+$(this).attr("data-title")+"</span><span class='value'>"+$(this).text()+"</span></div>";
        });

        var i = "<h4 class='title'>"+caption+"</h4>";
        $('.work-preview .info .caption .title').replaceWith(i);
        var d = "<div class='details six columns'>"+details+"</div>";
        $('.work-preview .info .details').replaceWith(d);
        var f = "<div class='frame' style='height:"+fHeight+"px'>"+source+"</div>";
        $('.work-preview .frame').replaceWith(f);

        //Load Embed Player
        fixPlayer();

        //FIX SHARING
        var u = window.location.href;
        var p = u+"?f="+path;
        fixSharing(p);

        //FIX VERTICAL CENTER
        $('.work-preview .preview img').css('margin-top', - ($('.work-preview .preview img').height()/2));
        $('.work-preview .preview video').css('margin-top', - ($('.work-preview .preview video').height()/2));

        //FIX PREV BUTTON
        if(!current==0) {
          $('.work-preview .prev').removeClass("disabled");
        }

        //DISABLE IF LAST IMAGE
        if(current==total-1) {
          $('.work-preview .next').addClass("disabled");
        }

      }

    }
  });

  $(document).keydown(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '37'){

      if(current>0) {

        current--;

        //Type & Source
        var i = $('section.work .files .active').eq(current);
        if(i.find("img").length) type = "image";
        if(i.find("video").length) type = "video";
        if(i.find(".vimeo").length) type = "vimeo";
        if(i.find(".youtube").length) type = "youtube";

        var source = i.find(".thumb").html();

        //File info
        var caption = i.find(".info").text();
        var details = "";
        i.find(".details span").each(function() {
          details+= "<div class='detail'><span class='name'>"+$(this).attr("data-title")+"</span><span class='value'>"+$(this).text()+"</span></div>";
        });

        var i = "<h4 class='title'>"+caption+"</h4>";
        $('.work-preview .info .caption .title').replaceWith(i);
        var d = "<div class='details six columns'>"+details+"</div>";
        $('.work-preview .info .details').replaceWith(d);
        var f = "<div class='frame' style='height:"+fHeight+"px'>"+source+"</div>";
        $('.work-preview .frame').replaceWith(f);

        //Load Embed Player
        fixPlayer();

        //FIX SHARING
        var u = window.location.href;
        var p = u+"?f="+path;
        fixSharing(p);

        //FIX VERTICAL CENTER
        $('.work-preview .preview img').css('margin-top', - ($('.work-preview .preview img').height()/2));
        $('.work-preview .preview video').css('margin-top', - ($('.work-preview .preview video').height()/2));

        if(current==0) {
          $('.work-preview .prev').addClass("disabled");
        }

        if(current<total) {
          $('.work-preview .next').removeClass("disabled");
        }

      }

    }
  });

}

function fixSharing(url) {
  var url = url;
  $(".work-preview .share .facebook").click(function(){
    window.open("https://www.facebook.com/sharer/sharer.php?u="+url, "Share", "width=600, height=400, status=no, toolbar=no, menubar=no");
  });

  $(".work-preview .share .twitter").click(function(){
    window.open("https://twitter.com/home?status="+url, "Share", "width=600, height=400, status=no, toolbar=no, menubar=no");
  });

  $(".work-preview .share .google").click(function(){
    window.open("https://plus.google.com/share?url="+url, "Share", "width=600, height=400, status=no, toolbar=no, menubar=no");
  });

  $(".work-preview .share .email").click(function(){
    window.open("mailto:?body="+url,"_parent");
  });

}

function fixPlayer() {

  if($(".work-preview .embed").length) {
    var player = $(".work-preview .embed");
    var url = player.attr("data-url");
    var type = player.attr("data-type");
    var height = $(".work-preview .preview .frame").height();
    var width = $(".work-preview .preview .frame").width();

    if(type==="youtube") {
      var d = '<iframe src="//www.youtube.com/embed/'+ url +'?rel=0" width="'+width+'" height="'+height+'" frameborder="0" allowfullscreen></iframe>';
      player.html(d);

    } else if (type==="vimeo") {
      var d = '<iframe src="//player.vimeo.com/video/'+ url + '?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="'+width+'" height="'+height+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
      player.html(d);
    }
  }

}

function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) 
  {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) 
      {
        return sParameterName[1];
      }
  }
}   
