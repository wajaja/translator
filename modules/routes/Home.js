import React    from 'react'
import { Page }     from 'components'
import Foot         from './Foot'

class Home extends React.PureComponent{
    constructor(props) {
        super(props)
    }

    render() {

        return(
            <div className="hm-ctnr">
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
