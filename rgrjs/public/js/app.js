var react = require('react')
var reactDOM = require('react-dom')

class Greeting extends react.Component {
    render() {
        return react.createElement("div", null, "Hallo fra react med webpack") // <h1>Hello, {this.props.name}</h1>;
    }
}

// var Hello = React.createReactClass({
//     render: function(){
//         return React.createElement("div", null, "hello from react")
//     }
// })
console.log('klar til react')
reactDOM.render(react.createElement(Greeting), document.getElementById("main"))