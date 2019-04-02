// Update the basket
window.onload = function () {
    
    total = localStorage.getItem("total");
    if (total === null) {
        total = "£0.00"
    }
    contents = localStorage.getItem("contents");
    if (contents === null) {
        contents = ""
    }
    $("#basket-total").text(total);
    $(".right-container .container-content").append(localStorage.getItem("contents"));
    $("#basket-total").html("<i class='fas fa-shopping-cart'></i>" + total);
    
    // If there are no items, show the default BG, else hide it.
    
    if (total === "£0.00") {
        $(".right-container .empty-plate").removeClass("hide");
        console.log("hi")
    } else {
        $(".right-container .empty-plate").addClass("hide");
    }
}

menu.forEach(function(elem) {
    var id = "id-" + elem.id;
    $(".plus-item." + id).on("click", function(event){
        
        var item = elem.item;
        var category = elem.type;
        var price = elem.price.toFixed(2);
        var options = elem.options;
        var pizzaSize
        var sizeId
        
        if (category === "Pizza") {
            
            // Unhide the Pizza Overlays
            $(".overlay").removeClass("hide");
            $(".option-pizza").removeClass("hide");
            $(".other-options").addClass("hide")
            showBtn("cancel");
            
            // Toggle the Select Highlight for Each Pizza Size and Enable the Basket Button
            $(".pizza-size .option-grp").on("click", function() {
                
                // Change the cancel button to the continue button
                showBtn("continue");
                
                $(".pizza-size .option-grp").removeClass("option-selected");
                $(this).addClass("option-selected");
                sizeId = $(this).attr("id");
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
                
                // Hide the backround div
                $(".empty-plate").addClass("hide");
                
                // Unbind the Event Handles
                $("#overlay-btn-continue").unbind("click");
                $(".pizza-toppings .option-grp").unbind("click");
                
                // Mark the Item as Selected
                $(".plus-item." + id + " i").addClass("main-item-selected");
                
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
                            id: pizzaXtraToppings[i].id,
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
                        "<div class='order-body pizza-topping toppingId-" + topping.id + "'>\n" +
                            "<p>\n" +
                                "<span class='minus-item'><i class='fas fa-minus''></i></span>\n" +
                                topping.topping + "\n" +
                            "</p>\n" +
                            "<p><span>&pound" + Number(topping.toppingPrice).toFixed(2) + "</span></p>\n" +
                        "</div>\n"
                })
                
                // Update the Basket Total
                updateBasketTotal(total);
  
                // Add the Item Name and Total
                $(".right-container .container-content").append(
                    "<div class='order-grp " + id + " " + sizeId + "'>\n" +
                        "<div class='order-main'>" +
                            "<p>\n" +
                                "<span class='minus-item'><i class='fas fa-minus''></i></span>\n" + pizzaSize.size + " " + 
                                item + " Pizza\n" +
                            "</p>\n" +
                            "<p><span>&pound" + total.toFixed(2) + "</span></p>\n" +
                        "</div>\n" +
                        inputElem +
                    "</div>"
                )
            })
            
            
        } else if (elem.options.length === 0 ) {
            
            // Update the Basket Total
            updateBasketTotal(price);
            
            // Mark the Item as Selected
            $(".plus-item." + id + " i").addClass("main-item-selected");
            
            // Hide the backround div
            $(".empty-plate").addClass("hide")
            
            $(".right-container .container-content").append(
                "<div class='order-grp " + id + "'>\n" +
                    "<div class='order-main'>" +
                        "<p>\n" +
                            "<span class='minus-item'><i class='fas fa-minus''></i></span>\n" +
                            item +
                        "</p>\n" +
                        "<p><span>&pound" + Number(price).toFixed(2) + "</span></p>\n" +
                    "</div>\n" +
                "</div>"
            )
            
        } else {
            
            // If there are other Options, then Open Overlay and Add Options to Overlay
            $(".overlay").removeClass("hide");
            $(".other-options").removeClass("hide");
            showBtn("cancel")
            
            // Fill the overlay with each available option
            elem.options.forEach(function(opt) {
                $(".other-options").append(
                    "<div class='option-grp' id='optId-" + opt.id + "'>\n" +
                        "<p>\n" + opt.option + "<p>\n" +
                        "<p><span class='option-add'><i class='fas fa-plus-circle''></i></span></p>\n" +
                    "</div>" 
                )
            })

            // If clicked on an option in the overlay.
            $(".other-options .option-grp").on("click", function() {
                
                // Show the continue button
                showBtn("continue");
                
                // Make this the active section
                $(".other-options .option-grp").removeClass("option-selected");
                $(this).addClass("option-selected");
                
                // Create a new objecgt which will contain information about the option selected and it's parent
                // Convert the ID obtained for the HTML ID tag to the id that can be retrieved from the DB.
                // for id-5 the DB ID will be 4.
                
                $("#overlay-btn-continue").unbind("click");
                
                var optId = $(this).attr("id");
                var optIdVal = Number(optId.split("-")[1]) - 1;
                var itemId = id;
                var itemIdVal = Number(itemId.split("-")[1]) - 1;

                // Send items to the right container when user presses continue
                $("#overlay-btn-continue").on("click", function() {
                    
                    // Hide the backround div
                    $(".empty-plate").addClass("hide")
                    
                    // Unbind the Event Handlers
                    $(".other-options .option-grp").unbind("click");
                    $("#overlay-btn-continue").unbind("click");
                    
                    // Mark the Item as Selected
                    $(".plus-item." + id + " i").addClass("main-item-selected");

                    var selectedItem =
                    {
                        htmlId: itemId,
                        dbId: itemIdVal,
                        item: menu[itemIdVal].item,
                        price: menu[itemIdVal].price,
                        htmlOptId: optId,
                        dbOptId: optIdVal,
                        optSelected: menu[itemIdVal].options[optIdVal].option,
                    }
                    
                    // Update the Basket Total
                    updateBasketTotal(selectedItem.price);
                    
                    hideOverlayAll()    // hide the overlay
                    
                    $(".right-container .container-content").append(
                        "<div class='order-grp " + id + "'>\n" +
                            "<div class='order-main'>" +
                                "<p>\n" +
                                    "<span class='minus-item'><i class='fas fa-minus''></i></span>\n" +
                                        selectedItem.item +
                                "</p>\n" +
                                "<p><span>&pound" + Number(selectedItem.price).toFixed(2) + "</span></p>\n" + 
                            "</div>\n" +
                            "<div class='order-body'>\n" + 
                                "<p>" + selectedItem.optSelected + "</p>\n" + 
                            "</div>" +
                        "</div>"
                    )
                    
                })
                
            })
            
            
        }
    })
    
});

