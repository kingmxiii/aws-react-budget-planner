import React from 'react'
import { Auth } from 'aws-amplify'

const Login = () => (
	<div>
		<button onClick={() => Auth.federatedSignIn({ provider: 'Google' })}>
			Sign in with Google
		</button>
	</div>
)

export default Login
