'use strict'
var React = require('react')

var FrontPage = require('./Frontpage')

React.render(<FrontPage soundurl="http://www.suarezgolborne.se/wp-json/posts?type=soothe" />, document.getElementById('content'))
