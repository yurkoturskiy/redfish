import React from 'react'
import {Link} from 'react-router-dom'

const Navigation = () => {
	return (
		<nav>
			<Link to="/"><div>sebucur</div></Link>
			<ul className="menu">
				<li><Link to="/login">Login</Link></li>
				<li><Link to="/registration">Registration</Link></li>
			</ul>
		</nav>
	)
}

export default Navigation