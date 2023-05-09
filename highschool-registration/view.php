<?php
require('conn.php');

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$username = trim($_POST['username']);
	$password = trim($_POST['password']);

	if($username === 'admin' && $password === 'smart100') {
		$_SESSION['loggedin'] = true;
	}
}

?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title></title>
	<link rel="stylesheet" href="assets/youniversely/css/youniversely.scss">
	
	<?php
	if(!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true){ ?>
		<style media="screen">
		@import url(https://fonts.googleapis.com/css?family=Roboto:300);
		
		.login-page {
			width: 360px;
			padding: 8% 0 0;
			margin: auto;
		}
		.form {
			position: relative;
			z-index: 1;
			background: #ffffff;
			max-width: 360px;
			margin: 0 auto 100px;
			padding: 45px;
			text-align: center;
			box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
		}
		.form input {
			font-family: "Roboto", sans-serif;
			outline: 0;
			background: #f2f2f2;
			width: 100%;
			border: 0;
			margin: 0 0 15px;
			padding: 15px;
			box-sizing: border-box;
			font-size: 14px;
		}
		.form button {
			font-family: "Roboto", sans-serif;
			text-transform: uppercase;
			outline: 0;
			background: #4caf50;
			width: 100%;
			border: 0;
			padding: 15px;
			color: #ffffff;
			font-size: 14px;
			-webkit-transition: all 0.3 ease;
			transition: all 0.3 ease;
			cursor: pointer;
		}
		.form button:hover,
		.form button:active,
		.form button:focus {
			background: #43a047;
		}
		.form .message {
			margin: 15px 0 0;
			color: #b3b3b3;
			font-size: 12px;
		}
		.form .message a {
			color: #4caf50;
			text-decoration: none;
		}
		.form .register-form {
			display: none;
		}
		.container {
			position: relative;
			z-index: 1;
			max-width: 300px;
			margin: 0 auto;
		}
		.container:before,
		.container:after {
			content: "";
			display: block;
			clear: both;
		}
		.container .info {
			margin: 50px auto;
			text-align: center;
		}
		.container .info h1 {
			margin: 0 0 15px;
			padding: 0;
			font-size: 36px;
			font-weight: 300;
			color: #1a1a1a;
		}
		.container .info span {
			color: #4d4d4d;
			font-size: 12px;
		}
		.container .info span a {
			color: #000000;
			text-decoration: none;
		}
		.container .info span .fa {
			color: #ef3b3a;
		}
		body {
			background: #76b852; /* fallback for old browsers */
			background: -webkit-linear-gradient(right, #76b852, #8dc26f);
			background: -moz-linear-gradient(right, #76b852, #8dc26f);
			background: -o-linear-gradient(right, #76b852, #8dc26f);
			background: linear-gradient(to left, #76b852, #8dc26f);
			font-family: "Roboto", sans-serif;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
		}
	</style>
	<?php } ?>
</head>
<body>
	<section>
		<?php
		if(isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true){ ?>
			<div>
				<table class="u-table separated striped center-text">
					<thead style="position: sticky; top: 0;">
						<tr class='bg-loify white-text'>
							<th colspan="5">Parent</th>
							<th colspan="7">Student</th>
						</tr>
						<tr>
							<th>Name</th>
							<th>Phone</th>
							<th>Email</th>
							<th>City</th>
							<th>Region</th>
							<th>Name</th>
							<th>DoB</th>
							<th>School</th>
							<th>Class</th>
							<th>Gender</th>
							<th>Program</th>
							<th>Device</th>
						</tr>
					</thead>
					<tbody>
						<?php
						$qr = "SELECT * FROM `smartribe_student_registration`";
						$qr1 = mysqli_query($connection, $qr);
						while ($qr2 = mysqli_fetch_assoc($qr1)) { ?>
							<tr>
								<td><?php echo $qr2['parent_name']; ?></td>
								<td><?php echo $qr2['parent_contacts']; ?></td>
								<td><?php echo $qr2['parent_email']; ?></td>
								<td><?php echo $qr2['parent_city']; ?></td>
								<td><?php echo $qr2['parent_region']; ?></td>
								<td><?php echo $qr2['student_name']; ?></td>
								<td><?php echo $qr2['student_dob']; ?></td>
								<td><?php echo $qr2['student_school']; ?></td>
								<td><?php echo $qr2['student_class']; ?></td>
								<td><?php echo $qr2['student_gender']; ?></td>
								<td><?php echo $qr2['program']; ?></td>
								<td><?php echo $qr2['device']; ?></td>
							</tr>
							<?php } ?>
						</tbody>
					</table>



					<h1>ALL ATTEMPTED SUBMISSIONS</h1>
					<table class="u-table separated striped center-text">
						<thead style="position: sticky; top: 0;">
							<tr class='bg-loify white-text'>
								<th colspan="5">Parent</th>
							</tr>
							<tr>
								<th>Name</th>
								<th>Phone</th>
								<th>Email</th>
								<th>City</th>
								<th>Region</th>
							</tr>
						</thead>
						<tbody>
							<?php
							$qr = "SELECT * FROM `smartribe_student_registrations_attempted_submissions`";
							$qr1 = mysqli_query($connection, $qr);
							while ($qr2 = mysqli_fetch_assoc($qr1)) { ?>
								<tr>
									<td><?php echo $qr2['parent_name']; ?></td>
									<td><?php echo $qr2['parent_contacts']; ?></td>
									<td><?php echo $qr2['parent_email']; ?></td>
									<td><?php echo $qr2['parent_city']; ?></td>
									<td><?php echo $qr2['parent_region']; ?></td>
								</tr>
								<?php } ?>
							</tbody>
						</table>



					<form class="" action="logout.php" method="post">
						<input style='position:fixed; bottom:20px; right:20px; padding:8px; background:lightblue; color:#fff;' type="submit" name="logout" value="Logout">
					</form>
				</div>


		<?php } else { ?>
			<div class="login-page">
				<div class="form">
					<form class="login-form" method='POST' action="view.php">
						<input type="text" placeholder="username" name='username'/>
						<input type="password" placeholder="password" name='password'/>
						<button>login</button>
					</form>
				</div>
			</div>
			<?php } ?>
			</section>
		</body>
		</html>