import React from 'react'
import styles from './MultiSelectSmall.css'
import {Fade} from 'react-bootstrap'
import deepEqual from 'deep-equal'

export default class MultiSelect2 extends React.Component {
	constructor({ names, values, chosen, handlechange }) {
		super()
		values = values ? values : names

		this.state = {
			names,
			values,
			chosen,
			on: false,
			showDropdown: false,
			small: true,
		}

		this.first = chosen[0]
		this.last = chosen[chosen.length -1]
		this.buttons = []
	}

	between = (first, last) => {
		let values = this.state.values.slice()
		first = values.indexOf(first)
		last = values.indexOf(last)
		let start = Math.min(first, last)
		let finnish = Math.max(first, last) + 1
		let result = values.slice(start, finnish)

		return(result)
	}

	startSelect = (e) => {
		this.setState({on:true})
		this.first = +e.target.value
		this.setState({chosen: this.between(this.first, this.first)})
	}

	onMouseEnter = (e) => {
		if(this.state.on){
			this.last = +e.target.value
			this.setState({chosen: this.between(this.first, this.last)})
		}
	}

	onTouchMove = (e) => {
		if(this.state.on){
			e.preventDefault()
			var touch = e.touches.item(0)
			let value =	+document.elementFromPoint(touch.clientX, touch.clientY).value 

			if(!value) {return}
			if(value == this.last) {return}
			if(!this.state.values.includes(value)) {return}

			this.last = value
			this.setState({chosen: this.between(this.first, this.last)})
		}
	}

	onTouchEnd = (e) => {
		if(this.state.on){
			e.preventDefault()
			this.setState({on:false})
			this.props.handleChange(this.state.chosen)
			if(this.state.small) {this.toggleShow()}
		}
	}

	toggleShow = () => {
		this.setState({ showDropdown: !this.state.showDropdown})
	}


	bindButton = (button) => {
		if(button) {
			this.buttons.push(button)
		}
	}

	onMouseUp = (e) => {
		if(this.state.on){
			this.props.handleChange(this.state.chosen)
			this.setState({on:false})
			if(this.state.showDropdown) {this.toggleShow()}
		} else if(this.state.showDropdown) {
			setTimeout( () => this.toggleShow(), 1)
		}
	}

	buttonClick = () => {
		if(!this.state.showDropdown) {
			this.toggleShow()
		}
	}


	componentDidMount = () => {
		document.addEventListener('mouseup', this.onMouseUp)
		this.buttons.forEach( (e) => {
			e.addEventListener('touchmove', this.onTouchMove, {passive: false})
		})
	}

	componentWillUnmount = () => {
		document.removeEventListener('mouseup', this.onMouseUp)
		this.buttons.forEach( (e) => {
			e.removeEventListener('touchmove', this.onTouchMove)
		})
	}

	shouldComponentUpdate = (nextProps, nextState) => {
		let update = !deepEqual(nextState, this.state)
		return(update)
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState({...this.state, ...nextProps})
	}


	render = () => {
		let { title, justify, width, topTitle } = this.props
		let chosen = this.props.chosen
		let name = chosen.length == 1 ? chosen[0] : chosen[0] + ' - ' + chosen[chosen.length - 1]
		chosen = this.state.on ? this.state.chosen : this.props.chosen
		let dropclass = this.state.showDropdown ? styles.show : styles.dropdownContent

		let style = width ? {width: width} : {flex: 1}	
		let displayType = topTitle ? undefined : 'flex'
		let arrowStyle = this.state.showDropdown ? styles.arrowUp : styles.arrowDown

		return(
			<div style={{justifyContent: justify, display: displayType}}>
				<div className={styles.title}>
					{title}&ensp;
				</div>
				<div className={styles.dropdown} style={style}>
					<div style={{display: 'flex', paddingRight: '6px', cursor: 'pointer'}} onClick={this.buttonClick}>
						<div style={{flexGrow: 1}}>
							<button className={styles.dropbtn} > {name} </button> 
						</div>
						<div className={arrowStyle}>
						</div>
					</div>
					<div className={dropclass}>
						{this.state.values.map( (e,i) => {
							return(
								<button 
									value={e}
									key={i}
									className={chosen.includes(e)&& this.state.on ? styles.buttonChecked : styles.innerbutton}
									onMouseEnter={this.onMouseEnter}
									onMouseDown={this.startSelect}
									onTouchStart={this.startSelect}
									onTouchEnd={this.onTouchEnd}
									ref={ this.bindButton }
								>
									{this.state.names[i]}
								</button>
							)})
						}
					</div>
				</div>
			</div>
		)
	}
}
