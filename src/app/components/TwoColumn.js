import React from 'react'
import styles from "./TwoColumn.css"
import Waypoint from 'react-waypoint'
import {StickyContainer, Sticky} from 'react-sticky'
import {Row, Col, Fade} from 'react-bootstrap'
import {AutoAffix} from 'react-overlays'

class TwoColumn extends React.Component {
	constructor(props) {
		super(props)
		this.state = {active: 0, fade: false}
	}

	handleEnter = (i) => {
		this.setState( {active: i} )
		this.props.sections[i].trigger()
		if(i == this.props.sections.length-1) {
			this.setState({fade: true})
		}
	}

	onLeave = () => {
		this.setState({fade: false})
	}
	
	renderSections = () => {
		let sections = this.props.sections.map( (e, i) => {
			let sClass  = this.state.active == i ? styles.active : styles.passive
			let onLeave = i == this.props.sections.length-1 ? this.onLeave : undefined
			return(
				<Waypoint onEnter={(e) => this.handleEnter(i)} onLeave={onLeave} bottomOffset="49.999%" topOffset="50%" key={i}>
					<div className={sClass}>
						<h3 className={styles.header}> {this.props.sections[i].title} </h3>
						<p className={styles.paragraph}> {this.props.sections[i].text} </p> 
					</div>
				</Waypoint>
			)
		})
		
		

		return <div 
			style={{height: this.props.height, paddingTop: this.props.paddingTop, paddingBottom: this.props.paddingBottom}} 
			className={styles.container}
		> 
			{sections} 
		</div>
	}
	
	renderChart = () => {
		//let element = document.getElementById("graphContainer")
		//let elementHeight = element ? element.clientHeight : 0
		//let windowHeight = window.innerHeight
		//let offset = Math.max((windowHeight - elementHeight)/2, 0)

		//return(
		//	<StickyContainer style={{height: this.props.height}}>
		//		<Sticky topOffset={-offset} disableCompensation>
		//		{ (e) => {
		//			let newStyle = {...e.style}
		//			if(e.distanceFromBottom > offset) {newStyle.top += offset}
		//			else if(e.distanceFromBottom > 0) {newStyle.top += e.distanceFromBottom}
		//			return( <div style={newStyle} id="graphContainer">
		//						{this.props.graph}
		//					</div>
		//			)
		//		}}
		//		</Sticky>
		//	</StickyContainer>
		//)
		return(
			<div style={{height: this.props.height}}>
				<AutoAffix container={this} viewportOffsetTop={20}>
				<div>
					<Fade in={this.state.fade}>
					<div style={{height: "120px"}}>
					{this.props.control}
					</div>
					</Fade>
					
					<div>
					{this.props.graph}
					</div>
				</div>
				</AutoAffix>
			</div>
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










