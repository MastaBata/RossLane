<!-- <link rel="stylesheet" type="text/css" href="css/slider.css" /> -->

<div id="rightSideBar">
  <div class="SideBar">
    <div class="SideBar-content">
      <!-- vertical Red line -->
      <div id="markerSideBar"></div>
      <div class="scroll-point">
        <div class="prev-button">Adam & Dave</div>
        <span>
          <div class="RealisationGroup cursor-default" >
            <ul class="RealisationUl">
              <li class="Realisation cursor-play preview">
                <div class="content-container">
                  <div class="content">
                    <h3>NSS</h3>
                    <h2>Nss video</h2>
                  </div>
                </div>
                <div class="placeholder" style="background-image: url('img/videos/nss.jpg');" style="display:none"></div>
                <video type="video/mp4" muted="muted" loop="loop" preload="auto" src="media/preview/nss_preview.mp4" class="thumb-preview" style="display: none;"></video>
                <!-- videoplayer -->
                <div class="video-player" style="display:none">
                  <video preload="none" controls controlsList="nodownload" loop>
                    <source src="media/full/nss.mp4" type="video/mp4">
                    <source src="media/full/nss.webm" type="video/webm">
                  </video>
                </div>
                <!-- videoplayer -->
              </li>
              <li class="Realisation cursor-play preview">
                <div class="content-container">
                  <div class="content">
                    <h3>RUN</h3>
                    <h2>Run video</h2>
                  </div>
                </div>
                <div class="placeholder" style="background-image: url('img/videos/run.jpg');"></div>
                <video type="video/mp4" muted="muted" loop="loop" preload="auto" src="media/preview/run_preview.mp4" class="thumb-preview" style="display: none;"></video>
                <!-- videoplayer -->
                <div class="video-player" style="display:none">
                  <video preload="none" controls controlsList="nodownload" loop>
                    <source src="media/full/run.mp4" type="video/mp4">
                    <source src="media/full/run.webm" type="video/webm">
                  </video>
                </div>
                <!-- videoplayer -->
              </li>
              <li class="Realisation cursor-play preview">
                <div class="content-container">
                  <div class="content">
                    <h3>Zodiac</h3>
                    <h2>Zodiac video</h2>
                  </div>
                </div>
                <div class="placeholder" style="background-image: url('img/videos/zodiac.jpg');"></div>
                <video type="video/mp4" muted="muted" loop="loop" preload="auto" src="media/preview/zodiac_preview.mp4" class="thumb-preview" style="display: none;"></video>
                <!-- videoplayer -->
                <div class="video-player" style="display:none">
                  <video preload="none" controls controlsList="nodownload" loop>
                    <source src="media/full/zodiac.mp4" type="video/mp4">
                    <source src="media/full/zodiac.webm" type="video/webm">
                  </video>
                </div>
                <!-- videoplayer -->
              </li>
              <li class="Realisation next-group cursor-pointer" style="background-image: url('img/videos/Vignette-négatif-badass-Madrid.jpg');">
                <div class="next-container">
                  <div class="next-content">
                    <span>next director</span>
                    <h2>Nono Ayuso</h2>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="RealisationGroup cursor-default" style="display: none;">
          </div>
        </span>
      </div>
    </div>
  </div>
</div>

