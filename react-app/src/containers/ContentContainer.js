import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Main from './MainContainer'
import Login from './auth/LoginContainer'
import Registration from './auth/RegistrationContainer'
import PasswordReset from './auth/PasswordResetContainer'
import PasswordResetConfirm from './auth/PasswordResetConfirmContainer'


const Content = () => {
	return (
		<div className="content">
			<Switch>
				<Route exact path="/" component={Main}/>
				<Route path="/login" component={Login}/>
				<Route path="/registration" component={Registration}/>
				<Route exact path="/password-reset" component={PasswordReset}/>
				<Route path="/password-reset/confirm/:uid/:token" component={PasswordResetConfirm}/>
			</Switch>
		</div>
	)
}

export default Content