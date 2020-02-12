import React, { Fragment } from 'react'
import Login from './Login'

//Hoc component that will display Login screen is user is not authenticated
const Protected = ({ signedIn, children }) => (
	<Fragment>{signedIn ? children : <Login />}</Fragment>
)

export default Protected
