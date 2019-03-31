// API web: https://getaddress.io/
var key = "JEXzYYg1YEaHR7m1ypyudg18199"
// https://api.getaddress.io/find/e12bp/5?api-key=JEXzYYg1YEaHR7m1ypyudg18199

$("#postcode").on("keydown",function(event) {
    if(event.keyCode == 13) {
        var doorNo = $("#door-no").val()
        var postcode = $("#postcode").val()
        
        if (doorNo != "" && postcode !="") {
            postcode = postcode.replace(" ","");
            doorNo = doorNo.repeat(" ","");
            
            //query = "https://api.getaddress.io/find/" + postcode + "/" + doorNo + "?api-key=" + key
            
//            request = new XMLHttpRequest;
////           request.open("GET", query, true);
            
//            request.onload = function() {
//                if (request.status >= 200 && request.status < 400) {
//                    var data = JSON.parse(request.responseText);
//                    console.log(data);
//                }
            
            var data = JSON.parse('{"latitude":51.515605926513672,"longitude":-0.057411406189203262,"addresses":["39-45 Cavell Street, , , , , London, ","Flat 1-9, 39-45 Cavell Street, , , , London, ","Flat 4, 39-45 Cavell Street, , , , London, ","Flat 5, 37 Cavell Street, , , , London, ","Flat 5, 49 Cavell Street, , , , London, ","Holiday Inn London, 5 Cavell Street, , , , London, "]}')
            
            addresses = data.addresses
            
            
            address.forEach(function(address) {
                address = address.split(",");
                })
            })
            
        }
    }
    
})

