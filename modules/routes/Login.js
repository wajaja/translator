import React 				from 'react';
import { connect } 			from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { LoginForm,  } 	    from 'components';
import Foot                 from './Foot'
import { Helmet }           from 'react-helmet'

class Login extends React.Component{
    constructor(props) {
        super(props)
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.login !== prevProps.login) {
            console.log('data changed');
        }
    }

    render() {

        return(
            <div className="hm-ctnr">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Login</title>
                    <link rel="canonical" href="http://mysite.com/example" />
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
