<?php 
$errors = '';
$myemail = 'info@got311.org';
if(empty($_POST['name'])  || 
   empty($_POST['email']) || 
   empty($_POST['message']))
{
    $errors .= "\n Error: all fields are required";
}

$name = $_POST['name']; 
$email_address = $_POST['email']; 
$message = $_POST['message']; 

if (!eregi(
"^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$", 
$email_address))
{
    $errors .= "\n Error: Invalid email address";
}

if( empty($errors))
{
	$to = $myemail; 
	$email_subject = "New Message From: $name";
	$email_body = "New Message From Contact Page.\n".
	"\n Name: $name \n Email: $email_address \n Message: \n $message"; 
	
	$headers = "From: $myemail"; 
	$headers .= "Reply-To: $email_address";
	
	mail($to,$email_subject,$email_body,$headers);
	//redirect to the 'thank you' page
	header('Location: index.html');
} 
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
<head>
	<title>ERROR</title>
</head>

<body>
<!-- This page is displayed only if there is an error -->
<?php
echo nl2br($errors);
?>

</body>
</html>