<script>
$(document).ready(function() {
  $('#rightSideBar').mouseover(function() {
    if(!$("#rightSideBar").hasClass("wide")) {
      fakingscroll = true;
      $(this).addClass("hover");
    }
  });
  $('#rightSideBar').mouseout(function() {
    if(!$("#rightSideBar").hasClass("wide")) {
      fakingscroll = false;
      $(this).removeClass("hover");
    }
  });

  // add to mobile width
  // $('#rightSideBar').on("swipeleft", function() {
  //   $(this).addClass("hover");
  // });
  // $('#rightSideBar').on("swiperight", function() {
  //   close_play_slider();
  //   $("#rightSideBar.hover").removeClass("hover");
  // });
// ---------------------------------
  $('#rightSideBar .preview').mouseover(function() {
    if($(this).hasClass("preview")) {
      $(this).find(".thumb-preview").show();
      $(this).find(".thumb-preview").trigger('play');
    }
  });
  $('#rightSideBar .preview').mouseout(function() {
    if($(this).hasClass("preview")) {
      $(this).find(".thumb-preview").trigger('stop');
      $(this).find(".thumb-preview").hide();
    }
  });
// -----------------------------------
  $('#rightSideBar .preview').on("click", function() {
    if($(this).hasClass("preview")) {
      fakingscroll = true;
      $('#rightSideBar .preview').addClass("play");
      $('#rightSideBar .preview .thumb-preview').hide();
      $('#rightSideBar .preview').removeClass("preview");
      if(dwidth>768) {
        $("#rightSideBar").addClass("wide");
        $("#all-list").css({"transform":"translate3d(0px, 0px, 0px) scale(0.5, 0.5)"});
        $("#markerSideBar").css({"transform":"translate(-100%, -50%) scale(1, 0.5)"});
      }
      $(this).find(".video-player").show();
      $(this).find(".video-player video").addClass("active");
      $("#main-content .active video").trigger('pause');
      $("#main-content .active").addClass('blur');
      $("#fullpage").addClass('cursor-close');
      $("#rightSideBar .video-player .active").trigger('play');
      // var dindex = -($(this).index()*$(this).height());
      // var umtop = parseFloat($("#SideBar .RealisationUl").css("margin-top"));
      // var utop = Math.abs($("#SideBar .RealisationUl").position().top);
      // var uheight = parseFloat($("#SideBar .RealisationUl").css("height"));
      // var dindex = (0-umtop)+($(window).height()/2)-($(this).height()/2)-($(this).height()*$(this).index())+utop;
      // $("#SideBar .RealisationUl").css({"transform":"translateY("+dindex+"px)", "height":dindex-uheight+"px"});
      var scmargin = parseFloat($(this).css("margin-bottom"));
      var sctop = ($(this).height()*$(this).index())+(scmargin*$(this).index());
      if(dwidth>768) document.querySelector("#rightSideBar > div > div > div.scroll-point").scrollTop=sctop;
    }
  });

  $("#fullpage").on("click", "*:not(#all-list)", function() {
    close_play_slider();
  });

  $(".Realisation").on("click", function(){
    if($(this).hasClass("play")) {
      $(this).find(".video-player").show();
      video_player_play(this);
      // console.log("li_click");
    }
  });

  $(".Realisation .video-player video").on("click", function(e){
    // return false;
    e.preventDefault();
    // var parent = $(this).parents( "li" );
    // video_player_play(parent);
    // console.log("vp_click");
  });

  $(".prev-button").on("click", function(){
    close_play_slider();
    $("#rightSideBar.hover").removeClass("hover");
  });

// end document ready
});

function close_play_slider() {
  fakingscroll = false;
  $('#rightSideBar .play').addClass("preview");
  $("#rightSideBar .cursor-pause .video-player video").trigger('pause');
  $("#rightSideBar .cursor-pause").addClass('cursor-play');
  $("#rightSideBar .cursor-pause").removeClass('cursor-pause');
  $("#rightSideBar .video-player").hide();
  $("#rightSideBar .video-player .active").removeClass("active");
  if(dwidth>768) $("#rightSideBar").removeClass("wide");
  $("#all-list").removeAttr("style");
  $("#SideBar .RealisationUl").removeAttr("style");
  $("#markerSideBar").removeAttr("style");
  $("#main-content .blur").removeClass('blur');
  $("#main-content .active video").trigger('play');
  $('#rightSideBar .play').removeClass("play");
  $("#fullpage").removeClass('cursor-close');
}

function video_player_play(el) {
  var pstaus=false;
  if(!$(el).hasClass("cursor-pause")) pstaus = true;

  $(".cursor-pause .video-player video").trigger('pause');
  $(".cursor-pause").addClass('cursor-play');
  $(".cursor-pause").removeClass('cursor-pause');

  if(pstaus) {
    $(el).find(".video-player").find("video").trigger('play');
    $(el).addClass('cursor-pause');
    $(el).removeClass('cursor-play');
    // console.log($(el).index()+"play");
  }
}
</script>
