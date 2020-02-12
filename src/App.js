import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import RangeSlider from './RangeSlider'
import SalaryInfo from './SalaryInfo'
import { Auth, Hub } from 'aws-amplify'
import Protected from './Protected'
import Loadable from './Loadable'
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
			user: null,
			loading: true
		}
	}

	componentDidMount() {
		Hub.listen('auth', ({ payload: { event, data } }) => {
			switch (event) {
				case 'signIn':
					this.setState({ signedIn: true }, async () => {
						let user = await Auth.currentAuthenticatedUser({
							bypassCache: false
						})

						this.setState({
							user: {
								name: user.attributes.name,
								email: user.attributes.email
							},
							loading: false
						})
					})

					break
				case 'signOut':
					this.setState({ user: null, signOut: false, loading: true })
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
		const {
			expensePct,
			salary,
			expense,
			savings,
			signedIn,
			user,
			loading
		} = this.state

		let name = user !== null ? user.name : ''

		return (
			<div className="App container">
				<Protected signedIn={signedIn}>
					<Loadable loading={loading}>
						<h4 className="text-center">
							Welcome to your monthly budget {name}
						</h4>
						<RangeSlider value={expensePct} onChange={this.onExpenseChange} />
						<SalaryInfo salary={salary} expense={expense} savings={savings} />
					</Loadable>
					<button onClick={() => Auth.signOut()}>Logout</button>
				</Protected>
			</div>
		)
	}
}

export default App
