import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { User } from '../models/model-user';

@Component({
	selector: 'register',
	templateUrl: '../views/register.html',
	providers: [UserService]
})

export class RegisterComponent implements OnInit{
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
		/*this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		if(this.identity != null){
			this.user = this.identity;
		}

		console.log(this.identity + " " + this.token);*/
	}

	public onSubmitRegister(){
		console.log(this.user);

		this._userService.register(this.user).subscribe(
		response => {
			let user = response.user;
			this.user = user;

			if(!user._id){
				//this.alertRegister = "Error al registrarse";
			} else {
				//this.alertRegister = "El registro ha sido exitoso, identifícate con " + this.user_register.email;
				this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
			}
		},
		error => {
			var errorMessage = <any>error;
			
			if(errorMessage != null){
				var body = JSON.parse(error._body);
				//this.alertRegister = body.message;
				console.log(error);
			}
		});
	}
}