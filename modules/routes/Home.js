import React, { Component }    from 'react'
import { Helmet }             from 'react-helmet'
import { MyLoadable }         from 'components'

const Page = MyLoadable({
    loader: () => import('../components/Page'),
});
const Foot = MyLoadable({
    loader: () => import('./Foot'),
});

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
