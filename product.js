let products = [];
let id = 0; 

const resetProducts = () => {
    products = [];
    id = 0;
}

const addProduct = (name, price) => {
    if (!name || !price) {
        throw new Error('name and price must be defined');
    }

    for (let i = 0; i < products.length; i++) {
        if (products[i].name === name) {
            throw new Error('product already exists');
        }
    }

    id++;
    products.push({ id, name, price });
};

const removeProduct = (productId) => {
    const index = products.findIndex(product => product.id === productId);
    if (index === -1) {
        throw new Error('product not found');
    }
    // filter mejor que splice porque splice modifica el índice (coste de energía y genera errores)
    products = products.filter(p => p.id !==productId)
}

const getProducts = () => products;


const getProduct = (productId) => {
    const product = products.find(product => product.id === productId);
    if (!product) {
        throw new Error('product not found');
    }
    return product;
}

const updateProduct = (productId, name, price) => {
    const product = products.find(product => product.id === productId);
    if (!product) {
        throw new Error('product not found');
    }

    if (name) product.name = name;
    if (price) product.price = price;
}

module.exports = {
    resetProducts,
    addProduct,
    removeProduct,
    getProducts,
    getProduct,
    updateProduct
};
