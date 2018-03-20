import React from 'react'
import ReactDOM from 'react-dom'
import {graphql, QueryRenderer, GraphHTTP} from 'react-relay' 
import Relay from 'react-relay'
import Main from './components/main'
// import babelRelayPlugin from '../babelRelayPlugin'

// console.log('klar til react')
// class HomeRoute extends Relay.route {
//     static routeName = 'Home'
//     static queries = {
//         store: (Component) => Relay.QL`
//             query MainQuery {
//                 store { ${Component.getFragment}}
//             }
//         `
//     }
// }

ReactDOM.render(
    <Relay.RootContainer
        Component={Main}
        
    />, // route={new HomeRoute()}
    document.getElementById("main"))
const environment = {}

// console.log(
//     <QueryRenderer
//         environment={environment}
//         query={ graphql`
//         query Test {
//             links {
//                 title
//             }
//         }
//         `}
//         variables={{}}
//         render={({error, props}) => {
//           if (error) {
//             return <div>Error!</div>;
//           }
//           if (!props) {
//             return <div>Loading...</div>;
//           }
//           return <div>User ID: {props.viewer.id}</div>;
//         }}
//     />
 
// )

/*          graphql`
    query Test {
        links {
            title
        }
    }
    `
    */
