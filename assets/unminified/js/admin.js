/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./inc/support/modules/cookies/src/js/Components/Options/Modal.js":
/*!************************************************************************!*\
  !*** ./inc/support/modules/cookies/src/js/Components/Options/Modal.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const {
  i18n: {
    __
  },
  components: {
    TextControl,
    ToggleControl,
    Card,
    CardHeader,
    CardBody,
    BaseControl,
    DropdownMenu,
    SelectControl,
    ColorPalette,
    ColorIndicator,
    __experimentalHStack: HStack
  }
} = wp;
const ModalOpts = ({
  formData,
  setFormData,
  setStyle,
  colors
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Card, {
    className: "border shadow-none h-100",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardHeader, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h5", {
        className: "text-uppercase fw-medium m-0",
        children: __('Modal', 'wecodeart')
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(CardBody, {
      style: {
        color: 'rgb(30, 30, 30)'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectControl, {
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
          help: __('Relative to the browser window.', 'wecodeart')
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TextControl, {
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
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectControl, {
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
          help: formData?.modal?.backdrop !== 'false' && sprintf(__('Clicking backdrop will %s modal.', 'wecodeart'), formData?.modal?.backdrop === 'static' ? __('not close', 'wecodeart') : __('close', 'wecodeart'))
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
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
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
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
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
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
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BaseControl, {
          label: __('Colors', 'wecodeart'),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(HStack, {
            style: {
              justifyContent: 'flex-start'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DropdownMenu, {
              label: __('Background Color', 'wecodeart'),
              icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ColorIndicator, {
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
              },
              children: () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ColorPalette, {
                colors: colors,
                enableAlpha: true,
                value: formData?.modal?.style?.backgroundColor,
                onChange: backgroundColor => setStyle({
                  backgroundColor
                }, 'modal')
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DropdownMenu, {
              label: __('Text Color', 'wecodeart'),
              icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ColorIndicator, {
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
              },
              children: () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ColorPalette, {
                colors: colors,
                enableAlpha: true,
                value: formData?.modal?.style?.color,
                onChange: color => setStyle({
                  color
                }, 'modal')
              })
            })]
          })
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalOpts);

/***/ }),

/***/ "./inc/support/modules/cookies/src/js/Components/Options/Notifications.js":
/*!********************************************************************************!*\
  !*** ./inc/support/modules/cookies/src/js/Components/Options/Notifications.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const {
  i18n: {
    __
  },
  components: {
    Card,
    CardHeader,
    CardBody,
    TextControl,
    ToggleControl,
    __experimentalNumberControl: NumberControl
  }
} = wp;
const NotificationsOpts = ({
  formData,
  setFormData
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Card, {
    className: "border shadow-none h-100",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardHeader, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h5", {
        className: "text-uppercase fw-medium m-0",
        children: __('Notifications', 'wecodeart')
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(CardBody, {
      style: {
        color: 'rgb(30, 30, 30)'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
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
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(NumberControl, {
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
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TextControl, {
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
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TextControl, {
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
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotificationsOpts);

/***/ }),

/***/ "./inc/support/modules/cookies/src/js/Components/Options/Offcanvas.js":
/*!****************************************************************************!*\
  !*** ./inc/support/modules/cookies/src/js/Components/Options/Offcanvas.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const {
  i18n: {
    __
  },
  components: {
    TextControl,
    ToggleControl,
    Card,
    CardHeader,
    CardBody,
    BaseControl,
    DropdownMenu,
    SelectControl,
    ColorPalette,
    ColorIndicator,
    __experimentalHStack: HStack
  }
} = wp;
const OffcanvasOpts = ({
  formData,
  setFormData,
  setStyle,
  colors
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Card, {
    className: "border shadow-none h-100",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardHeader, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h5", {
        className: "text-uppercase fw-medium m-0",
        children: __('Offcanvas', 'wecodeart')
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(CardBody, {
      style: {
        color: 'rgb(30, 30, 30)'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectControl, {
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
          help: __('Relative to the browser window.', 'wecodeart')
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TextControl, {
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
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectControl, {
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
          help: formData?.offcanvas?.backdrop !== 'false' && sprintf(__('Clicking backdrop will %s offcanvas.', 'wecodeart'), formData?.offcanvas?.backdrop === 'static' ? __('not close', 'wecodeart') : __('close', 'wecodeart'))
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
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
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
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
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToggleControl, {
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
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BaseControl, {
          label: __('Colors', 'wecodeart'),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(HStack, {
            style: {
              justifyContent: 'flex-start'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DropdownMenu, {
              label: __('Background Color', 'wecodeart'),
              icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ColorIndicator, {
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
              },
              children: () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ColorPalette, {
                colors: colors,
                enableAlpha: true,
                value: formData?.offcanvas?.style?.backgroundColor,
                onChange: backgroundColor => setStyle({
                  backgroundColor
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DropdownMenu, {
              label: __('Text Color', 'wecodeart'),
              icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ColorIndicator, {
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
              },
              children: () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ColorPalette, {
                colors: colors,
                enableAlpha: true,
                value: formData?.offcanvas?.style?.color,
                onChange: color => setStyle({
                  color
                })
              })
            })]
          })
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OffcanvasOpts);

/***/ }),

