(function () {
  'use strict';

  // аккордеон
  var accordionItems = document.querySelectorAll('.accordion');
  var accordionBlocks = document.querySelectorAll('.accordion__block');

  var hideBlock = function (button, block) {
    button.classList.add('accordion__toggle--inactive');
    block.classList.add('accordion__block--hidden');
  };

  var showBlock = function (button, block) {
    button.classList.remove('accordion__toggle--inactive');
    block.classList.remove('accordion__block--hidden');
  };

  var toggleAccordion = function (evt) {
    Array.prototype.forEach.call(accordionBlocks, function (accordionBlock) {
      var button = accordionBlock.closest('.accordion').querySelector('.accordion__toggle');
      if (button === evt.target && !button.classList.contains('accordion__toggle--inactive') || button !== evt.target) {
        hideBlock(button, accordionBlock);
      } else if (button === evt.target) {
        showBlock(button, accordionBlock);
      }
    });
  };

  Array.prototype.forEach.call(accordionItems, function (accordion) {
    var accordionToggleButton = accordion.querySelector('.accordion__toggle');
    var accordionBlock = accordion.querySelector('.accordion__block');
    hideBlock(accordionToggleButton, accordionBlock);
    accordionToggleButton.addEventListener('click', toggleAccordion);
  });

  // скролл по якорной ссылке

  var anchors = document.querySelectorAll('a[href*="#"]');

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

  function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

  var maskedInputs = document.querySelectorAll('input[name="phone"]');

  Array.prototype.forEach.call(maskedInputs, function (input) {
    input.addEventListener('input', mask, false);
    input.addEventListener('focus', mask, false);
    input.addEventListener('blur', mask, false);

    function mask(event) {
      var matrix = '+7 (___) ___-__-__';
      var i = 0;
      var def = matrix.replace(/\D/g, '');
      var val = input.value.replace(/\D/g, '');

      if (def.length >= val.length) {
        val = def;
      }

      input.value = matrix.replace(/./g, function (a) {
        if (/[_\d]/.test(a) && i < val.length) {
          return val.charAt(i++);
        } else if (i >= val.length) {
          return '';
        } else {
          return a;
        }
      });

      if (event.type === 'blur') {
        if (input.value.length === 2) {
          input.value = '';
        }
      } else {
        setCursorPosition(input.value.length, input);
      }
    }
  });

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
    if (evt.keyCode === KEYCODE.esc) {
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
