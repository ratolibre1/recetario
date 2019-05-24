import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { User } from '../models/model-user';

@Component({
	selector: 'home',
	templateUrl: '../views/home.html',
	providers: [UserService]
})

export class HomeComponent implements OnInit{
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

		console.log('home.component.ts CARGADO');
	}
}