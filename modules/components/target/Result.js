import React, { Component, Fragment } from 'react'

class Result extends Component {
    constructor(props) {
        super(props)
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
                        {Object.keys(results).map(function(key, i) {
                            if(key !== 'undefined') {
                                return (
                                    <span key={i}>
                                        {results[key].split('\n').map((item, __i) => {
                                            return (
                                                <Fragment key={__i}>
                                                    {item}
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
