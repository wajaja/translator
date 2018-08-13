import React        from 'react'
import { Page, Intervener, Room }     from 'components'
import { Link, Route }     from 'react-router-dom'
import Foot                 from './Foot'
import { Helmet }           from 'react-helmet'

const  Interveners = ({ match, location }) => {
    const is_auth = false;
    return(
        <div className="hm-ctnr">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Interveners</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
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
            <Foot
                location={location}
                />
            <Route path={`${match.url}/:room`} component={Room} />
        </div>
    )
}

////
export default Interveners
