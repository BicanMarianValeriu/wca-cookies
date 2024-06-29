/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*****************************************************!*\
  !*** ./inc/support/modules/cookies/src/js/front.js ***!
  \*****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * --------------------------------------------------------------------------
 * Cookies Module
 *
 * @author 	Bican Marian Valeriu
 * @version 1.0.0
 * --------------------------------------------------------------------------
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function (wecodeart) {
  const {
    Events,
    Selector,
    isDevMode
  } = wecodeart;
  const {
    classes = [],
    cookiePath = '/',
    toast: {},
    cookies: {
      necessary = '',
      necessaryPrefix = '',
      expire: expireTime = 30,
      block: cookieBlock = false
    } = {}
  } = wecodeartSupportModulesCookies || {};
  const body = Selector.findOne('body');
  const cookiesNote = Selector.findOne('#wp-cookies-offcanvas');
  const necessaryArray = necessary.split(',').map(c => c.trim());
  const necessaryPrefixArray = necessaryPrefix.split(',').map(c => c.trim());
  const Cookies = {
    get(name) {
      const cookies = document.cookie.split('; ').map(c => c.split('=')).reduce((a, [b, c]) => ({
        ...a,
        [b]: c
      }), {});
      return cookies[name] ? decodeURIComponent(cookies[name]) : '';
    },
    set(name, value, expire = expireTime, path = cookiePath, domain) {
      const {
        location: {
          protocol,
          hostname
        }
      } = document;
      const isSecure = protocol === 'https:' ? ';secure' : '';
      domain = domain || hostname;
      const d = new Date();
      d.setTime(d.getTime() + parseInt(expire) * 24 * 60 * 60 * 1000);
      const expires = d.toUTCString();
      document.cookie = name + "=" + value + ";expires=" + expires + ";path=" + path + ";domain=" + domain + isSecure;
    },
    remove(name) {
      if (Cookies.isNecessary(name)) {
        if (isDevMode) {
          console.warn(`Cookies :: Cannot remove necessary cookie: ${name}`);
        }
        return;
      }
      Cookies.set(name, '', -1);
      Cookies.set(name, '', -1, '/');
    },
    removeMultiple(cookies = []) {
      cookies.forEach(Cookies.remove);
    },
    isNecessary(name) {
      return necessaryArray.includes(name) || necessaryPrefixArray.some(prefix => name.match('^' + prefix + '(|.+?)'));
    },
    getChoices() {
      const cookiesForm = Selector.findOne('form[name="wp-cookies"]');
      if (!cookiesForm) {
        return document.cookie.split(';').map(cookie => cookie.split('=')[0].trim());
      }
      const choices = Selector.find('input[name="wp-cookies[]"]:not(:disabled)', cookiesForm);
      return Array.from(choices).filter(({
        checked
      }) => checked === false).map(({
        value
      }) => value);
    },
    setChoices(value) {
      const cookiesForm = Selector.findOne('form[name="wp-cookies"]');
      let choices = [];
      if (cookiesForm) {
        choices = Selector.find('input[name="wp-cookies[]"]:not(:disabled)', cookiesForm);
      }
      Cookies.set('wp-cookies-status', value);
      switch (value) {
        // Accept cookies
        case 'true':
          choices.map(field => field.checked = true);
          Cookies.set('wp-cookies-blocked', '');
          break;
        // Reject cookies
        case 'false':
          choices.map(field => field.checked = false);
          Cookies.set('wp-cookies-blocked', Cookies.getChoices().toString());
          break;
        // Update preferences
        case 'save':
          Cookies.set('wp-cookies-status', 'true');
          Cookies.set('wp-cookies-blocked', Cookies.getChoices().toString());
          Cookies.removeMultiple(Cookies.getChoices());
          break;
      }
    }
  };

  // Offcanvas events
  Events.on(cookiesNote, 'hide.wp.offcanvas', function ({
    relatedTarget = {}
  }) {
    const {
      value
    } = relatedTarget?.dataset || {};
    if (Boolean(value)) {
      body.classList.add(classes?.set);
      body.classList[value === 'true' ? 'add' : 'remove'](classes?.allow);
      Cookies.setChoices(value);
    }
  });

  // Load events
  Events.on(document, 'DOMContentLoaded', () => {
    const cookie = Cookies.get('wp-cookies-status');

    // Open if cache or not opened already.
    if (!cookie && !cookiesNote.classList.contains('show')) {
      Selector.findOne('#wp-cookies-toggle').click();
    }

    // Respect user choices
    if (!cookie && cookieBlock) {
      const cookies = document.cookie.split(';').map(cookie => cookie.split('=')[0].trim());
      Cookies.removeMultiple(cookies);
      Cookies.set('wp-cookies-blocked', cookies.filter(n => !Cookies.isNecessary(n)).toString());
    } else if (Cookies.get('wp-cookies-blocked') !== '') {
      const cookies = Cookies.get('wp-cookies-blocked').split(',').map(c => c.trim());
      Cookies.removeMultiple(cookies);
    }
  });

  /**
   * @static
   * @memberof Component
   */
  wecodeart.Cookies = Cookies;
}).apply(undefined, [window.wecodeart]));
/******/ })()
;
//# sourceMappingURL=front.js.map