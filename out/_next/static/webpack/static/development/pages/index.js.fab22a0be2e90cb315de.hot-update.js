webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/info.js":
/*!****************************!*\
  !*** ./components/info.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "/Users/grant.custer/Sites/constraint-systems/waterfalls/components/info.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

var List = function List(_ref) {
  var items = _ref.items;
  return __jsx("div", {
    style: {
      display: 'flex'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 3
    },
    __self: this
  }, items.map(function (_ref2) {
    var _ref3 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, 2),
        key = _ref3[0],
        label = _ref3[1];

    return __jsx("div", {
      style: {
        marginRight: '1ch',
        display: 'flex'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 6
      },
      __self: this
    }, __jsx("div", {
      style: {
        border: 'solid 1px black',
        paddingLeft: '0.5ch',
        paddingRight: '0.5ch'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      },
      __self: this
    }, key), __jsx("div", {
      style: {
        paddingLeft: '0.5ch',
        paddingRight: '0.5ch',
        borderTop: 'solid 1px #ddd',
        borderRight: 'solid 1px #ddd',
        borderBottom: 'solid 1px #ddd',
        background: '#ddd'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      },
      __self: this
    }, label));
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (function (_ref4) {
  var rlh = _ref4.rlh;
  var ts = {
    textTransform: 'uppercase'
  };
  return __jsx("div", {
    style: {
      border: 'solid 1px black',
      paddingRight: '1ch',
      paddingLeft: '1ch',
      paddingTop: rlh / 4,
      paddingBottom: rlh / 4
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: this
  }, __jsx("div", {
    style: ts,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }, "Move"), __jsx(List, {
    items: [['a', 'west'], ['w', 'north']],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  }));
});

/***/ })

})
//# sourceMappingURL=index.js.fab22a0be2e90cb315de.hot-update.js.map