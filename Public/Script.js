document.addEventListener('DOMContentLoaded', () => {
  const uploadButton = document.getElementById('uploadButton');
  const fileInput = document.getElementById('fileInput');
  const uploadForm = document.getElementById('uploadForm');
  const imagePreview = document.getElementById('imagePreview');
  const roastTextContainer = document.getElementById('roastText');

  uploadButton.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      const formData = new FormData(uploadForm);

      fetch('/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          if (data.imageUrl) {
            imagePreview.src = data.imageUrl;
            roastTextContainer.textContent = data.roastText;
          } else {
            roastTextContainer.textContent = 'Failed to upload image and get roast text.';
          }
        })
        .catch(error => {
          console.error('Error:', error);
          roastTextContainer.textContent = 'Error uploading image.';
        });
    }
  });
});
