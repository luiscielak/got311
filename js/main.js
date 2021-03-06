/*	
 *	got311.org 
 *	main.js	v0.1.0
 */


var zip;
var state_name;
var state_id;
var city_name;

var web_url;
var app_url;
var phone_number;



function got311(location){

    zip = location;


    // Make Ziptastic request
    $.ajax({
    url: "http://zip.elevenbasetwo.com/v2",
    cache: false,
    dataType: "json",
    type: "GET",
    data: "zip=" + zip,
    success: function(result, success) {
        // Parse result
        city_name = result.city.replace(/\s/g,'');
        state_name = result.state;

        // Get 311 services
        getServices(city_name);
    },
    error: function(result, success) {
        // $(".zip-error").slideDown(300);
        console.log("0_o");
        renderError();
    }

  });    
 
};


// got311(33028);

function getServices(city_name){

    // Retrieve Got311 services data
    for (var i = 0; i < services.length; i++) {
        if(city_name === services[i].city_name){
            // Parse data
            
            state_id = services[i].state_id;
            phone_number = services[i].phone_number;
            web_url = services[i].web_url;
            app_url = services[i].app_url;

            renderMessage(city_name);

            return city_name;
            break;
        } 

    };
    no311(city_name, state_name);
};


function no311(city_name, state_name){
    console.log(city_name,state_name,"gots not 3-1-1");


    // Display notice message
    $("#location-wrap").show();

    // Add not-available class
    $("#location-wrap").addClass("not-available");


    // Write location notice to HTML
    document.getElementById("location-wrap").innerHTML=
    "<a href=\"#location-wrap\"><h1>"+
    "No! :("+
    "</h1></a><h3>"+
    "3-1-1 is not available yet in</h3>"+
    "<h3>"+city_name+", "+state_name+"</h3>";
};

// getServices("Miami");


function getGeoloc() {

    // Get geoloc data
    if (navigator.geolocation) {
        var location_timeout = setTimeout("geolocFail()", 10000);
    
        navigator.geolocation.getCurrentPosition(function(position) {
            clearTimeout(location_timeout);
    
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
    
            geocodeLatLng(lat, lng);
        }, function(error) {
            clearTimeout(location_timeout);
            geolocFail();
        });
    } else {
        // Fallback for no geolocation
        geolocFail();
    }
};



function geocodeLatLng(lat, lng){
    // do success handling
    console.log("current pos: ",lat, lng);

    getZipCode(lat+','+lng);

};


function geolocFail(){
    // do error handling
    console.log("errrghhhorrr");

};

function getZipCode(position){

  var position = position;
         $.getJSON('proxy.php',{
            path : "http://maps.google.com/maps/api/geocode/json?latlng="+position+"&sensor=false",
            type: "application/json"
         }, function(json){
            //Find the zip code of the first result
            if(!(json.status == "OK")){
               // GETZIP.error('Zip Code not Found');
               console.log(geolocFail);
               return;
            }
            var found = false;
            $(json.results[0].address_components).each(function(i, el){
               if($.inArray("postal_code", el.types) > -1){
                  // $("#status").text('Your Zip Code: ' + el.short_name);
                  found = true;

                  console.log(el.short_name);

                  got311(el.short_name);
                  return;
               }
            });
            if(!found){
                geolocFail();
            }
        });
};



function renderMessage(city_name){
    console.log("renderin!");
    console.log("Yes! 3-1-1 is available in ",city_name)

    // Display notice message
    $("#location-wrap").show();

    // Clear not-available class
    $("#location-wrap").removeClass("not-available");

    // Write location notice to HTML
    document.getElementById("location-wrap").innerHTML=
    "<a href=\"#location-wrap\"><h1>"+
    "Yes!"+
    "</h1></a><h3>"+
    "3-1-1 is available in</h3>"+
    "<h2>"+city_name+"</h2>";

    // Update service channel links
    $("#phone a").prop("href", 'tel:+1'+phone_number);
    $("#web a").prop("href", web_url).attr('target','_blank'); 
    $("#app a").prop("href", app_url).attr('target','_blank');

    // Update serivce icon style
    $("#phone").addClass("available");
    $("#web").addClass("available");
    $("#app").addClass("available");


};



function renderError(){             // @TODO: this function needs some work...
    console.log("errrghhhorrr");    

   // Write HTML div with location error
    $("#location-wrap").show();

    document.getElementById("location-wrap").className = "location-error";

    document.getElementById("location-wrap").innerHTML=
    "<a href=\"#location-wrap\"><h3>"+
    "Sorry!!"+
    "</h3></a><h3>"+
    "No 3-1-1 in "+city_name+"...</h3>";

}



// Check integer
function is_int(value){ 
  if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
    return true;
  } else { 
    return false;
  } 
}


// START DOM Ready
$(function() {

  // Set up
  $("#zip").keyup(function() {

    var code = (event.keyCode ? event.keyCode : event.which); 

    // If backspace, hide notice, clear icon styles, clear classes
    if(code==8){
        $("#location-wrap").hide();
        $("#channels li").removeClass("available");

    } else {

        // Else start
        console.log("start");
        console.log("city ",city_name);

        // Cache 
        var el = $(this);
        console.log(el.val());

        // Did they type five integers?
        if ((el.val().length == 5) && (is_int(el.val())))  {

            // Get 311 data
            got311(el.val());

        };
    }
  });
}); // END DOM Ready





// Toltips & Popovers
// -------------------------------------------------

  // tool-tip
  $(function ()  
    { $(".tip").tooltip();  
  });  


  // pop-over
  $(function ()  
    { $(".pop").popover();
  });  




// Flexsider
// --------------------------------------------------

// $(window).load(function() {
//   $('.flexslider').flexslider({
//     animation: "slide",
//     animationSpeed: 2000,
//     directionNav: true,
//     keyboard: true,
//     slideshow: true,
//     slideshowSpeed: 2000
//   });
// });

// $(document).ready(function(){
//   $(".scroll").click(function(event){
//     //prevent the default action for the click event
//     event.preventDefault();
    
//     //get the full url - like mysitecom/index.htm#home
//     var full_url = this.href;
    
//     //split the url by # and get the anchor target name - home in mysitecom/index.htm#home
//     var parts = full_url.split("#");
//     var trgt = parts[1];
    
//     //find and remove exisiting active classes
//     $('.scrollnav').find('.active').removeClass('active');
    
//     //add active class for just clicked link
//     $(this).addClass('active');

    
//     //get the top offset of the target anchor
//     var target_offset = $("#"+trgt).offset();
//     var target_top = target_offset.top;
    
//     //goto that anchor by setting the body scroll top to anchor top
//     $('html, body').animate({scrollTop:target_top}, 1000);
//   });
// });

// $(document).ready(function() {
//   $(window).scroll(function() {
//     // $('.scrollnav').find('.active').removeClass('active');
//   });
// });





