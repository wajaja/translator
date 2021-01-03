import React, { Component } from 'react'
import MyLoadable    from '../MyLoadable'

const Definition = MyLoadable({
    loader: () => import('../Definition'),
});

class DicoWord extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log(this.props.metadatas)
    }

    componentDidUpdate(prevProp, prevState) {
        if(prevProp.metadatas !== this.props.metadatas) {
            console.log(this.props.metadatas)
        }
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
