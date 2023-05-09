import axios from 'axios';
import Swal from 'sweetalert2';

const showSmtBtn = document.querySelectorAll('.show-smt-btn');
const showSmtFormBtn = document.querySelectorAll('.show-smt-form-btn');
const smt = document.querySelector('#smt');
const smtForm = document.querySelector('#smt-form');
const theForm = document.forms['the-form'];
let errExists = '';
const presubmit = () => {
	const
		parentName = document.querySelector('input[name=\'parent_name\']').value,
		parentCity = document.querySelector('input[name=\'parent_city\']').value,
		parentRegion = document.querySelector('input[name=\'parent_region\']').value,
		parentEmail = document.querySelector('input[name=\'parent_email\']').value,
		parentReligion = document.querySelector('input[name=\'parent_religion\']').value,
		parentContacts = document.querySelector('input[name=\'parent_contacts\']').value,
		newPreForm = new FormData;

	newPreForm.append('parent_name', parentName);
	newPreForm.append('parent_city', parentCity);
	newPreForm.append('parent_region', parentRegion);
	newPreForm.append('parent_religion', parentReligion);
	newPreForm.append('parent_email', parentEmail);
	newPreForm.append('parent_contacts', parentContacts);

	axios
		.post('pre.php', newPreForm);

};
const submitHandler = () => {
	// e.preventDefault();
	document.querySelector('.loader-double').classList.add('is-active');
	nextButton.setAttribute('disabled', 'true');


	const
		studentPhases = document.querySelectorAll('.student-phase'),
		parentName = document.querySelector('input[name=\'parent_name\']').value,
		parentCity = document.querySelector('input[name=\'parent_city\']').value,
		parentRegion = document.querySelector('input[name=\'parent_region\']').value,
		parentEmail = document.querySelector('input[name=\'parent_email\']').value,
		parentReligion = document.querySelector('input[name=\'parent_religion\']').value,
		parentContacts = document.querySelector('input[name=\'parent_contacts\']').value;

	let totalCost = 0;

	studentPhases.forEach(sp => {
		const
			studentName = sp.querySelector('input[name=\'' + sp.id + 'student_name\']').value,
			studentDob = sp.querySelector('input[name=\'' + sp.id + 'student_dob\']').value,
			studentSchool = sp.querySelector('input[name=\'' + sp.id + 'student_school\']').value,
			studentClass = sp.querySelector('input[name=\'' + sp.id + 'student_class\']').value,
			studentGender = sp.querySelector('input[name=\'' + sp.id + 'student_gender\']:checked').value,
			studentDevice = sp.querySelector('input[name=\'' + sp.id + 'student_device\']:checked').value,
			program = sp.querySelector('input[name=\'' + sp.id + 'program\']:checked').value;

		switch (program) {
		case 'abacus':
			totalCost += 160;
			break;

		case 'coding':
			totalCost += 160;
			break;

		case 'both':
			totalCost += 250;
			break;
		}
		let newForm = new FormData();

		newForm.append('parent_name', parentName);
		newForm.append('parent_city', parentCity);
		newForm.append('parent_region', parentRegion);
		newForm.append('parent_religion', parentReligion);
		newForm.append('parent_email', parentEmail);
		newForm.append('parent_contacts', parentContacts);
		newForm.append('student_name', studentName);
		newForm.append('student_class', studentClass);
		newForm.append('student_school', studentSchool);
		newForm.append('student_gender', studentGender);
		newForm.append('student_device', studentDevice);
		newForm.append('student_dob', studentDob);
		newForm.append('program', program);

		axios
			.post('lg.php', newForm)
			.then(res => {
				console.log(res);
				if (res.data !== 'success') {
					errExists = 'yes';
				}
			})
			.then(() => {
				if (errExists == '') {
					document.querySelector('.loader-double').classList.remove('is-active');
					let theWord = studentPhases.length == 1 ? 'student' : 'students';
					Swal.fire(
						'Success. Registrations Completed',
						'You have registered ' + studentPhases.length + ' ' + theWord + ' and your total cost is: ' + totalCost,
						'success'
					);
				} else {
					document.querySelector('.loader-double').classList.remove('is-active');
					Swal.fire(
						'Error!',
						'Could not submit',
						'error'
					);
				}
			})
			.catch(err => {
				document.querySelector('.loader-double').classList.remove('is-active');
				nextButton.removeAttribute('disabled');
				// alert(err);
			});
	});
};
const parentSchema = currentPhase => ({
	form: {
		id: 'the-form',
		autoSubmit: false, //if false, validate(x) returns true
		success: () => {
			if (currentPhase.nextElementSibling) {
				currentPhase.classList.remove('showing-phase');
				currentPhase.nextElementSibling.classList.add('showing-phase');
				prevButton.removeAttribute('disabled');
				presubmit();

				if (!currentPhase.nextElementSibling.nextElementSibling) {
					nextButton.innerHTML = 'Submit';
				}
			} else {
				submitHandler();
			}
		},
		failure: () => false, // event handler for form validation error -> calls whenever validation fails
	},
	parentname: {
		fieldname: 'parent_name',
		regulations: [
			{ required: true, errorMessage: 'Kindly fill in parent / guardian name.' },
		],
		errorField: '.pname_err'
	},
	parentcity: {
		fieldname: 'parent_city',
		regulations: [
			{ required: true, errorMessage: 'Kindly fill in parent / guardian city.' },
		],
		errorField: '.pcity_err'
	},
	parentcontacts: {
		fieldname: 'parent_city',
		regulations: [
			{ required: true, errorMessage: 'Kindly add at least one contact.' },
		],
		errorField: '.pcontacts_err'
	},
	parentregion: {
		fieldname: 'parent_region',
		regulations: [
			{ required: true, errorMessage: 'Kindly fill in parent / guardian region.' },
		],
		errorField: '.pregion_err'
	},
	parentreligion: {
		fieldname: 'parent_religion',
		regulations: [
			{ required: true, errorMessage: 'Kindly fill in parent / guardian religion.' },
		],
		errorField: '.preligion_err'
	},
	kidscount: {
		fieldname: 'kids_count',
		regulations: [
			{ required: true, errorMessage: 'Kindly type the number of kids you want to register.' },
			{ type: 'number', errorMessage: 'This must be a number' }
		],
		errorField: '.kids_count_err'
	},
	parentemail: {
		fieldname: 'parent_email',
		regulations: [
			{ required: true, errorMessage: 'Kindly fill in parent / guardian email<br>' },
			{ type: 'email', errorMessage: 'This must be an email' }
		],
		errorField: '.pemail_err'
	}
});

