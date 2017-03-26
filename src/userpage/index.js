import page from 'page'
import header from '../header'
import title from 'title'
import empty from 'empty-element'
import template from './template'

page('/:username', header, (ctx, next) => {
	var main = document.getElementById('main-container')
	title(`Socialgram - ${ctx.params.username}`)

	empty(main).appendChild(template(ctx.params.username))
})