// Add all the Categories to the Menu and Cateogry Section
type.forEach(function (cat) {

    $(".mid-container").append(
                "<div class='menu-category " + cat.toLowerCase() + "' >\n" +
                    "<div class='cat-title'>\n" +
                        "<h2>" + cat + "</h2>\n" +
                        "<hr>\n" +
                    "</div>\n" +
                "<div class='menu-item-content " + cat.toLowerCase() + "'>\n" +
            "</div>" +
        "</div>"
    );
    
    $(".left-container ul").append("<li><a class='cat-link' href='#'>" + cat + "</a></li>");
});

// Add all Menu Items
menu.forEach(function (item) {
    var category = item.type;
    if (type.indexOf(category) >-1) {
        
        // Add to the Main Container
        if (category != "Pizza") {
            $(".menu-item-content." + category.toLowerCase()).append(
                "<div class='new-row'>\n" +
                    "<p class='item-name'>" + item.item + "</p>\n" +
                    "<p class='item-price'>&pound" + item.price.toFixed(2) + "\n " +
                        "<span class='plus-item id-" + item.id + "'><i class='fas fa-plus-circle''></i></span>\n" +
                        "<span class='minus-item id-" + item.id + "'><i class='fas fa-plus-circle''></i></span>\n" + 
                        "<span class='no-items id-" + item.id + "'></span>" +
                    "</p>\n" +
                "</div>"
            ); 
        } else {
            $(".menu-item-content." + category.toLowerCase()).append(
                "<div class='new-row'>\n" +
                    "<p class='item-name'>" + item.item + "</p>\n" +
                    "<p class='item-price'>\n" +
                        "&pound" + item.price.toFixed(2) + "\n" +
                        " <span class='plus-item id-" + item.id + "'><i class='fas fa-plus-circle''></i></span>\n" +
                        " <span class='minus-item id-" + item.id + "'><i class='fas fa-minus-circle''></i></span>\n" +
                        " <span class='no-items id-" + item.id + "'></span>" +
                    "</p>" +
                "</div class='new-row\n" +
                "<div class='new-row>\n" +
                    "<p class='item-info'>- " + item.info + "</p>\n" +
                "</div>"
            );    
        }
    }
});

// Add Options to the Overlay for the Pizza Sizes
pizzaSizes.forEach(function(elem) {
    
    var id = "sizeId-" + elem.id;
    var size = elem.size;
    var price = Number(elem.price).toFixed(2);
    
    //Pizza Sizes
    $(".option-pizza .pizza-size").append(
        "<div class='option-grp' id='" + id + "'>\n" +
            "<div class='option-name'>\n" +
                "<p>" + size + "</p>\n" +
            "</div>\n" +
            "<div class='option-price'>\n" +
                "<p>\n" + 
                    price + "\n" +
                    " <span class='option-add'><i class='fas fa-plus-circle''></i></span>\n" +
                "</p>" +
            "</div>" +
        "</div>"
    );
});

// Add Options to the Overlay for the Toppings
pizzaXtraToppings.forEach(function(elem) {
    
    var id = "toppingId-" + elem.id;
    var xtraTropping = elem.xtraTropping;
    var price = Number(elem.toppingPrice).toFixed(2);
    
    //Pizza Sizes
    $(".option-pizza .pizza-toppings").append(
        "<div class='option-grp' id='" + id + "'>\n" +
            "<div class='option-name'>\n" +
                "<p>" + xtraTropping + "</p>\n" +
            "</div>\n" +
            "<div class='option-price'>\n" +
                "<p>\n" + 
                    price + "\n" +
                    " <span class='option-add'><i class='fas fa-plus-circle''></i></span>\n" +
                "</p>" +
            "</div>" +
        "</div>"
    );
});


