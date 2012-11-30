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
      // ... is error @TODO
    }

  });    
 
}



function getServices(city_name){


    // Retrieve Got311 services data
    for (var i = 0; i < services.length; i++) {
        if(city_name === services[i].city_name){
            // Parse data
            state_id = services[i].state_id;
            phone_number = services[i].phone_number;
            web_url = services[i].web_url;
            app_url = services[i].app_url;
            console.log("Yes! ",city_name)
            
            break;

        } else {
            console.log("No match ",city_name,services[i].city_name)         
        }
    };

};




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




// Zipstatic
// --------------------------------------------------

function is_int(value){ 
  if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
    return true;
  } else { 
    return false;
  } 
}

$(function() {

  // Set up
  $(".fancy-form div > div").hide();
  var firstReveal = true;

  $("#zip").keyup(function() {

    // Cache 
    var el = $(this);

    // Did they type five integers?
    if ((el.val().length == 5) && (is_int(el.val())))  {


      // Call Ziptastic for information
      $.ajax({
        url: "http://zip.elevenbasetwo.com/v2",
        cache: false,
        dataType: "json",
        type: "GET",
        data: "zip=" + el.val(),
        success: function(result, success) {

          // Assign result to variables
          $(".zip-error, .instructions").slideUp(200);
          $("#city").val(result.city);
          $("#state").val(result.state);      
          $(".fancy-form div > div").slideDown();

          // Write HTML div with location
          document.getElementById("location-wrap").innerHTML=                
            "<a href=\"#location-wrap\"><h1>Yes!</h1></a><h3>3-1-1 is available in</h3><h2>"+result.city+", "+result.state+"</h2>";
            
        },
        error: function(result, success) {
          $(".zip-error").slideDown(300);
        }

      });

    } else if (el.val().length < 5) {

      $(".zip-error").slideUp(200);

    };

  });

}); // END DOM Ready


// ontype change -> hide div, remove html when anychanges

