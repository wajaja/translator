import React            from 'react'
import { Page, Room }   from 'components'
import Foot             from './Foot'
import { Helmet }       from 'react-helmet'

const  Privacy = ({ match, location }) => {
    return(
        <div className="hm-ctnr">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Aide</title>
                <link rel="canonical" href="http://www.traduction.xyz/help" />
            </Helmet>
            <div className="hm-ctnr-a">
                <div className="hm-ctnr-b">
                    <div className="priv-ctnr">
                        <div className="priv-ctnr-1">
                            <h5>Politique d'utilisation</h5>
                            <p className="par">
                                Avez vous besoin d'aide ? envoyez nous un email à traduction_xyz@gmail.com
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
