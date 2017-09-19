import React from 'react'
import styles from './Map.css'

export default function MapLegend({ colors, threshold, borderColor, x, y, whiteZeros, percentLegend}) {
	let rectDim = 20
	let rects = colors.map( (e, i) => 
		<rect 
			width={rectDim}
			height={rectDim}
			x={0}
			y={i*rectDim}
			key={i}
			className={styles.static}
			style={{fill:e, stroke:'grey', strokeWidth:0.4}}
		/>
	)

	let text = threshold.map( (e, i) =>
		<text 
			x={rectDim + 5} 
			y={rectDim*(i)}
			alignmentBaseline='middle'
			key={i}
			fontFamily='Arial, Helvetica, sans-serif'
			fill={borderColor}
			style={{fontSize:'10px'}}
		>
			{percentLegend ? Math.round((whiteZeros + (1-whiteZeros)/5*i)*100) + '%' :
				Math.round(e*Math.pow(10,2))/Math.pow(10,2)} 
		</text>
	)

	if(whiteZeros) {
		var tmp = 
			<g>
				<rect 
					width={rectDim}
					height={rectDim}
					x={0}
					y={- (rectDim + 10)}
					className={styles.static}
					style={{fill:'#e9e9e9', stroke:'grey', strokeWidth:0.4}}
				/>
				<text 
					x={rectDim + 5} 
					y={- (rectDim )}
					alignmentBaseline='middle'
					fontFamily='Arial, Helvetica, sans-serif'
					fill={borderColor}
					style={{fontSize:'10px'}}
				>
					{ '0 (' + Math.round(whiteZeros*100) + '%)'}
				</text>
			</g>
	} else {
		var tmp = null
	}



	let translate = 'translate(' + x + ', ' + y + ')'

	return(
		<g transform={translate}>
			{rects}
			{tmp}
			<g key={threshold[0]}>
				{text}
			</g>
		</g>
	)
}
