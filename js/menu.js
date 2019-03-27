var type = ["Pizza", "Burger", "Pasta", "Side", "Dip", "Dessert", "Drinks"];

var pizzaSizes = [
    {
        id: 1,
        size: '8"',
        price: 0.00
    },
    {
        id: 2,
        size: '10"',
        price: 2.00
    },
    {
        id: 3,
        size: '12"',
        price: 5.00
    },
    {
        id: 4,
        size: '15"',
        price: 6.00
    }
];

var pizzaXtraToppings = [
    {
        id: 1,
        xtraTropping: 'Anchovies',
        toppingPrice: '1.20'
    },
    {
        id: 2,
        xtraTropping: 'Bacon',
        toppingPrice: '1.20'
    },
    {
        id: 3,
        xtraTropping: 'BBQ chicken',
        toppingPrice: '1.20'
    },
    {
        id: 4,
        xtraTropping: 'Black Olives',
        toppingPrice: '1.20'
    },
    {
        id: 5,
        xtraTropping: 'Capers',
        toppingPrice: '1.20'
    },
    {
        id: 6,
        xtraTropping: 'Chicken',
        toppingPrice: '1.20'
    },
    {
        id: 7,
        xtraTropping: 'Egg',
        toppingPrice: '1.20'
    },
    {
        id: 8,
        xtraTropping: 'Garlic',
        toppingPrice: '1.00'
    },
    {
        id: 9,
        xtraTropping: 'Green Chillies',
        toppingPrice: '1.00'
    },
    {
        id: 10,
        xtraTropping: 'Green Peppers',
        toppingPrice: '1.00'
    },
    {
        id: 11,
        xtraTropping: 'Ham',
        toppingPrice: '1.20'
    },
    {
        id: 12,
        xtraTropping: 'Jalapenos',
        toppingPrice: '1.00'
    },
    {
        id: 13,
        xtraTropping: 'Mushroom',
        toppingPrice: '1.00'
    },
    {
        id: 14,
        xtraTropping: 'Pepperoni',
        toppingPrice: '1.00'
    },
    {
        id: 15,
        xtraTropping: 'Pineapple',
        toppingPrice: '1.20'
    },
    {
        id: 16,
        xtraTropping: 'Prawn',
        toppingPrice: '1.20'
    },
    {
        id: 17,
        xtraTropping: 'Red onions',
        toppingPrice: '1.00'
    },
    {
        id: 18,
        xtraTropping: 'Salami',
        toppingPrice: '1.20'
    },
    {
        id: 19,
        xtraTropping: 'Spicy Beef',
        toppingPrice: '1.20'
    },
    {
        id: 20,
        xtraTropping: 'Sweetcorn',
        toppingPrice: '1.00'
    },
    {
        id: 21,
        xtraTropping: 'Tandoori Chicken',
        toppingPrice: '1.20'
    },
    {
        id: 22,
        xtraTropping: 'Tomato',
        toppingPrice: '1.00'
    },
    {
        id: 23,
        xtraTropping: 'Tomato Sauce',
        toppingPrice: '1.00'
    },
    {
        id: 24,
        xtraTropping: 'Tuna',
        toppingPrice: '1.20'
    }
];

