export class Product {
    id: number;
    title: string;
    description: string;
    image: string;
    price: string;
    mass: string;
    mainCategory: string[];
    subCategories: string[];

    constructor(obj?: Partial<Product>) {
        this.id = obj?.id ?? 0;
        this.title = obj?.title ?? '';
        this.description = obj?.description ?? '';
        this.image = obj?.image ?? '';
        this.price = obj?.price ?? '';
        this.mass = obj?.mass ?? '';
        this.mainCategory = obj?.mainCategory ?? [];
        this.subCategories = obj?.subCategories ?? [];
    }
}
