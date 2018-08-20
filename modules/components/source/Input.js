import React             from 'react'
import MyLoadable    from '../MyLoadable'

const Editor = MyLoadable({
    loader: () => import('./Editor'),
});
const Suggestions = MyLoadable({
    loader: () => import('./Suggestions'),
});
const DicoWord = MyLoadable({
    loader: () => import('./DicoWord'),
});

class Input extends React.PureComponent{
    constructor(props) {
        super(props)
    }

    render() {
        const { text, results } = this.props

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
                <div className="inp-othr">
                    <div className="inp-mdl">
                        <Suggestions
                            {...this.props}
                            text={text}
                            handleClick={this.props.handleSuggestionClick}
                            />
                    </div>
                    <div className="inp-btm">
                        <DicoWord
                            {...this.props}
                            text={text}
                            metadata={metadata}
                            />
                    </div>
                </div>
            </div>
        )
    }
}

export default Input;
