import React        from 'react'
import { Page, Intervener, Room, AnimatedLoading }     from 'components'
import { Link, Route }     from 'react-router-dom'
import Foot                 from './Foot'
import { Helmet }           from 'react-helmet'

const  Interveners = ({ match, location }) => {
    const is_auth = false;
    return(
        <div className="hm-ctnr">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Activités de Traduction</title>
                <link rel="canonical" href="https://civiliser.com/interveners" />
                <meta name="description" content="XYZ-Traduction - une traduction interactive" />
                <meta property="og:title" content="Vos activités de traduction" />
                <meta property="og:url" content="https://civiliser.com/interveners" />
                <meta property="og:description" content="XYZ-Traduction - une traduction interactive" />
            </Helmet>
            <div className="hm-ctnr-a">
                <div className="hm-ctnr-b">
                    <div className="l">
                        <div className="next-ft">
                            Bientôt...
                        </div>
                        <div className="next-anim">
                            <AnimatedLoading />
                        </div>
                        <p className="par-msg">

                        </p>
                    </div>
                    <div className="r">
                        {is_auth && <div className="tp-is-auth"></div>}
                        {!is_auth &&
                            <div className="auth-lks">

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
