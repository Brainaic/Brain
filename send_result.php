<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $pdf = $_FILES['pdf']['tmp_name'];

    $to = "obasa985@gmail.com";
    $subject = "PRI employment Results for $name";
    $message = "Dear Admin,\n\nPlease find attached the assessment results for $name ($email).\n\nBest regards,\nPolarview resources";
    $boundary = md5("random");

    $headers = "From: Priemployment@polarviewresources.com\r\nReply-To: Polarviewresources@gmail.com";
    $headers .= "\r\nMIME-Version: 1.0\r\nContent-Type: multipart/mixed; boundary=\"$boundary\"";

    $body = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=ISO-8859-1\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $body .= chunk_split(base64_encode($message));

    $pdf_content = chunk_split(base64_encode(file_get_contents($pdf)));
    $body .= "--$boundary\r\n";
    $body .= "Content-Type: application/pdf; name=\"assessment_results.pdf\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"exam_results.pdf\"\r\n\r\n";
    $body .= $pdf_content;
    $body .= "--$boundary--";

    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
