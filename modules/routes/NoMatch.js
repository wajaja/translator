import React            from 'react'
import { Page, Room }   from 'components'
import Foot             from './Foot'
import { Helmet }       from 'react-helmet'

const  NoMatch = ({ match, location }) => {
    return(
        <div className="hm-ctnr">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Error</title>
                <link rel="canonical" href={`http://www.traduction.xyz/${match.url}`} />
            </Helmet>
            <div className="hm-ctnr-a">
                <div className="hm-ctnr-b">
                    <div className="no-m-ctnr">
                        <div className="no-m-ctnr-1">
                            <h5>Url Error</h5>
                            <p className="par">
                                Cette page n'existe pas
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
export default NoMatch
