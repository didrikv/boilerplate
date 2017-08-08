import React from 'react'
import styles from "./MultiSelect2.css"
import {Fade} from 'react-bootstrap'

export default class MultiSelect2 extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {showDropdown: false, small: false, width: 0}
		if(!props.values) {
			this.state = {...this.state, values: props.names}
		} else {
			this.state = {...this.state, values: props.values}
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
					this.toggleShow()
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
			e.preventDefault()
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
			this.toggleShow()
		}
	}

	renderFullsize = () => { 
		if(this.state.on) {var value = this.state.value}
		else {var value = this.props.value}
		return(
			<div id="flowDiv" style={{overflow: "hidden"}} >
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
				)})}
			</div>
			</div>
		)
	}

	toggleShow = () => {
		this.setState({ showDropdown: !this.state.showDropdown})
	}

	renderDropdown = () => {
		let chosen = this.props.value
		if(this.state.on) {var value = this.state.value}
		else {var value = chosen}
		let name = chosen.length == 1 ? chosen[0] : chosen[0] + " - " + chosen[chosen.length - 1]
		let dropclass = this.state.showDropdown ? styles.show : styles.dropdownContent
		return(
			<div className={styles.dropdown}>
				<button className={styles.dropbtn} onClick={this.toggleShow}> {name} &#x25BC;</button>
				<Fade in={this.state.showDropdown}>
				<div className={styles.show} id="myDropdown">
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
					)})}
				</div>
				</Fade>
			</div>
		)
	}

	checkOverflow = (el) =>
	{
	   var curOverflow = el.style.overflow;

	   if ( !curOverflow || curOverflow === "visible" )
		  el.style.overflow = "hidden";

	   var isOverflowing = el.clientWidth < el.scrollWidth 
		  || el.clientHeight < el.scrollHeight;

	   el.style.overflow = curOverflow;

	   return isOverflowing;
	}

	componentDidMount() {
		let flowDiv = document.getElementById("flowDiv")
		let wrapper = document.getElementById("wrapper")
		let initialWidth = flowDiv.scrollWidth



		let that = this
		let updateSize = () => {
			let wrapper = document.getElementById("wrapper")
			if(wrapper.clientWidth < initialWidth) {
				that.setState({small: true})
			}
			else{ that.setState({small: false}) }
		}

		let onResize = (e) => {
			setTimeout( () => {
			let wrapper = document.getElementById("wrapper")
			updateSize()
			}, 0)
		}

		window.addEventListener("resize" ,onResize)
		
		updateSize()
	}



	componentWillUnmount() {
		window.removeEventListener("resize", this.onResize)
	}


	render() {
		let result = this.state.small ? this.renderDropdown() : this.renderFullsize()

		return(
			<div id="wrapper" >
			{result}
			</div>
		)

	}
}
