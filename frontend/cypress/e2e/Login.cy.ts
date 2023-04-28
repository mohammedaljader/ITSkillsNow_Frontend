describe('Login page tests', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/signin');
	});

	it('Login page should contain title and required fields', () => {
		cy.contains('Sign in');
		cy.get('[data-testid="username-field"]').should('exist');
		cy.get('[data-testid="password-field"]').should('exist');
		cy.get('[data-testid="rememberme-radiobutton"]').should('exist');
		cy.get('[data-testid="signin-button"]').should('exist');
		cy.get('[data-testid="forgetpassword-button"]').should('exist');
		cy.get('[data-testid="signup-button"]').should('exist');
	});

	it('Click new password should redirct to the new password page', () => {
		cy.get('[data-testid="forgetpassword-button"]').click();
		cy.url().should('include', 'http://localhost:3000/newpassword');
	});

	it('allows a user to log in with valid credentials', () => {
		const username = 'myusername';
		const password = 'mypassword';

		cy.intercept('POST', 'http://localhost:8080/auth/login', (req) => {
			req.reply({
				status: 200,
				body: {
					status: 'success',
					message: 'Login successful!',
				},
			});
		});

		cy.get('form').within(() => {
			cy.get('input[name="username"]').type(username);
			cy.get('input[name="password"]').type(password);
			cy.get('button[type="submit"]').click();
		});

		cy.contains('You signed in successfully!');

		// Check that the user is redirected to the correct page after logging in
		cy.url().should('include', 'http://localhost:3000');
	});

	it('displays an error message for invalid credentials', () => {
		const username = 'myusername';
		const password = 'incorrectpassword';

		cy.get('form').within(() => {
			cy.get('input[name="username"]').type(username);
			cy.get('input[name="password"]').type(password);
			cy.get('button[type="submit"]').click();
		});

		cy.contains('Wrong username or password!');

		// Check that the user remains on the login page
		cy.url().should('include', 'http://localhost:3000/signin');
	});
});
