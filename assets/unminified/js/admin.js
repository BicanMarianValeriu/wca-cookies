/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./inc/support/modules/cookies/src/js/Components/Modal.js":
/*!****************************************************************!*\
  !*** ./inc/support/modules/cookies/src/js/Components/Modal.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const {
  i18n: {
    __
  },
  components: {
    Modal,
    Spinner,
    Button,
    TextareaControl,
    ToggleControl
  },
  element: {
    useRef,
    useState
  }
} = wp;
const ProgressComponent = ({
  progress = 0
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      border: '1px solid lightgrey',
      borderRadius: 5,
      overflow: 'hidden'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      backgroundColor: 'var(--wp-admin-theme-color)',
      height: 14,
      width: `${progress}%`
    }
  })));
};
const ScanCookies = ({
  formData,
  setFormData,
  closeModal,
  createNotice
}) => {
  const [progress, setProgress] = useState(0);
  const [scanning, setScanning] = useState(null);
  const [scanType, setScanType] = useState(null);
  const formRef = useRef(null);
  const handleScan = async page => {
    const formData = new FormData(formRef.current);
    formData.append('scan', scanType ? 'all' : 'last');
    formData.append('page', page);
    const response = await fetch(`${wecodeart.restUrl}/scan_cookies`, {
      method: 'POST',
      body: formData
    });
    const {
      cookies = [],
      progress,
      next
    } = await response.json();
    if (next) {
      setProgress(progress);
      await handleScan(next);
    } else {
      setScanning(false);
      setProgress(100);
      const cookiesAmount = Object.values(cookies).flat().length;
      createNotice('success', sprintf(__('%s detected cookie(s) added to list.', 'wecodeart'), cookiesAmount));
    }
  };
  const startScan = async () => {
    setScanning(true);
    setProgress(0);
    await handleScan(1);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Modal, {
    title: __('Scan cookies', 'wecodeart'),
    onRequestClose: closeModal
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    name: "wecodeart-cookies-scan",
    ref: formRef
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-notice is-warning flex-column align-items-start m-0 mb-3"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    class: "my-0"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    class: "mb-0"
  }, __('Scan your website for server-side cookies (set with setcookie).', 'wecodeart')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    class: "mb-0"
  }, __('Note that all cookies will be automatically detected on page load.', 'wecodeart')), scanType && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    class: "mb-0"
  }, __('Scanning all URLs will take significantly longer.', 'wecodeart')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
    label: __('Full scan?', 'wecodeart'),
    name: "scan",
    checked: scanType,
    onChange: () => setScanType(!scanType),
    help: sprintf(__('Scan %s for each post type.', 'wecodeart'), scanType ? __('all urls', 'wecodeart') : __('last url', 'wecodeart'))
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextareaControl, {
    label: __('Additional URLs to scan', 'wecodeart'),
    name: "urls",
    cols: "50",
    value: formData.scan,
    onChange: scan => setFormData({
      ...formData,
      scan
    }),
    help: __('One per line - save settings for future scans.', 'wecodeart')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    className: "button d-flex gap-2",
    isPrimary: true,
    icon: scanning && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Spinner, {
      style: {
        margin: 0
      }
    }),
    onClick: startScan,
    disabled: scanning
  }, scanning ? __('Scaning cookies', 'wecodeart') : __('Scan cookies', 'wecodeart')), scanning && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ProgressComponent, {
    progress: progress
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScanCookies);

/***/ }),

