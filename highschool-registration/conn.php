<?php
define('DB_SERVER','127.0.0.1');
define('DB_USERNAME','edugh9081q_edu-gh');
define('DB_PASSWORD','Tz*TxA~U7@je');
define('DB_NAME','edugh9081q_smartribe-jhs-and-shs-reg');
$connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
if($connection === false) {
	die("ERROR: Could not connect. ");
}

?>
