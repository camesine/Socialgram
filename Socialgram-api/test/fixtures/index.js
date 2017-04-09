module.exports = {
	getImage () {
		return {
			id: '6a238b19-3ee3-4d5c-acb5-944a3c1fb407',
			publicId: '3ehqEZvwZByc6hjzgEZU5p',
			userId: 'socialgram',
			liked: false,
			likes: 0,
			src: 'http://socialgram.test/3ehqEZvwZByc6hjzgEZU5p.jpg',
			description: '#awesome',
			tags: [ 'awesome' ],
			createdAt: new Date().toString()
		}
	},
	getImages () {
		return [
			this.getImage(),
			this.getImage(),
			this.getImage()
		]
	},
	getImagesByTag () {
		return [
			this.getImage(),
			this.getImage()
		]
	},
	getUser () {
		return {
			id: '6a238b19-3ee3-4d5c-acb5-944a3c1fb407',
			name: 'name',
			username: 'nametor',
			email: 'a@platzi.com',
			password: 'pl4tzi',
			createdAt: new Date().toString()
		}
	}
}