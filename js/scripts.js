$(document).ready(function(){
  $('#mediaplayer').mediaelementplayer({
    pluginPath: "https://cdn.jsdelivr.net/mediaelement/4.1.0/mediaelement.min.js",
    shimScriptAccess: 'always',
    stretching: 'responsive',
    success: function(mediaElement, originalNode) {
      function highlightCaption(spanValue) {
        var targetSpan = document.getElementsByClassName(spanValue);

        if ($(targetSpan).hasClass("highlighted")) {

        } else {
          $("span").removeClass("highlighted");
          $(targetSpan).addClass("highlighted");
        }
      }

      function toSeconds(time) {
        var timeSplit = time.split(':');
        var timeInSeconds = (timeSplit[0]*360 + timeSplit[1]*60 + timeSplit[2]*1);
        return timeInSeconds;
      }

      var playerId = $('#mediaplayer').closest('.mejs__container').attr('id');
      var player = mejs.players[playerId];
      var j = 0;
      var lastCurrentTime = 0;
      var timeArray = ["00:00:00", "00:00:04.130","00:00:07.535","00:00:11.270","00:00:13.960","00:00:17.940","00:00:22.370","00:00:26.880","00:00:30.920","00:00:34.730","00:00:39.430","00:00:41.190","00:00:46.300","00:00:49.270","00:00:53.760","00:00:57.780","00:01:00.150"];

      $(".subtitle-transcript").on("click", function(e){
        var clickTargetIndex  = $(this).find("span").index($(e.target));

        highlightCaption("caption" + clickTargetIndex)
        player.setCurrentTime(toSeconds(timeArray[clickTargetIndex]));

        player.play();

        console.log(toSeconds(timeArray[clickTargetIndex]));
      })

      mediaElement.addEventListener('timeupdate', function(){

        if(player.getCurrentTime() >= lastCurrentTime) {
          lastCurrentTime = player.getCurrentTime();

          if(player.getCurrentTime() <= toSeconds(timeArray[j])) {
            highlightCaption("caption-" + (j));
          } else {
            j += 1;
          }
        } else {
          j = 0;
          lastCurrentTime = 0;
        }

      })
    }
  });

});
