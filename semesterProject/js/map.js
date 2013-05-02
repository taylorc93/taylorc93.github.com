var myLat;
var myLng;
var map;
var parkImg = "images/parkinglot.png";
//var shadowImg = "images/parkinglot.shadow.png";

function init(){
	myLocation();
	var landmark = new google.maps.LatLng(42.4086406, -71.1181093);

	var myOptions = {
		zoom: 15, 
		center: landmark,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel:false
	};
	
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	
	myLocation();
	get_data();
}

function myLocation(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
				mylat=position.coords.latitude;
				mylng=position.coords.longitude;
				
				mylat = position.coords.latitude;
				mylng = position.coords.longitude;

			var my_location=new google.maps.LatLng(mylat, mylng);
				map.setCenter(my_location);
			var marker=new google.maps.Marker({
				position: my_location,
				map: map,
				title: "Your Location"
			});
		});
		
	}
}
//listings = new Object;
//listings = [{'address':'5 Teale Ave.', 'price':'$500', 'startdate':'10/21/13', 'enddate':'11/21/13', 'parkingtype':'garage', 'contact':'jason.schneiderman@tufts.edu', 'description':'THIS IS MY DESCRIPTION TEST 1'},{'address':'5 Teale Ave.', 'price':'$500', 'startdate':'10/21/13', 'enddate':'11/21/13', 'parkingtype':'garage2', 'contact':'jason.schneiderman@tufts.edu', 'description':'THIS IS MY DESCRIPTION TEST 2'}];
request = new XMLHttpRequest();

    
function get_data() {
	 request.open("GET", "http://rocky-reaches-7172.herokuapp.com/alllistings.json", true);
	 request.send(null);
     request.onreadystatechange = callback;
}

function callback() {
	if (request.readyState == 4 && request.status == 200) {
         parse();
     }
    if (request.status == 0) {
     	document.getElementById("list").innerHTML = "Error! Please refresh the page until jobs appear...";
     }
        
}

function parse() {
	str = request.responseText;
    var listings = JSON.parse(str);

 	for(i=0; i<listings.length; i++) { 
 		var s = "myModal" + i;
 		$('.table-hover').append('<tr class="tableRow"><td class="listingTable"<a href="#'+s+'" data-toggle="modal">' 
 									+ listings[i]['address'] + '</a></br></td></tr>');
 		$('.listingTable:last').append('<div class="info"><ul class="unstyled"><li>' + listings[i]['price'] + '</li><li>' 
 										+ listings[i]['startdate'] + ' to ' + listings[i]['enddate'] + '</li><li>' + listings[i]['parkingtype'] 
 										+ '</li></ul></div>');
 		$('.tableRow:last').after('<div id="'+s+'" class="modal hide fade tableModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>');
 		$('.tableModal:last').append('<div class="modal-header tableHeader"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button><h3 id="myModalLabel">'
 										+listings[i]['address']+'</h3></div>');
 		$('.tableHeader:last').after('<div class="modal-body tableBody"> Price: '+listings[i]['price']+'</br> Address: '
 										+listings[i]['address']+'</br>Dates: '+listings[i]['startdate']+' to ' + listings[i]['enddate'] 
 										+'</br>Seller Contact: '+listings[i]['contact']+'</br>Description: '+listings[i]['description']
 										+'</div>');
 		$('.tableBody:last').after('<div class="modal-footer"><button class="btn" data-dismiss="modal" aria-hidden="true">Close</button></div>');
     	var mylatlng = new google.maps.LatLng(listings[i]['lat'],listings[i]['lon']);
		var marker = new google.maps.Marker({
			position: mylatlng,
			map: map,
			title: listings[i]['address'],
			icon: parkImg
			//shadow: shadowImg
		});
		google.maps.event.addListener(marker, 'click', function(){
			$("#"+s).modal('show');
		});
 		
	}
}
