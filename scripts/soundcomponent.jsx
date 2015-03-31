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
      var divBg = {  backgroundImage : "url(" + sound.meta.image + ")"  };
      var classes = "circle " + sound.id + " " + sound.title + " ";
            return (
            <SoundNode
                key={sound.ID}
                title={sound.title}
                className={classes}
                style={divBg}
                id={sound.ID}
                selectedsound={sound.meta.sound}
                context={audiocontext}
              />
              );
              });
}
      return (
          <div className="centersounds">
            {mapSounds}
          </div>
      );
    }

})
