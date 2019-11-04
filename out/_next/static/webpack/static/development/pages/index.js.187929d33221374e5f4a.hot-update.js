webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/info.js":
/*!****************************!*\
  !*** ./components/info.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);


var _jsxFileName = "/Users/grant.custer/Sites/constraint-systems/waterfalls/components/info.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;
var fs = 14;
var lh = 1.5;
var rlh = fs * lh;
var ts = {
  textTransform: 'uppercase'
};
var maxch = '74ch';

var Key = function Key(item) {
  var _item = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(item, 2),
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
      lineNumber: 12
    },
    __self: this
  }, __jsx("div", {
    style: {
      border: 'solid 1px black',
      paddingLeft: '0.5ch',
      paddingRight: '0.5ch',
      background: '#fff'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, key), __jsx("div", {
    style: {
      paddingLeft: '1ch',
      paddingRight: '1ch',
      borderTop: 'dotted 1px white',
      borderRight: 'dotted 1px white',
      borderBottom: 'dotted 1px white'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }, label));
};

var KeyList = function KeyList(_ref) {
  var items = _ref.items;
  return __jsx("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
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
          lineNumber: 58
        },
        __self: this
      }, __jsx("div", {
        style: {
          marginBottom: rlh / 4
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        },
        __self: this
      }, __jsx("div", {
        style: ts,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        },
        __self: this
      }, "Move"), __jsx(KeyList, {
        items: [['h', '←'], ['j', '↓'], ['k', '↑'], ['l', '→']],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65
        },
        __self: this
      }), __jsx(KeyList, {
        items: [['shift', 'hold to move by 10']],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        },
        __self: this
      })), __jsx("div", {
        style: {
          marginBottom: rlh / 4
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68
        },
        __self: this
      }, __jsx("div", {
        style: ts,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        },
        __self: this
      }, "Action"), __jsx(KeyList, {
        items: [['enter', 'select flow'], ['2', 'adjust cursor']],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        },
        __self: this
      })));
      break;

    case 'choose_flow':
      return __jsx("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        },
        __self: this
      }, __jsx("div", {
        style: {
          marginBottom: rlh / 4
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84
        },
        __self: this
      }, __jsx("div", {
        style: ts,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 89
        },
        __self: this
      }, "Choose flow direction"), __jsx(KeyList, {
        items: [['a', 'west'], ['w', 'north'], ['s', 'south'], ['d', 'east']],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 90
        },
        __self: this
      }), __jsx(KeyList, {
        items: [['escape', 'cancel']],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 98
        },
        __self: this
      })));
      break;

    case 'adjust_flow':
      return __jsx("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 105
        },
        __self: this
      }, __jsx("div", {
        style: {
          marginBottom: rlh / 4
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 106
        },
        __self: this
      }, __jsx("div", {
        style: ts,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        },
        __self: this
      }, "Adjust flow"), __jsx(KeyList, {
        items: [['f', 'flip direction']],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        },
        __self: this
      }), __jsx(KeyList, {
        items: [['enter', 'start flow']],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        },
        __self: this
      }), __jsx(KeyList, {
        items: [['escape', 'cancel']],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        },
        __self: this
      })));
      break;

    case 'adjust_cursor':
      return __jsx("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 121
        },
        __self: this
      }, __jsx("div", {
        style: {
          marginBottom: rlh / 4
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122
        },
        __self: this
      }, __jsx("div", {
        style: ts,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        },
        __self: this
      }, "Adjust cursor size"), __jsx(KeyList, {
        items: [['h', '←'], ['j', '↓'], ['k', '↑'], ['l', '→']],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        },
        __self: this
      }), __jsx(KeyList, {
        items: [['shift', 'hold to adjust by 10']],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 129
        },
        __self: this
      })));
      break;

    default:
      return null;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (function (_ref3) {
  var _ref4;

  var rlh = _ref3.rlh,
      mode = _ref3.mode;
  return __jsx("div", {
    style: (_ref4 = {
      paddingRight: '1ch',
      paddingLeft: '1ch',
      paddingTop: rlh / 4,
      paddingBottom: rlh / 4,
      position: 'fixed',
      outline: 'solid 1px black',
      width: maxch,
      maxWidth: "calc(100% - 4ch)",
      background: 'white'
    }, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref4, "paddingLeft", '2ch'), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref4, "paddingRight", '2ch'), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref4, "paddingBottom", rlh / 2), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref4, "paddingTop", rlh / 2), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref4, "right", '2ch'), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref4, "bottom", rlh), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref4, "overflowY", 'auto'), _ref4),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 141
    },
    __self: this
  }, __jsx("div", {
    style: {
      background: '#efefef',
      marginLeft: '-2ch',
      marginRight: '-2ch',
      paddingLeft: '2ch',
      paddingRight: '2ch'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 161
    },
    __self: this
  }, __jsx(Relevant, {
    mode: mode,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 170
    },
    __self: this
  })), __jsx("div", {
    style: {
      marginBottom: rlh / 4
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 172
    },
    __self: this
  }, __jsx("div", {
    style: ts,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 177
    },
    __self: this
  }, "Image"), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 178
    },
    __self: this
  }, "To add an image you can paste, drop or press"), __jsx(KeyList, {
    items: [['o', 'to open a file dialog']],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 179
    },
    __self: this
  })), __jsx("div", {
    style: ts,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 181
    },
    __self: this
  }, "Special"), __jsx(KeyList, {
    items: [['x', 'save frame as png'], ['space', 'pause/play flows'], ['v', 'show flow outlines'], ['c', 'clear flows'], ['?', 'help']],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 182
    },
    __self: this
  }));
});

/***/ })

})
//# sourceMappingURL=index.js.187929d33221374e5f4a.hot-update.js.map