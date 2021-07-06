import React, { Component } from 'react'


const Item = ({source, target}) => {

    return (
        <div className="sug-item-ctnr">
            <div className="sug-item-ctnr-a">
            	<div className="item-src-ctnr">
            		<div className="item-word">
            			<b>{source.word}</b>
        			</div>
        			<div className="item-content">
        				{source.defs.map((def, i) => {
        					return(
        						<div key={i}>
			            			<div>
			            				<i>Def {i + 1}</i> :
			            				<span>{def}</span>
			            			</div>
			            			<div>
			            				<i>Ex {i + 1}</i>:
			            				<span>{source.exemples[i] ? source.exemples[i] : '--'}</span>
			            			</div>
		            			</div>
        					)
        				})}
        			</div>
        		</div>
        		<div className="item-target-ctnr">
            		<div className="item-word">
            			<b>{target.word}</b>
        			</div>
        			<div className="item-content">
            			{target.defs.map((def, i) => {
        					return(
        						<div key={i}>
			            			<div>
			            				<i>Def {i + 1}</i> :
			            				<span>{def}</span>
			            			</div>
			            			<div>
			            				<i>Ex {i + 1}</i>:
			            				<span>{target.exemples[i] ? target.exemples[i] : '--'}</span>
			            			</div>
		            			</div>
        					)
        				})}
        			</div>
        		</div>
        	</div>
        </div>
    )
}

////////
class Suggestion extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    	console.log(this.props.metadatas)
    }

    componentDidUpdate(prevProp, prevState) {
    	if(prevProp.metadatas !== this.props.metadatas) {
    		console.log(this.props.metadatas)
    	}
    }

    render() {
    	const metadatas = this.props.metadatas
        return(
        	<div className="metadatas-ctnr">
            	<div className="metadatas-bd">
	            	<div>
	            		{!!metadatas && metadatas
	            			.filter((_meta) => !!_meta === true)
	            			.filter((_meta) => !!_meta.sourceMeta === true)
	            			.map((meta, i) => {
		            			return <Item 
		            						key={i} 
		            						source={meta.sourceMeta}
		            						target={meta.targetMeta}
		            						/>
	            		})}
	            	</div>
	            </div>
            </div>
        )
    }
}

export default Suggestion
