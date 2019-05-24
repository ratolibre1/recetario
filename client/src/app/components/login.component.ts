import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { User } from '../models/model-user';

@Component({
	selector: 'login',
	templateUrl: '../views/login.html',
	providers: [UserService]
})

export class LoginComponent implements OnInit{
	public identity;
	public token;
	public user: User;
	public alertMessage;
	public url = GLOBAL.url;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService
	){
		this.user = new User('', '', '', '', '', '', 'ROLE_READER', '');

		console.log("ASDF " + this.user);
		// LocalStorage
		/*this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.user = this.identity;*/
	}

	ngOnInit(){
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		if(this.identity != null){
			this.user = this.identity;
		}

		console.log(this.identity + " " + this.token);
	}

	public onSubmit(){
		console.log(this.user);

		//Conseguir los datos del usuario identificado
		this._userService.signup(this.user).subscribe(
		response => {
			let identity = response.user;
			this.identity = identity;

			if(!this.identity._id){
				alert("El usuario no está correctamente identificado");
			} else {
				//Crear sesión en local storage
				localStorage.setItem('identity', JSON.stringify(identity));

				//Conseguir el token para enviarselo a cada petición HTTP
				this._userService.signup(this.user, 'true').subscribe(
					response => {
						let token = response.token;
						this.token = token;

						if(this.token.length <= 0){
							alert("El token no se ha generado");
						} else {
							//Crear sesión en local storage para tener token disponible
							localStorage.setItem('token', token);

							this.user = new User('', '', '', '', '', '', 'ROLE_READER', '');
						}

						this._router.navigate(['home']);
					}, error => {
						if(error != null){
							var body = JSON.parse(error._body);
							this.alertMessage = body.message;
							console.log(error);
						}
				});
			}
		}, error => {
			if(error != null){
				var body = JSON.parse(error._body);
				this.alertMessage = body.message;
				console.log(error);
			}
		});
	}
}