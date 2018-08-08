import React 				from 'react';
import { connect } 			from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { LoginForm,  } 	    from 'components';


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
                <div className="hm-ctnr-a">
                    <LoginForm
                        {...this.props} />
                </div>
            </div>
        )
    }
}

////
export default withRouter(connect(state => ({
    loginState: state.form.login
}))(Login))
