const popupButton = document.getElementById('popup-button');
const popupOverlay = document.getElementById('popup-overlay');
const popupCloseButton = document.getElementById('popup-close-button');
const popupTitle = document.getElementById('popup-title');
const popupText = document.getElementById('popup-text');

popupButton.addEventListener('click', function() {
  alert("f");
  popupTitle.innerText = 'Popup Title';
  popupText.innerText = 'This is the text of the popup.';
  popupOverlay.style.display = 'block';
});

popupCloseButton.addEventListener('click', function() {
  popupOverlay.style.display = 'none';
});
