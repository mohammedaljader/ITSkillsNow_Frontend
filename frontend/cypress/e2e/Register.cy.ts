describe('Register page tests', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/signup');
	});

	it('Register page should contain title and required fields', () => {
		cy.contains('Sign up');
		cy.get('[data-testid="username-field"]').should('exist');
		cy.get('[data-testid="password-field"]').should('exist');
		cy.get('[data-testid="firstname-field"]').should('exist');
		cy.get('[data-testid="lastname-field"]').should('exist');
		cy.get('[data-testid="email-field"]').should('exist');
		cy.get('[data-testid="signup-button"]').should('exist');
		cy.get('[data-testid="signin-button"]').should('exist');
	});

	it('Click on signin button should redirect to sign in page', () => {
		cy.get('[data-testid="signin-button"]').click();
		cy.url().should('include', 'http://localhost:3000/signin');
	});

	it('should allow a user to register', () => {
		const username = 'testuser';
		const password = 'testpassword';
		const firstName = 'John';
		const lastName = 'Doe';
		const email = 'testuser@example.com';

		cy.intercept('POST', 'http://localhost:8080/auth/register', (req) => {
			req.reply({
				status: 200,
				body: {
					message: 'Registration successful',
				},
			});
		});

		cy.get('[data-testid="firstname-field"]').type(firstName);
		cy.get('[data-testid="lastname-field"]').type(lastName);
		cy.get('[data-testid="username-field"]').type(username);
		cy.get('[data-testid="email-field"]').type(email);
		cy.get('[data-testid="password-field"]').type(password);
		cy.get('[data-testid="signup-button"]').click();

		// Check that a success message is displayed
		cy.contains('Account created succcessfully');

		// Check that the user is redirected to the login page
		cy.url().should('include', 'http://localhost:3000/signin');
	});

	it('register with incorrect email should return an error', () => {
		const username = 'testuser';
		const password = 'testpassword';
		const firstName = 'John';
		const lastName = 'Doe';
		const email = 'testuser';

		cy.get('[data-testid="firstname-field"]').type(firstName);
		cy.get('[data-testid="lastname-field"]').type(lastName);
		cy.get('[data-testid="username-field"]').type(username);
		cy.get('[data-testid="email-field"]').type(email);
		cy.get('[data-testid="password-field"]').type(password);
		cy.get('[data-testid="signup-button"]').click();

		cy.contains('Please enter a valid email address.');
		cy.url().should('include', 'http://localhost:3000/signup');
	});

	it('register with uncomplex password should return an error', () => {
		const username = 'testuser';
		const password = 'aa';
		const firstName = 'John';
		const lastName = 'Doe';
		const email = 'testuser@example.com';

		cy.get('[data-testid="firstname-field"]').type(firstName);
		cy.get('[data-testid="lastname-field"]').type(lastName);
		cy.get('[data-testid="username-field"]').type(username);
		cy.get('[data-testid="email-field"]').type(email);
		cy.get('[data-testid="password-field"]').type(password);
		cy.get('[data-testid="signup-button"]').click();

		cy.contains('Password must be at least 6 characters long.');
		cy.url().should('include', 'http://localhost:3000/signup');
	});

	it('register with empty fields should return an error', () => {
		cy.get('[data-testid="signup-button"]').click();
		cy.contains('Please fill out all fields.');
		cy.url().should('include', 'http://localhost:3000/signup');
	});

	it('register while the backend does not accept it should return an error', () => {
		const username = 'testuser';
		const password = 'testpassword';
		const firstName = 'John';
		const lastName = 'Doe';
		const email = 'testuser@example.com';

		cy.get('[data-testid="firstname-field"]').type(firstName);
		cy.get('[data-testid="lastname-field"]').type(lastName);
		cy.get('[data-testid="username-field"]').type(username);
		cy.get('[data-testid="email-field"]').type(email);
		cy.get('[data-testid="password-field"]').type(password);
		cy.get('[data-testid="signup-button"]').click();

		cy.contains('Failed to create an account, please try again!');

		cy.url().should('include', 'http://localhost:3000/signup');
	});
});
