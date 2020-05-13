const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];
const {products} = require('./data/products.json');

function byId(ids,list){
	return list.filter((e) => {
		if(ids.includes(e.id)){
			return e;
		}
	});
}

function filterProducts(ids, list) {
	
	let cartProducts = byId(ids, list);

	return cartProducts;

} 	

function setPromo(list){
	
	let countCategory = {'T-SHIRTS': 0, 'PANTS': 0, 'SHOES': 0, 'BAGS': 0};

	list.map((e) => {
		countCategory[e.category]++;
	});

	let count = Object.values(countCategory);

	return promotions[(count.reduce((a, b) => Math.max(a,b))) - 1];

}

function regularPrice(list) {

	const regularPrice = list.map((e) => e.regularPrice);
	return regularPrice.reduce((a,b) => a + b);

};

function getDiscount(list, promotion){

	list.forEach((e) => {
		console.log(e);
	})
	

}

function filterProps(list){
	let filterProducts = [];

	list.map((e) => {
		filterProducts.push({
			name: e.name,
			category:  e.category
		});
	});

	return filterProducts;
};


function getShoppingCart(ids, productsList) {

	let cartItens = filterProducts(ids, productsList);
	
	let auxObject = {		
		totalPrice: 0,
		discountValue: 0,
		discountPercentage: 0
	};

	getDiscount(cartItens, setPromo(cartItens));

	let cart = {
		products: filterProps(cartItens),
		promotion: setPromo(cartItens),
		regularPrice: regularPrice(cartItens).toFixed(2),
	};

	//console.log(cart);	

	return {};
}

getShoppingCart([120, 230, 310, 490], products);
//getShoppingCart([130, 140, 230, 260], products);

module.exports = { getShoppingCart };
