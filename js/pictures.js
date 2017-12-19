'use strict';


var pictures = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
var galleryOverlayClose = document.querySelector('.gallery-overlay-close');
var galleryOverlay = document.querySelector('.gallery-overlay');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;


var comments = [
  'Всё отлично!',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];


var getRandomInteger = function () {
  return Math.floor(Math.random() * (comments.length));
};


var getRandomLike = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};


var createPhotoArray = function () {
  var photos = [];
  for (var i = 0; i <= 25; i++) {
    var photoArray = {
      url: 'photos/' + [i + 1] + '.jpg',
      likes: getRandomLike(15, 200),
      comments: getRandomInteger()
    };
    photos.push(photoArray);
  }
  return photos;
};


var photos = createPhotoArray();


var getRandomPicture = function (img) {
  var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').src = img.url;
  pictureElement.querySelector('.picture-likes').textContent = img.likes;
  pictureElement.querySelector('.picture-comments').textContent = img.comments;
  return pictureElement;
};


var getPictureFragment = function () {
  for (var j = 0; j < photos.length; j++) {
    fragment.appendChild(getRandomPicture(photos[j]));
  }
  return fragment;
};
getPictureFragment();
pictures.appendChild(fragment);


var renderGalleryOverlay = function (evt) {
  evt.preventDefault();
  var clickedElement = evt.currentTarget;
  galleryOverlay.classList.remove('hidden');
  galleryOverlay.querySelector('img.gallery-overlay-image').src = clickedElement.querySelector('img').src;
  galleryOverlay.querySelector('.likes-count').textContent = clickedElement.querySelector('.picture-likes').textContent;
  galleryOverlay.querySelector('.comments-count').textContent = clickedElement.querySelector('.picture-comments').textContent;
  document.addEventListener('keydown', onPopupEscPress);
  galleryOverlayClose.focus();
};


var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePicture();
  }
};


var onPopupEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePicture();
  }
};


var closePicture = function () {
  galleryOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};


var renderPicturesAll = function () {
  var picturesAll = document.querySelectorAll('.pictures');
  for (var i = 0; i < picturesAll.length; i++) {
    picturesAll[i].addEventListener('click', renderGalleryOverlay);
  }
};
renderPicturesAll();


galleryOverlayClose.addEventListener('click', function () {
  closePicture();
});
galleryOverlayClose.addEventListener('keydown', onPopupEnterPress);
