import React 				from 'react';
import { connect } 			from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { MyLoadable }       from 'components'
import { Helmet }             from 'react-helmet'

const SignupForm = MyLoadable({
    loader: () => import('../components/signup/SignupForm'),
});
const Foot = MyLoadable({
    loader: () => import('./Foot'),
});

class Signup extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {

        return(
            <div className="hm-ctnr">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Signup</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
                <div className="hm-ctnr-a">
                    <SignupForm
                        {...this.props} />
                </div>
                <Foot
                    location={this.props.location}
                    />
            </div>
        )
    }
}

export default withRouter(connect(state => ({
    signupState: state.form.signup
}))(Signup))
