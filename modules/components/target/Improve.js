import React, { Component } from 'react'

class Improve extends Component {
    constructor(props) {
        super(props)

        this.state = {
            improved: '',
        }
    }

    toggleImprove = (e) => {
        e.preventDefault();
        this.props.toggleImprove();
    }

    handleChange = (e) => {
        this.setState({improved: e.target.value});
    }

    submit = (e) => {
        e.preventDefault();
        this.props.submitImproved(this.state.improved);
    }

    render() {
        const { improving } = this.props;
        return(
            <div className="improve-ctnr">
                <div className="improve-ctnr-a">
                    <div className="improve-tp">
                        {!improving && <button
                                            className="btn btn-danger btn-sm"
                                            onClick={this.toggleImprove}>
                                            ameliorer
                                       </button>}
                    </div>
                    {improving &&
                        <div className="improve-btm">
                            <form id="noter-save-form" method="POST" onSubmit={this.submit}>
                                <textarea
                                    id="improve-text-area"
                                    name="textarea"
                                    value={this.state.improved}
                                    onChange={this.handleChange}>
                                </textarea>
                                <input
                                    type="submit"
                                    value="envoyer"
                                    className="btn btn-danger btn-sm"
                                    />
                            </form>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Improve
