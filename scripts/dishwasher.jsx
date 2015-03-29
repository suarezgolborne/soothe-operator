'use strict'
var React = require('react')
var SplashScreen = require('./splashscreen')

var aBuffer = null;

window.AudioContext = window.AudioContext || window.webkitAudioContext;
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
    displayName: 'DishWasher',
    getInitialState:function(){
      return {
          value:"pause"
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
      request.open("GET", this.props.sound[0].sound, true);
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

      $('.diskmaskin').toggleClass("pulse");
      $(".overlay").toggle();
      $(".header").toggleClass("overlayheader");

        if (this.state.value == "pause") {
          $(".diskmaskin").removeClass("select-collapse");

                    this.loadSound();
          this.setState({
             value:"play"
           })
      }
      else {
        $(".diskmaskin").addClass("select-collapse");
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

      var divImage = {
        backgroundImage : "url(" + this.props.sound[0].bgimage + ")"
      };




      return (
            <div className="circle diskmaskin" style={divImage} value={this.state.value}  onClick={this.clickHandler}>
          </div>

      );
    }

})
