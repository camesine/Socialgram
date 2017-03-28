var yo = require('yo-yo');
var landing = require('../landing');

var signinForm = yo `<div class="col s12 m7">
							<div class="row">
								<div class="signup-box">
									<h1 class="SocialGram">SocialGram</h1>
									<form class="signup-form">
										
										<div class="section">
											<a class="btn btn-fb hide-on-small-only"><i class="fa fa-facebook-official" aria-hidden="true"></i> Iniciar sesion con facebook</a>
											<a class="btn btn-fb hide-on-med-and-up">Iniciar sesion</a>
										</div>
										<div class="divider"></div>
										<div class="section">
											<input type="text" name="username" placeholder="Nombre de usuario">
											<input type="password" name="password" placeholder="**********">
											<button class="btn weavs-effect waver-light btn-signup" type="submit">Inicia sesion</button>
										</div>
									</form>
								</div>
							</div>
							<div class="row">
								<div class="login-box">
									No tienes una cuenta? <a href="/signup">Registrate</a>
								</div>
							</div>`;


module.exports = landing(signinForm);