/***/ "./inc/support/modules/cookies/src/js/Components/Options/Toggler.js":
/*!**************************************************************************!*\
  !*** ./inc/support/modules/cookies/src/js/Components/Options/Toggler.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const {
  i18n: {
    __
  },
  components: {
    Card,
    CardHeader,
    CardBody,
    BaseControl,
    RangeControl,
    DropdownMenu,
    SelectControl,
    ColorPalette,
    ColorIndicator,
    __experimentalHStack: HStack,
    __experimentalNumberControl: NumberControl,
    __experimentalBorderBoxControl: BorderBoxControl
  }
} = wp;
const TogglerOpts = ({
  formData,
  setFormData,
  setStyle,
  colors
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Card, {
    className: "border shadow-none h-100",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CardHeader, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h5", {
        className: "text-uppercase fw-medium m-0",
        children: __('Toggler', 'wecodeart')
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(CardBody, {
      style: {
        color: 'rgb(30, 30, 30)'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectControl, {
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
          help: __('Relative to the browser window.', 'wecodeart')
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(HStack, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(NumberControl, {
            isShiftStepEnabled: true,
            spinControls: "custom",
            label: __('Horizontal Margin', 'wecodeart'),
            help: __('Number of pixels for horizontal window distance.', 'wecodeart'),
            min: 0,
            value: formData?.toggler?.style?.left,
            onChange: value => setStyle({
              left: parseInt(value)
            }, 'toggler')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(NumberControl, {
            isShiftStepEnabled: true,
            spinControls: "custom",
            label: __('Vertical Margin', 'wecodeart'),
            help: __('Number of pixels for vertical window distance.', 'wecodeart'),
            min: 0,
            value: formData?.toggler?.style?.bottom,
            onChange: bottom => setStyle({
              bottom: parseInt(bottom)
            }, 'toggler')
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(NumberControl, {
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
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(NumberControl, {
          isShiftStepEnabled: true,
          spinControls: "custom",
          label: __('Padding', 'wecodeart'),
          min: 0,
          value: formData?.toggler?.style?.padding,
          onChange: padding => setStyle({
            padding: parseInt(padding)
          }, 'toggler'),
          help: __('In pixels.', 'wecodeart')
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BorderBoxControl, {
          colors: colors,
          label: __('Border', 'wecodeart'),
          value: formData?.toggler?.style?.border,
          onChange: border => setStyle({
            border
          }, 'toggler'),
          help: __('In pixels.', 'wecodeart')
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RangeControl, {
          label: __('Radius', 'wecodeart'),
          allowReset: true,
          value: formData?.toggler?.style?.borderRadius,
          onChange: borderRadius => setStyle({
            borderRadius
          }, 'toggler'),
          min: 0
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BaseControl, {
          label: __('Colors', 'wecodeart'),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(HStack, {
            style: {
              justifyContent: 'flex-start'
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DropdownMenu, {
              label: __('Background Color', 'wecodeart'),
              icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ColorIndicator, {
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
              },
              children: () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ColorPalette, {
                colors: colors,
                enableAlpha: true,
                value: formData?.toggler?.style?.backgroundColor,
                onChange: backgroundColor => setStyle({
                  backgroundColor
                }, 'toggler')
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DropdownMenu, {
              label: __('Icon Color', 'wecodeart'),
              icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ColorIndicator, {
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
              },
              children: () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ColorPalette, {
                colors: colors,
                enableAlpha: true,
                value: formData?.toggler?.style?.color,
                onChange: color => setStyle({
                  color
                }, 'toggler')
              })
            })]
          })
        })
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TogglerOpts);

/***/ }),

