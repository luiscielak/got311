/*	
 *	got311.org 
 *	main.js	v0.0.1
 */


// Zipstatic

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
            "<h1>Yes!</h1><h3>3-1-1 is available in</h3><h2>"+result.city+", "+result.state+"</h2>";
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