/***/ "./inc/support/modules/cookies/src/js/Components/Toggler.js":
/*!******************************************************************!*\
  !*** ./inc/support/modules/cookies/src/js/Components/Toggler.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const {
  i18n: {
    __
  },
  components: {
    Button,
    Tooltip,
    Icon
  }
} = wp;
const Toggler = ({
  formData
}) => {
  const {
    icon: {
      viewBox = '0 0 512 512',
      paths = ['M257.5 27.6c-.8-5.4-4.9-9.8-10.3-10.6v0c-22.1-3.1-44.6 .9-64.4 11.4l-74 39.5C89.1 78.4 73.2 94.9 63.4 115L26.7 190.6c-9.8 20.1-13 42.9-9.1 64.9l14.5 82.8c3.9 22.1 14.6 42.3 30.7 57.9l60.3 58.4c16.1 15.6 36.6 25.6 58.7 28.7l83 11.7c22.1 3.1 44.6-.9 64.4-11.4l74-39.5c19.7-10.5 35.6-27 45.4-47.2l36.7-75.5c9.8-20.1 13-42.9 9.1-64.9v0c-.9-5.3-5.3-9.3-10.6-10.1c-51.5-8.2-92.8-47.1-104.5-97.4c-1.8-7.6-8-13.4-15.7-14.6c-54.6-8.7-97.7-52-106.2-106.8zM208 144a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM144 336a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm224-64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z']
    } = {}
  } = formData;
  const generateStyles = ({
    position,
    style: {
      padding,
      border = {},
      borderRadius,
      width,
      height,
      left = 'initial',
      right = 'initial',
      bottom = 0,
      backgroundColor = 'transparent',
      color = 'inherit'
    } = {}
  } = {}) => {
    let style = {
      position: 'fixed',
      bottom,
      width,
      height,
      padding,
      color,
      borderRadius,
      backgroundColor,
      left: position === 'left' ? left : 'initial',
      right: position === 'right' ? left : 'initial',
      transition: 'all .3s ease-in-out',
      zIndex: 1000
    };
    let borderStyles = {};
    const borderKeys = Object.keys(border);
    const sides = ['top', 'left', 'right', 'bottom'];
    const hasBorderMultiple = sides.some(side => borderKeys.includes(side));
    if (hasBorderMultiple) {
      for (const dir in border) {
        const dirStyles = border[dir];
        borderStyles = {
          ...borderStyles,
          [`border${capitalizeWord(dir)}`]: Object.values(dirStyles).join(' ')
        };
      }
    } else {
      borderStyles = {
        border: Object.values(border).join(' ')
      };
    }
    style = {
      ...style,
      ...borderStyles
    };
    return style;
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Tooltip, {
    text: __('Preview', 'wecodeart')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    style: generateStyles(formData)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Icon, {
    icon: () => {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: viewBox
      }, paths.map(el => {
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
          fill: "currentColor",
          d: el
        });
      }));
    }
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Toggler);

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************************************!*\
  !*** ./inc/support/modules/cookies/src/js/admin.js ***!
  \*****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_Toggler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Components/Toggler */ "./inc/support/modules/cookies/src/js/Components/Toggler.js");
/* harmony import */ var _Components_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Components/Modal */ "./inc/support/modules/cookies/src/js/Components/Modal.js");

/**
 * @package: 	WeCodeArt Cookies Extension
 * @author: 	Bican Marian Valeriu
 * @license:	https://www.wecodeart.com/
 * @version:	1.0.0
 */



