$("#open-address").on("click", function() {
    $(".address").removeClass("hide");
})

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
//            localStorage.setItem("userAddress", JSON.stringify(APIData));
//            window.location.href = "./menu.html";
            
        } else {
            APIData = {status: "Not Found"};
        }
    
        APIData.addressLine1 = $("#address-line-1").val(),
        APIData.addressLine2 = $("#address-line-2").val(),
    
        localStorage.setItem("userAddress", JSON.stringify(APIData));
        window.location.href = "./menu.html";
    }
    
};