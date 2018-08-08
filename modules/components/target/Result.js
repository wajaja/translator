import React, { Component } from 'react'

class Result extends Component {
    constructor(props) {
        super(props)
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.props.results !== nextProps.results;
    // }

    render() {
        const { results, translating, sentences } = this.props;
        console.log(sentences);
        return(
            <div className="result-ctnr">
                <div className="result-ctnr-a">
                    <div className="inlined">
                        {Object.keys(results).map(function(key, i) {
                            if(key !== 'undefined') {
                                return (
                                    <span key={i}>
                                        {results[key]}
                                        {!!sentences.length && !!sentences[key] && sentences[key][1].slice(-1)}
                                    </span>
                                )
                            } else {
                                return '';
                            }
                        })}
                    </div>
                    {translating && <div className="inlined">...</div>}
                </div>
            </div>
        )
    }
}

export default Result
