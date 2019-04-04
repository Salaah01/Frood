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
    $(".update-address-form").toggleClass("hide");
});

$("input").on("click", function() {
    formControlFlow();
});

$("input").on("keydown", function(event) {
    if (event.keyCode == 13 || event.keyCode == 9) {
        formControlFlow();
    }
});

$("select").on("click", function() {
    formControlFlow();
});


$("select").on("change", function() {
    formControlFlow();
    prePopulateAddress();
});

$("#update-address-btn").on("click", function () {
    if ($(this).val() === "Enter Manually") {
        $(".address-fields").removeClass("hide")
    }
})

// This will run js/address.js which will ask the user to update the address and on continue will load basket.html and will automatically update the address.

function formControlFlow() {
    // Check if the house/door no have been completed. If so, run the API
    if ($("#door-no").val() != "" && $("#postcode").val() != "" && $("select").val() === "none") {
        setSelectOptions();
    } else if ($("select").val() != "none" && $("select").val() != "manual") {
        console.log("y")
        processUserAddress();
    } else if ($("select").val() === "none") {
        $(".address-fields").addClass("hide");
    } else if ($("select").val() === "manual") {
        $(".address-fields").removeClass("hide");
        processUserAddress();
    }
}

// Using the Postcode and Door Number, it will generate options for the address-select drop down options.
function setSelectOptions() {
    
    var key = "JEXzYYg1YEaHR7m1ypyudg18199";
    
    // Reset all options
    $("#address-select").children().remove()
    
    // Take the values from the Door Number and Postcode Input Fields
    var doorNo = $("#door-no").val()
    var postcode = $("#postcode").val()

    // Run only if both the door number and postcode and have some value
    if (doorNo != "" && postcode != "") {
        postcode = postcode.replace(" ","");
        doorNo = doorNo.repeat(" ","");
        
        // Retrieve address data using the API
        query = "https://api.getaddress.io/find/" + postcode + "/" + doorNo + "?api-key=" + key;
        
        request = new XMLHttpRequest();
        request.open("GET", query, false);
        request.send(null);
        data = JSON.parse(request.responseText);
        
        // DUMMY DATA INCASE API IS NOT USABLE
        // var data = JSON.parse('{"latitude":51.515605926513672,"longitude":-0.057411406189203262,"addresses":["39-45 Cavell Street, , , , , London, ","Flat 1-9, 39-45 Cavell Street, , , , London, ","Flat 4, 39-45 Cavell Street, , , , London, ","Flat 5, 37 Cavell Street, , , , London, ","Flat 5, 49 Cavell Street, , , , London, ","Holiday Inn London, 5 Cavell Street, , , , London, "]}');

        // Store only the address
        address = data.addresses;
        latitude = data.latitude;
        longitude = data.longitude;
        addressElems = [];

        // Break the address strings to seperate lines
        for (a = 0; a < address.length; a++) {
            address[a] = address[a].split(",");

            fullAddress = "";
            address[a].forEach(function(addressLine) {

                if (addressLine != " ") {
                    fullAddress = fullAddress + ", " + addressLine;
                }

                // Get rid of ", " from the beginning of the string. Repeat the full addresss starts with the actual first line.
                while (fullAddress.substring(0,2) === ", ") {
                    fullAddress = fullAddress.substring(2,fullAddress.length)
                }

            })

            addressElems[a] = 
                {
                    addressLine1: address[a][0],
                    addressLine2: address[a][1],
                    addressLine3: address[a][2],
                    addressLine4: address[a][3],
                    locality: address[a][4],
                    city: address[a][5],
                    county: address[a][6],
                    fullAddress: fullAddress
                };
            
            // Append all adress to the select option
            $("#address-select").append("<option value='" + a + "'>" + fullAddress + "</option>\n")
        }
        
  }
    
    // Prepend the empty option and set to default option
    $("#address-select").prepend("<option selected='selected' value='none'>Select Address</option\n>")
    // Append the Enter Manually option
    $("#address-select").append("<option value='manual'>Enter Manually</option>");
   
}

