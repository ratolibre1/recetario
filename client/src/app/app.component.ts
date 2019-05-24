import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './services/global';
import { UserService } from './services/user.service';
import { User } from './models/model-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
	providers: [UserService]
})
export class AppComponent {
	public title = "Recetario";
	public user: User;
	public identity;
	public token;
	public errorMessage;
	public alertRegister;
	public url = GLOBAL.url;

	constructor(		
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService:UserService		
	){
		this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
	}

	ngOnInit(){
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();

		if(this.identity != null){
			this.user = this.identity;
		}

		console.log(this.identity + " " + this.token);
	}

	logout(){
		localStorage.removeItem('identity');
		localStorage.removeItem('token');
		localStorage.clear();

		this.identity = null;
		this.token = null;
		this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
		this._router.navigate(['home']);
	}
}