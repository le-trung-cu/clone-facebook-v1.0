import React from 'react'
import Home from './page'
import Setup from './setup'

describe('<Home />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Home />)
  })
})