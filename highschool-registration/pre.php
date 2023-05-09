<?php
session_start();


define('DB_SERVER','127.0.0.1');
define('DB_USERNAME','edugh9081q_edu-gh');
define('DB_PASSWORD','Tz*TxA~U7@je');
define('DB_NAME','edugh9081q_smartribe');
$connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
if($connection === false) {
	die("ERROR: Could not connect. ");
}

$parentName = $parentCity = $parentRegion = $parentEmail = $parentContacts = $parentReligion = '';
$parentName_err = $parentCity_err = $parentRegion_err = $parentEmail_err = $parentContacts_err = $parentReligion_err = '';

if($_SERVER['REQUEST_METHOD']=='POST') {




	if(empty(trim($_POST["parent_name"]))) {
		$parentName_err = "Kindly enter parent's name.";
		$pp = "";
	} else {
		$sql = "SELECT id FROM smartribe_student_registrations_attempted_submissions WHERE parent_name = ?";
		if($stmt = mysqli_prepare($connection,$sql)) {
			mysqli_stmt_bind_param($stmt, "s", $param_parentName);
			$param_parentName=trim($_POST["parent_name"]);

			if(mysqli_stmt_execute($stmt)) {
				mysqli_stmt_store_result($stmt);
				$parentName = mysqli_escape_string($connection, $_POST["parent_name"]);
			} else {
				$parent_name_err = "CRITICAL ERROR";
				$pp = "";
			}
		}
		mysqli_stmt_close($stmt);
	}

	if(empty(trim($_POST["parent_city"]))) {
		$parentCity_err = "Kindly enter parent's city.";
		$pp = "";
	} else {
		$sql = "SELECT id FROM smartribe_student_registrations_attempted_submissions WHERE parent_city = ?";
		if($stmt = mysqli_prepare($connection,$sql)) {
			mysqli_stmt_bind_param($stmt, "s", $param_parentCity);
			$param_parentCity=trim($_POST["parent_city"]);

			if(mysqli_stmt_execute($stmt)) {
				mysqli_stmt_store_result($stmt);
				$parentCity = mysqli_escape_string($connection, $_POST["parent_city"]);
			} else {
				$parent_city_err = "CRITICAL ERROR";
				$pp = "";
			}
		}
		mysqli_stmt_close($stmt);
	}

	if(empty(trim($_POST["parent_region"]))) {
		$parentRegion_err = "Kindly enter parent's region school.";
		$pp = "";
	} else {
		$sql = "SELECT id FROM smartribe_student_registrations_attempted_submissions WHERE parent_region = ?";
		if($stmt = mysqli_prepare($connection,$sql)) {
			mysqli_stmt_bind_param($stmt, "s", $param_parentRegion);
			$param_parentRegion=trim($_POST["parent_region"]);

			if(mysqli_stmt_execute($stmt)) {
				mysqli_stmt_store_result($stmt);
				$parentRegion = mysqli_escape_string($connection, $_POST["parent_region"]);
			} else {
				$parent_region_err = "CRITICAL ERROR";
				$pp = "";
			}
		}
		mysqli_stmt_close($stmt);
	}

	if(empty(trim($_POST["parent_email"]))) {
		$parentEmail_err = "Kindly enter parent's email.";
		$pp = "";
	} else {
		$sql = "SELECT id FROM smartribe_student_registrations_attempted_submissions WHERE parent_email = ?";
		if($stmt = mysqli_prepare($connection,$sql)) {
			mysqli_stmt_bind_param($stmt, "s", $param_parentEmail);
			$param_parentEmail=trim($_POST["parent_email"]);

			if(mysqli_stmt_execute($stmt)) {
				mysqli_stmt_store_result($stmt);
				$parentEmail = mysqli_escape_string($connection, $_POST["parent_email"]);
			} else {
				$parent_email_err = "CRITICAL ERROR";
				$pp = "";
			}
		}
		mysqli_stmt_close($stmt);
	}

	if(empty(trim($_POST["parent_contacts"]))) {
		$parentContacts_err = "Kindly enter parent's email.";
		$pp = "";
	} else {
		$sql = "SELECT id FROM smartribe_student_registrations_attempted_submissions WHERE parent_contacts = ?";
		if($stmt = mysqli_prepare($connection,$sql)) {
			mysqli_stmt_bind_param($stmt, "s", $param_parentContacts);
			$param_parentContacts=trim($_POST["parent_contacts"]);

			if(mysqli_stmt_execute($stmt)) {
				mysqli_stmt_store_result($stmt);
				$parentContacts = mysqli_escape_string($connection, $_POST["parent_contacts"]);
			} else {
				$parent_contacts_err = "CRITICAL ERROR";
				$pp = "";
			}
		}
		mysqli_stmt_close($stmt);
	}

	if(empty(trim($_POST["parent_religion"]))) {
		$parentRegion_err = "Kindly enter parent's religion.";
		$pp = "";
	} else {
		$sql = "SELECT id FROM smartribe_student_registrations_attempted_submissions WHERE parent_religion = ?";
		if($stmt = mysqli_prepare($connection,$sql)) {
			mysqli_stmt_bind_param($stmt, "s", $param_parentReligion);
			$param_parentReligion=trim($_POST["parent_religion"]);

			if(mysqli_stmt_execute($stmt)) {
				mysqli_stmt_store_result($stmt);
				$parentReligion = mysqli_escape_string($connection, $_POST["parent_religion"]);
			} else {
				$parent_religion_err = "CRITICAL ERROR";
				$pp = "";
			}
		}
		mysqli_stmt_close($stmt);
	}

	$created_at = '';
	$sql = "SELECT id FROM smartribe_student_registrations_attempted_submissions WHERE created_at = ?";
	if($stmt = mysqli_prepare($connection,$sql)) {
		mysqli_stmt_bind_param($stmt, "s", $param_created_at);
		$param_created_at = date("Y/M/d");

		if(mysqli_stmt_execute($stmt)) {
			mysqli_stmt_store_result($stmt);
			$created_at = date("Y/M/d");
		} else {
			$created_at_err = "CRITICAL ERROR";
			$pp = "";
		}
	}
	mysqli_stmt_close($stmt);




	if(empty($parentName_err) && empty($parentCity_err) && empty($parentRegion_err) && empty($parentEmail_err) && empty($parentContacts_err) && empty($parentReligion_err)) {
		$sql = "INSERT INTO smartribe_student_registrations_attempted_submissions (parent_name, parent_city, parent_region, parent_email, parent_contacts, parent_religion, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
		if($stmt = mysqli_prepare($connection,$sql)) {
			mysqli_stmt_bind_param($stmt, "sssssss", $param_parentName, $param_parentCity, $param_parentRegion, $param_parentEmail, $param_parentContacts, $param_parentReligion, $param_created_at);

			$param_parentName = $parentName;
			$param_parentCity = $parentCity;
			$param_parentRegion = $parentRegion;
			$param_parentEmail = $parentEmail;
			$param_parentContacts = $parentContacts;
			$param_parentReligion = $parentReligion;
			$param_created_at = $created_at;


			if(mysqli_stmt_execute($stmt)) {
				echo "success";
				exit();
			} else {
				echo "Something went wrong. Kindly try again later.";
			}
		}
		mysqli_stmt_close($stmt);
	}
	mysqli_close($connection);
} else {
	die();
}
?>
