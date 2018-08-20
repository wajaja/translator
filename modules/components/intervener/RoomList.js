import React, { Fragment }  from 'react'
import { connect }      from 'react-redux'
import { MyLoadable }   from 'components'

// const LoadableRoom = MyLoadable({
//     loader: () => import('components/Room'),
// });

const default_list = [
    'Lingala -> Français', 'Français -> Lingala',
    'Tshiluba -> Français', 'Français -> Tshiluba',
    'Sango -> Français', 'Français -> Sango',
    'Kikongo -> Français', 'Français -> Kikongo',
    'Swahili -> Français', 'Français -> Swahili',
    'Anglais -> Français', 'Français -> Anglais',
    'Lingala -> Anglais', 'Anglais -> Lingala',
    'Swahili -> Anglais', 'Anglais -> Swahili',
    'Kikongo -> Anglais', 'Anglais -> Kikongo',
    'Tshiluba -> Anglais', 'Anglais -> Tshiluba',
];

class RoomList extends React.PureComponent{

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    roomClicked = (room) => {
        let key = 'public';
        url = room.replace(' -> ', '_').toLowerCase();
        if(this.state.is_conected) {
            key = this.props.user.id;
        }
        this.props.history.push(`/interveners/${url}`);
    }

    render() {
        const list = this.props.list || default_list;
        return(
            <div className="room-list">
                <div className="room-list-a">
                    <div className="room-list-hd">
                        <Fragment>
                            <input type="text" className="inp-sh-room" />
                            <div className="search-icon"></div>
                        </Fragment>
                    </div>
                    <div className="room-list-bd">
                        <Fragment>
                            {list.map(function(room, i) {
                                return(
                                    <div key={i} className="room-lk" onClick={() => this.roomClicked(room)}>
                                        {room}
                                    </div>
                                )
                            })}
                        </Fragment>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    list: state.Languages,
    user: state.User,
}))(RoomList);
