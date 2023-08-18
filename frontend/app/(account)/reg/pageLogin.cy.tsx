import React from 'react'
import Register from './page'
import '@/app/globals.css'

describe('<Register />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Register />)
  })
})