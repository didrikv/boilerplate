import React from 'react'
import bowser from 'bowser'
import { Modal } from 'react-bootstrap'



export default class IEWarning extends React.Component {
	constructor() {
		super()
		this.state = {showModal: bowser.msie}
	}

	close = () => {
		this.setState( {showModal: false} )
	}
	render(){
		return(
		<Modal show={this.state.showModal}  onHide={this.close}>
			<Modal.Header closeButton>
				<Modal.Title> <span style={{fontWeight: 'bold', fontSize: '25px'}}>Vurder å bytte nettleser!</span> </Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Vi ser at du bruker Internett Explorer som nettleser.
					Selv om nettsiden vil fungere, så vil man få en mye bedre
					opplevelse med en moderne nettleser.</p>
				<p>Vi anbefaler <a href="https://www.google.no/chrome/browser/desktop/index.html">Google Chrome</a></p>
			</Modal.Body>
		</Modal>
	)
	}
}