const {
  i18n: {
    __,
    _x
  },
  hooks: {
    addFilter
  },
  components: {
    Placeholder,
    Card,
    CardHeader,
    CardBody,
    Spinner,
    Button,
    Notice,
    TextControl,
    BaseControl,
    RangeControl,
    DropdownMenu,
    SelectControl,
    ToggleControl,
    ColorPalette,
    ColorIndicator,
    __experimentalHStack: HStack,
    __experimentalNumberControl: NumberControl,
    __experimentalBorderBoxControl: BorderBoxControl
  },
  element: {
    useState
  },
  blockEditor: {
    useSetting
  }
} = wp;
const getEditorUrl = (object = {}) => {
  const url = new URL(`${wecodeart.adminUrl}/site-editor.php`);
  Object.keys(object).map(key => url.searchParams.append(key, object[key]));
  return url.toString();
};
addFilter('wecodeart.admin.tabs.plugins', 'wecodeart/cookies/admin/panel', optionsPanel);
function optionsPanel(panels) {
  return [...panels, {
    name: 'wca-cookies',
    title: __('Cookies', 'wecodeart'),
    render: props => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Options, {
      ...props
    })
  }];
}
const Options = props => {
  const {
    settings,
    saveSettings,
    isRequesting,
    createNotice
  } = props;
  if (isRequesting || !settings) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Placeholder, {
      icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Spinner, null),
      label: __('Loading', 'wecodeart'),
      instructions: __('Please wait, loading settings...', 'wecodeart')
    });
  }
  const apiOptions = (({
    cookies
  }) => cookies)(settings);
  const [loading, setLoading] = useState(null);
  const [formData, setFormData] = useState(apiOptions);
  const [isOpen, setIsOpen] = useState(false);
  const setStyle = (extra = {}, container = 'offcanvas') => {
    const newStyle = {
      ...formData?.[container]?.style,
      ...extra
    };
    setFormData({
      ...formData,
      ...{
        [container]: {
          ...formData?.[container],
          style: newStyle
        }
      }
    });
  };
  const handleNotice = () => {
    setLoading(false);
    return createNotice('success', __('Settings saved.', 'wecodeart'));
  };
  const colors = useSetting('color.palette');
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, formData.notice !== false && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Notice, {
    status: "info",
    className: "border-top border-bottom border-end mb-3",
    onRemove: () => setFormData({
      ...formData,
      notice: false
    })
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "my-0",
    dangerouslySetInnerHTML: {
      __html: sprintf(_x('You can edit module messages/templates under %s.', 'wecodeart'), `<a href="${getEditorUrl({
        path: '/patterns',
        categoryType: 'wp_template_part',
        categoryId: 'wca-cookies'
      })}" target="_blank">${__('Site Editor', 'wecodeart')}</a>`)
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "grid",
    style: {
      '--wca--columns': 2
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "g-col-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    className: "border shadow-none h-100"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardHeader, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
    className: "text-uppercase fw-medium m-0"
  }, __('Cookies', 'wecodeart')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    className: "button",
    onClick: () => setIsOpen(true)
  }, __('Detect cookies', 'wecodeart'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardBody, {
    style: {
      color: 'rgb(30, 30, 30)'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
    label: __('Block cookies', 'wecodeart'),
    checked: formData?.cookies?.block,
    onChange: block => setFormData({
      ...formData,
      cookies: {
        ...formData?.cookies,
        block
      }
    }),
    help: sprintf(__('Cookies are %s until accepted.', 'wecodeart'), formData?.cookies?.block ? __('blocked', 'wecodeart') : __('not blocked', 'wecodeart'))
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(NumberControl, {
    label: __('Expiration', 'wecodeart'),
    value: formData?.cookies?.expire,
    onChange: expire => setFormData({
      ...formData,
      cookies: {
        ...formData?.cookies,
        expire
      }
    }),
    help: __('Duration for cookie accept|reject - in days.', 'wecodeart')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: __('Necessary cookies', 'wecodeart'),
    value: formData?.cookies?.necessary,
    onChange: necessary => setFormData({
      ...formData,
      cookies: {
        ...formData?.cookies,
        necessary
      }
    }),
    help: __('These cookies are stictly necessary and website cannot function properly without them.', 'wecodeart')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: __('Necessary cookies prefix', 'wecodeart'),
    value: formData?.cookies?.necessaryPrefix,
    onChange: necessaryPrefix => setFormData({
      ...formData,
      cookies: {
        ...formData?.cookies,
        necessaryPrefix
      }
    }),
    help: __('Cookies starting with these prefixes will also be considered necessary.', 'wecodeart')
  }))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "g-col-1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    className: "border shadow-none h-100"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardHeader, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
    className: "text-uppercase fw-medium m-0"
  }, __('Offcanvas', 'wecodeart'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardBody, {
    style: {
      color: 'rgb(30, 30, 30)'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: __('Position', 'wecodeart'),
    value: formData?.offcanvas?.position,
    options: [{
      label: __('Top', 'wecodeart'),
      value: 'top'
    }, {
      label: __('Bottom', 'wecodeart'),
      value: 'bottom'
    }],
    onChange: position => setFormData({
      ...formData,
      ...{
        offcanvas: {
          ...formData?.offcanvas,
          position
        }
      }
    }),
    help: __('Relative to the browser window.', 'wecodeart'),
    __nextHasNoMarginBottom: true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: __('Title', 'wecodeart'),
    value: formData?.offcanvas?.title,
    onChange: title => setFormData({
      ...formData,
      ...{
        offcanvas: {
          ...formData?.offcanvas,
          title
        }
      }
    }),
    help: __('The title for the offcanvas.', 'wecodeart')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: __('Backdrop', 'wecodeart'),
    value: formData?.offcanvas?.backdrop,
    options: [{
      label: __('Enabled', 'wecodeart'),
      value: 'true'
    }, {
      label: __('Static', 'wecodeart'),
      value: 'static'
    }, {
      label: __('Disabled', 'wecodeart'),
      value: 'false'
    }],
    onChange: backdrop => setFormData({
      ...formData,
      ...{
        offcanvas: {
          ...formData?.offcanvas,
          backdrop
        }
      }
    }),
    help: formData?.offcanvas?.backdrop !== 'false' && sprintf(__('Clicking backdrop will %s offcanvas.', 'wecodeart'), formData?.offcanvas?.backdrop === 'static' ? __('not close', 'wecodeart') : __('close', 'wecodeart')),
    __nextHasNoMarginBottom: true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
    label: __('Allow scroll', 'wecodeart'),
    checked: formData?.offcanvas?.scroll,
    onChange: scroll => setFormData({
      ...formData,
      ...{
        offcanvas: {
          ...formData?.offcanvas,
          scroll
        }
      }
    }),
    help: sprintf(__('Scroll is %s when offcanvas is active.', 'wecodeart'), formData?.offcanvas?.scroll ? __('allowed', 'wecodeart') : __('not allowed', 'wecodeart'))
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
    label: __('Show close button', 'wecodeart'),
    checked: formData?.offcanvas?.close,
    onChange: close => setFormData({
      ...formData,
      ...{
        offcanvas: {
          ...formData?.offcanvas,
          close
        }
      }
    }),
    help: sprintf(__('Offcanvas close button is %s.', 'wecodeart'), formData?.offcanvas?.close ? __('shown', 'wecodeart') : __('not shown', 'wecodeart'))
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
    label: __('Keyboard control', 'wecodeart'),
    checked: formData?.offcanvas?.keyboard,
    onChange: keyboard => setFormData({
      ...formData,
      ...{
        offcanvas: {
          ...formData?.offcanvas,
          keyboard
        }
      }
    }),
    help: sprintf(__('Offcanvas %s be closed with ESC key.', 'wecodeart'), formData?.offcanvas?.keyboard ? __('can', 'wecodeart') : __('cannot', 'wecodeart'))
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BaseControl, {
    label: __('Colors', 'wecodeart')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(HStack, {
    style: {
      justifyContent: 'flex-start'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenu, {
    label: __('Background Color', 'wecodeart'),
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorIndicator, {
      colorValue: formData?.offcanvas?.style?.backgroundColor
    }),
    toggleProps: {
      style: {
        height: 'initial',
        minWidth: 'initial',
        padding: 0
      }
    },
    popoverProps: {
      focusOnMount: 'container',
      position: 'bottom',
      noArrow: false
    }
  }, () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorPalette, {
    colors: colors,
    enableAlpha: true,
    value: formData?.offcanvas?.style?.backgroundColor,
    onChange: backgroundColor => setStyle({
      backgroundColor
    })
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenu, {
    label: __('Text Color', 'wecodeart'),
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorIndicator, {
      colorValue: formData?.offcanvas?.style?.color
    }),
    toggleProps: {
      style: {
        height: 'initial',
        minWidth: 'initial',
        padding: 0
      }
    },
    popoverProps: {
      focusOnMount: 'container',
      position: 'bottom',
      noArrow: false
    }
  }, () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorPalette, {
    colors: colors,
    enableAlpha: true,
    value: formData?.offcanvas?.style?.color,
    onChange: color => setStyle({
      color
    })
  })))))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "g-col-1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    className: "border shadow-none h-100"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardHeader, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
    className: "text-uppercase fw-medium m-0"
  }, __('Modal', 'wecodeart'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardBody, {
    style: {
      color: 'rgb(30, 30, 30)'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: __('Position', 'wecodeart'),
    value: formData?.modal?.position,
    options: [{
      label: __('Top', 'wecodeart'),
      value: 'top'
    }, {
      label: __('Centered', 'wecodeart'),
      value: 'centered'
    }, {
      label: __('Custom', 'wecodeart'),
      value: 'custom'
    }],
    onChange: position => setFormData({
      ...formData,
      ...{
        modal: {
          ...formData?.modal,
          position
        }
      }
    }),
    help: __('Relative to the browser window.', 'wecodeart'),
    __nextHasNoMarginBottom: true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: __('Title', 'wecodeart'),
    value: formData?.modal?.title,
    onChange: title => setFormData({
      ...formData,
      ...{
        modal: {
          ...formData?.modal,
          title
        }
      }
    }),
    help: __('The title for the modal.', 'wecodeart')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: __('Backdrop', 'wecodeart'),
    value: formData?.modal?.backdrop,
    options: [{
      label: __('Enabled', 'wecodeart'),
      value: 'true'
    }, {
      label: __('Static', 'wecodeart'),
      value: 'static'
    }, {
      label: __('Disabled', 'wecodeart'),
      value: 'false'
    }],
    onChange: backdrop => setFormData({
      ...formData,
      ...{
        modal: {
          ...formData?.modal,
          backdrop
        }
      }
    }),
    help: formData?.modal?.backdrop !== 'false' && sprintf(__('Clicking backdrop will %s modal.', 'wecodeart'), formData?.modal?.backdrop === 'static' ? __('not close', 'wecodeart') : __('close', 'wecodeart')),
    __nextHasNoMarginBottom: true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
    label: __('Close offcanvas', 'wecodeart'),
    checked: formData?.modal?.closeOffcanvas,
    onChange: closeOffcanvas => setFormData({
      ...formData,
      ...{
        modal: {
          ...formData?.modal,
          closeOffcanvas
        }
      }
    }),
    help: sprintf(__('Offcanvas will %s when modal is active.', 'wecodeart'), formData?.modal?.closeOffcanvas ? __('close', 'wecodeart') : __('not close', 'wecodeart'))
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
    label: __('Show close button', 'wecodeart'),
    checked: formData?.modal?.close,
    onChange: close => setFormData({
      ...formData,
      ...{
        modal: {
          ...formData?.modal,
          close
        }
      }
    }),
    help: sprintf(__('Modal close button is %s.', 'wecodeart'), formData?.modal?.close ? __('shown', 'wecodeart') : __('not shown', 'wecodeart'))
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
    label: __('Keyboard control', 'wecodeart'),
    checked: formData?.modal?.keyboard,
    onChange: keyboard => setFormData({
      ...formData,
      ...{
        modal: {
          ...formData?.modal,
          keyboard
        }
      }
    }),
    help: sprintf(__('Modal %s be closed with ESC key.', 'wecodeart'), formData?.modal?.keyboard ? __('can', 'wecodeart') : __('cannot', 'wecodeart'))
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BaseControl, {
    label: __('Colors', 'wecodeart')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(HStack, {
    style: {
      justifyContent: 'flex-start'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenu, {
    label: __('Background Color', 'wecodeart'),
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorIndicator, {
      colorValue: formData?.modal?.style?.backgroundColor
    }),
    toggleProps: {
      style: {
        height: 'initial',
        minWidth: 'initial',
        padding: 0
      }
    },
    popoverProps: {
      focusOnMount: 'container',
      position: 'bottom',
      noArrow: false
    }
  }, () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorPalette, {
    colors: colors,
    enableAlpha: true,
    value: formData?.modal?.style?.backgroundColor,
    onChange: backgroundColor => setStyle({
      backgroundColor
    }, 'modal')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenu, {
    label: __('Text Color', 'wecodeart'),
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorIndicator, {
      colorValue: formData?.modal?.style?.color
    }),
    toggleProps: {
      style: {
        height: 'initial',
        minWidth: 'initial',
        padding: 0
      }
    },
    popoverProps: {
      focusOnMount: 'container',
      position: 'bottom',
      noArrow: false
    }
  }, () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorPalette, {
    colors: colors,
    enableAlpha: true,
    value: formData?.modal?.style?.color,
    onChange: color => setStyle({
      color
    }, 'modal')
  })))))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "g-col-1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    className: "border shadow-none h-100"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardHeader, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
    className: "text-uppercase fw-medium m-0"
  }, __('Toggler', 'wecodeart'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardBody, {
    style: {
      color: 'rgb(30, 30, 30)'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: __('Position', 'wecodeart'),
    value: formData?.toggler?.position,
    options: [{
      label: __('Left', 'wecodeart'),
      value: 'left'
    }, {
      label: __('Right', 'wecodeart'),
      value: 'right'
    }],
    onChange: position => setFormData({
      ...formData,
      ...{
        toggler: {
          ...formData?.toggler,
          position
        }
      }
    }),
    help: __('Relative to the browser window.', 'wecodeart'),
    __nextHasNoMarginBottom: true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(HStack, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(NumberControl, {
    isShiftStepEnabled: true,
    spinControls: "custom",
    label: __('Horizontal Margin', 'wecodeart'),
    help: __('Number of pixels for horizontal window distance.', 'wecodeart'),
    min: 0,
    value: formData?.toggler?.style?.left,
    onChange: value => setStyle({
      left: parseInt(value)
    }, 'toggler')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(NumberControl, {
    isShiftStepEnabled: true,
    spinControls: "custom",
    label: __('Vertical Margin', 'wecodeart'),
    help: __('Number of pixels for vertical window distance.', 'wecodeart'),
    min: 0,
    value: formData?.toggler?.style?.bottom,
    onChange: bottom => setStyle({
      bottom: parseInt(bottom)
    }, 'toggler')
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(NumberControl, {
    isShiftStepEnabled: true,
    spinControls: "custom",
    label: __('Size', 'wecodeart'),
    min: 20,
    value: formData?.toggler?.style?.width,
    onChange: size => setStyle({
      width: parseInt(size),
      height: parseInt(size)
    }, 'toggler'),
    help: __('In pixels.', 'wecodeart')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(NumberControl, {
    isShiftStepEnabled: true,
    spinControls: "custom",
    label: __('Padding', 'wecodeart'),
    min: 0,
    value: formData?.toggler?.style?.padding,
    onChange: padding => setStyle({
      padding: parseInt(padding)
    }, 'toggler'),
    help: __('In pixels.', 'wecodeart')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BorderBoxControl, {
    colors: colors,
    label: __('Border', 'wecodeart'),
    value: formData?.toggler?.style?.border,
    onChange: border => setStyle({
      border
    }, 'toggler'),
    help: __('In pixels.', 'wecodeart')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
    label: __('Radius', 'wecodeart'),
    allowReset: true,
    value: formData?.toggler?.style?.borderRadius,
    onChange: borderRadius => setStyle({
      borderRadius
    }, 'toggler'),
    min: 0
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BaseControl, {
    label: __('Colors', 'wecodeart')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(HStack, {
    style: {
      justifyContent: 'flex-start'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenu, {
    label: __('Background Color', 'wecodeart'),
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorIndicator, {
      colorValue: formData?.toggler?.style?.backgroundColor
    }),
    toggleProps: {
      style: {
        height: 'initial',
        minWidth: 'initial',
        padding: 0
      }
    },
    popoverProps: {
      focusOnMount: 'container',
      position: 'bottom',
      noArrow: false
    }
  }, () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorPalette, {
    colors: colors,
    enableAlpha: true,
    value: formData?.toggler?.style?.backgroundColor,
    onChange: backgroundColor => setStyle({
      backgroundColor
    }, 'toggler')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DropdownMenu, {
    label: __('Icon Color', 'wecodeart'),
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorIndicator, {
      colorValue: formData?.toggler?.style?.color
    }),
    toggleProps: {
      style: {
        height: 'initial',
        minWidth: 'initial',
        padding: 0
      }
    },
    popoverProps: {
      focusOnMount: 'container',
      position: 'bottom',
      noArrow: false
    }
  }, () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ColorPalette, {
    colors: colors,
    enableAlpha: true,
    value: formData?.toggler?.style?.color,
    onChange: color => setStyle({
      color
    }, 'toggler')
  })))))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "g-col-1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    className: "border shadow-none h-100"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardHeader, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
    className: "text-uppercase fw-medium m-0"
  }, __('Notifications', 'wecodeart'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardBody, {
    style: {
      color: 'rgb(30, 30, 30)'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
    label: __('Toast confirmation', 'wecodeart'),
    checked: formData?.toast?.enable,
    onChange: enable => setFormData({
      ...formData,
      toast: {
        ...formData?.toast,
        enable
      }
    }),
    help: sprintf(__('Toast confirmation messages are %s.', 'wecodeart'), formData?.toast.enable ? __('enabled', 'wecodeart') : __('disabled', 'wecodeart'))
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(NumberControl, {
    label: __('Delay time', 'wecodeart'),
    value: formData?.toast?.delay,
    disabled: !formData?.toast?.enable,
    onChange: delay => setFormData({
      ...formData,
      toast: {
        ...formData?.toast,
        delay
      }
    }),
    help: __('Duration of the toast message - in miliseconds.', 'wecodeart')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: __('Confirm message', 'wecodeart'),
    value: formData?.toast?.confirm,
    disabled: !formData?.toast?.enable,
    onChange: confirm => setFormData({
      ...formData,
      toast: {
        ...formData?.toast,
        confirm
      }
    }),
    help: __('This message is displayed after user accepts cookies.', 'wecodeart')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: __('Reject message', 'wecodeart'),
    value: formData?.toast?.reject,
    disabled: !formData?.toast?.enable,
    onChange: reject => setFormData({
      ...formData,
      toast: {
        ...formData?.toast,
        reject
      }
    }),
    help: __('This message is displayed after user rejects cookies.', 'wecodeart')
  })))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Toggler__WEBPACK_IMPORTED_MODULE_1__["default"], {
    formData: formData?.toggler
  }), isOpen && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Modal__WEBPACK_IMPORTED_MODULE_2__["default"], {
    formData: formData,
    setFormData: setFormData,
    createNotice: createNotice,
    closeModal: () => setIsOpen(false)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", {
    style: {
      margin: '20px 0'
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    className: "button",
    isPrimary: true,
    isLarge: true,
    icon: loading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Spinner, null),
    onClick: () => {
      setLoading(true);
      saveSettings({
        cookies: formData
      }, handleNotice);
    },
    disabled: loading
  }, loading ? '' : __('Save', 'wecodeart')));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Options);
})();

/******/ })()
;
//# sourceMappingURL=admin.js.map