import React, { Component }     from 'react'
import { connect }              from 'react-redux'
import { withRouter }           from 'react-router'
import { Helmet }               from 'react-helmet'
import  axios                   from 'axios'
import setAuthorizationToken    from 'utils/set-authorization-token'
import { Header, }              from 'components'
import { BASE_PATH }            from 'config/api'

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

    logout() {
        axios.post( BASE_PATH + '/api/logout').then(
            res => {
                localStorage.removeItem && localStorage.removeItem('xyz_translator_token');
                setAuthorizationToken('');
                dispatch(UserActions.setUser({}));
                dispatch(TranslatorActions.setAuth(false));
                dispatch(TranslatorActions.setToken(''));
                this.props.history.push('/');
            },
            err => {
                console.log('error', err)
        })
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
                <Helmet
                    encodeSpecialCharacters={true}
                    titleTemplate="traduction.xyz - %s"
                    defaultTitle="Traduction. Français - lingala">
                        <html lang="fr-FR" />
                        <body />
                        <title>Traducteur. Français - lingala</title>
                        <meta charset="UTF-8" />
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <meta http-equiv="Content-Type" content="text/html" />
                        <meta name="viewport" content="initial-scale=1.0" />
                        <meta property="og:type" content="website" />
                        <meta property="og:image" content="https://traduction.xyz/images/xyztraduction.png" />
                        <meta property="og:site_name" content="XYZ Traduction" />
                </Helmet>
                <AppHeader
                    logout={this.logout}
                    user={this.props.user}
                    isAuthenticated={this.props.isAuthenticated}
                    />
                {this.props.children}
            </div>
        )
    }

}

export default withRouter(connect(state => ({
    user: state.User,
    access_token:   state.Translator.access_token,
    isAuthenticated: state.Translator.isAuthenticated
}))(App))
