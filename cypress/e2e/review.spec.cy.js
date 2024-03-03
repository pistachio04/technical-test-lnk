describe('Review Our Product Page Test Case', () => {
  it("Visit Review Our Product Page", () =>{
      cy.visit('https://forms.office.com/pages/responsepage.aspx?id=is2XW8LLaEmfFhLKD9VwE9lpKmxdveNGmMWKETZvAWNUMzhBV1lYTlc1SDNRS00xRVg4OFhPODlQTS4u');
      cy.title().should('eq', "Review our product");
      // cy.get('.__title__').contains("Review our product")
      cy.contains('Review our product');
  });

  it("Contains  Full Name, Phone Number, Radio Button, Rate, Review Date Input Text and Submit Button", () => {
      cy.visit('https://forms.office.com/pages/responsepage.aspx?id=is2XW8LLaEmfFhLKD9VwE9lpKmxdveNGmMWKETZvAWNUMzhBV1lYTlc1SDNRS00xRVg4OFhPODlQTS4u');
      
      // check Full Name
      const fullName = cy.get('div[data-automation-id="questionItem"]')
      fullName.contains('Full name').should('exist')
      const placeholderFullName = cy.get('div[data-automation-id="questionItem"] input[aria-label="Single line text"]')
      placeholderFullName.should('have.attr', 'placeholder', 'Enter your answer')
      
      // check Phone Number
      const phoneNumber = cy.get('div[data-automation-id="questionItem"]')
      phoneNumber.contains('Phone Number').should('exist')
      const placeholderPhoneNumber = cy.get('div[data-automation-id="questionItem"] input[aria-label="Single line text"]')
      placeholderPhoneNumber.should('have.attr', 'placeholder', 'Enter your answer')
      
      // check Service
      const service = cy.get('div[data-automation-id="questionItem"]')
      service.contains('Do you think your product or service is affordable or expensive?').should('exist')
      
      const options = ['Affordable', 'Expensive']
      options.forEach(option => {
        cy.get('div[data-automation-id="choiceItem"]').contains(option).should('exist');
      })

      // check Rate our service
      const rateService = cy.get('div[data-automation-id="questionItem"]')
      rateService.contains('Rate our service').should('exist')
      
      // Check 5 star rating
      // cy.get('div[role="radiogroup"]').each(($radiogroup) => {
      //   cy.wrap($radiogroup).within(() => {
      //     cy.get('input[type="radio"]').should('have.length', 5);
      //   });
      // });

      // check Review Date
      const reviewDate = cy.get('div[data-automation-id="questionItem"]')
      reviewDate.contains('Review date').should('exist')
      const placeholderReviewDate = cy.get('div[data-automation-id="questionItem"] input[aria-label="Single line text"]')
      placeholderReviewDate.should('have.attr', 'placeholder', 'Enter your answer')

      // //check button
      const button = cy.get('button[data-automation-id="submitButton"]')
      button.should('be.visible');
      button.contains('Submit');
      button.should('have.css', 'background-color','rgb(40, 118, 123)');
      button.should('have.css', 'color', 'rgb(255, 255, 255)');
  });

  it('Should successfully submit a review with valid data', function() {
    cy.visit('https://forms.office.com/pages/responsepage.aspx?id=is2XW8LLaEmfFhLKD9VwE9lpKmxdveNGmMWKETZvAWNUMzhBV1lYTlc1SDNRS00xRVg4OFhPODlQTS4u');

    const fullName = cy.get(':nth-child(1) > .-bX-48 > .-a-52 > .-nm-63 > .-_Y-62')
    fullName.type('M Sigid Prasetyo')

    const phoneNumber = cy.get(':nth-child(2) > .-bX-48 > .-a-52 > .-nm-63 > .-_Y-62')
    phoneNumber.type('6286543188065')

    const service = cy.get(':nth-child(1) > div > .--F-79 > .-a-80 > .-hb-81')
    service.check('Affordable')

    // cy.contains('Rate our service')
    //   .parents('div[data-automation-id="questionItem"]')
    //   .contains('aria-label', '5 Stars').click()
    //   // .find('div[aria-label="4 Star"]')
    //   .click();

    // cy.get('div[data-automation-id="questionItem"]').contains('Rate our service')
    // cy.contains('aria-label', '5 Stars').click();       // Appears to act like a hover, making the stars fill in but not updating the value
    // cy.get('aria-posinset','5').click({ force: true })
    // cy.findByLabelText('5 Stars').click();         // Fails because the element is hidden from view
    // cy.get('.MuiRating-icon').last().click();      // Fails because the element has CSS pointer-events: none
    // cy.get('[aria-posinset="5"]')

    cy.get('div[data-automation-id="questionItem"]')
      .contains('Review date')
      .parents('div[data-automation-id="questionItem"]')
      .find('input[type="text"]').click()
      .type('3/31/2024')

    // Submit review
    cy.contains('Submit').click();

    // // Verifikasi bahwa review berhasil dikirim
    cy.contains('Your response was submitted.').should('be.visible');
  })

})