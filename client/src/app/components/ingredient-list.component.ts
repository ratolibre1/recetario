import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { IngredientService } from '../services/ingredient.service';
import { Ingredient } from '../models/model-ingredient';

@Component({
	selector: 'ingredient-list',
	templateUrl: '../views/ingredient-list.html',
	providers: [UserService, IngredientService]
})

export class IngredientListComponent implements OnInit{
	public titulo: string;
	public ingredients: Ingredient[];
	public identity;
	public token;
	public url: string;
	public alphabet: String[];
	public currentPage: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _ingredientService: IngredientService
	){
		this.titulo = 'Ingredientes';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	}

	ngOnInit(){
		console.log('ingredient-list.component.ts CARGADO');

		//Conseguir listado de ingredientes
		this.getIngredients();

		this.getAlphabet();
	}

	getIngredients(){
		this._route.params.forEach((params: Params) => {
			this.currentPage = params['page'];
			if(!this.currentPage){
				this.currentPage = "a";
			} else {
				this._ingredientService.getIngredients(this.token, this.currentPage).subscribe(
					response => {
						if(!response.ingredients){
							this._router.navigate(['/']);
						} else {
							this.ingredients = response.ingredients;
						}
					},
					error => {
						var errorMessage = <any>error;
						
						if(errorMessage != null){
							var body = JSON.parse(error._body);
							//this.alertMessage = body.message;
							console.log(error);
						}
					});
			}
		});
	}

	getAlphabet(){
		this._route.params.forEach((params: Params) => {
			this._ingredientService.getIngredientAlphabet(this.token).subscribe(
				response => {
					if(!response.alphabet){
						this._router.navigate(['/']);
					} else {
						this.alphabet = response.alphabet;
					}
				},
				error => {
					var errorMessage = <any>error;
					
					if(errorMessage != null){
						var body = JSON.parse(error._body);
						//this.alertMessage = body.message;
						console.log(error);
					}
				});
		});
	}

	public confirmado;
	onDeleteConfirm(id){
		this.confirmado = id;
	}

	onCancelIngredient(){
		this.confirmado = null;
	}

	onDeleteIngredient(id){
		this._ingredientService.deleteIngredient(this.token, id).subscribe(
			response => {
				if(!response.ingredient){
					alert('Error en el servidor');
				}
				this.getIngredients();
			},
			error => {
				var errorMessage = <any>error;
				
				if(errorMessage != null){
					var body = JSON.parse(error._body);
					//this.alertMessage = body.message;
					console.log(error);
				}
			});
	}
}