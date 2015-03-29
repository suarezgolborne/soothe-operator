'use strict'
var React = require('react')

var FrontPage = require('./Frontpage')

React.render(<FrontPage soundurl="./media/sounds.json" />, document.getElementById('content'))
