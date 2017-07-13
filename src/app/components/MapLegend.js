import React from 'react'
import styles from "./Map.css"
import {CSSTransitionGroup} from 'react-transition-group'
import transitions from "../transitions.css"

export default function MapLegend(props) {
	let rectDim = 20
	let colors = props.colors
	let rects = colors.map( (e, i) => 
		<rect 
			width={rectDim}
			height={rectDim}
			x={0}
			y={i*rectDim}
			key={i}
			className={styles.static}
			style={{fill:e}}
		/>
	)

	let text = props.threshold.map( (e, i) =>
		<text 
			x={rectDim + 5} 
			y={rectDim*(i)}
			fontSize={10}
			alignmentBaseline="middle"
			key={i}
			fontFamily="Arial, Helvetica, sans-serif"
			fill={props.borderColor}
		>
			{Math.round(e*Math.pow(10,2))/Math.pow(10,2)} 
		</text>
	)

	let translate = "translate(" + props.x + ", " + props.y + ")"

	return(
		<g transform={translate}>
			{rects}
		<CSSTransitionGroup
			transitionAppear={true}
			transitionAppearTimeout={700}
			transitionEnterTimeout={700}
			transitionLeaveTimeout={700}
			transitionName={transitions} 
			component="g"
		>
		<g key={props.threshold[0]}>
			{text}
		</g>
		</CSSTransitionGroup>
		</g>
	)
}
