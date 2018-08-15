import React, { Component, cloneElement } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import setAuthorizationToken from 'utils/set-authorization-token'
import { trans as transActions,} from 'actions'
import { Header, } from 'components'

@connect(state => ({
    header: state.Header,
}))
/**
 * AppHeader component
 */
class AppHeader extends Component {

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

    componentWillMount () {
        const { dispatch, access_token } = this.props;
        if(access_token) {
            setAuthorizationToken(access_token);
        }
    }

    componentDidMount() {
        const { dispatch, access_token } = this.props;
        if(access_token) {
            setAuthorizationToken(access_token);
        }
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
    user: state.User,
    access_token:   state.Translator.access_token,
}))(App))
