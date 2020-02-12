import React from 'react'
import { Auth } from 'aws-amplify'

const style = {
	backgroundColor: '#f28a1b',
	justifyContent: 'space-between'
}

const Header = ({ signedIn }) => (
	<header
		className="navbar navbar-expand-lg navbar-light mb-3 d-flex"
		style={style}>
		<h4 className="text-white mb-0">Budget App</h4>
		{signedIn && (
			<span
				class="btn btn-danger align-self-end"
				onClick={() => Auth.signOut()}>
				Logout
			</span>
		)}
	</header>
)

export default Header
