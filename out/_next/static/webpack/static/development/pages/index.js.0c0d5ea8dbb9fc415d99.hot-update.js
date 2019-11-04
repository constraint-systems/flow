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

function list(items) {
  return __jsx("div", {
    style: {
      display: 'flex'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 3
    },
    __self: this
  }, items.map(function (_ref) {
    var _ref2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, 2),
        key = _ref2[0],
        label = _ref2[1];

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
}

/* harmony default export */ __webpack_exports__["default"] = (function (_ref3) {
  var rlh = _ref3.rlh;
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
  }, "Move"), list([['a', 'west'], ['w', 'north']]));
});

/***/ })

})
//# sourceMappingURL=index.js.0c0d5ea8dbb9fc415d99.hot-update.js.map