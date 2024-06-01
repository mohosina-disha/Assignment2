document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('/api/profile', {
            headers: {
                'Authorization': 'Bearer ${token}'
            }
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('firstName').value = data.first_name;
            document.getElementById('lastName').value = data.last_name;
            document.getElementById('gender').value = data.gender;
            document.getElementById('dateOfBirth').value = data.date_of_birth;
            document.getElementById('email').value = data.email;
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error('Error:', err);
    }

    document.getElementById('editButton').addEventListener('click', function() {
        document.querySelectorAll('input, select').forEach(input => input.disabled = false);
        document.getElementById('editButton').style.display = 'none';
        document.getElementById('updateButton').style.display = 'inline-block';
    });

    document.getElementById('profileForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('first_name', document.getElementById('firstName').value);
        formData.append('last_name', document.getElementById('lastName').value);
        formData.append('gender', document.getElementById('gender').value);
        formData.append('date_of_birth', document.getElementById('dateOfBirth').value);
        formData.append('email', document.getElementById('email').value);
        formData.append('password', document.getElementById('password').value);

        const password = document.getElementById('password').value;
        const retypePassword = document.getElementById('retypePassword').value;

        if (password !== retypePassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                alert('Profile updated successfully');
                window.location.reload();
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    });

    document.getElementById('deleteButton').addEventListener('click', async function() {
        if (confirm('Are you sure you want to delete your account?')) {
            try {
                const response = await fetch('/api/profile', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Account deleted successfully');
                    localStorage.removeItem('token');
                    window.location.href = 'index.html';
                } else {
                    alert(data.message);
                }
            } catch (err) {
                console.error('Error:', err);
            }
        }
    });

    document.getElementById('logoutButton').addEventListener('click', function() {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });
});
