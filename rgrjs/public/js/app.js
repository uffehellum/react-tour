var React = require('react')
var ReactDOM = require('react-dom')

class Greeting extends React.Component {
    render() {
        return <div>Hallo fra react med webpack med jsx</div>
    }
}

console.log('klar til react')

ReactDOM.render(<Greeting />, document.getElementById("main"))
