// import plyr from 'plyr';
// 
// const twivid = document.querySelector('#twivid');
// new plyr(twivid);
// const engvid = document.querySelector('#engvid');
// new plyr(engvid);


$(document).ready( () => {
	$('#proc').click( () => {
		$('#s1').hide(1000);
		$('#s2').show(2000);
	});
	
	const
		submitted = () => {
			$('#s2').hide();
			$('.svhol').css('min-height', 'unset');
			$('.svhol').css('padding', '0');
			$('.svhol').css('overflow-y', 'unset');
			$('#s3').show(600);
		},
		submitting = () => {
			$('.nexmit').attr('disabled', 'true');
			$('.nexmit').html('Submitting<i class=\'fa fa-refresh fa-spin\'></i>');
		},
		submitForm = () => {
			document.forms['svform'].submit();
			// jQuery.ajax({
			// 	type: 'post',
			// 	url: 'lg.php',
			// 	data: $('#svform').serialize(),
			// 	success: function () {
			// 		submitted();
			// 	},
			// 	error: function() {
			// 		alert('failed');
			// 		location.href = 'http://devx.dx.am/sv/survey.php';
			// 	}
			// });
			return false;
		},
		showerr = err => {
			if(err) $('.erro p').html(err);
			else $('.erro p').html('Kindly fill all fields.');
			$('.erro').fadeIn(500);
			$('.erro').css('display', '-webkit-flex');
			$('.erro').css('display', 'flex');
			return false;
		},
		val = () => {

			let
				studentName = document.forms['svform']['student_name'].value,
				studentSchool = document.forms['svform']['student_school'].value,
				studentClass = document.forms['svform']['student_class'].value,
				studentDob = document.forms['svform']['student_dob'].value,
				studentGender = document.forms['svform']['student_gender'].value,
				parentName = document.forms['svform']['parent_name'].value,
				parentCity = document.forms['svform']['parent_city'].value,
				parentRegion = document.forms['svform']['parent_region'].value,
				parentEmail = document.forms['svform']['parent_email'].value,
				parentContacts = document.forms['svform']['parent_contacts'].value,
				parentReligion = document.forms['svform']['parent_religion'].value,
				// program = document.querySelector('form#svform input[type=\'checkbox\']:checked');
				program = document.forms['svform']['program'].value;


			if(studentName?.length) {
				if(studentSchool?.length) {
					if(studentClass?.length) {
						if(studentDob?.length) {
							if(studentGender?.length) {
								if(parentName?.length) {
									if(parentCity?.length) {
										if(parentRegion?.length) {
											if(parentEmail?.length) {
												if(parentContacts?.length) {
													if(parentReligion?.length) {
														if(program?.length) {
															submitting();
															submitForm();
														} else {
															showerr('Kindly choose at least one program');
															return false;
														}
													} else {
														console.log(parentReligion.length);
														showerr('Kindly enter your religion');
														return false;
													}
												} else {
													console.log('eff');
													showerr('Kindly enter your contact');
													return false;
												}
											} else {
												console.log('eff');
												showerr('kindly enter parent\'s email');
												return false;
											}
										} else {
											console.log('eff');
											showerr('Kindly enter parent\' region');
											return false;
										}
									} else {
										console.log('eff');
										showerr('Kindly enter parent\'s city.');
										return false;
									}
								} else {
									console.log('eff');
									showerr('Kindly enter parent\'s name.');
									return false;
								}
							} else {
								console.log('eff');
								showerr('Kindly choose student\'s gender');
								return false;
							}
						} else {
							console.log('eff');
							showerr('Kindly enter student\' date of birth');
							return false;
						}
					} else {
						console.log('eff');
						showerr('Kindly enter student\'s class');
						return false;
					}
				} else {
					console.log('eff');
					showerr('Kindly enter student\'s school.');
					return false;
				}
			} else {
				console.log('eff');
				showerr('Kindly enter student\'s name.');
				return false;
			}
		};

	$('.nex').click( next = () => {
		let fid = '#' + $('.fshown').attr('id');
		let cur = '#' + $('.cur').attr('id');
		$(fid).next().addClass('fshown');
		$(fid).removeClass('fshown');
		$(cur).next().addClass('cur');
		$(cur).removeClass('cur');

		$('.svhd p').html($(fid).next().attr('data-label'));

		if($(fid).next().attr('id') == 'f3') {
			$('.nex').addClass('nexmit');
			$('.nex').html('Submit');
			$('.nex').off('click');
			$('.nexmit').click( () => {
				val();
			});
		}else{
			$('.prev').removeAttr('disabled');
		}
	});
	
	$('.prev').click( () => {
		let fid = '#' + $('.fshown').attr('id');
		let cur = '#' + $('.cur').attr('id');
		$(fid).prev().addClass('fshown');
		$(fid).removeClass('fshown');
		$(cur).prev().addClass('cur');
		$(cur).removeClass('cur');

		$('.svhd p').html($(fid).prev().attr('data-label'));

		if ($(fid).prev().attr('id') == 'f1') {
			$('.prev').attr('disabled', 'true');
		}else if($(fid).attr('id') == 'f3'){
			$('.nexmit').off('click');
			$('.nex').removeClass('nexmit');
			$('.nex').html('Next');
			$('.nex').on('click', next);
		}
	});
	
	$('#cls').click( () => {
		$('.erro').fadeOut(500);
	});
});