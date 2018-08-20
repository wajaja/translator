import React            from 'react'
import Foot             from './Foot'
import { Helmet }       from 'react-helmet'

const  Privacy = ({ match, location }) => {
    return(
        <div className="hm-ctnr">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Aide</title>
                <link rel="canonical" href="http://www.traduction.xyz/privacy" />
            </Helmet>
            <div className="hm-ctnr-a">
                <div className="hm-ctnr-b">
                    <div className="priv-ctnr">
                        <div className="priv-ctnr-1">
                            <h5>Politique d'utilisation</h5>
                            <p className="par">
                                A venir ...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Foot
                location={location}
                />
        </div>
    )
}

////
export default Privacy
