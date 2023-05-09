<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta name="viewport" content= "width=device-width, min-width=100vw">
	<meta property="og:title" content="SmarTribe | Registration for SHS and JHS Graduates"/>
	<meta property="og:url" content="http://registration.thesmartribe.com"/>
	<meta property="og:description" content="Use this form to register with The SmarTribe"/>
	<meta property="og:image" content="https://i.ibb.co/J3zL297/Logo.png"/>
	<meta property="og:type" content="website"/>
	<meta property="og:locale" content="en_US"/>
	<title>SmarTribe | Registration for SHS and JHS Graduates</title>
	<link rel="dns-prefetch" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="">
	<link href="https://fonts.googleapis.com/css2?family=Kanit:wght@700&family=Quicksand&display=swap" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="assets/css/new.css">
	<script defer="" src="https://kit.fontawesome.com/d9871a5f39.js"></script>
	<!-- <link rel="stylesheet" href="assets/fa/css/all.min.css"> -->
	<!-- <link rel="stylesheet" type="text/css" href="assets/youniversely/css/youniversely.css" media="print" onload="this.media='all'"> -->
	<!-- <script defer="" type="text/javascript" src="assets/js/jquery.min.js"></script> -->
	<script defer="" src="assets/youniversely/js/youniversely.js" charset="utf-8"></script>
	<script defer="" type="text/javascript" src="assets/js/dist/bundle--new.js"></script>
