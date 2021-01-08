import React 				from 'react';
import { connect } 			from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { MyLoadable }         from 'components'
import { Helmet }             from 'react-helmet'

const LoginForm = MyLoadable({
    loader: () => import('../components/login/LoginForm'),
});
const Foot = MyLoadable({
    loader: () => import('./Foot'),
});

class Login extends React.Component{
    constructor(props) {
        super(props)
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.login !== prevProps.login) {
        }
    }

    render() {

        return(
            <div className="hm-ctnr">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Login</title>
                    <link rel="canonical" href="http://civiliser.com/login" />
                    <meta name="description" content="Connectez-vous et apprenez aux internautes votre langue" />
                    <meta property="og:title" content="Connexion à XYZ - traduction" />
                    <meta property="og:url" content="https://civiliser.com/login" />
                    <meta property="og:description" content="Connectez-vous et apprenez aux internautes votre langue" />
                </Helmet>
                <div className="hm-ctnr-a">
                    <LoginForm
                        {...this.props} />
                </div>
                <Foot
                    location={this.props.location}
                    />
            </div>
        )
    }
}

////
export default withRouter(connect(state => ({
    loginState: state.form.login
}))(Login))
