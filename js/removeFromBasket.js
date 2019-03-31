// Event listener for when a pizza topping is deleted
// Function will:   - Update the total price for the pizza
//                  - Update the baket total
//                  - Remove the topping

$(".container-content").on("click", ".order-body", function(event) {
    
    // Locate information about the topping
    var toppingId = $(this).attr("class").split(" ")[2];
    var toppingDbId = Number(toppingId.split("-")[1])-1;
    var toppingPrice = Number(pizzaXtraToppings[toppingDbId].toppingPrice)
    
    // Update prices for the pizza as an item and the total basket
    updateBasketTotal(-toppingPrice);
    
    var pizzaPrice = $(this).parent().children(".order-main").children("p").last().text();
    pizzaPrice = Number(pizzaPrice.substring(1,pizzaPrice.length));
    pizzaPrice -= toppingPrice;
    pizzaPrice = "£" + pizzaPrice.toFixed(2);
    $(this).parent().children(".order-main").children("p").last().text(pizzaPrice);
    
    // Remove the topping
    $(this).remove();
    
});



// Event listner for when a item is removed from the basket
// Function will:   - Update the baket total
//                  - Remove the item
//                  - Find out another one of these items exist in the basket
//                      - If not:   - Remove the highlighting from the main container
//                  - Check if there are any items in the basket
//                      - If not:   - show the empty basket BG.

$(".container-content").on("click", ".order-grp .order-main .minus-item", function(event) {
    
    event.stopPropagation();
    
    //Locate information about the item
    var itemId = $(this).parent().parent().parent().attr("class").split(" ")[1];
    var itemDbId = Number(itemId.split("-")[1])-1;
    var itemPrice = Number(menu[itemDbId].price);
    var itemCategory = menu[itemDbId].type;
    
    if (itemCategory === "Pizza") {
        
        var sizeId = $(this).parent().parent().parent().attr("class").split(" ")[2]
        var sizeDBId = Number(sizeId.split("-")[1])-1;
        var pizzaPrice = $(this).parent().parent().text().split("£")[1]
    };
        
    // Update the basket
    if (itemCategory === "Pizza") {
        updateBasketTotal(-pizzaPrice)
    } else {
         updateBasketTotal(-itemPrice)
    };
    
    // Remove the item
    $(this).parent().parent().parent().remove();
    
    // If no more of these items exist, then remove the highlighting from the middle container
    if (!($(".order-grp").hasClass(itemId))) {
            $(".plus-item." + itemId + " i").removeClass("main-item-selected")
        }
    
    // If there are no items in the basket, show the empty basket BG.
    if (!($(".container-content").children()).length) {
        $(".empty-plate").removeClass("hide");
    }

 });