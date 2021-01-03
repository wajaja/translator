import React             from 'react'
import MyLoadable    from '../MyLoadable'

const Editor = MyLoadable({
    loader: () => import('./Editor'),
});

class Input extends React.PureComponent{
    constructor(props) {
        super(props)
    }

    render() {
        const { text, results, metadatas } = this.props

        let result = results && results[0] ? results[0] : {}; //array
        let metadata = {};
        for (var prop in result) {
            //!== empty string
            // if (result.hasOwnProperty(prop) && prop) {
            //     metadata['defs'].concat(result[prop].def)
            //     metadata['exs'].concat(result[prop].ex)
            // }
        }

        return(
            <div className="inp-ctnr">
                <div className="inp-tp">
                    <Editor
                        {...this.props}
                        text={text}
                        onCut={this.props.onCut}
                        onKeyUp={this.props.onKeyUp}
                        onPaste={this.props.onPaste}
                        inputChange={this.props.inputChange}
                        onCaretPositionChange={this.props.onCaretPositionChange}
                        />
                </div>
            </div>
        )
    }
}

export default Input;
