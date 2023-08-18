import React from 'react'
import RegisterForm from '.'
import '@/app/globals.css'

describe('render firstName, lastName, email,password <RegisterForm />', () => {
  it('render input', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RegisterForm />)

    cy.get('[data-test_id="firstName"]').should('exist')
    cy.get('[data-test_id="lastName"]').should('exist')
    cy.get('[data-test_id="email"]').should('exist')
    cy.get('[data-test_id="password"]').should('exist')
    
    

    //Giới tính
  })
})

describe('test birth day', () => {
  it('render bDay, bMonth, bYear as select box', () => {
    cy.mount(<RegisterForm/>)
    //Ngày sinh
    cy.get('[data-test_id="bDay"]').should('exist')
    cy.get('[data-test_id="bMonth"]').should('exist')
    cy.get('[data-test_id="bYear"]').should('exist')
    cy.get('[data-test_id="guid_button_birth_day"]').should('exist')
    cy.get('[data-test_id="guid_button_birth_day"]+.TooltipInfo_content').should('not.exist')
    // click to show tooltip
    cy.get('[data-test_id="guid_button_birth_day"]>button').click()
    cy.get('[data-test_id="guid_button_birth_day"]+.TooltipInfo_content').should('exist')

    // click again to close tooltip
    cy.get('[data-test_id="guid_button_birth_day"]>button').click()
    cy.get('[data-test_id="guid_button_birth_day"]+.TooltipInfo_content').should('not.exist')
  })

  it('intial values of selects with current date', () => {
    cy.clock(Date.UTC(2023, 0, 1), ['Date'])
    cy.mount(<RegisterForm/>)
    cy.get('[data-test_id="bDay"]').should('have.value', 1)
    cy.get('[data-test_id="bMonth"]').should('have.value', 1)
    cy.get('[data-test_id="bYear"]').should('have.value', 2023)
    cy.clock().invoke('restore')

    cy.clock(Date.UTC(1995, 11, 3), ['Date'])
    cy.mount(<RegisterForm/>)
    cy.get('[data-test_id="bDay"]').should('have.value', 3)
    cy.get('[data-test_id="bMonth"]').should('have.value', 12)
    cy.get('[data-test_id="bYear"]').should('have.value', 1995)
    cy.clock().invoke('restore')

  })

  it('bDay select should change value when select new value', () => {
    cy.mount(<RegisterForm/>)
    cy.get('[data-test_id="bDay"]').select('1').should('have.value', '1')
    cy.get('[data-test_id="bDay"]').select('2').should('have.value', '2')
    cy.get('[data-test_id="bDay"]').select('10').should('have.value', '10')
    cy.get('[data-test_id="bDay"]').select('20').should('have.value', '20')
  })

  it('bMonth select should change value when select new value', () => {
    cy.mount(<RegisterForm/>)
    cy.get('[data-test_id="bMonth"]').select('1').should('have.value', '1')
    cy.get('[data-test_id="bMonth"]').select('2').should('have.value', '2')
    cy.get('[data-test_id="bMonth"]').select('10').should('have.value', '10')
  })

  it('bYear select should change value when select new value', () => {
    cy.mount(<RegisterForm/>)
    cy.get('[data-test_id="bYear"]').select('2023').should('have.value', '2023')
    cy.get('[data-test_id="bYear"]').select('2010').should('have.value', '2010')
    cy.get('[data-test_id="bYear"]').select('2000').should('have.value', '2000')
  })

})

describe('test gender', () => {
  it('render 3 input radio genderType', () => {
    cy.mount(<RegisterForm/>)
    cy.get('[data-test_id="genderTypes"] input[type="radio"]').should('have.length', 3)
  })

  describe('test gender custom', () => {
    it('toggle show hide gender custom', () => {
      cy.mount(<RegisterForm/>)
      cy.get('[data-test_id="genderCustome"]').should('not.exist')
      cy.get('[data-test_id="genderTypes"] input[type="radio"]').eq(2).click()
      cy.get('[data-test_id="genderCustome"]').should('exist')
      cy.get('[data-test_id="genderTypes"] input[type="radio"]').eq(1).click()
      cy.get('[data-test_id="genderCustome"]').should('not.exist')
    })
  })
})

describe('test validate', () => {
  it('show error message when focus on firstName input has status error', () => {
    cy.mount(<RegisterForm/>)
    cy.get('input[name="firstName"]').focus()
    cy.get('input[name="firstName"]').blur()
    cy.get('input[name="firstName"]').focus()

    cy.get('button[type="submit"]').click()
  })
})