import React            from 'react'
import { Page, Room }   from 'components'
import Foot             from './Foot'
import { Helmet }       from 'react-helmet'

const  About = ({ match, location }) => {
    return(
        <div className="hm-ctnr container">
            <Helmet>
                <meta charSet="utf-8" />
                <title>A propos de XYZ - traduction</title>
                <link rel="canonical" href="https://civiliser.com/about" />
                <meta name="description" content="A propos de XYZ-Traduction" />
                <meta property="og:title" content="A propos de XYZ - traduction" />
                <meta property="og:url" content="https://civiliser.com/about" />
                <meta property="og:description" content="XYZ - Traduction propose la traduction instantanée des textes en lingala" />
            </Helmet>
            <div className="hm-ctnr-a">
                <div className="hm-ctnr-b">
                    <div className="abt-ctnr">
                        <div className="abt-ctnr-1">
                            <h5>A propos du traducteur</h5>
                            <p className="par">
                                Ce projet permet de mobiliser, autour d'une plateforme de messagerie instantanée,
                                une puissante activité de recherche en équipe, donc à plusieurs, et de coopération scientifique
                                interculturelle en vue de produire des bases linguistiques dont l'utilité paraît évidente
                                pour la communication, la vie professionnelle et la participation aux programmes de
                                développement mais aussi pour la valorisation et la crédibilisation des langues nationales.
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
export default About