// Overlay Cancel Button Control
$("#overlay-btn-cancel").on("click",function() {
    hideOverlayAll()
})

// When the user presses on the Basket Button
$(".basket-btn").on("click", function(){
    contents = $(".right-container .container-content").html()
    total = $(".basket-btn span").text()

    window.location.href = "/basket.html";

    localStorage.setItem("contents", contents);
    localStorage.setItem("total", total)
});

function showBtn(btn) {
    if (btn === "cancel") {
        $("#overlay-btn-cancel").removeClass("hide");
        $("#overlay-btn-continue").addClass("hide");
        $("#overlay-btn-skip").addClass("hide");
    } else if (btn === "continue") {
        $("#overlay-btn-cancel").addClass("hide");
        $("#overlay-btn-continue").removeClass("hide");
        $("#overlay-btn-skip").addClass("hide");
    } else if (btn === "skip") {
        $("#overlay-btn-cancel").addClass("hide");
        $("#overlay-btn-continue").addClass("hide");
        $("#overlay-btn-skip").removeClass("hide");
    } else {
        console.log(btn + " is not a button")
    }
};

function hideOverlayAll() {
    $(".overlay").addClass("hide");
    $(".option-pizza").addClass("hide");
    $(".other-options").addClass("hide");
    $(".option-grp").removeClass("option-selected");
    $("#overlay-btn-cancel").addClass("hide");
    $("#overlay-btn-skip").addClass("hide");
    $("#overlay-btn-continue").addClass("hide");
};

function updateBasketTotal(addToTotal) {
    currTotal = $("#basket-total").text();
    currTotal = Number(currTotal.substring(1,currTotal.length));
    basketTotal = currTotal + Number(addToTotal);
    basketTotal = "&pound" + Number(basketTotal).toFixed(2);
    $("#basket-total").html("<i class='fas fa-shopping-cart'></i>" + basketTotal);
};
