import React from 'react'
import Relay from 'react-relay'

class Link extends React.Component {
    render() {
        let {link} = this.props
        return (
            <li>
                <a href={link.url}>
                    {link.title}
                </a>
            </li>
        )    
    }
}

Link = Relay.createFragmentContainer(Link, {
    fragments: {
        link: () => Relay.RelayQL`
            fragment on Link {
                url,
                title
            }
        `
    }
})
export default Link