var menu = [
    {
        id: 1,
        item: 'Margherita',
        type: 'Pizza',
        price: 9.99,
        info: 'Cheese & tomato sauce',
        options: [
            {
                pizzaSizes: pizzaSizes,
                pizzaXtrafrToppings: pizzaXtraToppings
            }
        ]
    },
    {
        id: 2,
		item: 'Hawaiian',
		type: 'Pizza',
		price: 9.99,
		info: 'Ham & pineapple',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 3,
		item: 'Beefater',
		type: 'Pizza',
		price: 9.99,
		info: 'Spicy beef, red onion & mushrooms',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 4,
		item: 'Spicy Chicken Mixed',
		type: 'Pizza',
		price: 9.99,
		info: 'Tandoori chicken, plain chicken, mixed peppers & jalapeno peppers',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 5,
		item: 'Nice & Spicy',
		type: 'Pizza',
		price: 9.99,
		info: 'Red onion, green peppers, pepperoni, beef & jalapeno',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 6,
		item: 'BBQ Chicken',
		type: 'Pizza',
		price: 9.99,
		info: 'BBQ chicken, BBQ sauce, mushrooms, mixed peppers & onions',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 7,
		item: 'BBQ Pizza',
		type: 'Pizza',
		price: 9.99,
		info: 'BBQ sauce,bacon,mushrooms,onions,mixed peppers & chicken',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 8,
		item: 'Indiano',
		type: 'Pizza',
		price: 9.99,
		info: 'Tandoori chicken, chillies, onions & fresh tomatoes',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 9,
		item: 'Donner Pizza',
		type: 'Pizza',
		price: 9.99,
		info: 'Donner meat, mushroom, onions & green pepper',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 10,
		item: 'Chicken Tandoori',
		type: 'Pizza',
		price: 9.99,
		info: 'Tandoori chicken,onions,mixed peppers & sweetcorn',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 11,
		item: 'Meat Feast',
		type: 'Pizza',
		price: 9.99,
		info: 'Beef, ham, pepperoni & salami',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 12,
		item: 'Pepperoni Plus',
		type: 'Pizza',
		price: 9.99,
		info: 'Double pepperoni & double cheese',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 13,
		item: 'Pepperoni Deluxe',
		type: 'Pizza',
		price: 9.99,
		info: 'Pepperoni, mushrooms, mixed peppers & black olives',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 14,
		item: 'American Hot',
		type: 'Pizza',
		price: 9.99,
		info: 'Pepperoni, jalapeno peppers, onions & mixed peppers',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 15,
		item: 'Seafood',
		type: 'Pizza',
		price: 9.99,
		info: 'Prawns, tuna, anchovies & fresh tomato',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 16,
		item: 'Vegetarian',
		type: 'Pizza',
		price: 9.99,
		info: 'Onions, mixed peppers, sweetcorn & mushrooms',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 17,
		item: 'Vegetarian Classic',
		type: 'Pizza',
		price: 9.99,
		info: 'Onions,mushrooms,mixed peppers,sweetcorn & asparagus',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 18,
		item: 'Vegetarian Deluxe',
		type: 'Pizza',
		price: 9.99,
		info: 'Onions, spinach, fresh tomatoes & black olives',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 19,
		item: 'Roasted Vegetarian',
		type: 'Pizza',
		price: 9.99,
		info: 'Green peppers, fresh garlic, red onions, aubergines & courgettes',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 20,
		item: 'Vegetarian Hot',
		type: 'Pizza',
		price: 9.99,
		info: 'Onions, mixed peppers, mushroom, jalapeno peppers & hot chillies',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 21,
		item: 'Mexican Hot',
		type: 'Pizza',
		price: 9.99,
		info: 'Double beef, jalapeno peppers, red onions & pepperoni',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 22,
		item: 'Garlic Meat Lover',
		type: 'Pizza',
		price: 9.99,
		info: 'Garlic sauce, smokey bacon, pepperoni & ham',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 23,
		item: 'Spicy Hot One',
		type: 'Pizza',
		price: 9.99,
		info: 'Double beef, jalapeno peppers, red onions & hot chilli',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 24,
		item: 'Mexican Hot & Spicy',
		type: 'Pizza',
		price: 9.99,
		info: 'Pepperoni, beef, onions, mixed peppers, chicken & jalapeno peppers',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 25,
		item: 'Popeye',
		type: 'Pizza',
		price: 9.99,
		info: 'Bacon, spinach, egg & fresh garlic',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 26,
		item: 'Capricosa',
		type: 'Pizza',
		price: 9.99,
		info: 'Garlic sauce, pepperoni, black olives, fresh tomatoes, anchovies & capers',
		options: [
			{
				pizzaSizes: pizzaSizes,
				pizzaXtraToppings: pizzaXtraToppings
			}
		]
	},
    {
        id: 27,
        item: 'Fish Fillet Burger',
        type: 'Burger',
        price: 2.99,
        options: []
    },
    {
        id: 28,
        item: 'Half Pounder Burger with Cheese',
        type: 'Burger',
        price: 3.99,
        options: []
    },
    {
        id: 29,
        item: 'Vegi Burger',
        type: 'Burger',
        price: 2.99,
        options: []
    },
    {
        id: 30,
        item: 'Spagetti Bolognese',
        type: 'Pasta',
        price: 5.99,
        options: []
    },
    {
        id: 31,
        item: 'Meat Lasagne',
        type: 'Pasta',
        price: 5.99,
        options: []
    },
    {
        id: 32,
        item: 'Vegtable Lasgane',
        type: 'Pasta',
        price: 5.99,
        options: []
    },
    {
        id: 33,
        item: 'Garlic Bread (4)',
        type: 'Side',
        price: 1.99,
        options: []
    },
    {
        id: 34,
        item: 'Cheesy Garlic Bread (4)',
        type: 'Side',
        price: 2.50,
        options: []
    },
    {
        id: 35,
        item: 'BBQ Wings (6)',
        type: 'Side',
        price: 3.50,
        options: []
    },
    {
        id: 36,
        item: 'Spicy Wings (6)',
        type: 'Side',
        price: 3.50,
        options: []
    },
    {
        id: 37,
        item: 'Chips',
        type: 'Side',
        price: 3.50,
        options: [
            {
                id: 1,
                option: "Regular",
                price: 0.00
            },
            {
                id: 2,
                option: "Wedges",
                price: 1.00
            },
            {
                id: 3,
                option: "Cheesy",
                price: 1.00
            }
        ]
    },
    {
        id: 38,
        item: 'Corn on the Cob',
        type: 'Side',
        price: 2.50,
        options: []
    },
    {
        id: 39,
        item: 'Onion Rings (10)',
        type: 'Side',
        price: 2.50,
        options: []
    },
    {
        id: 40,
        item: 'BBQ',
        type: 'Dip',
        price: 0.50,
        options: []
    },
    {
        id: 41,
        item: 'Chilli',
        type: 'Dip',
        price: 0.50,
        options: []
    },
    {
        id: 42,
        item: 'Garlic Mayo',
        type: 'Dip',
        price: 0.50,
        options: []
    },
    {
        id: 43,
        item: 'Ketchup',
        type: 'Dip',
        price: 0.50,
        options: []
    },
    {
        id: 44,
        item: 'Sour Cream',
        type: 'Dip',
        price: 0.50,
        options: []
    },
    {
        id: 45,
        item: 'Breaded Mozzarella Sticks (6)',
        type: 'Side',
        price: 3.50,
        options: []
    },
    {
        id: 46,
        item: 'Salad',
        type: 'Side',
        price: 2.00,
        options: ['ADD OPTIONS HERE']
    },
    {
        id: 47,
        item: 'Ice Cream',
        type: 'Dessert',
        price: 2.50,
        options: [
            {
                id: 1,
                option: "Vanilla",
                price: 0.00
            },
            {
                id: 2,
                option: "Strawbery",
                price: 0.00 
            },
            {
                id: 3,
                option: "Chocolate",
                price: 0.00
            },
            {
                id: 4,
                option: "Mint",
                price: 0.00
            },
            {
                id: 5,
                option: "Cookies and Cream",
                price: 0.00
            },
            {
                id: 6,
                option: "Berry",
                price: 0.00
            }
        ]
    },
    {
        id: 48,
        item: 'Tennessee Toffee Pie',
        type: 'Dessert',
        price: 2.50,
        options: []
    },
    {
        id: 49,
        item: 'Chocolate Fudge Cake',
        type: 'Dessert',
        price: 2.50,
        options: []
    },
    {
        id: 50,
        item: 'Cheesecake',
        type: 'Dessert',
        price: 2.50,
        options: [
            {
                id: 1,
                option: "Chocolate",
                price: 0.00
            },
            {
                id: 2,
                option: "Strawberry",
                price: 0.00
            },
            {
                id: 3,
                option: "Lemon",
                price: 0.00
            }
        ]
    },
    {
        id: 51,
        item: 'Coke',
        type: 'Drinks',
        price: 1.75,
        options: []
    },
    {
        id: 52,
        item: 'Diet Coke',
        type: 'Drinks',
        price: 1.75,
        options: []
    },
    {
        id: 53,
        item: 'Fanta',
        type: 'Drinks',
        price: 1.75,
        options: []
    },
    {
        id: 54,
        item: '7-Up',
        type: 'Drinks',
        price: 1.75,
        options: []
    }
];