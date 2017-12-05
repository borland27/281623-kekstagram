'use strict';

var comments = [
  'Всё отлично!',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getRandomComment = function () {
  return Math.round(Math.random() * (comments.length));
};

var getRandomLike = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var photos = [];
for (var i = 1; i <= 25; i++) {
  var photoArray = {
    url: 'photos/' + [i] + '.jpg',
    likes: getRandomLike(15, 200),
    comments: getRandomComment()
  };
  photos.push(photoArray);
}


var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
var getRandomPicture = function (img) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').src = img.url;
  pictureElement.querySelector('.picture-likes').textContent = img.likes;
  pictureElement.querySelector('.picture-comments').textContent = img.comments;
  return pictureElement;
};

var pictures = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
for (var j = 0; j < photos.length; j++) {
  fragment.appendChild(getRandomPicture(photos[j]));
}
pictures.appendChild(fragment);


var galleryOverlay = document.querySelector('.gallery-overlay');
galleryOverlay.classList.remove('hidden');
var renderGalleryOverlay = function (photo) {
  var galleryOverlayImg = document.querySelector('.gallery-overlay-image');
  galleryOverlayImg.setAttribute('src', photo.url);
  galleryOverlay.querySelector('.likes-count').textContent = photo.likes;
  galleryOverlay.querySelector('comments-count').textContent = photo.comments;
};
renderGalleryOverlay(photos[1]);
