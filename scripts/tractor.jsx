'use strict'
var React = require('react')

var aBuffer = null;

// window.AudioContext = window.AudioContext || window.webkitAudioContext;
// var context = new AudioContext();

// window.AudioContext = window.AudioContext || window.webkitAudioContext;
// var myContext = new AudioContext();

var myContext;

var audioContext;
var playSoundBuffer;
var source;



function playSound() {
    source = myContext.createBufferSource();
    source.buffer = playSoundBuffer;
    source.connect(myContext.destination);
    source.loop = true;
    source.start(0);
}




module.exports = React.createClass({
    displayName: 'TractorSound',
    getInitialState:function(){
      return {
          value:"pause",
      }
    },
    stopSound: function () {
      source.stop(0);
    },
    loadSound: function() {

      myContext = this.props.context;
      var audioContext = this.props.context;
      console.log(audioContext, "audioContext");

        var request = new XMLHttpRequest();
      request.open("GET", "./media/tractor.mp3", true);
      request.responseType = "arraybuffer";
      request.onload = function() {
          audioContext.decodeAudioData(request.response, function(buffer) {
              playSoundBuffer = buffer;
              playSound();
          }, function(error) {
              console.error("decodeAudioData error", error);
          });
      };
      request.send();
    },
    clickHandler: function(){

      $(".tractor").toggleClass("pulse");
      $(".overlay").toggle();
      $(".header").toggleClass("overlayheader");

        if (this.state.value == "pause") {
          this.loadSound();
          $(".tractor").removeClass("select-collapse");
          this.setState({
             value:"play"
           })
      }
      else {
        $(".tractor").addClass("select-collapse");
          this.stopSound();
          this.setState({
            value:"pause"
      	  })
      }
    },
    componentDidUpdate: function(){

      console.log("cdu");

    },
    render: function(){
      return (
            <div className="tractor circle" value={this.state.value}  onClick={this.clickHandler}>
              </div>

      );
    }

})
