<<<<<<< HEAD
// Update the basket on page load
window.onload = function () {
    
    // Update basket on load
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
    
    // Load Address Section
    loadAddress();
    updateAddressSection();
};

// When the user presses on the more food button
$("#continue-shopping").on("click", function() {
    contents = $(".left-container .container-content").html();
    total = $("#basket-total").text();
    
    window.location.href = "./menu.html";
    
    localStorage.setItem("contents", contents);
    localStorage.setItem("total", total);
});

// When user presses any of the nav icons {
$("nav .item").on("click", function() {
    contents = $(".left-container .container-content").html();
    total = $("#basket-total").text();
    localStorage.setItem("contents", contents);
    localStorage.setItem("total", total);
});

// This is required to run the script removeFromBasket.js. SLightly ammended to work for this page.
function updateBasketTotal(addToTotal) {
    currTotal = $("#basket-total").text();
    currTotal = Number(currTotal.substring(1,currTotal.length));
    basketTotal = currTotal + Number(addToTotal);
    
    basketTotal = "&pound" + Number(basketTotal).toFixed(2);
    $("#basket-total").html(basketTotal);
};

// This will load the address stored in the index page.
function loadAddress() {
    return userAddress = JSON.parse(localStorage.getItem("userAddress"));
}; 

// Clicking on Deliver Food
$("#end-shopping").on("click", function() {
    docHeight = document.body.offsetHeight + "px";
    $(".order-complete").css("display", "flex");
    $(".order-complete").css("width", "100%");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    $(".order-complete").css("height", docHeight);
    $(".order-complete").css("opacity", "1");
    $(".order-complete").css("transition", "transition: opacity 1s ease-out");
    
    setTimeout(function() {
        $(".order-complete").css("opacity", "0");
        $(".btn").removeClass("green-btn");
        $(".btn").addClass("disabled-btn");
    },2500);
});


//=============================================
// CHANGING THE ADDRESS
//=============================================

//---------------------------------------------
// Event Listeners
//---------------------------------------------

// When the user presses "edit address", toggle the form
$("#edit-address-btn").on("click", function() {
    $(".address").toggleClass("hide");
    prePopulateAddress();
});

$("#submit-address").on("click", function() {
    var postcode = $("#postcode").val();
    postcode = postcode.replace(" ","");
    getLocationAPI(postcode);
    
});

function getLocationAPI(postcode) {
    APIData = new Object();
    postcode = postcode.replace(" ","");
    var url = "http://api.postcodes.io/postcodes/" + postcode;
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();
    
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            APIData = 
                {
                    status: "Postcode Found",
                    postcode: data.result.postcode,
                    country: data.result.country,
                    city: data.result.region,
                    geoLocation: [data.result.latitude, data.result.longitude]
                };
            console.log(APIData)

            
        } else {
            APIData = {status: "Not Found"};
        }
    
        APIData.addressLine1 = $("#address-line-1").val(),
        APIData.addressLine2 = $("#address-line-2").val(),
    
        localStorage.setItem("userAddress", JSON.stringify(APIData));
        window.location.href = "./basket.html";
    }
    
};

// This function will populate the address fields with the currently stored address.
function prePopulateAddress () {
    $(".update-address-form #postcode").val(userAddress.postcode);
    $(".update-address-form #address-line-1").val(userAddress.addressLine1);
    $(".update-address-form #address-line-2").val(userAddress.addressLine2);;
    $(".update-address-form #city").val(userAddress.city);
    $(".update-address-form #postcode").val(userAddress.postcode);
    $(".update-address-form #country").val(userAddress.country);
}

//=============================================
// SETTING THE ADDRESS SECTION
//=============================================

// If there is a geolocation, then show the mao, otherwise show the address as text.
function updateAddressSection() {
    if (userAddress.geoLocation === undefined) {
        $("#mapid").addClass("hide");
        $(".address").removeClass("hide");
        $(".address-line1").text(userAddress.addressLine1);
        $(".address-line2").text(userAddress.addressLine2);
        $(".city").text(userAddress.city);
        $(".postcode").text(userAddress.postcode);
        $(".country").text(userAddress.county);
    } else {
        $("#mapid").removeClass("hide");
        $(".address").addClass("hide");
        showMap();
    }
}

// Setting Up the Map to Show the User's Address
function showMap () {
    
    loadAddress();
    
    // initialize the map
    var mymap = L.map('mapid').setView(userAddress.geoLocation, 15);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoic2FsYWFoMDEiLCJhIjoiY2p1MGt1aHQxMjRjcTRhbHpwc3Y5NmJlciJ9.T97jRD-oINlHoNVURPYWEw'
    }).addTo(mymap);
    
    // set marker at user's address
    
    // Address Text
    fullAddressText = " ";
    if (userAddress.addressLine1 != " ") {
        fullAddressText += userAddress.addressLine1 + "<br>"
    };
    if (userAddress.addressLine2 != " ") {
        fullAddressText += userAddress.addressLine2 + "<br>"
    };
    if (userAddress.city != " ") {
        fullAddressText += userAddress.city + "<br>"
    };
    if (userAddress.postcode != " ") {
        fullAddressText += userAddress.postcode + "<br>"
    };
    if (userAddress.country != " ") {
        fullAddressText += userAddress.country + "<br>"
    };

    var marker = L.marker(userAddress.geoLocation).addTo(mymap);
    marker.bindPopup(fullAddressText).openPopup();
};

