import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import RangeSlider from './RangeSlider'
import SalaryInfo from './SalaryInfo'
import { Auth, Hub } from 'aws-amplify'
import Protected from './Protected'
import awsconfig from './aws-exports'
Auth.configure(awsconfig)

class App extends Component {
	constructor(props) {
		super(props)
		//Initialize Application State
		this.state = {
			expensePct: 0,
			salary: 100000,
			expense: 0,
			savings: 0,
			signedIn: false,
			user: null
		}
	}

	componentDidMount() {
		Hub.listen('auth', ({ payload: { event, data } }) => {
			switch (event) {
				case 'signIn':
					Auth.currentAuthenticatedUser({
						bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
					}).then(user =>
						this.setState({
							user: {
								name: user.attributes.name,
								email: user.attributes.email
							},
							signedIn: true
						})
					)
					break
				case 'signOut':
					this.setState({ user: null, signOut: false })
					break
			}
		})
	}

	onExpenseChange = expensePct => {
		const { salary } = this.state

		//Calculate Savings and Expense based on new Expense Percent.
		let expense = (salary / 12) * (expensePct / 100)
		let savings = (salary / 12) * (1 - expensePct / 100)

		this.setState({
			expensePct,
			expense,
			savings
		})
	}
	render() {
		const { expensePct, salary, expense, savings, signedIn } = this.state

		return (
			<div className="App container">
				<Protected signedIn={signedIn}>
					<h1>Hello World!</h1>
					<RangeSlider value={expensePct} onChange={this.onExpenseChange} />
					<SalaryInfo salary={salary} expense={expense} savings={savings} />
					<button onClick={() => Auth.signOut()}>Logout</button>
				</Protected>
			</div>
		)
	}
}

export default App