/***/ "./inc/support/modules/cookies/src/js/Components/Table.js":
/*!****************************************************************!*\
  !*** ./inc/support/modules/cookies/src/js/Components/Table.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const {
  i18n: {
    __
  },
  components: {
    Modal,
    Button,
    ButtonGroup,
    TextControl,
    TextareaControl,
    SelectControl,
    Spinner,
    Placeholder,
    Dashicon,
    Tooltip
  },
  element: {
    useEffect,
    useState,
    useRef
  }
} = wp;
const {
  categories = []
} = wecodeartCookies || {};
const ManageCookie = ({
  closeModal,
  createNotice,
  currentCookie,
  setCookies
}) => {
  const [data, setData] = useState(currentCookie !== null && currentCookie !== void 0 ? currentCookie : {
    name: '',
    duration: '',
    category: '',
    description: ''
  });
  const [doingAjax, setDoingAjax] = useState(null);
  const formRef = useRef(null);
  const handleCookie = async () => {
    setDoingAjax(true);
    const formData = new FormData(formRef.current);
    if (currentCookie) {
      // Add name for editing cookie (as the input is disabled);
      formData.set('name', currentCookie?.name);
    }
    const response = await fetch(`${wecodeart.restUrl}/manage_cookies`, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    setCookies(data);
    setDoingAjax(false);
    createNotice('success', sprintf(__('Cookie %s.', 'wecodeart'), currentCookie ? __('updated', 'wecodeart') : __('added', 'wecodeart')));
    closeModal();
  };
  const objectHasEmptyValues = obj => Object.keys(obj).filter(key => obj[key] === '').length;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Modal, {
    title: currentCookie ? sprintf(__('Edit "%s" cookie', 'wecodeart'), currentCookie?.name) : __('Add cookie', 'wecodeart'),
    onRequestClose: closeModal,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
      ref: formRef,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TextControl, {
        label: __('Cookie name', 'wecodeart'),
        name: "name",
        value: data?.name,
        disabled: currentCookie,
        required: true,
        onChange: name => setData({
          ...data,
          name
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TextControl, {
        label: __('Duration', 'wecodeart'),
        name: "duration",
        help: __('Cookie duration - a string like: 30 days.', 'wecodeart'),
        required: true,
        value: data?.duration,
        onChange: duration => setData({
          ...data,
          duration
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(SelectControl, {
        label: __('Category', 'wecodeart'),
        name: "category",
        options: Object.keys(categories).map(key => {
          return {
            label: key === 'null' ? __('Select a category', 'wecodeart') : categories[key],
            value: key === 'null' ? '' : key,
            disabled: key === 'null'
          };
        }),
        help: __('Cookie category to be used on filters.', 'wecodeart'),
        required: true,
        value: data?.category,
        onChange: category => setData({
          ...data,
          category
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TextareaControl, {
        label: __('Description', 'wecodeart'),
        name: "description",
        cols: "50",
        help: __('Cookie information related to the cookie.', 'wecodeart'),
        required: true,
        value: data?.description,
        onChange: description => setData({
          ...data,
          description
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Button, {
        className: "button d-flex gap-2",
        isPrimary: true,
        disabled: doingAjax || objectHasEmptyValues(data),
        icon: doingAjax && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Spinner, {
          style: {
            margin: 0
          }
        }),
        onClick: handleCookie,
        children: currentCookie ? __('Update cookie', 'wecodeart') : __('Add cookie', 'wecodeart')
      })]
    })
  });
};
const CookiesTable = ({
  formData,
  setFormData,
  cookies,
  setCookies,
  createNotice
}) => {
  const [currentCookie, setCurrentCookie] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [doingAjax, setDoingAjax] = useState(false);
  useEffect(() => {
    async function fetchCookies() {
      const response = await fetch(`${wecodeart.restUrl}/manage_cookies`, {
        method: 'GET'
      });
      const data = await response.json();
      setCookies(data);
    }
    fetchCookies();
  }, []);
  if (cookies === false) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Placeholder, {
      instructions: __('Loading cookies...', 'wecodeart')
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("table", {
      className: "table table-bordered table-hover",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("thead", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
          style: {
            textAlign: 'left'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
            children: __('Cookie name', 'wecodeart')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
            children: __('Description', 'wecodeart')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
            children: __('Duration', 'wecodeart')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
            children: __('Category', 'wecodeart')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("th", {
            style: {
              width: '1px',
              whiteSpace: 'nowrap'
            },
            children: __('Actions', 'wecodeart')
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tbody", {
        children: Object.keys(cookies).length ? Object.keys(cookies).map(key => {
          const {
            name,
            description,
            duration = '-',
            category
          } = cookies[key];
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("tr", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
              children: name !== null && name !== void 0 ? name : key
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
              children: description
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
              children: duration
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
              children: categories?.[category] ? categories[category] : '-'
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
              children: name ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ButtonGroup, {
                style: {
                  display: 'flex'
                },
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Button, {
                  variant: "secondary",
                  isSmall: true,
                  onClick: () => {
                    setIsOpen(true);
                    setCurrentCookie(cookies[key]);
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Dashicon, {
                    icon: "edit"
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Button, {
                  variant: "secondary",
                  isDestructive: true,
                  isSmall: true,
                  disabled: doingAjax,
                  onClick: async () => {
                    setDoingAjax(true);
                    const formData = new FormData();
                    formData.set('name', name);
                    formData.set('remove', true);
                    const response = await fetch(`${wecodeart.restUrl}/manage_cookies`, {
                      method: 'POST',
                      body: formData
                    });
                    const data = await response.json();
                    setCookies(data);
                    setDoingAjax(false);
                    createNotice('success', sprintf(__('Cookie "%s" has been removed.', 'wecodeart'), name));
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Dashicon, {
                    icon: "trash"
                  })
                })]
              }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Tooltip, {
                text: __('This cookie is added via API - it cannot be modified.', 'wecodeart'),
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Dashicon, {
                  icon: "lock"
                })
              })
            })]
          }, key);
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("tr", {
          style: {
            textAlign: 'center'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("td", {
            colSpan: 5,
            children: __('No cookies added yet - please add some using the button bellow.', 'am2')
          })
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Button, {
      className: "button",
      onClick: () => setIsOpen(true),
      children: __('Add cookies', 'wecodeart')
    }), isOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ManageCookie, {
      formData,
      setFormData,
      createNotice,
      currentCookie,
      setCookies,
      closeModal: () => {
        setIsOpen(false);
        setCurrentCookie(null);
      }
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CookiesTable);

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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Tooltip, {
    text: __('Preview', 'wecodeart'),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Button, {
      style: generateStyles(formData),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Icon, {
        icon: () => {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: viewBox,
            children: paths.map(el => {
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                fill: "currentColor",
                d: el
              });
            })
          });
        }
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Toggler);

/***/ }),

