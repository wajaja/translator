import React, { Component } from 'react'
import autosize from 'autosize';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete'

const Item = ({ entity: { name, char } }) => <div className="inlined">{`${name}: ${char}`}</div>;

class Editor extends Component {
    constructor(props) {
        super(props)

        // this.state = {
        //
        // }
    }

    onChange = (e) => {
        this.props.inputChange(e);
    }

    keyWasPressed = (e) => {
        this.props.onKeyUp(e.key); //e.which was deprecated
    }

    onPaste = (e) => {
        this.props.onPaste();
    }

    onCut = (e) => {
        this.props.onCut();
    }

    //current cursor position in textarea
    onCaretPositionChange = (pos) => {
        this.props.onCaretPositionChange(pos);
    }

    componentDidMount() {
       this.textarea.focus();
       autosize(this.textarea);
    }

    render() {

        const { text } = this.props,
        style = {
            boxSizing:'border-box',
            maxHeight:'230px',
            fontSize: text.length <= 100 ? '24px' : '18px'
        };
        return(
            <div className="container">
                <ReactTextareaAutocomplete
                    onKeyUp={this.keyWasPressed}
                    onPaste={this.onPaste}
                    onCut={this.onCut}

                    minChar={3}
                    className="edit-textarea"
                    onChange={this.onChange}
                    innerRef={c => this.textarea = c}
                    value={text}
                    style={style}
                    loadingComponent={() => <span>Loading</span>}
                    onCaretPositionChange={this.onCaretPositionChange}
                    trigger={{}}
                />
            </div>
        )
    }
}

export default Editor
//
//" ": {
//     dataProvider: token => {
//         return [
//             { name: "smile", char: "🙂" },
//             { name: "heart", char: "❤️" }
//         ];
//     },
//     component: Item,
//     output: (item, trigger) => item.char
// }
