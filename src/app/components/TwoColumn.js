import React from 'react'
import styles from "./TwoColumn.css"
import Waypoint from 'react-waypoint'
import {StickyContainer, Sticky} from 'react-sticky'
import {Row, Col} from 'react-bootstrap'

class TwoColumn extends React.Component {
	constructor(props) {
		super(props)
		this.state = {active: 0}
	}

	handleEnter = (i) => {
		this.setState( {active: i} )
		this.props.sections[i].trigger()
	}
	
	renderSections = () => {
		let sections = this.props.sections.map( (e, i) => {
			let sClass  = this.state.active == i ? styles.active : styles.passive
			return(
				<Waypoint onEnter={(e) => this.handleEnter(i)} bottomOffset="49.999%" topOffset="50%" key={i}>
					<div className={sClass}>
						<h3 className={styles.header}> {this.props.sections[i].title} </h3>
						<p className={styles.paragraph}> {this.props.sections[i].text} </p> 
					</div>
				</Waypoint>
			)
		})
		return <div style={{height: this.props.height}} className={styles.container}> {sections} </div>
	}
	
	renderChart = () => {
		let offset = this.props.graphOffset
		return(
			<StickyContainer style={{height: this.props.height}}>
				<Sticky topOffset={-offset} disableCompensation>
				{ (e) => {
					let newStyle = {...e.style}
					if(e.distanceFromBottom > offset) {newStyle.top += offset}
					else if(e.distanceFromBottom > 0) {newStyle.top += e.distanceFromBottom}
					return( <div style={newStyle}>
								{this.props.graph}
							</div>
					)
				}}
				</Sticky>
			</StickyContainer>
		)
	}

	render() {
		return(
			<Row>
				<Col sm={this.props.graphWidth}>
					{this.renderChart()}
				</Col>
				<Col sm={12 - this.props.graphWidth}>
					{this.renderSections()}
				</Col>
			</Row>
		)
	}
}

export default TwoColumn










