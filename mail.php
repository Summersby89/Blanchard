<?php
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

$name = htmlspecialchars($_POST['name']);
$phone = htmlspecialchars($_POST['phone']);

$title = "Прикоснитесь к прекрасному";
$body = "
<h2>Новая заявка</h2>
<b>Имя:</b>$name<br>
<b>Телефон:</b>$phone<br><br>
";

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->CharSet      = "UTF-8";
    $mail->SMTPAuth     = true;
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->Port         = 465;
    $mail-> SMTPSecure  = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Debugoutput  = function($str, $level) {$GLOBALS['status'][] = $str;};
    $mail->Host         = 'mail.nic.ru';
    $mail->Username     = 'postmaster@summersby.ru';
    $mail->Password     = '02011958DrPa';
    $mail->setFrom('postmaster@summersby.ru', 'Blanchard');
    $mail->addAddress('pashkov_se@mail.ru');
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

if ($mail->send()) {$result = "success";}
else {$result = "error";}
} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
echo json_encode(["result" => $result, "status" => $status]);
