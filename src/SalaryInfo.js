import React from 'react'

const SalaryInfo = ({ salary, expense, savings, onSalaryChange }) => (
	<div className="row">
		<div className="col-md-12">
			<div className="form-row mb-2">
				<div className="col">
					<label>
						<strong>Your Salary</strong>
					</label>
				</div>
				<div className="col">
					<input
						className="form-control"
						type="text"
						value={salary}
						onChange={e => onSalaryChange(e.target.value)}
					/>
				</div>
			</div>
			<div className="form-row">
				<div className="col">
					<label>
						<strong>Your Expense</strong>
					</label>
				</div>
				<div className="col">
					<label className="form-control">{expense}</label>
				</div>
			</div>
			<div className="form-row">
				<div className="col">
					<label>
						<strong>Your Savings</strong>
					</label>
				</div>
				<div className="col">
					<label className="form-control">{savings}</label>
				</div>
			</div>
		</div>
	</div>
)

export default SalaryInfo