const studentSchema = currentPhase => ({
	form: {
		id: 'the-form',
		autoSubmit: false, //if false, validate(x) returns true
		success: () => {

			if (currentPhase.nextElementSibling) {
				currentPhase.classList.remove('showing-phase');
				currentPhase.nextElementSibling.classList.add('showing-phase');
				prevButton.removeAttribute('disabled');

				if (!currentPhase.nextElementSibling.nextElementSibling) {
					nextButton.innerHTML = 'Submit';
				}
			} else {
				submitHandler();
			}
		}, // event handler for form validation success -> make sure to set autosubmit to false
		failure: () => false, // event handler for form validation error -> calls whenever validation fails
	},
	studentname: {
		fieldname: currentPhase.id + 'student_name',
		regulations: [
			{ required: true, errorMessage: 'Kindly fill in student name.' },
		],
		errorField: '.' + currentPhase.id + 'sname_err'
	},
	studentclass: {
		fieldname: currentPhase.id + 'student_class',
		regulations: [
			{ required: true, errorMessage: 'Kindly fill in student class.' },
		],
		errorField: '.' + currentPhase.id + 'sclass_err'
	},
	studentschool: {
		fieldname: currentPhase.id + 'student_school',
		regulations: [
			{ required: true, errorMessage: 'Kindly fill in student school.' },
		],
		errorField: '.' + currentPhase.id + 'sschool_err'
	},
	studentdob: {
		fieldname: currentPhase.id + 'student_dob',
		regulations: [
			{ required: true, errorMessage: 'Kindly fill in student date of birth.' },
		],
		errorField: '.' + currentPhase.id + 'sdob_err'
	},
	// studentgender: {
	// 	fieldname: currentPhase.id+'student_gender',
	// 	regulations: [
	// 		{required: true, errorMessage: 'Kindly fill in student gender.'},
	// 	],
	// 	errorField: '.'+currentPhase.id+'sgender_err'
	// },
	// program: {
	// 	fieldname: currentPhase.id+'program',
	// 	regulations: [
	// 		{required: true, errorMessage: 'Kindly fill in student program.'},
	// 	],
	// 	errorField: '.'+currentPhase.id+'program_err'
	// },
});

