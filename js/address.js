// API web: https://getaddress.io/
var key = "JEXzYYg1YEaHR7m1ypyudg18199"
// https://api.getaddress.io/find/e12bp/5?api-key=JEXzYYg1YEaHR7m1ypyudg18199

// If the user interacts with the address search options (click)
$(".address-search input").on("click", function(event) {
    menuBtnText();
    setSelectOptions();     // Will retrieve address data from API only if both door no. and postcode are completed.
})

// If the user interacts with the address search options (keydown)
$(".address-search input").on("keydown", function(event) {
    if(event.keyCode == 13 || event.keyCode == 9) {
        menuBtnText();
        setSelectOptions();     // Will retrieve address data from API only if both door no. and postcode are completed.
    }
})


// When the user changes the address select options, check if they choose Enter Manually, if so then show a blank form, otherwise pre-populate the form.
$("#address-select").on("change", function(event) {
    
    selectedAddress = $(this).val();
    addressSearchMth(selectedAddress);
    if (selectedAddress == "manual") {
        clearAddressFields();
    }
    menuBtnText();
});

// When the user interacts with the manual address fields (click)
$(".address-fields .form-group input").on("click", function(event) {
    menuBtnText();
    /*processUserAddress(); */   
});

// When the user interacts with the manual address fields (keydown)
$(".address-fields .form-group input").on("keydown", function(event) {
    if (event.keyCode == 13 || event.keyCode == 9) {
/*        processUserAddress();*/
        menuBtnText();
    };    
});

// Using the Postcode and Door Number, it will generate options for the address-select drop down options.
function setSelectOptions() {
    
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
        //query = "https://api.getaddress.io/find/" + postcode + "/" + doorNo + "?api-key=" + key

//            request = new XMLHttpRequest;
////           request.open("GET", query, true);

//            request.onload = function() {
//                if (request.status >= 200 && request.status < 400) {
//                    var data = JSON.parse(request.responseText);
//                    console.log(data);
//                }

        var data = JSON.parse('{"latitude":51.515605926513672,"longitude":-0.057411406189203262,"addresses":["39-45 Cavell Street, , , , , London, ","Flat 1-9, 39-45 Cavell Street, , , , London, ","Flat 4, 39-45 Cavell Street, , , , London, ","Flat 5, 37 Cavell Street, , , , London, ","Flat 5, 49 Cavell Street, , , , London, ","Holiday Inn London, 5 Cavell Street, , , , London, "]}');

        // Store only the address
        address = data.addresses;
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
    
    addressNo =  addressNo = $("#address-select").val();;
    console.log(addressNo)
    if (addressNo != "none" && addressNo != "manual") {
        console.log("hi")
        addressNo = Number(addressNo);
        userAddress = {
            addressLine1: addressElems[addressNo].addressLine1,
            addressLine2: addressElems[addressNo].addressLine2,
            addressLine3: addressElems[addressNo].addressLine3,
            addressLine4: addressElems[addressNo].addressLine4,
            city: addressElems[addressNo].city,
            postcode: $("#postcode").val().toUpperCase(),
            county: addressElems[addressNo].county
        }
         localStorage.setItem("userAddress",JSON.stringify(userAddress));
        
    } else if (addressNo = "manual") {
        
        userAddress = {
            addressLine1: $("#address-line-1").val(),
            addressLine2: $("#address-line-2").val(),
            addressLine3: $("#address-line-3").val(),
            addressLine4: $("#address-line-4").val(),
            city: $("#city").val(),
            postcode: $("#in-postcode").val(),
            county: $("#county").val()
        }
         localStorage.setItem("userAddress",JSON.stringify(userAddress));
    }
}

// Clears all the Address Fields
function clearAddressFields() {
    $("#door-no").val("");
    $("#postcode").val("");
    $("#address-line-1").val("");
    $("#address-line-2").val("");
    $("#address-line-3").val("");
    $("#address-line-4").val("");
    $("#in-city").val("");
    $("#in-postcode").val("");
    $("#county").val("");
}

// Updates button text depending on whether or not the user has inputed a door/house number and postcode.
function menuBtnText() {
    
    // If user selects a address from the drop down menu
    if ($("#address-select").val() != "none" && $("#address-select").val() != "manual") {
        $(".address-search .btn").val("Continue");
    // If user enters sufficent fields for their address manually
    } else if ($("#address-line-1").val() != "" && $("#in-postcode").val() != "") {
        $(".address-search .btn").val("Continue");
        $(".address form").attr("action", "menu.html");
    } else {
        $(".address-search .btn").val("Enter Manually");
    }
    
    // If the button text is continue, then update the form action to go to menu.html.
    if ($(".address-search .btn").val() === "Continue") {
        processUserAddress();
        $(".address form").attr("action", "menu.html");
    } else {
        $(".address form").attr("action", "");
    }
     
};

function addressSearchMth(mtd) {
    if (mtd === "manual") {
        $(".address-fields").removeClass("hide");
    } else {
        $(".address-fields").addClass("hide");
    }
};