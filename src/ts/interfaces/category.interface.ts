export interface ICategory {
	name: string;
	subCategories?: ISubCategory[];
}

export interface ISubCategory extends Pick<ICategory, 'name'> {}
