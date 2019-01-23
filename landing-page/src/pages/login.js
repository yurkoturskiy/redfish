import React from "react"
import Layout from "../components/layout"
import Login from "../containers/LoginContainer"
import { Router } from "@reach/router";

export default () => {
  return (
    <Layout>
      <Router>
        <Home path="login" />
        <Something path="login/asfd" />
      </Router>
    </Layout>
  )
}

const Home = () => (
  <Login/>
)

const Something = () => (
  <h1>Something</h1>
)