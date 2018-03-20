import React from 'react'
import PropTypes from 'prop-types'
// import Relay from 'react-relay'

import { graphql, QueryRenderer } from 'react-relay';

import Link from './link'

class Main extends React.Component {
    static propTypes = {
        limit: PropTypes.number.isRequired,
    }
    static defaultProps = {
        limit: 2,
    }
    render() {
        return (
            <div>
                {graphql`
            query UserQuery {
                store {
                    linkConnection(first:2, after:"YXJyYXljb25uZWN0aW9uOjM="){
                        pageInfo {
                            hasNextPage
                        }
                        edges {
                            cursor
                            node {
                            id
                            title    
                                url
                            }
                        }      
                    }
                }  
            }
            `}
            </div>
        )
        // return (
        //     <QueryRenderer
        //         environment={environment}
        //         query={graphql`
        //     query UserQuery {
        //         store {
        //             linkConnection(first:2, after:"YXJyYXljb25uZWN0aW9uOjM="){
        //                 pageInfo {
        //                     hasNextPage
        //                 }
        //                 edges {
        //                     cursor
        //                     node {
        //                     id
        //                     title    
        //                         url
        //                     }
        //                 }      
        //             }
        //         }  
        //     }
        //     `}
        //         variables={{}}
        //         render={({ error, props }) => {
        //             if (error) {
        //                 return <div>Error!</div>;
        //             }
        //             if (!props) {
        //                 return <div>Loading...</div>;
        //             }
        //             return <div>User ID: {props.viewer.id}</div>;
        //         }}
        //     />)


        // const content = this.props.store.links
        //     .slice(0, this.props.limit)
        //     .map(link => <Link key={link._id} link={link} />)
        // return (
        // <div>
        //     <h3>Bogmærker</h3>
        //     <ul>
        //         {content}
        //     </ul>
        // </div>
        // )
    }
}

// Main = Relay.createFragmentContainer(Main, {
//     fragments: {
//         store: () => RelayQL`
//             fragment on Store {
//                 links {
//                     _id,
//                     ${Link.getFragment('link')}
//                 }
//             }
//         `
//     }
// })
export default Main