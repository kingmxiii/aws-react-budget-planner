import React from 'react'

const SalaryInfo = ({
	salary,
	expense,
	savings,
	onSalaryChange,
	isSaved,
	onSaveClick,
	expensePct
}) => (
	<div className="row">
		<div className="col-md-12">
			{isSaved === true && (
				<div className="form-row">
					<div className="col">
						<label>
							<strong>Your Election</strong>
						</label>
					</div>

					<div className="col">
						<label>{expensePct}</label>
					</div>
				</div>
			)}
			<div className="form-row mb-2">
				<div className="col">
					<label>
						<strong>Your Salary</strong>
					</label>
				</div>
				<div className="col">
					{isSaved === false ? (
						<input
							className="form-control"
							type="text"
							value={salary}
							onChange={e => onSalaryChange(e.target.value)}
						/>
					) : (
						<label>{salary}</label>
					)}
				</div>
			</div>
			<div className="form-row">
				<div className="col">
					<label>
						<strong>Your Expense</strong>
					</label>
				</div>
				<div className="col">
					<label>{expense}%</label>
				</div>
			</div>
			<div className="form-row">
				<div className="col">
					<label>
						<strong>Your Savings</strong>
					</label>
				</div>
				<div className="col">
					<label>{savings}</label>
				</div>
			</div>
		</div>

		{isSaved === false && !isNaN(salary) && salary > 0 && (
			<div className="col-md-12  d-flex justify-content-center border-top mt-2">
				<span className="btn btn-success mt-2" onClick={() => onSaveClick()}>
					Save Budget
				</span>
			</div>
		)}
	</div>
)

export default SalaryInfo
