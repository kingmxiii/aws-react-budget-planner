import React, { Component, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Header from './Header'
import RangeSlider from './RangeSlider'
import SalaryInfo from './SalaryInfo'
import { Auth, Hub } from 'aws-amplify'
import Protected from './Protected'
import Loadable from './Loadable'
import awsconfig from './aws-exports'
Auth.configure(awsconfig)

const deFaultState = {
	expensePct: 0,
	salary: 0,
	expense: 0,
	savings: 0,
	signedIn: false,
	user: null,
	loading: true,
	isSaved: false
}

class App extends Component {
	constructor(props) {
		super(props)
		//Initialize Application State
		this.state = deFaultState
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
					this.setState({ ...deFaultState })
					break
			}
		})
	}

	onExpenseChange = expensePct => {
		this.setState({ expensePct }, this.calculateSalary)
	}

	onSalaryChange = salary => {
		this.setState({ salary }, this.calculateSalary)
	}

	onSaveClick = () => {
		this.setState({ isSaved: true })
	}

	calculateSalary = () => {
		const { salary, expensePct } = this.state

		if (isNaN(salary)) {
			return
		}

		//Calculate Savings and Expense based on new Expense Percent.
		let expense = (salary / 12) * (expensePct / 100)
		let savings = (salary / 12) * (1 - expensePct / 100)

		this.setState({
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
			loading,
			isSaved
		} = this.state

		let name = user !== null ? user.name : ''
		let displayMsg =
			isSaved === true ? 'Thank you' : 'Welcome to your monthly budget'

		return (
			<Fragment>
				<Header signedIn={signedIn} />
				<div className="App container">
					<Protected signedIn={signedIn}>
						<div
							className="col-md-8 offset-md-2 border"
							style={{ padding: '40px' }}>
							<Loadable loading={loading}>
								<h5 className="text-center mb-0">{displayMsg}</h5>
								<h4 className="text-center">{name}</h4>

								{isSaved === false && (
									<RangeSlider
										value={expensePct}
										onChange={this.onExpenseChange}
									/>
								)}
								<SalaryInfo
									salary={salary}
									expense={expense}
									savings={savings}
									onSalaryChange={this.onSalaryChange}
									isSaved={isSaved}
									onSaveClick={this.onSaveClick}
									expensePct={expensePct}
								/>
							</Loadable>
						</div>
					</Protected>
				</div>
			</Fragment>
		)
	}
}

export default App
