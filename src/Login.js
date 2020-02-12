import React from 'react'
import { Auth } from 'aws-amplify'
import googleLogo from './Logo.svg.webp'

const Login = () => (
	<div className="row d-flex justify-content-center align-items-center p-5">
		<div className="p-5 border">
			<span
				class="btn btn-outline-dark"
				onClick={() => Auth.federatedSignIn({ provider: 'Google' })}
				role="button"
				style={{ textTransform: 'none' }}>
				<img
					width="20px"
					style={{ marginBottom: '3px', marginRight: '5px' }}
					alt="Google sign-in"
					src={googleLogo}
				/>
				Login with Google
			</span>
		</div>
	</div>
)

export default Login
