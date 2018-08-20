import React, { PureComponent, Fragment }   from 'react'
import { connect }  from 'react-redux'
import { MyLoadable }   from 'components'

// const LoadableThread = MyLoadable({
//     loader: () => import('components/Thread'),
// });

const Thread = ({ thread }) => {
    const { text, translated, translated_by, text_by, text_at, translated_at } = thread
    return(
        <div className="thr-ctnr">
            just an empty thread
        </div>
    )
}

class Room extends PureComponent {
    constructor() {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props !== prevProps) {
            console.log('data changed inside our component');
        }
    }

    render() {
        const me_to_others = [];
        const others_to_me = [];
        return(
            <div className="room-container">
                <div className="room-container">
                    <div className="room-lft">
                        <div className="room-lft-a">
                            {others_to_me.map(function(thread, i) {
                                return(
                                    <LoadableThread key={i} thread={thread} />
                                )
                            })}
                            {!me_to_others.length && <div> you have'nt translated for other</div>}
                        </div>
                    </div>
                    <div className="room-center">
                        <div className="room-center-a">

                        </div>
                    </div>
                    <div className="room-rght">
                        <div className="room-rght-a">
                            {me_to_others.map(function(thread, i) {
                                return(
                                    <LoadableThread key={i} thread={thread} />
                                )
                            })}
                            {!me_to_others.length && <div> you have'nt translated for other</div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    rooms: state.Rooms
}))(Room)
