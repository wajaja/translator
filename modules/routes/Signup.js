import React 				from 'react';
import { connect } 			from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { SignupForm,  } 	from 'components';


class Signup extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {

        return(
            <div className="hm-ctnr">
                <div className="hm-ctnr-a">
                    <SignupForm
                        {...this.props} />
                </div>
            </div>
        )
    }
}

export default withRouter(connect(state => ({
    signupState: state.form.signup
}))(Signup))
