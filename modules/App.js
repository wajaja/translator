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
            <div id="root">
                <AppHeader />
                {this.props.children}
                <div className="foo">
                    <div className="foo-a">
                        <div className="foo-lft">
                            <div className="foo-opt">
                                À propos de la Traduction
                            </div>
                            <div className="foo-opt">
                                Confidentialité et conditions d'utilisation
                            </div>
                        </div>
                        <div className="foo-rght">
                            <div className="foo-opt">
                                Aide
                            </div>
                            <div className="foo-opt">
                                @copyright . 2018
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(connect(state => ({
    tokens: state.Tokens,
}))(App))
