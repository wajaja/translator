import React, { Component, cloneElement } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { trans as transActions,} from 'actions'

import { Header, } from 'components'

@connect(state => ({
    header: state.Header,
}))
/**
 * AppHeader component
 */
class AppHeader extends React.PureComponent {

    /**
     * render
     * @returns markup
     */
    render() {

        const { header, router, } = this.props

        return (
            <Header {...this.props} />
        )
    }
}

/**
 * App component
 * Bootstraps application
 */
class App extends Component {

    componentWillMount() {
        // instantiate a new client (client side)
    }

    /**
     * componentDidUpdate
     * @param oldProps
     * @returns {*}
     */
    componentDidUpdate(oldProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props !== nextProps
    }

    /**
     * componentDidMount
     */
    componentDidMount() {
        const { dispatch } = this.props
    }

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <div id="root" suppressHydrationWarning={true}>
                <AppHeader />
                {this.props.children}
            </div>
        )
    }

}

export default withRouter(connect(state => ({
    tokens: state.Tokens,
}))(App))
