import React            from 'react'
import { Link }         from 'react-router'
import Foot             from './Foot'
import { Helmet }       from 'react-helmet'

class Profil extends React.Component{

    constructor(props){
        super(props)

        this.state = {

        }
    }

    render() {
        const username = 'test';
        return(
            <div className="hm-ctnr container">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{this.props.user.firstname}</title>
                    <link rel="canonical" href={`https://civiliser.com/${username}`} />
                    <meta name="description" content={`Profile de ${username}`} />
                    <meta property="og:title" content={`Profile de ${this.props.user.firstname} sur XYZ - traduction`} />
                    <meta property="og:url" content={`https://civiliser.com/${username}`} />
                    <meta property="og:description" content="XYZ - Traduction" />
                </Helmet>
                <div className="hm-ctnr-a">
                    this is a user profile
                </div>
                <Foot
                    location={this.props.location}
                    />
            </div>
        )
    }
}

export default Profil;
