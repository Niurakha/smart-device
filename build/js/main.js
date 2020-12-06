/* eslint-disable no-console */
/* eslint-disable no-invalid-this */
'use strict';

(function () {

  // аккордеон
  var accordionItems = document.querySelectorAll('.accordion');

  var hideBlock = function (accordionHeadline) {
    accordionHeadline.classList.add('accordion__title--inactive');
  };

  var showBlock = function (accordionHeadline) {
    accordionHeadline.classList.remove('accordion__title--inactive');
  };

  var toggleAccordion = function (evt) {
    Array.prototype.forEach.call(accordionItems, function (accordionBlock) {
      var accordionHeadline = accordionBlock.closest('.accordion').querySelector('.accordion__title');
      if (accordionHeadline === evt.target && !accordionHeadline.classList.contains('accordion__title--inactive') || accordionHeadline !== evt.target) {
        hideBlock(accordionHeadline);
      } else if (accordionHeadline === evt.target) {
        showBlock(accordionHeadline);
      }
    });
  };

  Array.prototype.forEach.call(accordionItems, function (accordion) {
    var accordionTitle = accordion.querySelector('.accordion__title');
    hideBlock(accordionTitle);
    accordionTitle.addEventListener('click', toggleAccordion);
    accordionTitle.addEventListener('keypress', toggleAccordion);
  });

  // скролл по якорной ссылке

  var anchors = document.querySelectorAll('.intro__text a[href^=\'#\']');

  Array.prototype.forEach.call(anchors, function (anchor) {
    anchor.addEventListener('click', function (evt) {
      evt.preventDefault();

      var blockID = anchor.getAttribute('href').substring(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  // маска для номера телефона

  var maskedInputs = document.querySelectorAll('[data-mask]');
  function maskedInputsInit() {
    for (var i = 0; i < maskedInputs.length; i++) {
      maskedInputs[i].addEventListener('input', maskInput);
    }
  }
  maskedInputsInit();

  function maskInput() {
    var input = this;
    var mask = input.dataset.mask;
    var value = input.value;
    var literalPattern = /[0\*]/;
    var numberPattern = /[0-9]/;
    var newValue = '';
    try {
      var maskLength = mask.length;
      var valueIndex = 0;
      var maskIndex = 0;
      for (; maskIndex < maskLength;) {
        if (maskIndex >= value.length) {
          break;
        }
        if (mask[maskIndex] === '0' && value[valueIndex].match(numberPattern) === null) {
          break;
        }
        while (mask[maskIndex].match(literalPattern) === null) {
          if (value[valueIndex] === mask[maskIndex]) {
            break;
          }
          newValue += mask[maskIndex++];
        }
        newValue += value[valueIndex++];
        maskIndex++;
      }
      input.value = newValue;
    } catch (e) {
      console.log(e);
    }
  }

  // popup
  var KEYCODE = {
    esc: 27
  };
  var link = document.querySelector('.contacts__btn');
  var popup = document.querySelector('.modal');
  var close = popup.querySelector('.modal__close-button');
  var form = popup.querySelector('.modal__form');
  var userName = popup.querySelector('#username');
  var phone = popup.querySelector('#user_phone');
  var message = popup.querySelector('#user_letter');
  var isStorageSupport = true;
  var storage = {};

  var openPopup = function () {
    popup.classList.add('modal--show');
    document.body.classList.add('disable-scroll');
  };

  var closePopup = function () {
    popup.classList.remove('modal--show');
    document.body.classList.remove('disable-scroll');
  };

  try {
    storage.name = localStorage.getItem('name');
    storage.phone = localStorage.getItem('phone');
    storage.message = localStorage.getItem('message');
  } catch (err) {
    isStorageSupport = false;
  }

  link.addEventListener('click', function (evt) {
    evt.preventDefault();
    openPopup();

    if (storage.name) {
      userName.value = storage.name;
      phone.value = storage.phone;
      message.value = storage.message;
      message.focus();
    } else {
      userName.focus();
    }
  });

  close.addEventListener('click', function (evt) {
    evt.preventDefault();
    closePopup();
  });

  form.addEventListener('submit', function () {
    if (isStorageSupport) {
      localStorage.setItem('name', userName.value);
      localStorage.setItem('phone', phone.value);
      localStorage.setItem('message', message.value);
    }
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.code === KEYCODE.esc) {
      evt.preventDefault();
      if (popup.classList.contains('modal--show')) {
        closePopup();
      }
    }
  });

  popup.addEventListener('click', function (evt) {
    if (evt.target === popup) {
      closePopup();
    }
  });
})();
