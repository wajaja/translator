import React            from 'react'
import Foot             from './Foot'
import { Helmet }       from 'react-helmet'

const  Privacy = ({ match, location }) => {
    return(
        <div className="hm-ctnr">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Conditions et politique d'utilisation du traducteur</title>
                <link rel="canonical" href="https://traduction.xyz/privacy" />
                <meta name="description" content="Notre politique d'utilisation" />
                <meta property="og:title" content="Condition XYZ - Traduction" />
                <meta property="og:url" content="https://traduction.xyz/privacy" />
                <meta property="og:description" content="Les conditions et la politique d'utilisation de nos services" />
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
