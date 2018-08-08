import React, { Component } from 'react'
import { Definition }  from 'components'

class DicoWord extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="">
                {!!this.props.metadata && !!this.props.metadata.defs &&
                    this.props.metadata.defs.map((data, i) => {
                        return <Definition data={data} />
                })}
            </div>
        )
    }
}

export default DicoWord
