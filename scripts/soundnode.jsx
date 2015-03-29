'use strict'
var React = require('react')

var myContext;
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
    displayName: 'SoundNode',
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
      var request = new XMLHttpRequest();
      request.open("GET", this.props.selectedsound, true);
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
      var currentDiv = "." + this.props.title;
      $(".overlay").toggle();
      $(".header").toggleClass("overlayheader");
      $(currentDiv).toggleClass("pulse");

        if (this.state.value == "pause") {
          $(currentDiv).removeClass("select-collapse");
          this.loadSound($(this));
          this.setState({
             value:"play"
           })
      }
      else {
        $(currentDiv).addClass("select-collapse");
          this.stopSound();
          this.setState({
            value:"pause"
      	  })
      }
    },
    render: function(){
      var bgcss = this.props.style.backgroundImage;
      var divBg = {  backgroundImage :  this.props.style.backgroundImage  };
      return (
        <div
          className={this.props.className}
          style={divBg}
          id={this.props.id}
          key={this.props.id}
          selectedsound={this.props.selectedsound}
          value={this.state.value}
          onClick={this.clickHandler}
        >
        </div>
            )
            ;
    }

});
