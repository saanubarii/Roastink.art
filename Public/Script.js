document.addEventListener('DOMContentLoaded', () => {
  const dropbtn = document.querySelector('.dropbtn');
  const dropdown = document.querySelector('.dropdown-content');
  const fileInput = document.getElementById('fileInput');
  const uploadButton = document.getElementById('uploadButton');
  const imagePreview = document.getElementById('imagePreview');
  const responseText = document.getElementById('responseText');

  dropbtn.addEventListener('click', () => {
    dropdown.classList.toggle('show');
  });

  uploadButton.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          responseText.textContent = data.message;

          const reader = new FileReader();
          reader.onload = function(e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Image Preview" width="300">`;
          };
          reader.readAsDataURL(file);
        } else {
          responseText.textContent = 'Failed to upload image.';
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        responseText.textContent = 'Error uploading image.';
      }
    } else {
      responseText.textContent = 'Please select an image file.';
    }
  });
});
