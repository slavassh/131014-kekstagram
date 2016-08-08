'use strict';

function getMessage(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    var artifactsSquare = 0;
    for (var i = 0; i < a.length; i++) {
      artifactsSquare += a[i] * b[i];
    }
    return 'Общая площадь артефактов сжатия: ' + artifactsSquare + ' пикселей';
  } else if (Array.isArray(a)) {
    var amountOfRedPoints = a.reduce(function(previous, next) {
      return previous + next;
    });
    return 'Количество красных точек во всех строчках изображения: ' + amountOfRedPoints;
  } else if (a === true) {
    return 'Переданное GIF-изображение анимировано и содержит ' + b + ' кадров';
  } else if (a === false) {
    return 'Переданное GIF-изображение не анимировано';
  } else if (typeof a === 'number') {
    return 'Переданное SVG-изображение содержит ' + a + ' объектов и ' + b * 4 + ' атрибутов';
  }
}