/***/ "./inc/support/modules/cookies/src/js/Components/index.js":
/*!****************************************************************!*\
  !*** ./inc/support/modules/cookies/src/js/Components/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CookiesTable: () => (/* reexport safe */ _Table__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   ModalOpts: () => (/* reexport safe */ _Options_Modal__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   NotificationsOpts: () => (/* reexport safe */ _Options_Notifications__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   OffcanvasOpts: () => (/* reexport safe */ _Options_Offcanvas__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   Toggler: () => (/* reexport safe */ _Toggler__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   TogglerOpts: () => (/* reexport safe */ _Options_Toggler__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _Options_Modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Options/Modal */ "./inc/support/modules/cookies/src/js/Components/Options/Modal.js");
/* harmony import */ var _Options_Toggler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Toggler */ "./inc/support/modules/cookies/src/js/Components/Options/Toggler.js");
/* harmony import */ var _Options_Offcanvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Options/Offcanvas */ "./inc/support/modules/cookies/src/js/Components/Options/Offcanvas.js");
/* harmony import */ var _Options_Notifications__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Options/Notifications */ "./inc/support/modules/cookies/src/js/Components/Options/Notifications.js");
/* harmony import */ var _Table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Table */ "./inc/support/modules/cookies/src/js/Components/Table.js");
/* harmony import */ var _Toggler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Toggler */ "./inc/support/modules/cookies/src/js/Components/Toggler.js");







