import React, { Fragment } from 'react'
import RingLoader from 'react-spinners/RingLoader'

//This Component display a loader when the loading flag is set to true

const Loadable = ({ loading, children }) => {
	return loading ? (
		<div
			className="row justify-content-center align-items-center flex-column"
			style={{ height: '100%' }}>
			<RingLoader loading={loading} size={60} color="#546e7a" />
			<span className="font-weight-bold mt-2">Loading</span>
			<span>Wait a moment while we load your Information</span>
		</div>
	) : (
		<Fragment>{children}</Fragment>
	)
}

export default Loadable
