import React, { Component } from 'react'
import MyLoadable    from '../MyLoadable'

const Definition = MyLoadable({
    loader: () => import('../Definition'),
});

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