/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************************************************!*\
  !*** ./inc/support/modules/cookies/src/js/admin.js ***!
  \*****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Components */ "./inc/support/modules/cookies/src/js/Components/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
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
    TabPanel,
    TextControl,
    ToggleControl,
    __experimentalNumberControl: NumberControl
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
    render: props => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Options, {
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Placeholder, {
      icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Spinner, {}),
      label: __('Loading', 'wecodeart'),
      instructions: __('Please wait, loading settings...', 'wecodeart')
    });
  }
  const apiOptions = (({
    cookies
  }) => cookies)(settings);
  const [loading, setLoading] = useState(null);
  const [formData, setFormData] = useState(apiOptions);
  const [cookies, setCookies] = useState(false);
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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [formData.notice !== false && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Notice, {
      status: "info",
      className: "border-top border-bottom border-end mb-3",
      onRemove: () => setFormData({
        ...formData,
        notice: false
      }),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
        className: "my-0",
        dangerouslySetInnerHTML: {
          __html: sprintf(_x('You can edit module messages/templates under %s.', 'wecodeart'), `<a href="${getEditorUrl({
            path: '/patterns',
            categoryType: 'wp_template_part',
            categoryId: 'wca-cookies'
          })}" target="_blank">${__('Site Editor', 'wecodeart')}</a>`)
        }
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TabPanel, {
      onSelect: () => {},
      tabs: [{
        name: 'cookies',
        title: __('Cookies', 'wecodeart'),
        render: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(Card, {
            className: "border shadow-none",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CardHeader, {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h5", {
                className: "text-uppercase fw-medium m-0",
                children: __('Cookies', 'wecodeart')
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(CardBody, {
              style: {
                color: 'rgb(30, 30, 30)'
              },
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(ToggleControl, {
                  label: __('Block cookies', 'wecodeart'),
                  checked: formData?.cookies?.block,
                  onChange: block => setFormData({
                    ...formData,
                    cookies: {
                      ...formData?.cookies,
                      block
                    }
                  }),
                  help: sprintf(__('Cookies are %s until preference is set.', 'wecodeart'), formData?.cookies?.block ? __('blocked', 'wecodeart') : __('not blocked', 'wecodeart'))
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(NumberControl, {
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
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TextControl, {
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
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(TextControl, {
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
                })
              })]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("hr", {
            style: {
              margin: '20px 0'
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Button, {
            className: "button",
            isPrimary: true,
            isLarge: true,
            icon: loading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Spinner, {}),
            onClick: () => {
              setLoading(true);
              saveSettings({
                cookies: formData
              }, handleNotice);
            },
            disabled: loading,
            children: loading ? '' : __('Save', 'wecodeart')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("hr", {
            style: {
              margin: '20px 0'
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Components__WEBPACK_IMPORTED_MODULE_0__.CookiesTable, {
            formData,
            setFormData,
            cookies,
            setCookies,
            createNotice
          })]
        })
      }, {
        name: 'design',
        title: __('Design', 'wecodeart'),
        render: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: "grid",
            style: {
              '--wca--columns': 2
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
              className: "g-col-1",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Components__WEBPACK_IMPORTED_MODULE_0__.OffcanvasOpts, {
                formData,
                setFormData,
                setStyle,
                colors
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
              className: "g-col-1",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Components__WEBPACK_IMPORTED_MODULE_0__.ModalOpts, {
                formData,
                setFormData,
                setStyle,
                colors
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
              className: "g-col-1",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Components__WEBPACK_IMPORTED_MODULE_0__.TogglerOpts, {
                formData,
                setFormData,
                setStyle,
                colors
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
              className: "g-col-1",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Components__WEBPACK_IMPORTED_MODULE_0__.NotificationsOpts, {
                formData,
                setFormData
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_Components__WEBPACK_IMPORTED_MODULE_0__.Toggler, {
            formData: formData?.toggler
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("hr", {
            style: {
              margin: '20px 0'
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Button, {
            className: "button",
            isPrimary: true,
            isLarge: true,
            icon: loading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Spinner, {}),
            onClick: () => {
              setLoading(true);
              saveSettings({
                cookies: formData
              }, handleNotice);
            },
            disabled: loading,
            children: loading ? '' : __('Save', 'wecodeart')
          })]
        })
      }],
      children: ({
        render
      }) => render
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Options);
})();

/******/ })()
;
//# sourceMappingURL=admin.js.map