showSmtBtn.forEach(btn => {
	btn.addEventListener('click', () => {
		smt.classList.remove('hide');
		smtForm.classList.add('hide');
		document.querySelector('.skippers').classList.remove('showing');
	});
});

showSmtFormBtn.forEach(btn => {
	btn.addEventListener('click', () => {
		smtForm.classList.remove('hide');
		smt.classList.add('hide');
		document.querySelector('.skippers').classList.add('showing');
	});
});


// theForm.addEventListener('submit', e => {
// 	// submitHandler(e);
// });

document.querySelector('input[name=\'kids_count\']').addEventListener('input', e => {
	theForm.querySelectorAll('.student-phase').forEach(sph => sph.remove());

	for (let i = 0; i < Number(e.target.value); i++) {
		const newStudent = document.createElement('div');
		newStudent.classList.add('phase', 'phase', 'student-phase');
		newStudent.id = 'new-student-' + i;
		newStudent.innerHTML = `
			<label for="" class="smt-label">Student Information</label>
			<div class="grid">
			<div class="s12 m6">
			<div class="u-form-field type2">
			<input class="u-input type2 teal" type="text" name="new-student-${i}student_name" placeholder=" ">
			<label class="u-label teal-text">Student Name</label>
			<p class="guide-text danger-text new-student-${i}sname_err"></p>
			</div>
			</div>
			<div class="s12 m6">
			<div class="u-form-field type2">
			<input class="u-input type2 teal" type="date" name="new-student-${i}student_dob" placeholder=" ">
			<label class="u-label teal-text">Date of Birth</label>
			<p class="guide-text danger-text new-student-${i}sdob_err"></p>
			</div>
			</div>
			<div class="s12 m6">
			<div class="u-form-field type2">
			<input class="u-input type2 teal" type="text" name="new-student-${i}student_school" placeholder=" ">
			<label class="u-label teal-text">School</label>
			<p class="guide-text danger-text new-student-${i}sschool_err"></p>
			</div>
			</div>
			<div class="s12 m6">
			<div class="u-form-field type2">
			<input class="u-input type2 teal" type="text" name="new-student-${i}student_class" placeholder=" ">
			<label class="u-label teal-text">Class</label>
			<p class="guide-text danger-text new-student-${i}sclass_err"></p>
			</div>
			</div>

			<div class="s12">
			<div class="u-form-field">
			<label>Choose Device Child Will Be Using</label>
			<br>
			<label class="u-radio">
			<input type="radio" name="new-student-${i}student_device" value="smartphone" checked>
			<span class="radio-indicator loify"><i></i></span>
			Smart Phone
			</label>
			<br>
			<label class="u-radio">
			<input type="radio" name="new-student-${i}student_device" value='laptop'>
			<span class="radio-indicator loify"><i></i></span>
			Laptop
			</label>
			<br>
			<label class="u-radio">
			<input type="radio" name="new-student-${i}student_device" value='desktop'>
			<span class="radio-indicator loify"><i></i></span>
			Desktop
			</label>
			<br>
			<p class="guide-text danger-text new-student-${i}sdevice_err"></p>
			</div>
			</div>



			<div class="s12">
			<div class="u-form-field">
			<label>Choose Gender</label>
			<br>
			<label class="u-radio">
			<input type="radio" name="new-student-${i}student_gender" value="m" checked>
			<span class="radio-indicator loify"><i></i></span>
			Male
			</label>
			<br>
			<label class="u-radio">
			<input type="radio" name="new-student-${i}student_gender" value='f'>
			<span class="radio-indicator loify"><i></i></span>
			Female
			</label>
			<br>
			<p class="guide-text danger-text new-student-${i}sgender_err"></p>
			</div>
			</div>



			<div class="s12">
			<hr>
			<label for="" class="smt-label">Choose program</label>
			</div>
			<div class="s12 m6">
			<div class="u-form-field">
			<label class="u-radio">
			<input type="checkbox" name="new-student-${i}program" value='abacus'>
			<span class="radio-indicator loify"><i></i></span>
				Abacus
			</label>
			<br>
				<label class="u-radio">
				<input type="checkbox" name="new-student-${i}program" value='coding'>
				<span class="radio-indicator loify"><i></i></span>
					Computer Programming / Coding
				</label>
				<label class="u-radio">
				<input type="checkbox" name="new-student-${i}program" value='both'>
				<span class="radio-indicator loify"><i></i></span>
				Abacus and Computer Programming / Coding
				</label>
			<p class="guide-text danger-text new-student-${i}program_err"></p>
			</div>
			</div>

			<div class="s12">
			<p class="center-text">
				<ul>
				<li>
					New registration for one course costs GH¢160 and GH¢80 monthly
				</li>
					<li>
						New registration for both courses costs GH¢250 and GH¢100 monthly
					</li>
			</ul>
				</p>
			</div>
			</div>
			`;
		// <table style="margin-top: 60px;" class="u-table bordered center-text">
		// 	<thead class='bg-primary white-text'>
		// 		<tr>
		// 			<th colspan="2">Course Bill</th>
		// 		</tr>
		// 	</thead>
		// 	<tbody>
		// 		<tr>
		// 			<td>Abacus Monthly Fee: GH ¢ 80 </td>
		// 			<td>Coding Monthly Fee: GH ¢ 80</td>
		// 		</tr>
		// 		<tr>
		// 			<td>Abacus Materials : GH ¢ 50 </td>
		// 			<td>Coding Materials : GH ¢ 50</td>
		// 		</tr>
		// 		<tr>
		// 			<td>New Registration: GH ¢ 130</td>
		// 			<td>New Registration : GH ¢ 130</td>
		// 		</tr>
		// 	</tbody>
		// </table>
		theForm.append(newStudent);
		let theradio = 'new-student-' + i + 'program';
		theradio = document.forms['the-form'][theradio];
		// theradio.forEach(rd => rd.addEventListener('change', e => {
		// 	if (e.target.value == 'both') {
		// 		document.getElementById('priceTag' + i).innerHTML = 'GH¢200';
		// 		document.getElementById('spriceTag' + i).innerHTML = 'GH¢100';
		// 	} else {
		// 		document.getElementById('priceTag' + i).innerHTML = 'GH¢130';
		// 		document.getElementById('spriceTag' + i).innerHTML = 'GH¢80';
		// 	}
		// }));
	}
});

// document.body.addEventListener('click', () => {
// 	theRadio =
// 	if(document.querySelector("input[type='radio']").value == 'both')
// })

const next = () => {
	const allPhases = document.querySelectorAll('.phase');
	const currentPhase = document.querySelector('.phase.showing-phase');

	// validate currentPhase
	if (currentPhase.classList.contains('parent-phase')) {
		validate(parentSchema(currentPhase));
	} else if (currentPhase.classList.contains('student-phase')) {
		validate(studentSchema(currentPhase));
	}

};
const prev = () => {
	const allPhases = document.querySelectorAll('.phase');
	const currentPhase = document.querySelector('.phase.showing-phase');

	// validate currentPhase

	if (currentPhase.previousElementSibling) {
		currentPhase.classList.remove('showing-phase');
		currentPhase.previousElementSibling.classList.add('showing-phase');
		nextButton.innerHTML = 'Next';

		if (!currentPhase.previousElementSibling.previousElementSibling) {
			prevButton.setAttribute('disabled', 'true');
		}
	} else {
		submitHandler();
	}
};

const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#prev');

nextButton.addEventListener('click', next);
prevButton.addEventListener('click', prev);
