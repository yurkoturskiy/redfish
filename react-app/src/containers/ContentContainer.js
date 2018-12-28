import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Main from './MainContainer'
import Login from './auth/LoginContainer'
import Registration from './auth/RegistrationContainer'
import Profile from './auth/ProfileContainer'
import PasswordReset from './auth/PasswordResetContainer'
import PasswordResetConfirm from './auth/PasswordResetConfirmContainer'

import Application from './ApplicationContainer'


const Content = () => {
	return (
		<div className="content">
			<Switch>
			{/* for not loged in users */}
				<Route exact path="/" component={Main}/>
				<Route path="/login" component={Login}/>
				<Route path="/registration" component={Registration}/>
				<Route exact path="/password-reset" component={PasswordReset}/>
				<Route path="/password-reset/confirm/:uid/:token" component={PasswordResetConfirm}/>
			{/* auth required */}
				<Route path="/profile" component={Profile}/>
				<Route path="/app" component={Application}/>
			</Switch>
		</div>
	)
}

export default Content