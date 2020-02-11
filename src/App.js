import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import RangeSlider from './RangeSlider'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = { expense: 0 }
	}

	onExpenseChange = expense => {
		this.setState({
			expense
		})
	}
	render() {
		const { expense } = this.state

		return (
			<div className="App container">
				<h1>Hello World!</h1>
				<RangeSlider value={expense} onChange={this.onExpenseChange} />
			</div>
		)
	}
}

export default App