// function that will capitalise each letter of the first word
function firstLetterCap(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
=======
// Update the basket on page load
window.onload = function () {
    
    // Update basket on load
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
    
    // Load Address Section
    loadAddress();
    updateAddressSection();
};

// When the user presses on the more food button
$("#continue-shopping").on("click", function() {
    contents = $(".left-container .container-content").html();
    total = $("#basket-total").text();
    
    window.location.href = "./menu.html";
    
    localStorage.setItem("contents", contents);
    localStorage.setItem("total", total);
});

// When user presses any of the nav icons {
$("nav .item").on("click", function() {
    contents = $(".left-container .container-content").html();
    total = $("#basket-total").text();
    localStorage.setItem("contents", contents);
    localStorage.setItem("total", total);
});

// This is required to run the script removeFromBasket.js. SLightly ammended to work for this page.
function updateBasketTotal(addToTotal) {
    currTotal = $("#basket-total").text();
    currTotal = Number(currTotal.substring(1,currTotal.length));
    basketTotal = currTotal + Number(addToTotal);
    
    basketTotal = "&pound" + Number(basketTotal).toFixed(2);
    $("#basket-total").html(basketTotal);
};

// This will load the address stored in the index page.
function loadAddress() {
    return userAddress = JSON.parse(localStorage.getItem("userAddress"));
}; 

// Clicking on Deliver Food
$("#end-shopping").on("click", function() {
    docHeight = document.body.offsetHeight + "px";
    $(".order-complete").css("display", "flex");
    $(".order-complete").css("width", "100%");
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    $(".order-complete").css("height", docHeight);
    $(".order-complete").css("opacity", "1");
    $(".order-complete").css("transition", "transition: opacity 1s ease-out");
    
    setTimeout(function() {
        $(".order-complete").css("opacity", "0");
        $(".btn").removeClass("green-btn");
        $(".btn").addClass("disabled-btn");
    },2500);
});


//=============================================
// CHANGING THE ADDRESS
//=============================================

//---------------------------------------------
// Event Listeners
//---------------------------------------------

// When the user presses "edit address", toggle the form
$("#edit-address-btn").on("click", function() {
    $(".address").toggleClass("hide");
    prePopulateAddress();
});

$("#submit-address").on("click", function() {
    var postcode = $("#postcode").val();
    postcode = postcode.replace(" ","");
    getLocationAPI(postcode);
    
});

function getLocationAPI(postcode) {
    APIData = new Object();
    postcode = postcode.replace(" ","");
    var url = "http://api.postcodes.io/postcodes/" + postcode;
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();
    
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            APIData = 
                {
                    status: "Postcode Found",
                    postcode: data.result.postcode,
                    country: data.result.country,
                    city: data.result.region,
                    geoLocation: [data.result.latitude, data.result.longitude]
                };
            console.log(APIData)

            
        } else {
            APIData = {status: "Not Found"};
        }
    
        APIData.addressLine1 = $("#address-line-1").val(),
        APIData.addressLine2 = $("#address-line-2").val(),
    
        localStorage.setItem("userAddress", JSON.stringify(APIData));
        window.location.href = "./basket.html";
    }
    
};

// This function will populate the address fields with the currently stored address.
function prePopulateAddress () {
    $(".update-address-form #postcode").val(userAddress.postcode);
    $(".update-address-form #address-line-1").val(userAddress.addressLine1);
    $(".update-address-form #address-line-2").val(userAddress.addressLine2);;
    $(".update-address-form #city").val(userAddress.city);
    $(".update-address-form #postcode").val(userAddress.postcode);
    $(".update-address-form #country").val(userAddress.country);
}

//=============================================
// SETTING THE ADDRESS SECTION
//=============================================

// If there is a geolocation, then show the mao, otherwise show the address as text.
function updateAddressSection() {
    if (userAddress.geoLocation === undefined) {
        $("#mapid").addClass("hide");
        $(".address").removeClass("hide");
        $(".address-line1").text(userAddress.addressLine1);
        $(".address-line2").text(userAddress.addressLine2);
        $(".city").text(userAddress.city);
        $(".postcode").text(userAddress.postcode);
        $(".country").text(userAddress.county);
    } else {
        $("#mapid").removeClass("hide");
        $(".address").addClass("hide");
        showMap();
    }
}

// Setting Up the Map to Show the User's Address
function showMap () {
    
    loadAddress();
    
    // initialize the map
    var mymap = L.map('mapid').setView(userAddress.geoLocation, 15);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoic2FsYWFoMDEiLCJhIjoiY2p1MGt1aHQxMjRjcTRhbHpwc3Y5NmJlciJ9.T97jRD-oINlHoNVURPYWEw'
    }).addTo(mymap);
    
    // set marker at user's address
    
    // Address Text
    fullAddressText = " ";
    if (userAddress.addressLine1 != " ") {
        fullAddressText += userAddress.addressLine1 + "<br>"
    };
    if (userAddress.addressLine2 != " ") {
        fullAddressText += userAddress.addressLine2 + "<br>"
    };
    if (userAddress.city != " ") {
        fullAddressText += userAddress.city + "<br>"
    };
    if (userAddress.postcode != " ") {
        fullAddressText += userAddress.postcode + "<br>"
    };
    if (userAddress.country != " ") {
        fullAddressText += userAddress.country + "<br>"
    };

    var marker = L.marker(userAddress.geoLocation).addTo(mymap);
    marker.bindPopup(fullAddressText).openPopup();
};

// function that will capitalise each letter of the first word
function firstLetterCap(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
>>>>>>> 59051d47440d9b46857a19d8a194a3f42d4423e3
}