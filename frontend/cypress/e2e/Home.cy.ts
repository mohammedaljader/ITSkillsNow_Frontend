describe('Home page tests', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('Home page with title and description ', () => {
		cy.contains('Discover new IT courses');
		cy.contains(
			'Start, switch, or advance your career with more than 5,400 courses, Professional Certificates, and degrees from world-class universities and companies.'
		);
	});

	it('Home page with discover courses and jobs buttons', () => {
		cy.get('[data-testid="suggested-jobs-button"]').should('exist');
		cy.get('[data-testid="suggested-courses-button"]').should('exist');
	});

	// it('Home page should contain courses', () => {
	// 	cy.intercept('GET', 'http://localhost:8080/api/course', {
	// 		status: 200,
	// 		body: {
	// 			courseId: '123',
	// 			courseName: 'Example Course',
	// 			courseDescription: 'This is an example course',
	// 			courseImage:
	// 				'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/C_Sharp_wordmark.svg/1200px-C_Sharp_wordmark.svg.png',
	// 			coursePrice: 10,
	// 			courseType: 'Online',
	// 			courseLanguage: 'English',
	// 			isPublished: true,
	// 			username: 'testuser',
	// 		},
	// 	}).as('getCourse');

	// 	cy.get('[data-testid="courses"]').should('exist');
	// });
});
