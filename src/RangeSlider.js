import React from 'react'

const RangeSlider = ({ value, onChange }) => (
	<div className="row">
		<div className="forn-group col-md-12">
			<label>Expenses {value} %</label>
			<input
				type="range"
				className="form-control-range"
				value={value}
				min="1"
				max="30"
				onChange={e => onChange(e.target.value)}
			/>
		</div>
	</div>
)

export default RangeSlider
