document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registrationForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const gender = document.getElementById('gender').value;
        const dateOfBirth = document.getElementById('dateOfBirth').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const retypePassword = document.getElementById('retypePassword').value;
        const profileImage = document.getElementById('profileImage').files[0];

        if (password !== retypePassword) {
            alert('Passwords do not match');
            return;
        }

        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('gender', gender);
        formData.append('date_of_birth', dateOfBirth);
        formData.append('email', email);
        formData.append('password', password);
        if (profileImage) {
            formData.append('profile_image', profileImage);
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registration successful');
                window.location.href = 'login.html';
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    });
});
