describe('About us page tests', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/aboutus');
	});
    
    it('About us page with title and description ', () => {
		const description =
			"We are a team of developers passionate about creating high-quality software that meets our clients' needs. Our expertise includes web development, mobile app development, and custom software development. We are committed to delivering results that exceed expectations and provide exceptional customer service.";
		cy.contains('About Us');
		cy.contains(description);
	});

	it('About us page contains 3 social media buttons', () => {
		cy.get('[data-testid="linkedIn-button"]').should('exist');
		cy.get('[data-testid="twitter-button"]').should('exist');
		cy.get('[data-testid="github-button"]').should('exist');
	});
});
