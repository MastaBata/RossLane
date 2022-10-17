var fakingscroll = false;
var firstload = true;

var throttle = 200; // .5 seconds scroling delay
var time = -1;

var loadprc = 0;
var loadstart = 0;
var dwidth = $(window).width();
var dheight = $(window).height();

var menustep = 221;
var loadtop_start = 95;
var loadbottom_start = 190;
if(dwidth<768 && dheight>dwidth) { // mobile mode portrait orientation
  menustep = 60;
  loadtop_start = 30;
  loadbottom_start = menustep;
}
else if(dwidth>800 && dwidth<1250) {
  menustep = 125;
  loadtop_start = 62.5;
  loadbottom_start = menustep;
}

var loadtop = (dheight/2)-loadtop_start;
var loadbottom = loadtop+loadbottom_start;
$("#main-loader .mask").css({"clip":"rect("+loadtop+"px, 0px, "+loadbottom+"px, 0px)", "display":"block"});
$("#list-2-container").css({"clip": "rect("+loadtop+"px, "+dwidth+"px, "+loadbottom+"px, 0px)"});
$("#main-loader h2").css({"transform":"translateY("+loadtop+"px)"});

var menuscroll = 0;


// if(anchors === undefined || !anchors) var anchors = ['ADAM&DAVE','Nono_Ayuso','Trevor_Cornish'];
if(anchors === undefined || !anchors) var anchors = ['MARKETING_STRATEGY', 'COMMERCIALS', 'ENTERTAINMENT', 'SOCIAL_MEDIA', 'INFOMERCIALS', 'BRAND_VIDEOS', 'TRAILERS', 'VFX'];


$(document).ready(function() {
  $('#fullpage').pagepiling({
    anchors: anchors,
    // direction: 'vertical', //
    scrollingSpeed: 200, //

    // easing: 'linear', //
    css3: true, //
    verticalCentered: true,
    navigation: false,
    afterRender: function() {
      // start on scroll begin
      // $(".active").css("transform","translate3d(0px, -100%, 0px)");
      // console.log("1");
      $("#list-1 li:nth-child(1)").addClass("active");
      $("#list-2 li:nth-child(1)").addClass("active");
    },
    onLeave: function(index, nextIndex, direction) {
      $("#fullpage video").trigger('pause');

      var mswing = 0.1;
      if(direction=="down") {
        menuscroll = menuscroll-menustep;
        mswing = -0.1;
      }
      else menuscroll = menuscroll+menustep;

      if(dwidth<768) mswing = 0;

      $("#list-1").css("transform","matrix(1, "+mswing+", 0, 1, 0, "+menuscroll+")");
      $("#list-2").css("transform","matrix(1, "+mswing+", 0, 1, 0, "+menuscroll+")");

      close_play_slider();
      // console.log("2");
    },
    afterLoad: function(anchorLink, index) {
      $(".active").find("video").trigger('play');
      if(firstload) {
        menuscroll = -(menustep*(index-1)); // fix menu position if first load from different hash if(index>2 && menuscroll==-menustep)
        firstload = false;
        // console.log("boom");
      }
      $("#list-1").css("transform","matrix(1, 0, 0, 1, 0, "+menuscroll+")");
      $("#list-2").css("transform","matrix(1, 0, 0, 1, 0, "+menuscroll+")");
      $("#all-list li.active").removeClass("active");
      $("#list-1 li:nth-child("+index+")").addClass("active");
      $("#list-2 li:nth-child("+index+")").addClass("active");

      // console.log("3");
      if(dwidth>780 && dheight<dwidth) $.fn.pagepiling.setAllowScrolling(false);
    }
  });

  // --------------------------------------------------------->

  $("#list-1").css("top", (dheight/2)-(menustep/2)+"px");
  $("#list-2").css("top", (dheight/2)-(menustep/2)+"px");

  var bgVideoNum = $(".section video").length;
  var loadBgVideo = 0;
  var loadpart = Math.round(90/bgVideoNum);

  var counter=setInterval(countdown, 200);

  var vtype = 'video/mp4';
  if(supportsVideoType('webm') === "probably") vtype = 'video/webm';

  $(".section video").each(function(){
      var file = $(this).find("source[type='"+vtype+"']").attr('src');
      video_preload(file, this, vtype, function(){
        loadBgVideo++;
        // console.log(file+" is loaded");
        loadprc=loadprc+loadpart;
        if(loadBgVideo>=bgVideoNum) {
          // $("h1").first().html("ROSSLANE");
          loadprc=100;
          clearInterval(counter);
          // $("#main-loader .loaderbg").hide();
          $("#main-loader .mask").css("clip", "rect("+loadtop+"px, "+dwidth+"px, "+loadbottom+"px, 0px)");

          setTimeout(function() {
            $("#main-loader .mask").css("clip", "rect("+loadtop+"px, "+dwidth+"px, "+loadbottom+"px, "+(dwidth-10)+"px)");
            setTimeout(function() {
              $(".active").find("video").trigger('play');
              $.fn.pagepiling.setAllowScrolling(true);
              $("#main-loader").hide();
            }, 500); //
            console.log("Done!");
          }, 1000); // remove in release

          // start popupCall window after 90s
          setTimeout(function() {
            $("#Contact").hide();
            $("#popupCall").show();
            openpop();
          }, 90000)

        }
      });
  });

  $("#list-1 p").on("click", function(){
    firstload = true;
    location.hash = $(this).attr("data-url");
  });

  contactPop();

  $(".close").on("click", function() {
    var id = $(this).attr("data-id");
    $("#"+id).hide();
    closepop();
  });


  $(document).bind('mousewheel', function(e){ // add speedy scrolling

    if(!fakingscroll)
    {
        var now = Date.now() // Current time, in milliseconds scroling delay
        if (time !== -1 && now - time < throttle)
        return; // Get out, we haven't waited long enough
        time = now;

        if(firstload) firstload=false; //first load first menu item scroll position clear

        $.fn.pagepiling.setAllowScrolling(false);
        if(e.originalEvent.wheelDelta /120 > 0) {
            $.fn.pagepiling.moveSectionUp();
        }
        else{
            $.fn.pagepiling.moveSectionDown();
        }
    }
  });


  document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        // var zzz = 0;
        // var int = setInterval(function(){
        //   $.fn.pagepiling.moveSectionDown();
        //   zzz++;
        //   if(zzz==10) clearInterval(int);
        // }, 100);
        $("#Contact").hide();
        $("#popupCall").show();
          openpop();
    }
  }
