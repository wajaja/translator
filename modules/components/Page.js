import React, { Component, Fragment }        from 'react'
import _            from 'lodash'
import Immutable    from 'immutable'
import { Link }     from 'react-router-dom'
import { Helmet }   from 'react-helmet'
const io            = require('socket.io-client');
const uniqueString = require('unique-string');
import {
    getEditedSentence,
    getLastSentence,
    splitIntoSentences
}                           from 'utils/funcs'
import Translator           from 'utils/Translator'
import MyLoadable           from './MyLoadable'
import { BASE_PATH }        from 'config/api'

const Input = MyLoadable({
    loader: () => import('./source/Input'),
});
const Output = MyLoadable({
    loader: () => import('./target/Output'),
});
const Select = MyLoadable({
    loader: () => import('react-select'),
});


const socket = io.connect(BASE_PATH);

const sourceOptions = [
  { value: 'francais', label: 'Français' }
];

const targetOptions = [
  { value: 'lingala', label: 'Lingala' }
  // ,{ value: 'sango', label: 'Sango' }
  // ,{ value: 'tshiluba', label: 'Tshiluba' }
];

class Page extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: '',
            results: {},
            sentences: [],  //phrases
            improving: false,
            translating: false,
            id_sentence: 0,
            alertMsg: '',
            sentence_ranges: [],
            sourceLang: { value: 'francais', label: 'Français' },
            targetLang: { value: 'lingala', label: 'Lingala' },
            uniqueString: uniqueString()
        }

        this.onKeyUp = this.onKeyUp.bind(this);
        this.translator = new Translator();
    }

    inputChange = (e) => {
        this.setState({text: e.target.value})
    }

    handleSuggestionClick = (text) => {
        this.setState({text: text})
    }

    improveSentence = (text) => {
        //write new key in dico json
    }

    onKeyUp(key){
        if(key === 'Backspace') {
            this._translate();
        }
        else if(key === ' ') {
            if(this.lastPressedKey === ' ') {
            } else {
                this._translate();
            }
        }
        else if(key === '.' || key === '!' || key === '?') {
            this._translate();
        } else {
        }
        this.lastPressedKey = key
    }

    _translate = () => {
        let {
            text,
            sourceLang,
            targetLang,
            uniqueString
        }         = this.state,  //current text
        cursorPos = this.lastCursorPos,
        phrase    = getEditedSentence(text, cursorPos),
        order     = phrase.order;
        // results     = this.state.results;
        this.translator
            .translatePhrase(phrase, order, uniqueString, sourceLang.value, targetLang.value)
            .then(
                (res) => {
                    if(res.data) {
                        let data     = res.data,
                        alertMsg     = '',
                        phrase       = data.phrase,
                        order        = data.order,
                        results      = Immutable.fromJS(this.state.results).set(order, phrase);

                        if(alertMsg)
                            alertMsg = data.alertMsg

                        this.setState({
                            results: results.toJS(),
                            alertMsg: alertMsg
                        });
                    }
                }, (err) => {
                    console.log('error in translator');
                    console.log('promise rejected with status', err);
                }
            )
        this.setState({sentences: splitIntoSentences(text)});
    }

    onCaretPositionChange = (pos) => {
        this.lastCursorPos = pos;
    }

    _trans_iterator = () => {
        //splitIntoSentences
        //check phrases range where lastCursorPos ...
        this.timeout = window.setTimeout(() => {
            let {
                text,
                sourceLang,
                targetLang,
                uniqueString
            }       = this.state,
            arr     = splitIntoSentences(text);
            arr.forEach((phrase, i) => {
                let order = phrase.order;

                this.translator
                    .translatePhrase(phrase, order, uniqueString, sourceLang.value, targetLang.value)
                    .then(
                        (res) => {
                            if(res.data) {
                                let data     = res.data,
                                alertMsg     = '',
                                phrase       = data.phrase,
                                order        = data.order,
                                results      = Immutable.fromJS(this.state.results).set(order, phrase);

                                if(alertMsg)
                                    alertMsg = data.alertMsg

                                this.setState({
                                    results: results.toJS(),
                                    alertMsg: alertMsg
                                });
                            }
                        }, (err) => {
                            console.log('error in translator');
                            console.log('promise rejected with status', err);
                        }
                    )
            })
            this.setState({sentences: arr});
        }, 0)
    }

    onCut = () => {
        this._trans_iterator();
    }

    onPaste = () => {
        this._trans_iterator();
    }

    toggleImprove = () => {
        this.setState({improving: !this.state.improving})
    }

    sourceChange = (option) => {
        this.setState({sourceLang: option });
        console.log(`Option selected:`, option);
    }

    targetChange = (option) => {
        this.setState({targetLang: option });
        console.log(`Option selected:`, option);
    }

    componentWillUmount() {
        window.removeTimeout(this.timeout);
        window.removeTimeout(this.trans_timeout);
    }

    componentDidMount() {
        socket.on('Removed', (data) => {
            dispatch(AppActions.formVideoPane(false));
        });

        socket.on('phrase_translated', (data) => {
            let phrase   = data.phrase,
            order        = data.order,
            uniqueString = data.uniqueString,
            results      = Immutable.fromJS(this.state.results)
                                    .set(order, phrase);
            if(data && this.state.uniqueString === uniqueString) {
                this.setState({results: results.toJS()});
                // results['sentences'][data['order']] = data;
                // this.setState({
                //     results: results,
                //     sentences: splitIntoSentences(_next),
                //     sentence_ranges: getSentenceRanges(_next),
                // })
            }
        });
    }

    componentWillUpdate(nextProps, nextState) {
        if(this.state.text !== nextState.text) {
            //reset results
            if(nextState.text === '' || nextState.text === ' ') {
                this.setState({results: {}});
            }

            let _next = nextState.text, //nextText
            _text = this.state.text,  //current text
            cursorPos = this.lastCursorPos;

            this.lastTextPos = _text.length;
            this.lastSentencePos = _text.lastIndexOf('.');
            this.nextSentencePos = this.lastSentencePos + 1;

            //translate the current phrase when space introduced
            if(this.lastPressedKey === ' ') {
                //don't translate when duplicate space for performance reason
                if(this.state.text.slice(cursorPos - 1, cursorPos) !== ' ') {
                    //phrase Object
                    let phrase = getEditedSentence(_next, cursorPos),
                    results = this.state.results;
                    // console.log(phrase);
                    //Promise !!!!!!!!!!!!!!!!!!!!!!!!!!!

                }
            }
            // //handle change when deleting text
            // else if((_text.length === (_next.length + 1)) || (_text.length === (_next.length - 1))) {
            //     //get phrase within text was deleted
            //     let phrase = getEditedSentence(_next, cursorPos),
            //     sentences = splitIntoSentences(_next),
            //     results = this.state.results;
            //     results['sentences'][phrase['order']] = this.translator.translatePhrase(phrase, phrase.order, this.state.uniqueString)
            //     this.setState({
            //         results: results,
            //         sentences: sentences
            //     });
            // }

            //translate the current phrase when Backspace
            // if(this.lastPressedKey === 'Backspace') {
            //     const cursor = this.lastCursorPos;
            //     //don't translate when duplicate space for performance reason
            //     if(this.state.text.slice(cursor - 1, cursor) !== ' ') {
            //         let phrase = getEditedSentence(str, cursorPos),
            //         results = this.state.results;
            //         results['sentences'][phrase['order']] = this.translator.translatePhrase(phrase, phrase.order, this.state.uniqueString)
            //         this.setState({
            //             results: results,
            //             sentences: splitIntoSentences(nextState.text),
            //             sentence_ranges: getSentenceRanges(nextState.text),
            //         })
            //     }
            // }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if((prevState.sourceLang !== this.state.sourceLang) || (prevState.targetLang !== this.state.targetLang)) {
            this._translate();
        }
    }

    render() {
        const { results, text, translasting, sentences, sourceLang, targetLang } = this.state;
        const is_auth = false;
        return(
            <div className="pg-ctnr">
                <div className="pg-ctnr-a">
                    <div className="pg-ctnr-tp">
                        <div className="pg-ctnr-tp-a">
                        </div>
                    </div>
                    <div className="pg-ctnr-btm">
                        <div className="pg-lft">
                            <div className="pg-lft-tp">
                                <div className="select-src">
                                    <Fragment>
                                        <Select
                                          className="basic-single"
                                          classNamePrefix="select"
                                          isDisabled={false}
                                          isLoading={false}
                                          isClearable={false}
                                          isRtl={false}
                                          isSearchable={false}
                                          name="source"
                                          value={sourceLang}
                                          instanceId="source-1"
                                          onChange={this.sourceChange}
                                          options={sourceOptions}
                                        />
                                    </Fragment>
                                </div>
                            </div>
                            <Input
                                {...this.props}
                                text={text}
                                results={results}
                                onCut={this.onCut}
                                onKeyUp={this.onKeyUp}
                                onPaste={this.onPaste}
                                translasting={translasting}
                                inputChange={this.inputChange}
                                onCaretPositionChange={this.onCaretPositionChange}
                                handleSuggestionClick={this.handleSuggestionClick}
                                />
                        </div>
                        <div className="pg-rght">
                            <div className="pg-rght-tp">
                                <div className="select-target">
                                    <Fragment>
                                        <Select
                                          className="basic-single"
                                          classNamePrefix="select"
                                          defaultValue={targetOptions[0]}
                                          isDisabled={false}
                                          isLoading={false}
                                          isClearable={false}
                                          isRtl={false}
                                          isSearchable={false}
                                          name="target"
                                          instanceId="target-2"
                                          value={targetLang}
                                          onChange={this.targetChange}
                                          options={targetOptions}
                                        />
                                    </Fragment>
                                </div>
                            </div>
                            <Output
                                {...this.props}
                                text={text}
                                results={results}
                                sentences={sentences}
                                translasting={translasting}
                                inputChange={this.inputChange}
                                toggleImprove={this.toggleImprove}
                                submitImproved={this.improveSentence}
                                handleSuggestionClick={this.handleSuggestionClick}
                                />
                        </div>
                        <div className="alert-msg">{this.state.alertMsg}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Page;
