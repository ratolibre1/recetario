import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Ingredient } from '../models/model-ingredient';

@Injectable()
export class IngredientService{
	public url: string;

	constructor(private _http: Http){
		this.url = GLOBAL.url;
	}

	getIngredients(token, page: String){
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});

		let options = new RequestOptions({headers: headers});
		return this._http.get(this.url+'ingredients/'+page, options).map(res => res.json());	
	}

	getIngredientAlphabet(token){
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});

		let options = new RequestOptions({headers: headers});
		return this._http.get(this.url+'ingredient-alphabet/', options).map(res => res.json());	
	}

	getIngredient(token, id: string){
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});

		let options = new RequestOptions({headers: headers});
		return this._http.get(this.url+'ingredient/'+id, options).map(res => res.json());
	}

	addIngredient(token, ingredient: Ingredient){
		let params = JSON.stringify(ingredient);
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});

		return this._http.post(this.url+'ingredient', params, {headers: headers}).map(res => res.json());
	}

	editIngredient(token, id: string, ingredient: Ingredient){
		let params = JSON.stringify(ingredient);
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});

		return this._http.put(this.url+'ingredient/'+id, params, {headers: headers}).map(res => res.json());
	}

	deleteIngredient(token, id: string){
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});

		let options = new RequestOptions({headers: headers});
		return this._http.delete(this.url+'ingredient/'+id, options).map(res => res.json());
	}
}