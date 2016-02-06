<?php

// fallback for http_response_code
if (!function_exists('http_response_code')) {
    function http_response_code($newcode = NULL) {
        static $code = 200;
        if ($newcode !== NULL) {
            header('X-PHP-Response-Code: '.$newcode, true, $newcode);
            if (!headers_sent()) {
                $code = $newcode;
            }
        }
        return $code;
    }
}

// Only process POST reqeusts.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Set the recipient email address.
    $recipient = "test@test.com";

    // Set the email subject.
    $subject = "New contact from your website";

    // Build the email content.
    $email_content = "";

    // build up response body - formats $key to use as label
    foreach ($_POST as $key => $value) {
        $email_content .= str_replace("-", " ", $key) . ":\n$value\n\n";
    }

    // Send the email.
    if (mail($recipient, $subject, $email_content)) {
        // Set a 200 (okay) response code.
        http_response_code(200);
        echo "Thank You! Your message has been sent.";
    } else {
        // Set a 500 (internal server error) response code.
        http_response_code(500);
        echo "Something went wrong and we couldn't send your message. Please try again.";
    }

} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}

?>
