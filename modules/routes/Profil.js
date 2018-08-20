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
            <div className="hm-ctnr">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{this.props.user.firstname}</title>
                    <link rel="canonical" href={`http://www.traduction.xyz/${username}`} />
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
