<?php
session_start();


define('DB_SERVER','127.0.0.1');
define('DB_USERNAME','edugh9081q_edu-gh');
define('DB_PASSWORD','Tz*TxA~U7@je');
define('DB_NAME','edugh9081q_smartribe-jhs-and-shs-reg');
$connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
if($connection === false) {
	die("ERROR: Could not connect. ");
}

$studentName = $studentDevice = $studentSchool = $studentClass = $studentDob = $studentGender = $parentName = $parentCity = $parentRegion = $parentEmail = $parentContacts = $parentReligion = $program = '';
$studentName_err = $studentDevice_err = $studentSchool_err = $studentClass_err = $studentDob_err = $studentGender_err = $parentName_err = $parentCity_err = $parentRegion_err = $parentEmail_err = $parentContacts_err = $parentReligion_err = $program_err = '';

if($_SERVER['REQUEST_METHOD']=='POST') {

	if(empty(trim($_POST["student_name"]))) {
		$studentName_err = "Kindly enter a name.";
		$pp = "";
	} else {
		$sql = "SELECT id FROM smartribe_student_registration WHERE student_name = ?";
		if($stmt = mysqli_prepare($connection,$sql)) {
			mysqli_stmt_bind_param($stmt, "s", $param_studentName);
			$param_studentName=trim($_POST["student_name"]);

			if(mysqli_stmt_execute($stmt)) {
				mysqli_stmt_store_result($stmt);
				$studentName = mysqli_escape_string($connection, $_POST["student_name"]);
			} else {
				$student_name_err = "CRITICAL ERROR";
				$pp = "";
			}
		}
		mysqli_stmt_close($stmt);
	}

	if(empty(trim($_POST["student_school"]))) {
		$studentSchool_err = "Kindly enter your school.";
		$pp = "";
	} else {
		$sql = "SELECT id FROM smartribe_student_registration WHERE student_school = ?";
		if($stmt = mysqli_prepare($connection,$sql)) {
			mysqli_stmt_bind_param($stmt, "s", $param_studentSchool);
			$param_studentSchool=trim($_POST["student_school"]);

			if(mysqli_stmt_execute($stmt)) {
				mysqli_stmt_store_result($stmt);
				$studentSchool = mysqli_escape_string($connection, $_POST["student_school"]);
			} else {
				$student_school_err = "CRITICAL ERROR";
				$pp = "";
			}
		}
		mysqli_stmt_close($stmt);
	}

	if(empty(trim($_POST["student_class"]))) {
		$studentClass_err = "Kindly enter your class.";
		$pp = "";
	} else {
		$sql = "SELECT id FROM smartribe_student_registration WHERE student_class = ?";
		if($stmt = mysqli_prepare($connection,$sql)) {
			mysqli_stmt_bind_param($stmt, "s", $param_studentClass);
			$param_studentClass=trim($_POST["student_class"]);

			if(mysqli_stmt_execute($stmt)) {
				mysqli_stmt_store_result($stmt);
				$studentClass = mysqli_escape_string($connection, $_POST["student_class"]);
			} else {
				$student_class_err = "CRITICAL ERROR";
				$pp = "";
			}
		}
		mysqli_stmt_close($stmt);
	}

	if(empty(trim($_POST["student_dob"]))) {
		$studentDob_err = "Kindly choose your DoB.";
		$pp = "";
	} else {
		$sql = "SELECT id FROM smartribe_student_registration WHERE student_dob = ?";
		if($stmt = mysqli_prepare($connection,$sql)) {
			mysqli_stmt_bind_param($stmt, "s", $param_studentDob);
			$param_studentDob=trim($_POST["student_dob"]);

			if(mysqli_stmt_execute($stmt)) {
				mysqli_stmt_store_result($stmt);
				$studentDob = mysqli_escape_string($connection, $_POST["student_dob"]);
			} else {
				$student_dob_err = "CRITICAL ERROR";
				$pp = "";
			}
		}
		mysqli_stmt_close($stmt);
	}

	if(empty(trim($_POST["student_gender"]))) {
		$studentGender_err = "Kindly enter a gender.";
		$pp = "";
	} else {
		$sql = "SELECT id FROM smartribe_student_registration WHERE student_gender = ?";
		if($stmt = mysqli_prepare($connection,$sql)) {
			mysqli_stmt_bind_param($stmt, "s", $param_studentGender);
			$param_studentGender=trim($_POST["student_gender"]);

			if(mysqli_stmt_execute($stmt)) {
				mysqli_stmt_store_result($stmt);
				$studentGender = mysqli_escape_string($connection, $_POST["student_gender"]);
			} else {
				$student_gender_err = "CRITICAL ERROR";
				$pp = "";
			}
		}
		mysqli_stmt_close($stmt);
	}


	if(empty(trim($_POST["student_device"]))) {
		$studentDevice_err = "Kindly choose a device.";
		$pp = "";
	} else {
		$sql = "SELECT id FROM smartribe_student_registration WHERE student_device = ?";
		if($stmt = mysqli_prepare($connection,$sql)) {
			mysqli_stmt_bind_param($stmt, "s", $param_studentDevice);
			$param_studentDevice=trim($_POST["student_device"]);

			if(mysqli_stmt_execute($stmt)) {
				mysqli_stmt_store_result($stmt);
				$studentDevice = mysqli_escape_string($connection, $_POST["student_device"]);
			} else {
				$student_device_err = "CRITICAL ERROR";
				$pp = "";
			}
		}
		mysqli_stmt_close($stmt);
	}





	if(empty(trim($_POST["parent_name"]))) {
		$parentName_err = "Kindly enter parent's name.";
		$pp = "";
	} else {
		$sql = "SELECT id FROM smartribe_student_registration WHERE parent_name = ?";
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
		$sql = "SELECT id FROM smartribe_student_registration WHERE parent_city = ?";
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
		$sql = "SELECT id FROM smartribe_student_registration WHERE parent_region = ?";
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
		$sql = "SELECT id FROM smartribe_student_registration WHERE parent_email = ?";
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
		$sql = "SELECT id FROM smartribe_student_registration WHERE parent_contacts = ?";
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
		$sql = "SELECT id FROM smartribe_student_registration WHERE parent_religion = ?";
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

	if(empty(trim($_POST["program"]))) {
		$program_err = "Kindly choose at least one.";
		$pp = "";
	} else {
		$sql = "SELECT id FROM smartribe_student_registration WHERE program = ?";
		if($stmt = mysqli_prepare($connection,$sql)) {
			mysqli_stmt_bind_param($stmt, "s", $param_program);
			$param_program = trim($_POST["program"]);

			if(mysqli_stmt_execute($stmt)) {
				mysqli_stmt_store_result($stmt);
				$program = mysqli_escape_string($connection, $_POST["program"]);
			} else {
				$program_err = "CRITICAL ERROR";
				$pp = "";
			}
		}
		mysqli_stmt_close($stmt);
	}

	$created_at = '';
	$sql = "SELECT id FROM smartribe_student_registration WHERE created_at = ?";
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




	if(empty($studentName_err) && empty($studentSchool_err) && empty($studentClass_err) && empty($studentDevice_err) && empty($studentDob_err) && empty($studentGender_err) && empty($parentName_err) && empty($parentCity_err) && empty($parentRegion_err) && empty($parentEmail_err) && empty($parentContacts_err) && empty($parentReligion_err) && empty($program_err)) {
		$sql = "INSERT INTO smartribe_student_registration (student_name, student_school, student_device, student_class, student_dob, student_gender, parent_name, parent_city, parent_region, parent_email, parent_contacts, parent_religion, program, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		if($stmt = mysqli_prepare($connection,$sql)) {
			mysqli_stmt_bind_param($stmt, "ssssssssssssss", $param_studentName, $param_studentSchool, $param_studentDevice, $param_studentClass, $param_studentDob, $param_studentGender, $param_parentName, $param_parentCity, $param_parentRegion, $param_parentEmail, $param_parentContacts, $param_parentReligion, $param_program, $param_created_at);

			$param_studentName = $studentName;
			$param_studentSchool = $studentSchool;
			$param_studentDevice = $studentDevice;
			$param_studentClass = $studentClass;
			$param_studentDob = $studentDob;
			$param_studentGender = $studentGender;
			$param_parentName = $parentName;
			$param_parentCity = $parentCity;
			$param_parentRegion = $parentRegion;
			$param_parentEmail = $parentEmail;
			$param_parentContacts = $parentContacts;
			$param_parentReligion = $parentReligion;
			$param_program = $program;
			$param_created_at = $created_at;


			if(mysqli_stmt_execute($stmt)) {
				echo "success";
				$result = mysqli_query($connection,"DELETE FROM `smartribe_student_registrations_attempted_submissions` WHERE `parent_email` = '{$parentEmail}'");
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
