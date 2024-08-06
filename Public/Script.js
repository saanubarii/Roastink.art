document.getElementById('dropdownButton').addEventListener('click', function() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '' ? 'block' : 'none';
});

document.getElementById('uploadButton').addEventListener('click', function() {
    const fileInput = document.getElementById('imageUpload');
    if (fileInput.files.length === 0) {
        alert('Please select an image file.');
        return;
    }

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const imageContainer = document.getElementById('imageContainer');
        const roastText = document.getElementById('roastText');

        // Clear previous content
        imageContainer.innerHTML = '';
        roastText.innerHTML = '';

        // Display the uploaded image
        const img = document.createElement('img');
        img.src = data.imageUrl;
        imageContainer.appendChild(img);

        // Display the generated roast text
        roastText.textContent = data.roast;
    })
    .catch(error => {
        console.error('Error uploading image:', error);
        alert('Failed to upload image.');
    });
});
