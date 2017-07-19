import React from 'react'
import styles from "./MultiSelect2.css"

export default class MultiSelect2 extends React.Component {
	
	constructor(props) {
		super(props)
		if(!props.values) {
			this.state = {values: props.names}
		} else {
			this.state = {values: props.values}
		}
		
		this.state.names = props.names
		this.state.on = false;
		this.first = props.value[0]
		this.last = props.value[props.value.length -1]

		document.addEventListener("mouseup", (e) =>
				{
					if(this.state.on){
					this.setState({on:false})
					props.onChange(this.state.value)
				}
				}
		)
		this.startSelect = this.startSelect.bind(this)
		this.onMouseEnter = this.onMouseEnter.bind(this)
		this.between = this.between.bind(this)
		this.onTouchMove = this.onTouchMove.bind(this)
		this.onTouchEnd = this.onTouchEnd.bind(this)

	}

	onChange(e) {
		var options = e.target.options;
		var value = [];
		for (var i = 0, l = options.length; i < l; i++) {
			if (options[i].selected) {
				value.push(+options[i].value);
			}
		}
		props.onChange(value)
	}


	between(first, last) {
		let values = this.state.values.slice()
		first = values.indexOf(first)
		last = values.indexOf(last)
		let start = Math.min(first, last)
		let finnish = Math.max(first, last) + 1
		let result = values.slice(start, finnish)

		return(result)
	}

	startSelect(e) {
		this.setState({on:true})
		this.first = +e.target.value
		this.setState({value: this.between(this.first, this.first)})
	}

	onMouseEnter(e) {
		if(this.state.on){
			this.last = +e.target.value
			this.setState({value: this.between(this.first, this.last)})
		}
	}

	onTouchMove(e) {
		if(this.state.on){
			var touch = e.touches.item(0)
			let value =	+document.elementFromPoint(touch.clientX, touch.clientY).value 
			
			if(!value) {return}
			if(value == this.last) {return}
			if(!this.state.values.includes(value)) {return}

			this.last = value
			this.setState({value: this.between(this.first, this.last)})
		}
	}

	onTouchEnd(e) {
		if(this.state.on){
			this.setState({on:false})
			this.props.onChange(this.state.value)
		}
	}


	render() {
		if(this.state.on) {var value = this.state.value}
		else {var value = this.props.value}
		return(
		<div className={styles.container}>
			{this.state.values.map( (e,i) => {
			return(
			<button 
				value={e}
				key={i}
				className={value.includes(e) ? styles.buttonChecked : styles.button}
				onMouseDown={this.startSelect}
				onTouchStart={this.startSelect}
				onMouseEnter={this.onMouseEnter}
				onTouchMove={this.onTouchMove}
				onTouchEnd={this.onTouchEnd}
			>
				{this.state.names[i]}
			</button>
			)
			}
			)
			}
		</div>
		)

	}
}