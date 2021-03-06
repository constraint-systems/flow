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
var fs = 14;
var lh = 1.5;
var rlh = fs * lh;

var Key = function Key(item) {
  var _item = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(item, 2),
      key = _item[0],
      label = _item[1];

  return __jsx("div", {
    style: {
      marginRight: '1ch',
      display: 'flex',
      marginBottom: rlh / 4
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
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
      lineNumber: 15
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
      lineNumber: 24
    },
    __self: this
  }, label));
};

var KeyList = function KeyList(_ref) {
  var items = _ref.items;
  return __jsx("div", {
    style: {
      display: 'flex'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  }, items.map(function (item) {
    return Key(item);
  }));
};

var Relevant = function Relevant(_ref2) {
  var mode = _ref2.mode;

  switch (mode) {
    case 'move':
      return __jsx("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        },
        __self: this
      }, __jsx(KeyList, {
        items: [['h', '←'], ['j', '↓'], ['k', '↑'], ['l', '→']],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        },
        __self: this
      }));

    default:
      return null;
  }
};

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
      lineNumber: 68
    },
    __self: this
  }, __jsx(Relevant, {
    mode: "move",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77
    },
    __self: this
  }), __jsx("div", {
    style: ts,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78
    },
    __self: this
  }, "Special"), __jsx(KeyList, {
    items: [['a', 'west'], ['w', 'north']],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79
    },
    __self: this
  }));
});

/***/ })

})
//# sourceMappingURL=index.js.5fe1a3ee694c585ac7bb.hot-update.js.map