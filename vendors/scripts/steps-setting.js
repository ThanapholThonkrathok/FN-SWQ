$(document).ready(function() {
    // Initialize wizard for tab-wizard2 form
    $(".tab-wizard2").steps({
        headerTag: "h5",
        bodyTag: "section",
        transitionEffect: "fade",
        titleTemplate: '<span class="step">#index#</span> <span class="info">#title#</span>',
        labels: {
            finish: "Submit",
            next: "Next",
            previous: "Previous"
        },
        onStepChanging: function (event, currentIndex, newIndex) {
            if (currentIndex === 0 && newIndex > currentIndex) {
                // Check if password fields are empty
                var password = $('#password').val();
                var confirmPassword = $('#confirmPassword').val();
                if (!password || !confirmPassword) {
                    alert('Please enter and confirm your password.');
                    return false; // Prevent moving to the next step
                } else if (password !== confirmPassword) {
                    alert('Password and Confirm Password do not match. Please re-enter.');
                    return false; // Prevent moving to the next step
                }
            }
            return true; // Allow moving to the next step
        },
        onStepChanged: function (event, currentIndex, priorIndex) {
            $('.steps .current').prevAll().addClass('disabled');
        },
        onFinished: function (event, currentIndex) {
            // Retrieve input values and display in overview
            var email = $('#email').val();
            var username = $('#username').val();
            var fullName = $('#fullName').val();
            var city = $('#city').val();
            var state = $('#state').val();

            $('#overview-email').text(email);
            $('#overview-username').text(username);
            $('#overview-fullname').text(fullName);

            // Display modal for success or handle registration process here
            $('#success-modal').modal('show');
            // Call the function to handle user registration
            handleRegistration();
        }
    });
});
