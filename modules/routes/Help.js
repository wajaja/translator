import React            from 'react'
import { Page, Room }   from 'components'
import Foot             from './Foot'
import { Helmet }       from 'react-helmet'

const  Help = ({ match, location }) => {
    return(
        <div className="hm-ctnr">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Aide</title>
                <link rel="canonical" href="https://traduction.xyz/help" />
                <meta name="description" content="Besoin d'aide ? contactez nous" />
                <meta property="og:title" content="Contactez XYZ - traduction" />
                <meta property="og:url" content="https://traduction.xyz/help" />
                <meta property="og:description" content="XYZ - Traduction propose la traduction instantanée des textes en lingala" />
            </Helmet>
            <div className="hm-ctnr-a">
                <div className="hm-ctnr-b">
                    <div className="hlp-ctnr">
                        <div className="hlp-ctnr-1">
                            <h5>Contact</h5>
                            <p className="par">
                                Avez vous besoin d'aide ? envoyez nous un email à xyztraduction@gmail.com
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
export default Help
