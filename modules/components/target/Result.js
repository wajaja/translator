import React, { Component, Fragment } from 'react'

class Result extends Component {
    constructor(props) {
        super(props)
    }

    handlePhraseDbClick = (e) => {
        console.log('handlePhraseClick', e.target, e.currentTarget);
    }

    onKeyPressed = (e) => {
        console.log('onKeyPressed', e.target, e.currentTarget);
        if(e.keyCode == 13){
            e.preventDefault();
            console.log(e.target.innerText)
            const type = e.target.getAttribute('data-type')
            const translated = e.target.innerText
            const source = e.target.getAttribute('source-phrase') || e.target.getAttribute('source-word')
            this.props.editTranslated(type, source, translated)
            e.target.blur()
        }
    }

    onFocus = (e) => {
        console.log('onKeyPressed', e.target, e.currentTarget);
        e.preventDefault();
        console.log(e.target.innerText)
        const editableWpr = e.target;
        const editableMeta =e.target.getElementsByClassName('editable-meta')[0];

        const source = e.target.getAttribute('source-phrase') || e.target.getAttribute('source-word')
        console.log(editableMeta)
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.props.results !== nextProps.results;
    // }
    //.replace(/[\n]/g, "<br/>")
    render() {
        const { results, translating, sentences } = this.props;
        return(
            <div className="result-ctnr">
                <div className="result-ctnr-a">
                    <div className="inlined">
                        {Object.keys(results).map((key, i) => {
                            if(key !== 'undefined') {
                                return (
                                    <span key={i}>
                                        {/* Handle enter char. */}
                                        {results[key].split('\n').map((item, __i) => { 
                                            return (
                                                <Fragment key={__i}>
                                                    <span 
                                                        tabIndex="0"
                                                        onFocus={ this.onFocus } 
                                                        onKeyDown={this.onKeyPressed}
                                                        onDoubleClick={(e) => this.handlePhraseDbClick(e, item, )}
                                                        dangerouslySetInnerHTML={{__html: item}} /> 
                                                    {((results[key].split('\n').length - 1) === __i) &&
                                                        translating &&
                                                        <div className="inlined in-progess"> . . .</div>
                                                    }
                                                    <br/>
                                                </Fragment>
                                            )
                                        })}
                                    </span>
                                )
                            } else {
                                return '';
                            }
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

//{!!sentences.length && !!sentences[key] && sentences[key][1].slice(-1)}
export default Result
