'use strict'
var React = require('react')
var SoundNode = require('./soundnode')

var mapSounds;
var audiocontext;

module.exports = React.createClass({
    displayName: 'SoundComponent',
    render: function(){

    var audiocontext = this.props.context;
    if (this.props.sound) {
    mapSounds = this.props.sound.map(function(sound) {
      var divBg = {  backgroundImage : "url(" + sound.bgimage + ")"  };
      var classes = "circle " + sound.id + " " + sound.title + " ";
            return (
            <SoundNode
                key={sound.id}
                title={sound.title}
                className={classes}
                style={divBg}
                id={sound.id}
                selectedsound={sound.sound}
                context={audiocontext}
              />
              );
              });
}
      return (
          <div>
            {mapSounds}
          </div>
      );
    }

})
