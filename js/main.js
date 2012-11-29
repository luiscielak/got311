/*	
 *	got311.org 
 *	main.js	v0.1.0
 */



/**
 Returns the city name, state name, state ID, web URL, mobile app URL and phone number.
 @param {String/Number} zip code number or city name
 @return {Object} Got311 object
 @example
    got311(19107);
    got311('Philadelphia');
    got311(39.950452, -75.160659);
 */


var zip;
var state_name;
var state_id;
var city_name;

var phone_number;

var input;





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
        // ... is success

        // Parse result
        city_name = result.city;
        state_name = result.state;

        console.log(city_name,state_name);

        // $("#city").val(result.city);
        // $("#state").val(result.state);      
        // $(".fancy-form div > div").slideDown();

        // Write HTML div with location
        // document.getElementById("location-wrap").innerHTML=                
        //   "<a href=\"#location-wrap\"><h1>Yes!</h1></a><h3>3-1-1 is available in</h3><h2>"+result.city+", "+result.state+"</h2>";
        
    

    },
    error: function(result, success) {
      // ... is error
    }

  });    

    


    // parse ziptastic data


    // console.log(client.length/)







    // console.log("got311(location);");
    // console.log(location);


    // zip = location;

    // input = location;

    // console.log("input: "+input);

    // getCity(zip);

    getServices(location);
}

// @return {String} City name
function getCity(zip){
    // console.log("getCity(zip);");
    // console.log(zip);

    // getServices(city_name);
}

// @return {String} Services ID
function getServices(city_name){
    console.log("getServices(city_name)");
    console.log(city_name);


    


    
    for (var i = 0; i < services.length; i++) {
        // console.log(g311_services[i]);
        // console.log(city_name, services[i].city_name);
        if(city_name == services[i].city_name){
            console.log(city_name, services[i].city_name);
        };
    };


    console.log("output: "+phone_number);

};







got311(19107);


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


// Events
// -------------------------------------------------


var emailField = document.getElementById("email");

emailField.onFocus = function() {
  if ( emailField.value == "Email Address") {
    emailField.value = "";
  }
};

emailField.onblur = function () {
  if ( emailField.value == "" ) {
    emailField.value = "your email";
  }
};




// set time out in milliseconds
setTimeout( simpleMessage, 5000 );

function simpleMessage() {
  // alert("this is a message");
}

// Create the elemtns
// var newHeading = document.createElement("h1");
// var newParagraph = document.createElement("p");

// Add content; use innerHTML
// newHeading.innerHTML = "Did you know?";
// newParagraph.innerHTML = "California produces over 17 millions of wine."

// OR create child nodes manually
// var h1Text = document.createTextNode("Did you know?");
// var paraText = document.createTextNode("California produces over 17 millions")
// and add them as child nodes to the new elements


// Attach elements to the document
// document.getElementById("overview").appendChild(newHeading);
// document.getElementById("overview").appendChild(newParagraph);


// Alternatives to appendchild

// var myNewElement = document.createElement("li");
// var secondItem = myElement.getElementsByTagName('li')[1];

// myElement.insertBefore(myNewElement, secondItem);



// var mainTitle = document.getElementById("overview");

// console.log("This is an elemnt of type: ", mainTitle.nodeType );


// console.log(mainTitle.innerHTML);


// var myNewElement = document.createElement("li");

// myElement.appendChild(myNewElement);






// Tooltips
// --------------------------------------------------





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

