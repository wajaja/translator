import React        from 'react'
import { Page }     from 'components'
import Foot         from './Foot'
import { Helmet }   from 'react-helmet'

class Home extends React.PureComponent{
    constructor(props) {
        super(props)
    }

    render() {

        return(
            <div className="hm-ctnr">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Traduction</title>
                    <link rel="canonical" href="http://mysite.com/example" />
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
