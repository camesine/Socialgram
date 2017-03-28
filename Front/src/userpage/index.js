import page from 'page'
import header from '../header'
import title from 'title'
import empty from 'empty-element'
import template from './template'

page('/:username', loadUser ,header, (ctx, next) => {
	var main = document.getElementById('main-container')
	title(`Socialgram - ${ctx.params.username}`)

	empty(main).appendChild(template(ctx.user))
})

page('/:username/:id', loadUser ,header, (ctx, next) => {
	var main = document.getElementById('main-container')
	title(`Socialgram - ${ctx.params.username}`)
	empty(main).appendChild(template(ctx.user))
	console.log(ctx.params.id)
	$('.modal').modal();
	$(`#modal${ctx.params.id}`).modal('open');
})

async function loadUser(ctx, next){
	try{
		ctx.user = await fetch(`/api/user/${ctx.params.username}`).then(res => res.json());
		next();
	}catch(err){
		console.log(err);
	}
}