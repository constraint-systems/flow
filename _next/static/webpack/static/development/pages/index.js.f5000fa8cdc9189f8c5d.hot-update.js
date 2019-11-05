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


var _jsxFileName = "/Users/grant.custer/Sites/constraint-systems/flow/components/info.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;
var fs = 14;
var lh = 1.5;
var rlh = fs * lh;
var ts = {
  textTransform: 'uppercase'
};
var maxch = '74ch';

var Key = function Key(item, clickKey) {
  var _item = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(item, 2),
      key = _item[0],
      label = _item[1];

  console.log(clickKey);
  return __jsx("div", {
    onClick: function onClick() {
      clickKey(key);
    },
    style: {
      marginRight: label !== false ? '1ch' : 0,
      display: 'flex',
      marginBottom: label !== false ? rlh / 4 : 0
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
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
      lineNumber: 23
    },
    __self: this
  }, key), label !== false ? __jsx("div", {
    style: {
      paddingLeft: '1ch',
      paddingRight: '1ch',
      borderTop: 'solid 1px transparent',
      borderRight: 'solid 1px transparent',
      borderBottom: 'solid 1px transparent'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: this
  }, label) : null);
};

var KeyList = function KeyList(_ref) {
  var items = _ref.items,
      clickKey = _ref.clickKey;
  return __jsx("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }, items.map(function (item) {
    return Key(item, clickKey);
  }));
};

var Relevant = function Relevant(_ref2) {
  var mode = _ref2.mode,
      clickKey = _ref2.clickKey;

  switch (mode) {
    case 'move':
      return __jsx("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        },
        __self: this
      }, __jsx("div", {
        style: {
          marginBottom: rlh / 4
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65
        },
        __self: this
      }, __jsx("div", {
        style: ts,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        },
        __self: this
      }, "Move cursor"), __jsx(KeyList, {
        clickKey: clickKey,
        items: [['h', '←'], ['j', '↓'], ['k', '↑'], ['l', '→']],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        },
        __self: this
      }), __jsx(KeyList, {
        clickKey: clickKey,
        items: [['shift', 'hold to move by 10']],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 75
        },
        __self: this
      })), __jsx("div", {
        style: {
          marginBottom: rlh / 4
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 80
        },
        __self: this
      }, __jsx("div", {
        style: ts,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        },
        __self: this
      }, "Action"), __jsx(KeyList, {
        clickKey: clickKey,
        items: [['enter', 'select flow'], ['2', 'adjust cursor']],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        },
        __self: this
      })));
      break;

    case 'choose_flow':
      return __jsx("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 96
        },
        __self: this
      }, __jsx("div", {
        style: {
          marginBottom: rlh / 4
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 97
        },
        __self: this
      }, __jsx("div", {
        style: ts,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102
        },
        __self: this
      }, "Choose flow direction"), __jsx(KeyList, {
        clickKey: clickKey,
        items: [['a', 'west'], ['w', 'north'], ['s', 'south'], ['d', 'east']],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 103
        },
        __self: this
      }), __jsx(KeyList, {
        clickKey: clickKey,
        items: [['escape', 'cancel']],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        },
        __self: this
      })));
      break;

    case 'adjust_flow':
      return __jsx("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        },
        __self: this
      }, __jsx("div", {
        style: {
          marginBottom: rlh / 4
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 120
        },
        __self: this
      }, __jsx("div", {
        style: ts,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 125
        },
        __self: this
      }, "Adjust flow"), __jsx(KeyList, {
        clickKey: clickKey,
        items: [['f', 'flip direction']],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        },
        __self: this
      }), __jsx(KeyList, {
        clickKey: clickKey,
        items: [['enter', 'start flow']],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        },
        __self: this
      }), __jsx(KeyList, {
        clickKey: clickKey,
        items: [['escape', 'cancel']],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        },
        __self: this
      })));
      break;

    case 'adjust_cursor':
      return __jsx("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 135
        },
        __self: this
      }, __jsx("div", {
        style: {
          marginBottom: rlh / 4
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 136
        },
        __self: this
      }, __jsx("div", {
        style: ts,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 141
        },
        __self: this
      }, "Adjust cursor size"), __jsx(KeyList, {
        clickKey: clickKey,
        items: [['h', '←'], ['j', '↓'], ['k', '↑'], ['l', '→']],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 142
        },
        __self: this
      }), __jsx(KeyList, {
        clickKey: clickKey,
        items: [['shift', 'hold to adjust by 10']],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 146
        },
        __self: this
      })), __jsx("div", {
        style: {
          marginBottom: rlh / 4
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 151
        },
        __self: this
      }, __jsx("div", {
        style: ts,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 156
        },
        __self: this
      }, "Action"), __jsx(KeyList, {
        clickKey: clickKey,
        items: [['enter', 'return to move']],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 157
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
      mode = _ref3.mode,
      help = _ref3.help,
      clickKey = _ref3.clickKey;
  return __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 172
    },
    __self: this
  }, __jsx("div", {
    style: {
      position: 'fixed',
      right: '2ch',
      bottom: rlh,
      display: !help ? 'block' : 'none'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 173
    },
    __self: this
  }, Key(['?', false], clickKey)), __jsx("div", {
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
    }, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref4, "paddingLeft", '2ch'), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref4, "paddingRight", '2ch'), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref4, "paddingBottom", rlh / 2), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref4, "paddingTop", rlh / 2), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref4, "right", '2ch'), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref4, "bottom", rlh), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref4, "overflowY", 'auto'), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref4, "display", help ? 'block' : 'none'), _ref4),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 184
    },
    __self: this
  }, __jsx("div", {
    style: {
      marginBottom: rlh / 4
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 205
    },
    __self: this
  }, "Edit an image using keyboard-controlled pixel flows."), __jsx("div", {
    style: {
      background: '#efefef',
      marginLeft: '-2ch',
      marginRight: '-2ch',
      paddingLeft: '2ch',
      paddingRight: '2ch'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 209
    },
    __self: this
  }, __jsx(Relevant, {
    mode: mode,
    clickKey: clickKey,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 218
    },
    __self: this
  })), __jsx("div", {
    style: {
      marginBottom: rlh / 4
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 220
    },
    __self: this
  }, __jsx("div", {
    style: ts,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 225
    },
    __self: this
  }, "Image"), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 226
    },
    __self: this
  }, "To add an image you can paste, drop or press"), __jsx(KeyList, {
    items: [['o', 'to open a file dialog']],
    clickKey: clickKey,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 227
    },
    __self: this
  })), __jsx("div", {
    style: {
      marginBottom: rlh / 4
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 232
    },
    __self: this
  }, __jsx("div", {
    style: ts,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 237
    },
    __self: this
  }, "Special"), __jsx(KeyList, {
    clickKey: clickKey,
    items: [['x', 'save frame as png'], ['space', 'pause/play flows'], ['v', 'show flow outlines'], ['r', 'clear and reset image'], ['?', 'help']],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 238
    },
    __self: this
  })), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 249
    },
    __self: this
  }, __jsx("a", {
    href: "https://en.wikipedia.org/wiki/It%27s_Blitz!",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 250
    },
    __self: this
  }, "Default photo by Urs Fischer."))));
});

/***/ })

})
//# sourceMappingURL=index.js.f5000fa8cdc9189f8c5d.hot-update.js.map