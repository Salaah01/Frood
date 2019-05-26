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
        //var data = JSON.parse('{"latitude":51.515605926513672,"longitude":-0.057411406189203262,"addresses":["39-45 Cavell Street, , , , , London, ","Flat 1-9, 39-45 Cavell Street, , , , London, ","Flat 4, 39-45 Cavell Street, , , , London, ","Flat 5, 37 Cavell Street, , , , London, ","Flat 5, 49 Cavell Street, , , , London, ","Holiday Inn London, 5 Cavell Street, , , , London, "]}');

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
                    geoLocaion: [data.result.longitude, data.result.latitude]
                };

            return APIData;
        } else {
            return APIData = {status: "Not Found"}
        }
    }  
};

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
    if ($("#address-select").val() != "none" && $("#address-select").val() != "manual") {
        $(".address-search .btn").val("Continue");
    // If user enters sufficent fields for their address manually
    } else if ($("#address-line-1").val() != "" && $("#in-postcode").val() != "") {
        $(".address-search .btn").val("Continue");

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
    } else {
        $(".address-search .btn").val("Enter Manually");
        $(".address form").attr("action", "");
    }
    
    // Button action depending on its value
    if ($(".address-search .btn").val() === "Continue") {
        $("form").attr("action", "menu.html");
        $(".address-search .btn").attr("type", "submit");
        $(".address-search .btn").addClass("green-btn");
        $(".address-search .btn").removeClass("red-btn");
        
    } else if ($(".address-search .btn").val() === "Enter Manually") {
        $("select").val("manual");
        $(".address-fields").removeClass("hide");
        $(".address-search .btn").removeClass("green-btn");
        $(".address-search .btn").addClass("red-btn");
    } else {
        $(".address form").attr("action", "");
        $(".address-search .btn").attr("type", "button");
        $(".address-search .btn").removeClass("green-btn");
        $(".address-search .btn").addClass("red-btn");
    } 
};