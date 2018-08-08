import React        from 'react'
import { Page, Intervener, Room }     from 'components'
import { Link, Route }     from 'react-router-dom'

const  Interveners = ({ match }) => {
    const is_auth = false;
    return(
        <div className="hm-ctnr">
            <div className="hm-ctnr-a">
                <div className="hm-ctnr-b">
                    <div className="l">
                    </div>
                    <div className="r">
                        {is_auth && <div className="tp-is-auth"></div>}
                        {!is_auth &&
                            <div className="auth-lks">
                                <Link to="/login" className="login-btn">
                                    Connexion
                                </Link>
                                <Link to="/signup" className="signup-btn">
                                    Inscription
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Route path={`${match.url}/:room`} component={Room} />
        </div>
    )
}

////
export default Interveners
