import React 				from 'react';
import { connect } 			from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { SignupForm,  } 	from 'components';
import Foot                 from './Foot'
import { Helmet }           from 'react-helmet'


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
