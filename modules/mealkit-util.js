
let mealkits = [
    {
        title: 'Grilled Salmon Delight',
        includes: 'Lemon herb-marinated grilled salmon, quinoa salad, roasted asparagus',
        description: 'Lemon herb-marinated grilled salmon served with quinoa salad and roasted asparagus.',
        category: 'Classic',
        price: 22.99, // in CAD
        cookingTime: 30, // Estimated minutes
        servings: 2, // Estimated number of people
        imageUrl: '/images/salmon.png',
        featuredMealKit: true
    },
    {
        title: 'Truffle Mushroom Risotto',
        includes: 'Creamy risotto, wild mushrooms, truffle oil, Parmesan, chives',
        description: 'Creamy risotto with wild mushrooms, truffle oil, Parmesan, and chives.',
        category: 'Classic',
        price: 18.99,
        cookingTime: 45, 
        servings: 2, 
        imageUrl: '/images/risotto.png',
        featuredMealKit: true
    },
    {
        title: 'Mediterranean Chickpea Bowl',
        includes: 'Chickpeas, tomatoes, cucumber, olives, feta, lemon vinaigrette',
        description: 'Chickpea bowl with tomatoes, cucumber, olives, feta, and lemon vinaigrette.',
        category: 'Classic',
        price: 14.99, // in CAD
        cookingTime: 20, // Estimated minutes
        servings: 2, // Estimated number of people
        imageUrl: '/images/chickpeas.png',
        featuredMealKit: true
    },
    {
        title: 'Teriyaki Chicken',
        includes: 'Chicken thighs, teriyaki sauce, jasmine rice, broccoli',
        description: 'Succulent chicken thighs glazed in a sweet and savory teriyaki sauce, served with jasmine rice and broccoli.',
        category: 'Classic',
        price: 21.99, // in CAD
        cookingTime: 40,
        servings: 2,
        imageUrl: '/images/teriyaki_chicken.png',
        featuredMealKit: false
    },    
    {
        title: 'Quinoa and Black Bean Tacos',
        includes: 'Quinoa, black beans, avocado, red cabbage, lime',
        description: 'Tacos filled with a flavorful mix of quinoa and black beans, topped with avocado and red cabbage.',
        category: 'Vegan',
        price: 16.99, // in CAD
        cookingTime: 25,
        servings: 2,
        imageUrl: '/images/quinoa_black_bean_tacos.png',
        featuredMealKit: false
    },
    {
        title: 'Thai Green Curry with Tofu',
        includes: 'Tofu, green curry paste, coconut milk, bell peppers, basmati rice',
        description: 'Spicy Thai green curry with tofu and bell peppers, served over basmati rice.',
        category: 'Vegan',
        price: 18.99, // in CAD
        cookingTime: 30,
        servings: 2,
        imageUrl: '/images/thai_green_curry_tofu.png',
        featuredMealKit: false
    },
    {
        title: 'Roasted Vegetable Pasta',
        includes: 'Whole wheat pasta, zucchini, bell peppers, cherry tomatoes, olive oil',
        description: 'Whole wheat pasta with roasted zucchini, bell peppers, and cherry tomatoes, drizzled with olive oil.',
        category: 'Vegan',
        price: 15.99, // in CAD
        cookingTime: 35,
        servings: 2,
        imageUrl: '/images/roasted_vegetable_pasta.png',
        featuredMealKit: false
    }
]

module.exports.getAllMealKits = function() {
    return mealkits;
}

module.exports.getFeaturedMealKits = function(mealkits) {
    //creating the .filter behavior
    let arr = [];
    mealkits.forEach(mealkit => {
        if (mealkit.featuredMealKit) {
            arr.push(mealkit);
        }
    });
    return arr;
}

module.exports.getMealKitsByCategory = function(mealkits) {
    let categoriesArr = [];
    let arr = [];

    //first iteration - create an array of categories
    mealkits.forEach(mealkit => {
        if(!categoriesArr.includes(mealkit.category)) {
            categoriesArr.push(mealkit.category);
        }
    })

    //for each category, create an object with an array of mealkits
    categoriesArr.forEach(category => {
        let obj = {
            categoryName: category,
            mealkits: []
        }

        //push the meals to the correct category array of meals
        mealkits.forEach(mealkit => {
            if (mealkit.category == obj.categoryName) {
                obj.mealkits.push(mealkit);
            }
        })

        arr.push(obj);
    })

    return arr;
}