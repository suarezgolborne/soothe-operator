'use strict'

// window.AudioContext = window.AudioContext || window.webkitAudioContext;
// var myContext = new AudioContext();
var isUnlocked = false;

var myContext;
module.exports = React.createClass({
    displayName: 'SplashScreen',
    unlock: function() {
        console.log("unlock");
      //  $(".splash").css("display", "none");
        $(".splash").fadeOut();

    	   if(this.unlocked)
    		 return;
        myContext = this.props.context;
    	  var buffer = myContext.createBuffer(1, 1, 22050);
    	  var source = myContext.createBufferSource();
    	  source.buffer = buffer;
    	  source.connect(myContext.destination);
    	  source.start(0);

    	// by checking the play state after some time, we know if we're really unlocked
    	setTimeout(function() {
    		if((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
    			isUnlocked = true;
          console.log(isUnlocked);
    		}
    	}, 0);
    },
    clickHandler: function(){
      this.unlock();
    },
    componentDidUpdate:function(){
      console.log(isUnlocked, "cdu");
    },

    render: function(){
    console.log(isUnlocked);
        return(

        <div className="splash" onClick={this.clickHandler}>
          <div className="header title">Soothe Operator</div>
          <div className="header start">Start</div>
        </div>
);
        }
});
