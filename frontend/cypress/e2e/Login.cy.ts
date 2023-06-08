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

	it('allows a user to log in with valid credentials', () => {
		const username = 'myusername';
		const password = 'mypassword';

		cy.intercept(
			'POST',
			'http://localhost:8080/auth/login-multiFactor',
			(req) => {
				req.reply({
					status: 200,
					body: 'Code sent to your email for multifactor authentication!',
				});
			}
		);

		cy.get('form').within(() => {
			cy.get('input[name="username"]').type(username);
			cy.get('input[name="password"]').type(password);
			cy.get('button[type="submit"]').click();
		});

		cy.contains('Code sent to your email for multifactor authentication!');

		
		cy.url().should('include', 'http://localhost:3000/signin');
	});

	it('test multifactor page with correct code', () => {
		const username = 'myusername';
		const password = 'mypassword';

		cy.intercept(
			'POST',
			'http://localhost:8080/auth/login-multiFactor',
			(req) => {
				req.reply({
					status: 200,
					body: 'Code sent to your email for multifactor authentication!',
				});
			}
		);

		cy.get('form').within(() => {
			cy.get('input[name="username"]').type(username);
			cy.get('input[name="password"]').type(password);
			cy.get('button[type="submit"]').click();
		});

		cy.intercept(
			'POST',
			'http://localhost:8080/auth/check-multiFactor',
			(req) => {
				req.reply({
					status: 200,
					body: 'Sign in successfully!',
				});
			}
		);

		cy.get('input[name="code"]').type('123456');
		cy.get('button[type="submit"]').click();

		cy.contains('You signed in successfully!');

		cy.url().should('include', 'http://localhost:3000');
	});
});
