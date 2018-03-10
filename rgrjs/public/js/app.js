console.log(React)

class Greeting extends React.Component {
    render() {
        return React.createElement("div", null, "hello from react") // <h1>Hello, {this.props.name}</h1>;
    }
}

// var Hello = React.createReactClass({
//     render: function(){
//         return React.createElement("div", null, "hello from react")
//     }
// })

ReactDOM.render(React.createElement(Greeting), document.getElementById("main"))