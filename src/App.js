import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import RangeSlider from './RangeSlider'
import SalaryInfo from './SalaryInfo'

class App extends Component {
	constructor(props) {
		super(props)
		//Initialize Application State
		this.state = { expensePct: 0, salary: 0, expense: 0, savings: 0 }
	}

	onExpenseChange = expensePct => {
		const { salary } = this.state

		let expense = this.setState({
			expensePct
		})
	}
	render() {
		const { expensePct, salary, expense, savings } = this.state

		return (
			<div className="App container">
				<h1>Hello World!</h1>
				<RangeSlider value={expensePct} onChange={this.onExpenseChange} />
				<SalaryInfo salary={salary} expense={expense} savings={savings} />
			</div>
		)
	}
}

export default App
