import React from "react";
import ReactDOM from "react-dom";
// container components
import GlobalContainer from "./containers/GlobalContainer";
import { ApolloProvider } from "react-apollo";
import { Router } from "react-router-dom";
// others
import * as serviceWorker from "./serviceWorker";
import history from "./history";
import apolloClient from "./apolloClient";

ReactDOM.render(
	<ApolloProvider client={apolloClient}>
		<Router history={history}>
			<GlobalContainer />
		</Router>
	</ApolloProvider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
