<?php
// Simple mail handler for Balaji Emrald forms
// Receives POST from forms in index.html and sends email

// Configuration
$toEmail = 'digital@urbanadmark.com'; // Provided by user (ensure correct domain)
$projectName = 'Urban AdMark Website Lead';
$redirectUrl = 'thank-you.html';

// Helper: sanitize input
function get_post($key) {
	return isset($_POST[$key]) ? trim(filter_var($_POST[$key], FILTER_SANITIZE_STRING)) : '';
}

// Collect fields
$name = get_post('name');
$mobile = get_post('phone');
$email = get_post('email');
$service = get_post('service');
$message = get_post('message');

// Basic validation
if ($name === '' || $mobile === '' || $email === '' || $message === '') {
	http_response_code(400);
	echo 'Missing required fields.';
	exit;
}

// Context info
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ua = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
$ref = $_SERVER['HTTP_REFERER'] ?? 'direct';
$time = date('Y-m-d H:i:s');

// Build subject and message
$subject = "$projectName - New Contact Form Submission";
$message = "New contact form submission received:\n\n" .
	"Name: $name\n" .
	"Email: $email\n" .
	"Mobile: $mobile\n" .
	"Service Interest: $service\n" .
	"Message: $message\n\n" .
	"Submitted At: $time\n" .
	"IP: $ip\n" .
	"User-Agent: $ua\n" .
	"Referrer: $ref\n";

// Headers (use a domain email to avoid DMARC rejections)
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: Urban AdMark <no-reply@urbanadmark.com>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: PHP/' . phpversion();
$headersStr = implode("\r\n", $headers);

// CSV backup log (in same directory)
try {
	$csv = __DIR__ . DIRECTORY_SEPARATOR . 'leads.csv';
	$firstWrite = !file_exists($csv);
	$f = fopen($csv, 'a');
	if ($f) {
		if ($firstWrite) {
			fputcsv($f, ['time','name','email','mobile','service','message','ip','referrer','user_agent']);
		}
		fputcsv($f, [$time,$name,$email,$mobile,$service,$message,$ip,$ref,$ua]);
		fclose($f);
	}
} catch (Throwable $e) {
	// ignore logging errors
}

// Attempt send
$sent = @mail($toEmail, $subject, $message, $headersStr);

// Redirect back regardless, but note status
if (!headers_sent()) {
	header('Location: ' . $redirectUrl);
	exit;
}

?>
