// Add all the Categories to the Menu and Cateogry Section
category.forEach(function (cat) {

    $(".mid-container").append(
                "<div class='menu-category " + cat.name.toLowerCase() + "' id='mid-catId-" + cat.id + "'>\n" +
                    "<div class='cat-title'>\n" +
                        "<h2>" + cat.name + "</h2>\n" +
                        "<hr>\n" +
                    "</div>\n" +
                "<div class='menu-item-content " + cat.name.toLowerCase() + "'>\n" +
            "</div>" +
        "</div>"
    );
    
    $(".left-container ul").append("<li id='left-catId-" + cat.id + "'><a class='cat-link'>" + cat.name + "</a></li>");
});

// A list of all the categories
categoryList = [];
category.forEach(function(catObj) {
    categoryList.push(catObj.name)
});

// Add all Menu Items

menu.forEach(function (item) {
    var cat = item.type;
    if (categoryList.indexOf(cat) >-1) {
        
        // Add to the Main Container
        if (cat != "Pizza") {
            $(".menu-item-content." + cat.toLowerCase()).append(
                "<div class='new-row'>\n" +
                    "<p class='item-name'>" + item.item + "</p>\n" +
                    "<p class='item-price'>&pound" + item.price.toFixed(2) + "\n " +
                        "<span class='plus-item id-" + item.id + "'><i class='fas fa-plus''></i></span>\n" +
                        "<span class='no-items id-" + item.id + "'></span>" +
                    "</p>\n" +
                "</div>"
            ); 
        } else {
            $(".menu-item-content." + cat.toLowerCase()).append(
                "<div class='new-row'>\n" +
                    "<p class='item-name'>" + item.item + "</p>\n" +
                    "<p class='item-price'>\n" +
                        "&pound" + item.price.toFixed(2) + "\n" +
                        " <span class='plus-item id-" + item.id + "'><i class='fas fa-plus''></i></span>\n" +
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
                    " <span class='option-add'><i class='fas fa-plus'></i></span>\n" +
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
                    " <span class='option-add'><i class='fas fa-plus'></i></span>\n" +
                "</p>" +
            "</div>" +
        "</div>"
    );
});

// Set Up Categories List (Left Container) to Jump to the Correct Section in the Menu

$('.left-container li').on("click", function() {
    var leftCatId = $(this).attr("id");
    var midCatId = leftCatId.replace("left","mid");
    scrollToId(midCatId)    
});

function scrollToId(id) {
    elem = document.getElementById(id);
    console.log(elem.offsetTop);
    window.scrollTo({left: elem.offsetLeft, top: elem.offsetTop - 55, behavior: 'smooth'});
}
