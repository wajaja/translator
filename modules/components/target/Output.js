import React    from 'react'
import Result   from './Result'
import Improve  from './Improve'
import DicoWord from './DicoWord'

class Output extends React.PureComponent{
    constructor(props) {
        super(props)
    }

    render() {
        let { results, text, improving, } = this.props

        let result = results && results[0] ? results[0]['lingala'] : {}; //array
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
                    <Result
                        {...this.props}
                        results={results}

                        />
                </div>
                <div className="inp-mdl">
                </div>
                <div className="inp-btm">
                    <DicoWord
                        {...this.props}
                        results={results}
                        text={text}
                        metadata={metadata}
                        />
                </div>
            </div>
        )
    }
}

export default Output;




// <Improve
// {...this.props}
// text={text}
// improving={improving}
// submit={this.props.submitImproved}
// toggleImprove={this.props.toggleImprove}
// />
