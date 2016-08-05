'use strict';

function getMessage(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    var artifactsSquare = 0;
    for (var i = 0; i < a.length; i++) {
      artifactsSquare += a[i] * b[i];
    }
    return 'Общая площадь артефактов сжатия: ' + artifactsSquare + ' пикселей';
  }

  switch (typeof a) {
    case 'boolean':
      if (a) {
        return 'Переданное GIF-изображение анимировано и содержит ' + b + ' кадров';
      }
      return 'Переданное GIF-изображение не анимировано';

    case 'number':
      return 'Переданное SVG-изображение содержит ' + a + ' объектов и ' + b * 4 + ' атрибутов';

    case 'object':
      var amountOfRedPoints = 0;
      for (var i = 0; i < a.length; i++) {
        amountOfRedPoints += a[i];
      }
      return 'Количество красных точек во всех строчках изображения: ' + amountOfRedPoints;
  }
}
