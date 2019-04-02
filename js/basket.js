// Update the basket on page load
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
    $(".left-container .container-content").append(localStorage.getItem("contents"));
};

// Update the address on page load
window.onload = function() {
    loadAddress();
    $(".address-line1").text(userAddress.addressLine1);
    $(".address-line2").text(userAddress.addressLine2);
    $(".address-line3").text(userAddress.addressLine3);
    $(".address-line4").text(userAddress.addressLine4);
    $(".city").text(userAddress.city);
    $(".postcode").text(userAddress.postcode);
    $(".county").text(userAddress.county);
}

// When the user presses on the more food button
$("#continue-shopping").on("click", function() {
    contents = $(".left-container .container-content").html();
    total = $("#basket-total").text();
    
    window.location.href = "/menu.html";
    
    localStorage.setItem("contents", contents);
    localStorage.setItem("total", total);
});



// This is required to run the script removeFromBasket.js. SLightly ammended to work for this page.
function updateBasketTotal(addToTotal) {
    console.log("hi")
    currTotal = $("#basket-total").text();
    console.log(currTotal)
    currTotal = Number(currTotal.substring(1,currTotal.length));
    basketTotal = currTotal + Number(addToTotal);
    
    basketTotal = "&pound" + Number(basketTotal).toFixed(2);
    $("#basket-total").html(basketTotal);
};

// This will load the address stored in the index page.
function loadAddress() {
    return userAddress = JSON.parse(localStorage.getItem("userAddress"));
}; 