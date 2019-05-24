export class Recipe{
	constructor(
		public _id: string,
		public name: string,
		public desc: string,
		public author: string,
		public category: string,
		public ingredients: string,
		public steps: string,
		public image: string,
		public thumbnail: string,
		public portions: number,
		public difficulty: number,
		public cookingTime: number,
		public comment: string
	){}
}