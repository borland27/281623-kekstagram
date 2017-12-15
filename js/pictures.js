'use strict';


var pictures = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
var closePictureEnter = document.querySelector('.gallery-overlay-close');
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
      url: 'photos/' + (i + 1) + '.jpg',
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


var renderGalleryOverlay = function (photo) {
  galleryOverlay.classList.remove('hidden');
  var galleryOverlayImg = document.querySelector('.gallery-overlay-image');
  galleryOverlayImg.setAttribute('src', photo.url);
  galleryOverlay.querySelector('.likes-count').textContent = photo.likes;
  galleryOverlay.querySelector('.comments-count').textContent = photo.comments;
};
renderGalleryOverlay(photos[1]);


var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePicture();
  }
};

var openPicture = function () {
  galleryOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePicture = function () {
  galleryOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

pictures.addEventListener('click', function () {
  openPicture();
});

pictures.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPicture();
  }
});

closePictureEnter.addEventListener('click', function () {
  closePicture();
});

closePictureEnter.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePicture();
  }
});
