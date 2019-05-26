<<<<<<< HEAD
// When the menu button is pressed
$("#open-address").on("click", function () {
    $(".address").css("opacity", "1");
    $(".address").css("width", $(".top-container").width());
    $(".address").css("height", $(".top-container").height() + 20);
    $(".address").addClass("open-address");
});

var submitClicks = 0;       // Number of times the address form has been submitted

// When the addess is completed and submitted
$("#submit-address").on("click", function () {
    submitClicks += 1;
    var postcode = $("#postcode").val();
    postcode = postcode.replace(" ", "");

    if (submitClicks > 0) {
        checkAddressFields();
        if ($("#submit-address").val() === "Continue") {
            getLocationAPI(postcode);
        }
    }
});

// When the window resizes, change the size of the address div.
$(window).on("resize", function () {
    $(".address").css("width", $(".top-container").width());
    $(".address").css("height", $(".top-container").height() + 20);
});

$("input").on("click", function () {
    checkAddressFields();
});

$("input").on("change", function () {
    checkAddressFields();
});

// If Address Line 1 and Post Code are completed, then it will show the complete button, otherwise it will show the incomplete button.
function checkAddressFields() {
    if (submitClicks > 0) {
        if ($("#address-line-1").val() === "" && $("#postcode").val() === "") {
            $("#address-line-1").addClass("incomplete-data");
            $("#postcode").addClass("incomplete-data");
            $("#submit-address").val("Incomplete");
            $("#submit-address").removeClass("green-btn");
            $("#submit-address").addClass("red-btn");
        } else if ($("#address-line-1").val() === "") {
            $("#address-line-1").addClass("incomplete-data");
            $("#postcode").removeClass("incomplete-data");
            $("#submit-address").val("Incomplete");
            $("#submit-address").removeClass("green-btn");
            $("#submit-address").addClass("red-btn");
        } else if ($("#postcode").val() === "") {
            $("#address-line-1").removeClass("incomplete-data");
            $("#postcode").addClass("incomplete-data");
            $("#submit-address").val("Incomplete");
            $("#submit-address").removeClass("green-btn");
            $("#submit-address").addClass("red-btn");
        } else {
            $("#address-line-1").removeClass("incomplete-data");
            $("#postcode").removeClass("incomplete-data");
            $("#submit-address").val("Continue");
            $("#submit-address").addClass("green-btn");
            $("#submit-address").removeClass("red-btn");
        }
    }
};

function getLocationAPI(postcode) {
    APIData = new Object();
    postcode = postcode.replace(" ", "");
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
        } else {
            APIData = {status: "Not Found"};
        }
    
        APIData.addressLine1 = $("#address-line-1").val(),
        APIData.addressLine2 = $("#address-line-2").val(),
    
        localStorage.setItem("userAddress", JSON.stringify(APIData));
        
        window.location.href = "./menu.html";
    }
=======
// When the menu button is pressed
$("#open-address").on("click", function () {
    $(".address").css("opacity", "1");
    $(".address").css("width", $(".top-container").width());
    $(".address").css("height", $(".top-container").height() + 20);
    $(".address").addClass("open-address");
});

var submitClicks = 0;       // Number of times the address form has been submitted

// When the addess is completed and submitted
$("#submit-address").on("click", function () {
    submitClicks += 1;
    var postcode = $("#postcode").val();
    postcode = postcode.replace(" ", "");

    if (submitClicks > 0) {
        checkAddressFields();
        if ($("#submit-address").val() === "Continue") {
            getLocationAPI(postcode);
        }
    }
});

// When the window resizes, change the size of the address div.
$(window).on("resize", function () {
    $(".address").css("width", $(".top-container").width());
    $(".address").css("height", $(".top-container").height() + 20);
});

$("input").on("click", function () {
    checkAddressFields();
});

$("input").on("change", function () {
    checkAddressFields();
});

// If Address Line 1 and Post Code are completed, then it will show the complete button, otherwise it will show the incomplete button.
function checkAddressFields() {
    if (submitClicks > 0) {
        if ($("#address-line-1").val() === "" && $("#postcode").val() === "") {
            $("#address-line-1").addClass("incomplete-data");
            $("#postcode").addClass("incomplete-data");
            $("#submit-address").val("Incomplete");
            $("#submit-address").removeClass("green-btn");
            $("#submit-address").addClass("red-btn");
        } else if ($("#address-line-1").val() === "") {
            $("#address-line-1").addClass("incomplete-data");
            $("#postcode").removeClass("incomplete-data");
            $("#submit-address").val("Incomplete");
            $("#submit-address").removeClass("green-btn");
            $("#submit-address").addClass("red-btn");
        } else if ($("#postcode").val() === "") {
            $("#address-line-1").removeClass("incomplete-data");
            $("#postcode").addClass("incomplete-data");
            $("#submit-address").val("Incomplete");
            $("#submit-address").removeClass("green-btn");
            $("#submit-address").addClass("red-btn");
        } else {
            $("#address-line-1").removeClass("incomplete-data");
            $("#postcode").removeClass("incomplete-data");
            $("#submit-address").val("Continue");
            $("#submit-address").addClass("green-btn");
            $("#submit-address").removeClass("red-btn");
        }
    }
};

function getLocationAPI(postcode) {
    APIData = new Object();
    postcode = postcode.replace(" ", "");
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
        } else {
            APIData = {status: "Not Found"};
        }
    
        APIData.addressLine1 = $("#address-line-1").val(),
        APIData.addressLine2 = $("#address-line-2").val(),
    
        localStorage.setItem("userAddress", JSON.stringify(APIData));
        
        window.location.href = "./menu.html";
    }
>>>>>>> 59051d47440d9b46857a19d8a194a3f42d4423e3
};