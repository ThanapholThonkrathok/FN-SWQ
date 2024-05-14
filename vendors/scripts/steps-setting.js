$(".tab-wizard").steps({
    headerTag: "h5",
    bodyTag: "section",
    transitionEffect: "fade",
    titleTemplate: '<span class="step">#index#</span> #title#',
    labels: {
        finish: "Submit"
    },
    onStepChanging: function (event, currentIndex, newIndex) {
        // Check password fields in step 1
        if (currentIndex === 0 && newIndex > currentIndex) {
            var password = $('#password').val();
            var confirmPassword = $('#confirm-password').val();
            if (password !== confirmPassword) {
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
        previous: "Previous"
    },
    onStepChanging: function (event, currentIndex, newIndex) {
        // Check password fields in step 1
        if (currentIndex === 0 && newIndex > currentIndex) {
            var password = $('#password').val();
            var confirmPassword = $('#confirm-password').val();
            if (password !== confirmPassword) {
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
        $('#success-modal').modal('show');
        // Call the function to handle user registration
        handleRegistration();
    }
});