</head>
<body>
	<section id='smthol'>
		<section id='smt'>
			<div class="s_container hd bg1 s_d-flex s_jcontent-center s_aitems-center">
				<div class="hd-hol center-text">
					<h1 class='sf'>Registration for SHS and JHS Graduates</h1>
				</div>
				<!-- <span><i class="fas fa-user"></i></span> -->
				<button class='smt-btn show-smt-form-btn' type="button">Click To Register</button>
			</div>

	
			<div class="s_container inro s_d-flex s_jcontent-center s_aitems-center">
				<div class="inro-hol center-text">
					<img src="assets/img/logo.png" alt="SmarTribe">
					<h2 class="smt-hd">Welcome To Smar<span>Tribe</span> Registrat<span>ion</span></h2>
					<p>Enroll your students on the online class to sharpen their brains. Lets train your students to code, it will develop their brains. Let us use Verdic Maths to improve your students' concentration, logical thinking, comprehension, listening skills and reasoning skills.</p>
					<button class="smt-btn bg1 white-text show-smt-form-btn" type='button'>REGISTER NOW</button>
				</div>
			</div>
	
	
			<div class="s_container vid s_min-height-max s_d-flex s_jcontent-center s_aitems-center">
				<div class="vid-hol center-text">
					<!-- <div>
						<img src="assets/img/why.png" alt="SmarTribe">
						<h2 class="smt-hd">Why Smar<span>Tribe</span><span>?</span></h2>
						<p>Watch any of the videos below in Twi or English to know why enrolling your kids on SmarTribe is the best.</p>
					</div> -->
	
					<div class="grid">
						<div class="s12 m6 pad">
							<div class='video-div'>
								<div>
									<iframe rel="0" src="https://www.youtube.com/embed/XlWBMQv_KoQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
								</div>
								<h5>English Video</h5>
							</div>
						</div>
						<div class="s12 m6 pad">
							<div class='video-div'>
								<div>
									<iframe rel="0" src="https://www.youtube.com/embed/yxEOfL2l57s" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
									</div>
									<h5>Twi Video</h5>
								</div>
							</div>
						<div class="s12 pad">
							<button class="smt-btn bg1 white-text show-smt-form-btn" type='button'>REGISTER NOW</button>
						</div>
					</div>
				</div>
			</div>


			<footer>
				<span><a href='tel:0205003933'><i class='fas fa-phone'></i> 0205003933</a></span>
				<span><a href='tel:0558740741'><i class='fas fa-phone'></i> 0558740741</a></span>
			</footer>
		</section>
	
		<section id="smt-form" class='hide'>
			<div class="loader loader-double"></div>
	
			<div class='form-hol s_container s_d-flex s_jcontent-center s_aitems-center'>
				<h2 class='smt-hd'>Fill The Form Below To Register</h2>
				<form id='the-form' name='the-form' action="">
		
					<div class="phase parent-phase showing-phase">
						<label for="" class="smt-label">Parent / Guardian Information</label>
						<div class="grid">
							<div class="s12 m6">
								<div class="u-form-field type2">
									<input class="u-input type2 teal" type="text" name="parent_name" placeholder=" ">
									<label class="u-label teal-text">Parent / Guardian Name</label>
									<p class="guide-text danger-text pname_err"></p>
								</div>
							</div>
							<div class="s12 m6">
								<div class="u-form-field type2">
									<input class="u-input type2 teal" type="text" name="parent_contacts" placeholder=" ">
									<label class="u-label teal-text">Phone / Whatsapp</label>
									<p class="guide-text danger-text pcontacts_err"></p>
								</div>
							</div>
							<div class="s12 m6">
								<div class="u-form-field type2">
									<input class="u-input type2 teal" type="email" name="parent_email" placeholder=" ">
									<label class="u-label teal-text">Email</label>
									<p class="guide-text danger-text pemail_err"></p>
								</div>
							</div>
							<div class="s12 m6">
								<div class="u-form-field type2">
									<input class="u-input type2 teal" type="text" name="parent_city" placeholder=" ">
									<label class="u-label teal-text">City</label>
									<p class="guide-text danger-text pcity_err"></p>
								</div>
							</div>
							<div class="s12">
								<!-- <div class="u-form-field type2">
									<input class="u-input type2 teal" type="text" name="parent_region" placeholder=" ">
									<label class="u-label teal-text">Region</label>
									<p class="guide-text danger-text pregion_err"></p>
								</div> -->
								<div class="u-form-field">
									<div class="u-select">
										<input id="selectinputid" type="hidden" name="parent_region">
										<div tabindex="1" data-select="selectMenu" class="selector">Select Region</div>
										<div data-select-input="selectinputid" id="selectMenu" class="select-dropdown" style="max-height: 200px;">
											<div class="select-item" data-value="Greater Accra Region">Greater Accra Region</div>
											<div class="select-item" data-value="Ashanti Region">Ashanti Region</div>
											<div class="select-item" data-value="Central Region">Central Region</div>
											<div class="select-item" data-value="Eastern Region">Eastern Region</div>
											<div class="select-item" data-value="Western Region">Western Region</div>
											<div class="select-item" data-value="Volta Region">Volta Region</div>
											<div class="select-item" data-value="Northern Region">Northern Region</div>
											<div class="select-item" data-value="Upper East Region">Upper East Region</div>
											<div class="select-item" data-value="Upper West Region">Upper West Region</div>
											<div class="select-item" data-value="Western North Region">Western North Region</div>
											<div class="select-item" data-value="Savannah Region">Savannah Region</div>
											<div class="select-item" data-value="North East Region">North East Region</div>
											<div class="select-item" data-value="Bono Region">Bono Region</div>
											<div class="select-item" data-value="Ahafo Region">Ahafo Region</div>
											<div class="select-item" data-value="Bono East Region">Bono East Region</div>
											<div class="select-item" data-value="Oti Region">Oti Region</div>
										</div>
									</div>
									<p class="guide-text danger-text pregion_err"></p>
								</div>
							</div>
							<div class="s12" style="opacity: 0; position:absolute; z-index:-1;">
								<div class="u-form-field type2">
									<input value='ignored' class="u-input type2 teal" type="hidden" name="parent_religion" placeholder=" ">
									<label class="u-label teal-text">Religion</label>
									<p class="guide-text danger-text preligion_err"></p>
								</div>
							</div>
							<div class="s12">
								<div class="u-form-field">
									<label class="u-label devx-text">How Many Students are Registering for the Program?</label>
									<input class="u-input devx" type="number" name="kids_count">
									<p class="guide-text danger-text kids_count_err"></p>
								</div>
							</div>
						</div>
					</div>
		
				</form>
			</div>
	
			<div class="skippers">
				<button disabled class="smt-btn" id='prev'>Previous</button>
				<button class="smt-btn" id='next'>Next</button>
			</div>
		</section>
	</section>



</body>
</html>