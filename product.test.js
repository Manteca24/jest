const { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct } = require('./product');

beforeEach(() => {
    resetProducts(); 
});

describe('products management', () => {
    it('should add a product', () => {
        addProduct('item1', 10);
        const products = getProducts();
        expect(products.length).toBe(1);
        expect(products[0]).toEqual({ id: 1, name: 'item1', price: 10 });
    });

    it('should increment the ID by 1 when adding a product', () => {
        addProduct('item1', 10);
        addProduct('item2', 20);
        const products = getProducts();
        expect(products[1].id).toBe(2);
    });

    it('should throw an error if price or name is not defined', () => {
        expect(() => addProduct(undefined, 10)).toThrow('name and price must be defined');
        expect(() => addProduct('Item', undefined)).toThrow('name and price must be defined');
    });

    it('should throw an error if the product already exists', () => {
        addProduct('item1', 10);
        expect(() => addProduct('item1', 15)).toThrow('product already exists');
    });

    it('should remove a product', () => {
        addProduct('item1', 10);
        removeProduct(1);
        expect(getProducts().length).toBe(0);
    });

    it('should throw an error if the product does not exist', () => {
        expect(() => removeProduct(99)).toThrow('product not found');
    });

    it('should get a product by its ID', () => {
        addProduct('item1', 10);
        const product = getProduct(1);
        expect(product).toEqual({ id: 1, name: 'item1', price: 10 });
    });

    it('should throw an error if the product does not exist when searched by ID', () => {
        expect(() => getProduct(99)).toThrow('product not found');
    });

    it('should update the product', () => {
        addProduct('item1', 10);
        updateProduct(1, 'product up to date', 20);
        const product = getProduct(1);
        expect(product).toEqual({ id: 1, name: 'product up to date', price: 20 });
    });

    it('should throw an error if the product to update does not exist', () => {
        expect(() => updateProduct(99, 'item99', 100)).toThrow('product not found');
    });
});
