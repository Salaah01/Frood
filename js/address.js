// API web: https://getaddress.io/
var key = "JEXzYYg1YEaHR7m1ypyudg18199"
// https://api.getaddress.io/find/e12bp/5?api-key=JEXzYYg1YEaHR7m1ypyudg18199

// If the user presses enter/tab on postcode field, check if there exists values in the postcode and door number fields. If yes, populate the search-address field with the addresses taken from the API.
$("#postcode").on("keydown", function(event) {
    if(event.keyCode == 13 || event.keyCode == 9) {
        populateAddressOptions();
    }
})

// If the user presses enter/tab on door number, check if there exists values in the postcode and door number fields. If yes, populate the search-address field with the addresses taken from the API.
$("#door-no").on("keydown", function(event) {
    if(event.keyCode == 13 || event.keyCode == 0) {
        populateAddressOptions();
    }
})

// When the user changes the address select options, check if they choose Enter Manually, if so then show a blank form, otherwise pre-populate the form.
$("#address-select").on("change", function(event) {
    
    addressNo = $(this).val();
    
    // If user selects manual, then clear all fields
    if (addressNo == "manual") {
        clearAddressFields()
        
        // If the user selects an option from the drop down menu then complete the input fields
    } else if (addressNo != "" && Number(addressNo) != NaN) {
            
        addressNo = Number(addressNo);
        
        // Address Line 1
        if (addressElems[addressNo].addressLine1 != "") {
            $("#address-line-1").val(addressElems[addressNo].addressLine1);
        } else if ($("#door-no").val() != "") {
            $("#address-line-1").val($("#door-no").val());
        }
        
        // Address Line 2
        if (addressElems[addressNo].addressLine2 != "") {
            $("#address-line-2").val(addressElems[addressNo].addressLine2);
        }
        
        // Address Line 2
        if (addressElems[addressNo].addressLine3 != "") {
            $("#address-line-3").val(addressElems[addressNo].addressLine3);
        }
        
        // Address Line 2
        if (addressElems[addressNo].addressLine4 != "") {
            $("#address-line-4").val(addressElems[addressNo].addressLine4);
        }
        
        // City
        if (addressElems[addressNo].city != "") {
            $("#address-line-city").val(addressElems[addressNo].city);
        }
        
        // Postcode
        if ($("#postcode").val() != "") {
            $("#in-postcode").val($("#postcode").val());
        }
        
        // County
        if (addressElems[addressNo].county != "") {
            $("#county").val(addressElems[addressNo].county);
        }
        
    }
});

// Using the Postcode and Door Number, it will generate options for the address-select drop down options.
function populateAddressOptions() {
    
    // Reset all options
    $("#address-select").children().remove()
    $("#address-select").append("<option value='none'></option\n><option value='manual'>Enter Manually</option>");
    
    // Take the values from the Door Number and Postcode Input Fields
    var doorNo = $("#door-no").val()
    var postcode = $("#postcode").val()

    // Run only if both the door number and postcode and have some value
    if (doorNo != "" && postcode !="") {
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
            
            $("#address-select").prepend("<option value='" + a + "'>" + fullAddress + "</option>\n")
        }
        
    }
    
}

// Populates the Address Fields based on what the user has selected
function populateAddressFields() {
    
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