import React from 'react'
import API from '../API'
import LinkStore from '../stores/LinkStore'
import PropTypes from 'prop-types'

let _getAppState = () => {
    return {links: LinkStore.getAll() }
} 

class Main extends React.Component {
    static propTypes = {
        limit: PropTypes.number.isRequired,
    }
    static defaultProps = {
        limit: 2,
    }
    state = _getAppState()
    
    componentDidMount(){
        API.fetchLinks()
        LinkStore.on("change", this.onChange)
    }
    componentWillUnmount() {
        LinkStore.removeListener("change", this.onChange)
    }
    onChange = () => {
        console.log('4. onChange')
        this.setState(_getAppState())
    }
    render() {
        const content = this.state.links
            .slice(0, this.props.limit)
            .map(link => 
            <li key={link._id}>
                <a href={link.url}>
                    {link.title}
                </a>
            </li>)
        return (
        <div>
            <h3>Bogmærker</h3>
            <ul>
                {content}
            </ul>
        </div>
        )
    }
}

export default Main