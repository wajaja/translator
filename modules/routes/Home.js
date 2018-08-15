import React, { Component }    from 'react'
import { Page }     from 'components'
import Foot         from './Foot'
import { Helmet }   from 'react-helmet'

class Home extends Component{
    constructor(props) {
        super(props)
    }

    render() {

        return(
            <div className="hm-ctnr">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>XZY . traduction français - lingala</title>
                    <link rel="canonical" href="http://www.traduction.xyz" />
                </Helmet>
                <div className="hm-ctnr-a">
                    <Page
                        {...this.props} />
                </div>
                <Foot
                    location={this.props.location}
                    />
            </div>
        )
    }
}

////
export default Home
