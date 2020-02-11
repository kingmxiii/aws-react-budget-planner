import React, { Fragment } from 'react'
import Login from './Login'

const Protected = ({ signedIn, children }) => (
	<Fragment>{signedIn ? children : <Login />}</Fragment>
)

export default Protected