// Populates the Address Fields based on what the user has selected. This will trigger when the user presses the button.
function processUserAddress() {
    
    // Locate the selected address
    addressNo =  addressNo = $("#address-select").val();
    if (addressNo != "none" && addressNo != "manual") {
        addressNo = Number(addressNo);
        userAddress = {
            geoLocation: [latitude, longitude],
            addressLine1: addressElems[addressNo].addressLine1,
            addressLine2: addressElems[addressNo].addressLine2,
            addressLine3: addressElems[addressNo].addressLine3,
            addressLine4: addressElems[addressNo].addressLine4,
            city: addressElems[addressNo].city,
            postcode: $("#postcode").val().toUpperCase(),
            county: addressElems[addressNo].county
        }
        
        // Store the Address
        localStorage.setItem("userAddress",JSON.stringify(userAddress));
        
        // Update the Button
        menuBtnText();
        
    } else if (addressNo === "manual") {
        // Update the Button
        menuBtnText();
    }
};

// This function will populate the address fields with the currently stored address.
function prePopulateAddress () {
    $(".update-address-form #postcode").val(userAddress.postcode);
    $(".update-address-form #address-line-1").val(userAddress.addressLine1);
    $(".update-address-form #address-line-2").val(userAddress.addressLine2);
    $(".update-address-form #address-line-3").val(userAddress.addressLine3);
    $(".update-address-form #address-line-4").val(userAddress.addressLine4);
    $(".update-address-form #city").val(userAddress.city);
    $(".update-address-form #in-postcode").val(userAddress.postcode);
    $(".update-address-form #county").val(userAddress.county);
}


// Updates button text depending on whether or not the user has inputed a door/house number and postcode.
function menuBtnText() {
    
    // If user selects a address from the drop down menu
    if ($("select").val() != "none" && $("select").val() != "manual") {
        $("#update-address-btn").val("Update");
        $("#update-address-btn").attr("disabled", false);
    // If user enters sufficent fields for their address manually
    } else if ($("#address-line-1").val() != "" && $("#in-postcode").val() != "") {
        $("#update-address-btn").val("Update");
        
        userAddress = {
            addressLine1: $("#address-line-1").val(),
            addressLine2: $("#address-line-2").val(),
            addressLine3: $("#address-line-3").val(),
            addressLine4: $("#address-line-4").val(),
            city: $("#city").val(),
            postcode: $("#in-postcode").val(),
            county: $("#county").val()
        }
        
        // Store the Address
        localStorage.setItem("userAddress",JSON.stringify(userAddress));
        
        $(".address form").attr("action", "menu.html");
        $("#update-address-btn").attr("disabled", false);
    } else {
        $(".address form").attr("action", "");
        $("#update-address-btn").attr("type", "");
        $("#update-address-btn").attr("disabled", true);
        $("#update-address-btn").val("Incomplete");
    }
    
    // Button action depending on its value
    if ($("#update-address-btn").val() === "Update") {
        $("form").attr("action", "basket.html");
        $("#update-address-btn").attr("type", "submit");
        $("#update-address-btn").attr("disabled", false);
        $("#update-address-btn").addClass("green-btn");
        $("#update-address-btn").removeClass("red-btn");
    } else if ($(".address-search .btn").val() === "Enter Manually") {
        $("select").val("manual");
        $(".address-fields").removeClass("hide");
        $("#update-address-btn").addClass("green-btn");
        $("#update-address-btn").removeClass("red-btn");
    } else {
        $(".address form").attr("action", "");
        $("#update-address-btn").attr("type", "button");
        $("#update-address-btn").removeClass("green-btn");
        $("#update-address-btn").addClass("red-btn");
    } 
};

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
        $(".address-line3").text(userAddress.addressLine3);
        $(".address-line4").text(userAddress.addressLine4);
        $(".city").text(userAddress.city);
        $(".postcode").text(userAddress.postcode);
        $(".county").text(userAddress.county);
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
    var mymap = L.map('mapid').setView(userAddress.geoLocation, 11);
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
    if (userAddress.addressLine3 != " ") {
        fullAddressText += userAddress.addressLine3 + "<br>"
    };
    if (userAddress.addressLine4 != " ") {
        fullAddressText += userAddress.addressLine4 + "<br>"
    };
    if (userAddress.city != " ") {
        fullAddressText += userAddress.city + "<br>"
    };
    if (userAddress.postcode != " ") {
        fullAddressText += userAddress.postcode + "<br>"
    };
    if (userAddress.county != " ") {
        fullAddressText += userAddress.county + "<br>"
    };

    var marker = L.marker(userAddress.geoLocation).addTo(mymap);
    marker.bindPopup(fullAddressText).openPopup();
};