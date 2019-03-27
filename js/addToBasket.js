menu.forEach(function(elem) {
    var id = "id-" + elem.id;
    $(".plus-item." + id).on("click", function(event){
        var item = elem.item;
        var category = elem.type;
        var price = elem.price.toFixed(2);
        var options = elem.options;
        var pizzaSize
        
        if (category === "Pizza") {
            
            // Unhide the Pizza Overlays
            $(".overlay").removeClass("hide");
            $(".option-pizza").removeClass("hide");
            $(".other-options").addClass("hide")
            
            // Show the cancel button, if this is pressed, close the overlay
            $("#overlay-btn-cancel").removeClass("hide");
            
            // Toggle the Select Highlight for Each Pizza Size and Enable the Basket Button
            $(".pizza-size .option-grp").on("click", function() {
                
                // Change the cancel button to the continue button
                $("#overlay-btn-cancel").addClass("hide");
                $("#overlay-btn-continue").removeClass("hide");
                
                $(".pizza-size .option-grp").removeClass("option-selected");
                $(this).addClass("option-selected");
                var sizeId = $(this).attr("id");
                var sizeIdVal = Number(sizeId.split("-")[1]) - 1;
                
                // Get the Name/Size of the Selected Pizza and the Price
                pizzaSize = 
                    {
                        size: pizzaSizes[sizeIdVal].size,
                        price: Number(pizzaSizes[sizeIdVal].price)
                    }
            })
            
            // Set Up for an Empty Array that will toggle value from 0/1 to indicate what additional toppings have been selected.
            var selectedToppings = new Array (pizzaXtraToppings.length);
            for (i = 0; i < selectedToppings.length; i++) {
                selectedToppings[i] = 0;
            }
            
            $(".pizza-toppings .option-grp").on("click", function() {
                $(this).toggleClass("option-selected");
                var toppingId = $(this).attr("id");
                var toppingIdVal = Number(toppingId.split("-")[1]) - 1;
                selectedToppings[toppingIdVal] = (selectedToppings[toppingIdVal] + 1) % 2;
            })
            
            // Send Items to the Right Container (Your Plate) when the User presses Continue
            $("#overlay-btn-continue").on("click", function() {
                
                // Deselect All Options and Hide Overlay
                hideOverlayAll()
                
                // Set Up the Addtional Toppings to be added to the HTML.
                //Create new Array with only selected options
                
                var toppings = [];
                var total = Number(price) + pizzaSize.price;
                var inputElem = "";
                
                for(i = 0; i < selectedToppings.length; i++){
                    if (selectedToppings[i] === 1) {
                        toppings.push({
                            topping: pizzaXtraToppings[i].xtraTropping,
                            toppingPrice: pizzaXtraToppings[i].toppingPrice
                        })
                    }
                }
                
                toppings.forEach(function(topping) {
                    
                    // Calculate Total
                    total += Number(topping.toppingPrice)
                    
                    // Append to the Input Element
                    inputElem = inputElem + 
                        "<div class='order-body>\n" +
                            "<p>\n" +
                                "<span class='minus-item'><i class='fas fa-minus-circle''></i></span>\n" +
                                topping.topping + "\n" +
                            "</p>\n" +
                            "<p><span>&pound" + Number(topping.toppingPrice).toFixed(2) + "</span></p>\n" +
                        "</div>\n"
                })
  
                // Add the Item Name and Total
                $(".right-container").append(
                    "<div class='order-grp'>\n" +
                        "<div class='order-main>" +
                            "<p>\n" +
                                "<span class='minus-item'><i class='fas fa-minus-circle''></i></span>\n" +
                                item + " Pizza\n" +
                            "</p>\n" +
                            "<p><span>&pound" + total.toFixed(2) + "</span></p>\n" +
                        "</div>\n" +
                        inputElem +
                    "</div>"
                
                )
            })
            
            
        } else if (elem.options.length === 0 ) {
            
            $(".right-container").append(
                "<div class='order-grp'>\n" +
                    "<div class='order-main>" +
                        "<p>\n" +
                            "<span class='minus-item'><i class='fas fa-minus-circle''></i></span>\n" +
                            item +
                        "</p>\n" +
                        "<p><span>&pound" + Number(price).toFixed(2) + "</span></p>\n" +
                    "</div>\n" +
                "</div>"
            )
            
        } else {
            
            //If there are other Options, then Open Overlay and Add Options to Overlay
            
            console.log(elem.options);
            $(".overlay").removeClass("hide");
            console.log(item + " " + category + " " + price + " ");
            $(".other-options").removeClass("hide");
            $("#overlay-btn-skip").removeClass("hide")
            
            elem.options.forEach(function(opt) {
                $(".other-options").append(
                    "<div class='option-grp' id=optId-" + opt.id + "'>\n" +
                        "<p>\n" + opt.option + "<p>\n" +
                        "<p><span class='option-add'><i class='fas fa-plus-circle''></i></span></p>\n" +
                    "</div>" 
                )
            })
        }
    })
});

// Overlay Cancel Button Control
$("#overlay-btn-cancel").on("click",function() {
    hideOverlayAll()
})

function hideOverlayAll() {
    $(".overlay").addClass("hide");
    $(".option-pizza").addClass("hide");
    $(".other-options").addClass("hide");
    $(".option-grp").removeClass("option-selected");
    $("#overlay-btn-cancel").addClass("hide");
    $("#overlay-btn-skip").addClass("hide");
    $("#overlay-btn-continue").addClass("hide");
}