// end document ready
});

function video_preload(file, tag, vtype, callback) {

  // iphone bug fix
  var isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);
  if(isSafari && dwidth<768) {
    $(tag).remove();
    callback();
    return false;
  }

  var req = new XMLHttpRequest();
  req.open('GET', file, true);
  req.responseType = 'blob';

  req.onload = function() {
     if (this.status === 200) {
        var videoBlob = this.response;
        var vid = URL.createObjectURL(videoBlob);// IE10+
        $(tag).find("source[type='"+vtype+"']").attr('src', vid);
        callback();
     }
  }
  req.onerror = function(e) {
     console.log(e);
     callback();
  }
  req.send();
}


function supportsVideoType(type) {
  var video;
  var formats = {
    ogg: 'video/ogg; codecs="theora"',
    h264: 'video/mp4; codecs="avc1.42E01E"',
    webm: 'video/webm; codecs="vp8, vorbis"',
    vp9: 'video/webm; codecs="vp9"',
    hls: 'application/x-mpegURL; codecs="avc1.42E01E"'
  };
  if(!video) {
    video = document.createElement('video')
  }
  return video.canPlayType(formats[type] || type);
}

function countdown() {

  if(loadstart>loadprc) return false;

  if(loadstart<100) loadstart++
  else loadstart=100;

  var maskw = dwidth*(loadstart/100);
  // $("h1").first().html(loadstart+"%");
  $("#main-loader .mask").css("clip", "rect("+loadtop+"px, "+maskw+"px, "+loadbottom+"px, 0px)");
}


function openpop() {
  fakingscroll = true;
  $("#main-content .active").addClass("blur");
  $(".main-nav, #rightSideBar, .contact-btn").hide();
}
function closepop() {
  fakingscroll = false;
  $("#main-content .active").removeClass("blur");
  $(".main-nav, #rightSideBar, .contact-btn").show();
}
function contactPop() {
  $(".contact-btn").on("click", function() {
    $("#Contact").show();
    openpop();
  });
  $("#Contact .close-wraper").on("click", function() {
    $("#Contact").hide();
    closepop();
  });
}
