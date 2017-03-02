import React from 'react'
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryLine, VictoryZoomContainer, VictoryZoom, VictoryContainer} from 'victory'

console.log(VictoryTheme)
export default class Chart extends React.Component {
	render(){
		return(
			<VictoryChart 
				theme={VictoryTheme.material}
				animate={{onLoad:{duration:500, delay:100}}}
				containerComponent={<VictoryContainer responsive={false}/>}
				width={700}
				height={600}
				padding={{top:0, bottom:0, left:60, right:40}}
				domainPadding={{x:[220,10], y:[0,0]}}
			>
			<VictoryAxis 
				tickValues={data2012.map(el => "Quarter " + el.quarter)}
			/>
			<VictoryAxis dependentAxis 
				tickFormat={x => "$" + x/1000 + "k"}
			/>
			<VictoryLine data={sumdata} x="quarter" y="earnings"
				interpolation="basis"
			/>
			<VictoryStack
			>
			<VictoryBar data={data2012} x="quarter" y="earnings"/>
			<VictoryBar data={data2013} x="quarter" y="earnings"/>
			<VictoryBar data={data2014} x="quarter" y="earnings"/>
			<VictoryBar data={data2015} x="quarter" y="earnings"/>
			</VictoryStack>
			</VictoryChart>
		)
	}

}

const data2012 = [
	{quarter: 1, earnings: 1300},
	{quarter: 2, earnings: -16500},
	{quarter: 3, earnings: 14250},
	{quarter: 4, earnings: 19000}
];

const data2013 = [
	{quarter: 1, earnings: 15000},
	{quarter: 2, earnings: -12500},
	{quarter: 3, earnings: 19500},
	{quarter: 4, earnings: -13000}
];

const data2014 = [
	{quarter: 1, earnings: 11500},
	{quarter: 2, earnings: 13250},
	{quarter: 3, earnings: 20000},
	{quarter: 4, earnings: 15500}
];

const data2015 = [
	{quarter: 1, earnings: -18000},
	{quarter: 2, earnings: 13250},
	{quarter: 3, earnings: -15000},
	{quarter: 4, earnings: 12000}
];

var sumdata = data2012.map( (e,i)=> ({quarter:e.quarter, earnings: data2012[i].earnings + data2013[i].earnings + data2014[i].earnings + data2015[i].earnings}) )

