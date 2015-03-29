'use strict'
var React = require('react')
var SoundComponent = require('./soundcomponent')
var SplashScreen = require('./splashscreen')
var SoundNode = require('./soundnode')

var splash;
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var myContext = new AudioContext();
var isUnlocked = false;

var soundArray;


module.exports = React.createClass({
    displayName: 'FrontPage',
    getInitialState:function(){
      return {
        soundContext: null,
        data: null
      }
    },
    componentDidUpdate:function(){
      soundArray = this.state.data;
    },
    componentDidMount:function(){
    $.ajax({
     url: this.props.soundurl,
     dataType: 'json',
     success: function(data) {
       this.setState({data: data});
     }.bind(this),
     error: function(xhr, status, err) {
       console.error(this.props.soundurl, status, err.toString());
     }.bind(this)
   });
      this.setState({
        soundContext: myContext
      })
          },
    render: function(){
      var start;
      if (Modernizr.touch) {
        start =
        <div className="container">
          <SplashScreen context={this.state.soundContext} />
          <div className="overlay"></div>
          <div className="header">Soothe Operator</div>
          <div className="sounds">
            <SoundComponent sound={this.state.data} context={this.state.soundContext}/>
          </div>
        </div>
      }
      else {
         start =
         <div className="container">
          <div className="overlay">
          </div>
          <div className="header">Soothe Operator
          </div>
          <div className="sounds">
            <SoundComponent sound={this.state.data} context={this.state.soundContext}/>
          </div>
        </div>
        }
      return (
          <div>
          {start}
          </div>
        )
    }
})
