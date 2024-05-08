$(".tab-wizard").steps({
    headerTag: "h5",
    bodyTag: "section",
    transitionEffect: "fade",
    titleTemplate: '<span class="step">#index#</span> #title#',
    labels: {
        finish: "Submit"
    },
    onStepChanged: function (event, currentIndex, priorIndex) {
        $('.steps .current').prevAll().addClass('disabled');
        if (currentIndex === 1) { // Assuming password fields are in step 2
            var password = $('#password').val();
            var confirmPassword = $('#confirm-password').val();
            if (password !== confirmPassword) {
                $('.actions button[type="submit"]').prop('disabled', true); // Disable submit button
                alert('Password and Confirm Password do not match. Please re-enter.'); // Show alert message
                $('.actions .actions-next').hide(); // Hide next button
            } else {
                $('.actions button[type="submit"]').prop('disabled', false); // Enable submit button
                $('.actions .actions-next').show(); // Show next button
            }
        }
    },
    onFinished: function (event, currentIndex) {
        $('#success-modal').modal('show');
        // Call the function to handle user registration
        handleRegistration();
    }
});


$(".tab-wizard2").steps({
	headerTag: "h5",
	bodyTag: "section",
	transitionEffect: "fade",
	titleTemplate: '<span class="step">#index#</span> <span class="info">#title#</span>',
	labels: {
		finish: "Submit",
		next: "Next",
		previous: "Previous",
	},
    onStepChanged: function (event, currentIndex, priorIndex) {
        $('.steps .current').prevAll().addClass('disabled');
        if (currentIndex === 1) { // Assuming password fields are in step 2
            var password = $('#password').val();
            var confirmPassword = $('#confirm-password').val();
            if (password !== confirmPassword) {
                $('.actions button[type="submit"]').prop('disabled', true); // Disable submit button
                alert('Password and Confirm Password do not match. Please re-enter.'); // Show alert message
            } else {
                $('.actions button[type="submit"]').prop('disabled', false); // Enable submit button
            }
        }
    },
    onFinished: function (event, currentIndex) {
        $('#success-modal').modal('show');
        // Call the function to handle user registration
        handleRegistration();
    }
});
