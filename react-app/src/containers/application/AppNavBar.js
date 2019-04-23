import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { withRouter } from 'react-router'
import { withApollo } from 'react-apollo'
import Logo from './Logo'
import PreferencesBtn from './preferences/PreferencesBtn'

export const Wrapper = styled.div`
  height: 128px;
`

function NavBar(props) {
  return (
    <Wrapper>
      <Logo />
      <PreferencesBtn />
    </Wrapper>
  )
}

export default withRouter(NavBar)