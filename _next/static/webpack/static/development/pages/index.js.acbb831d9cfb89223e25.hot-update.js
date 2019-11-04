webpackHotUpdate("static/development/pages/index.js",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_flows__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/flows */ "./components/flows.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/head */ "./node_modules/next/dist/next-server/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_4__);

var _jsxFileName = "/Users/grant.custer/Sites/constraint-systems/waterfalls/pages/index.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;



var cursor_padding = 10;
var magenta = 'rgba(255,0,255,1)';
var green = 'rgba(0,255,0,1)';
var fs = 14;
var lh = 1.5;
var rlh = fs * lh;
var maxch = '80ch';
var color = 'light';

var Home = function Home() {
  var cref = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(null);
  var sref = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(null);
  var uref = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(null);
  var keymap = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])({});
  var readref = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(null);
  var cursorref = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])([0, 0, 20, 20]);
  var waterref = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])([400, 0, 20, 1024]);
  var counter = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(0);
  var handlerref = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(null);
  var moder = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])('move');
  var flow_mark = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(null);
  var flows = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])([]);
  var flows_visible = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(false);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(true),
      help = _useState[0],
      setHelp = _useState[1];

  function KeyTip(letter, color) {
    return __jsx("span", {
      className: "keytip",
      onClick: function onClick() {
        keymapr.current[letter] = true;
        keyAction(letter, false);
        setTimeout(function () {
          keymapr.current[letter] = false;
        }, 300);
      },
      style: {
        outline: color === 'dark' ? 'solid 1px white' : 'solid 1px black',
        paddingLeft: '0.5ch',
        paddingRight: '0.5ch',
        textAlign: 'center',
        display: 'inline-block',
        userSelect: 'none',
        cursor: 'default'
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      },
      __self: this
    }, letter === ' ' ? 'spacebar' : letter);
  }

  function initImageCanvas(img) {
    var c = cref.current;
    c.width = img.width;
    c.height = img.height;
    var ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0, c.width, c.height);
  }

  function initScanCanvas(img) {
    var c = sref.current;
    c.width = img.width + cursor_padding * 2;
    c.height = img.height + cursor_padding * 2;
    var ctx = c.getContext('2d');
  }

  function initImage(src) {
    var first_load = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var w = window.innerWidth - cursor_padding * 2;
    var h = window.innerHeight - cursor_padding * 2 - 10 - fs * lh;
    var img = new Image();

    img.onload = function () {
      var iw = img.width;
      var ih = img.height;
      var wa = w / h;
      var ia = iw / ih;
      var resize_check = false;
      var rw, rh;

      if (ia >= wa) {
        if (iw > w) {
          resize_check = true;
          rw = w;
          rh = w / ia;
        }
      } else {
        if (ih > h) {
          resize_check = true;
          rh = h;
          rw = h * ia;
        }
      }

      if (resize_check) {
        var confirm_check = true;

        if (!first_load) {
          confirm_check = confirm("The image you selected is larger (".concat(iw, "x").concat(ih, ") than the browser window.  Resize it to fit (").concat(rw, "x").concat(rh, ")? Choose cancel to import it at full size."));
        }

        if (confirm_check) {
          img.width = rw;
          img.height = rh;
        }
      }

      initImageCanvas(img);
      initScanCanvas(img);
      drawCursor();
      runFlow();
      setRead();
    };

    img.src = src;
  }

  function drawPossFlows() {
    var im = cref.current;
    var iw = im.offsetWidth;
    var ih = im.offsetHeight;
    var cursor = cursorref.current;
    var west = [0, cursor[1], cursor[0], cursor[3]];
    var east = [cursor[0] + cursor[2], cursor[1], iw - (cursor[0] + cursor[2]), cursor[3]];
    var north = [cursor[0], 0, cursor[2], cursor[1]];
    var south = [cursor[0], cursor[1] + cursor[3], cursor[2], ih - (cursor[1] + cursor[3])];
    var dirs = [west, east, north, south];
    var padded_dirs = dirs.map(function (n) {
      return n.map(function (v, i) {
        return i === 0 || i === 1 ? v + cursor_padding : v;
      });
    });
    var stx = sref.current.getContext('2d');
    stx.fillStyle = 'rgba(0,0,0,0.2)';
    stx.strokeStyle = 'rgba(0,0,0,0.8)';

    for (var i = 0; i < padded_dirs.length; i++) {
      var d = padded_dirs[i];
      stx.fillRect.apply(stx, Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(d));
      stx.strokeRect.apply(stx, Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(d));
    }

    stx.strokeStyle = 'white';
  }

  function toggleFlowVisibility() {
    console.log('toggle it');
    console.log(flows_visible.current);
    flows_visible.current = !flows_visible.current;
  }

  function drawFlowOutlines() {
    var stx = sref.current.getContext('2d');
    stx.strokeStyle = '#aaa';

    for (var f = 0; f < flows.current.length; f++) {
      var flow = flows.current[f];
      stx.strokeRect(flow[0] + cursor_padding, flow[1] + cursor_padding, flow[2], flow[3]);
    }
  }

  function drawCursor() {
    var sm = sref.current;
    var sw = sm.offsetWidth;
    var sh = sm.offsetHeight;
    var stx = sref.current.getContext('2d');
    var mode = moder.current;

    if (mode !== 'adjust_flow') {
      var cursor = cursorref.current;
      stx.strokeStyle = magenta;
      stx.lineWidth = 1;
      stx.strokeRect(cursor[0] + cursor_padding, cursor[1] + cursor_padding, cursor[2], cursor[3]);

      if (mode === 'adjust_cursor') {
        stx.fillStyle = magenta;
        stx.beginPath();
        stx.arc(cursor[0] + cursor_padding, cursor[1] + cursor_padding, 4, 0, 2 * Math.PI);
        stx.fill();
      }
    }
  }

  function chooseFlow(dir) {
    var im = cref.current;
    var iw = im.offsetWidth;
    var ih = im.offsetHeight;
    moder.current = 'adjust_flow';
    var cursor = cursorref.current;

    if (dir === 'w') {
      flow_mark.current = [0, cursor[1], cursor[0] + cursor[2], cursor[3], dir];
    } else if (dir === 'e') {
      flow_mark.current = [cursor[0], cursor[1], iw - cursor[0], cursor[3], dir];
    } else if (dir === 'n') {
      flow_mark.current = [cursor[0], 0, cursor[2], cursor[1] + cursor[3], dir];
    } else if (dir === 's') {
      flow_mark.current = [cursor[0], cursor[1], cursor[2], ih - cursor[1], dir];
    }
  }

  function runFlow() {
    var c = cref.current;
    var ctx = c.getContext('2d');
    var iw = c.offsetWidth;
    var ih = c.offsetHeight;

    for (var f = 0; f < flows.current.length; f++) {
      var flow = flows.current[f];
      var t = Object(_components_flows__WEBPACK_IMPORTED_MODULE_3__["flowMove"])(flow, c);
      ctx.drawImage(t, flow[0], flow[1], flow[2], flow[3]);
    }

    handlerref.current = requestAnimationFrame(runFlow);
  }

  function startFlow() {
    flows.current.push(flow_mark.current);
    moder.current = 'move';
  }

  function setRead() {
    var im = cref.current;
    var iw = im.offsetWidth;
    var ih = im.offsetHeight;
    var fm = flow_mark.current;
    var cursor = cursorref.current;
    var read = readref.current;

    if (moder.current === 'adjust_flow') {
      read.innerHTML = "".concat(fm[0], ",").concat(fm[1], " ").concat(fm[2], "x").concat(fm[3], " ").concat(fm[4].toUpperCase());
    } else {
      read.innerHTML = "".concat(iw, "x").concat(ih, "  ").concat(cursor[0], ",").concat(cursor[1], " ").concat(cursor[2], "x").concat(cursor[3]);
    }
  }

  function keyAction(key, repeat) {
    var im = cref.current;
    var iw = im.offsetWidth;
    var ih = im.offsetHeight;
    var m = keymap.current;
    var cursor = cursorref.current;
    var mode = moder.current;

    if (key === ' ') {
      if (handlerref.current !== null) {
        cancelAnimationFrame(handlerref.current);
        handlerref.current = null;
      } else {
        runFlow();
      }
    }

    if (key === 'v') {
      toggleFlowVisibility();
    }

    if (moder.current === 'move') {
      var inc = 1;
      if (m['shift']) inc = 10;
      if (m['j']) cursor[1] += inc;
      if (m['k']) cursor[1] -= inc;
      if (m['h']) cursor[0] -= inc;
      if (m['l']) cursor[0] += inc;
      if (cursor[0] < 0) cursor[0] = 0;
      if (cursor[0] + cursor[2] > iw) cursor[0] = iw - cursor[2];
      if (cursor[1] < 0) cursor[1] = 0;
      if (cursor[1] + cursor[3] > ih) cursor[1] = ih - cursor[3];

      if (key === '2') {
        moder.current = 'adjust_cursor';
      }

      if (key === 'enter') {
        moder.current = 'choose_flow';
      }
    } else if (moder.current === 'adjust_cursor') {
      var _inc = 1;
      if (m['shift']) _inc = 10;
      if (m['j']) cursor[3] += _inc;
      if (m['k']) cursor[3] -= _inc;
      if (m['h']) cursor[2] -= _inc;
      if (m['l']) cursor[2] += _inc;
      if (cursor[0] + cursor[2] > iw) cursor[2] = iw - cursor[0];
      if (cursor[1] + cursor[3] > ih) cursor[3] = ih - cursor[1];

      if (key === 'enter') {
        moder.current = 'move';
      }

      if (key === 'escape') {
        moder.current = 'move';
      }

      if (key === '1') {
        moder.current = 'move';
      }
    } else if (moder.current === 'choose_flow') {
      if (key === 'a') {
        chooseFlow('w');
      } else if (key === 'w') {
        chooseFlow('n');
      } else if (key === 's') {
        chooseFlow('s');
      } else if (key === 'd') {
        chooseFlow('e');
      }

      if (key === 'escape') {
        moder.current = 'move';
      }
    } else if (moder.current === 'adjust_flow') {
      var fm = flow_mark.current;

      if (key === 'escape') {
        moder.current = 'choose_flow';
      } else if (key === 'enter') {
        startFlow();
      } else if (key === 'f') {
        if (fm[4] === 'w') {
          fm[4] = 'e';
        } else if (fm[4] === 'e') {
          fm[4] = 'w';
        } else if (fm[4] === 'n') {
          fm[4] = 's';
        } else if (fm[4] === 's') {
          fm[4] = 'n';
        }
      }
    }

    var sm = sref.current;
    var sw = sm.offsetWidth;
    var sh = sm.offsetHeight;
    var stx = sref.current.getContext('2d');
    stx.clearRect(0, 0, sw, sh);

    if (flows_visible.current) {
      drawFlowOutlines();
    }

    if (moder.current === 'choose_flow') {
      drawPossFlows();
    } else if (moder.current === 'adjust_flow') {
      stx.strokeStyle = green;
      var _fm = flow_mark.current;
      stx.strokeRect(_fm[0] + cursor_padding, _fm[1] + cursor_padding, _fm[2], _fm[3]);
      stx.fillStyle = green;
      stx.beginPath();
      var xa;
      var ya;

      if (_fm[4] === 'e') {
        xa = _fm[0];
        ya = _fm[1] + _fm[3] / 2;
      } else if (_fm[4] === 's') {
        xa = _fm[0] + _fm[2] / 2;
        ya = _fm[1];
      } else if (_fm[4] === 'w') {
        xa = _fm[0] + _fm[2];
        ya = _fm[1] + _fm[3] / 2;
      } else if (_fm[4] === 'n') {
        xa = _fm[0] + _fm[2] / 2;
        ya = _fm[1] + _fm[3];
      }

      stx.arc(xa + cursor_padding, ya + cursor_padding, 4, 0, 2 * Math.PI);
      stx.fill();
    }

    drawCursor();
    setRead();
  }

  function downHandler(e) {
    keymap.current[e.key.toLowerCase()] = true;
    keyAction(e.key.toLowerCase(), e.repeat);
  }

  function upHandler(e) {
    keymap.current[e.key.toLowerCase()] = false;
  }

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return function () {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
      if (handlerref.current !== null) cancelAnimationFrame(handlerref.current);
    };
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    // initImage('/heroes.jpg');
    initImage('/yyy.jpg', true); // initImage('/mestrip.png');
    // initImage('/scruggs.jpg');
    // initImage('/fka.jpg');
    // initImage('/grant.png');
  }, []);
  return __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 443
    },
    __self: this
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_4___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 444
    },
    __self: this
  }, __jsx("title", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 445
    },
    __self: this
  }, "Waterfalls"), __jsx("link", {
    rel: "icon",
    href: "/favicon.ico",
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 446
    },
    __self: this
  })), __jsx("div", {
    style: {
      position: 'relative',
      padding: cursor_padding
    },
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 448
    },
    __self: this
  }, __jsx("canvas", {
    ref: cref,
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 449
    },
    __self: this
  }), __jsx("canvas", {
    ref: sref,
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      pointerEvents: 'none'
    },
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 450
    },
    __self: this
  })), __jsx("div", {
    style: {
      marginLeft: cursor_padding,
      marginBottom: cursor_padding,
      whiteSpace: 'pre-wrap'
    },
    ref: readref,
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 460
    },
    __self: this
  }), __jsx("div", {
    style: {
      position: 'fixed',
      outline: color === 'dark' ? 'solid 1px white' : 'solid 1px black',
      display: help ? 'block' : 'none',
      maxWidth: "calc(100% - 4ch)",
      background: color === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
      paddingLeft: '2ch',
      paddingRight: '2ch',
      paddingBottom: rlh / 2,
      paddingTop: rlh / 2,
      right: '2ch',
      bottom: rlh,
      overflowY: 'auto'
    },
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]) + " " + "help",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 469
    },
    __self: this
  }, __jsx("div", {
    style: {
      marginBottom: rlh / 2,
      maxWidth: maxch
    },
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 487
    },
    __self: this
  }, "Edit an image using keyboard-controlled pixel flows."), __jsx("div", {
    style: {
      marginBottom: rlh / 4,
      maxWidth: maxch
    },
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 490
    },
    __self: this
  }, "MOVE"), __jsx("div", {
    style: {
      marginBottom: rlh / 2,
      maxWidth: maxch
    },
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 491
    },
    __self: this
  }, KeyTip('h', color), " \u2190\xA0 ", KeyTip('j', color), " \u2193\xA0", ' ', KeyTip('k', color), " \u2191\xA0 ", KeyTip('l', color), " \u2192", __jsx("br", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 493
    },
    __self: this
  })), __jsx("div", {
    style: {
      marginBottom: rlh / 2,
      maxWidth: maxch
    },
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 495
    },
    __self: this
  }, "hold ", KeyTip('shift', color), " to move by 10"), __jsx("div", {
    style: {
      marginBottom: rlh / 4,
      maxWidth: maxch
    },
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 498
    },
    __self: this
  }, "SELECT FLOW"), __jsx("div", {
    style: {
      marginBottom: rlh / 2,
      maxWidth: maxch
    },
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 499
    },
    __self: this
  }, KeyTip('enter', color)), __jsx("div", {
    style: {
      marginBottom: rlh / 4,
      maxWidth: maxch
    },
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 502
    },
    __self: this
  }, "ADJUST CURSOR"), __jsx("div", {
    style: {
      marginBottom: rlh / 2,
      maxWidth: maxch
    },
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 505
    },
    __self: this
  }, KeyTip('2', color))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a, {
    id: "632941774",
    dynamic: [fs, lh],
    __self: this
  }, "@font-face{font-family:'custom';src:url('/IBMPlexMono-Regular.woff2') format('woff2'), url('/IBMPlexMono-Regular.woff') format('woff');}*{box-sizing:border-box;}html{font-family:custom,monospace;font-size:".concat(fs, "px;line-height:").concat(lh, ";}body{margin:0;padding:0;}canvas{display:block;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ncmFudC5jdXN0ZXIvU2l0ZXMvY29uc3RyYWludC1zeXN0ZW1zL3dhdGVyZmFsbHMvcGFnZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNmZ5QixBQUdnQyxBQUtDLEFBR1EsQUFLckIsQUFJSyxTQUhKLEtBSVosS0FIQSxFQWJtRCxDQUluRCxPQUcyQyx5Q0FDQSx5Q0FDM0MsYUFSQSIsImZpbGUiOiIvVXNlcnMvZ3JhbnQuY3VzdGVyL1NpdGVzL2NvbnN0cmFpbnQtc3lzdGVtcy93YXRlcmZhbGxzL3BhZ2VzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBmbG93TW92ZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvZmxvd3MnO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcblxubGV0IGN1cnNvcl9wYWRkaW5nID0gMTA7XG5sZXQgbWFnZW50YSA9ICdyZ2JhKDI1NSwwLDI1NSwxKSc7XG5sZXQgZ3JlZW4gPSAncmdiYSgwLDI1NSwwLDEpJztcbmxldCBmcyA9IDE0O1xubGV0IGxoID0gMS41O1xubGV0IHJsaCA9IGZzICogbGg7XG5sZXQgbWF4Y2ggPSAnODBjaCc7XG5sZXQgY29sb3IgPSAnbGlnaHQnO1xuXG5jb25zdCBIb21lID0gKCkgPT4ge1xuICBsZXQgY3JlZiA9IHVzZVJlZihudWxsKTtcbiAgbGV0IHNyZWYgPSB1c2VSZWYobnVsbCk7XG4gIGxldCB1cmVmID0gdXNlUmVmKG51bGwpO1xuICBsZXQga2V5bWFwID0gdXNlUmVmKHt9KTtcbiAgbGV0IHJlYWRyZWYgPSB1c2VSZWYobnVsbCk7XG4gIGxldCBjdXJzb3JyZWYgPSB1c2VSZWYoWzAsIDAsIDIwLCAyMF0pO1xuICBsZXQgd2F0ZXJyZWYgPSB1c2VSZWYoWzQwMCwgMCwgMjAsIDEwMjRdKTtcbiAgbGV0IGNvdW50ZXIgPSB1c2VSZWYoMCk7XG4gIGxldCBoYW5kbGVycmVmID0gdXNlUmVmKG51bGwpO1xuICBsZXQgbW9kZXIgPSB1c2VSZWYoJ21vdmUnKTtcbiAgbGV0IGZsb3dfbWFyayA9IHVzZVJlZihudWxsKTtcbiAgbGV0IGZsb3dzID0gdXNlUmVmKFtdKTtcbiAgbGV0IGZsb3dzX3Zpc2libGUgPSB1c2VSZWYoZmFsc2UpO1xuICBsZXQgW2hlbHAsIHNldEhlbHBdID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgZnVuY3Rpb24gS2V5VGlwKGxldHRlciwgY29sb3IpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW5cbiAgICAgICAgY2xhc3NOYW1lPVwia2V5dGlwXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgIGtleW1hcHIuY3VycmVudFtsZXR0ZXJdID0gdHJ1ZTtcbiAgICAgICAgICBrZXlBY3Rpb24obGV0dGVyLCBmYWxzZSk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBrZXltYXByLmN1cnJlbnRbbGV0dGVyXSA9IGZhbHNlO1xuICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH19XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgb3V0bGluZTogY29sb3IgPT09ICdkYXJrJyA/ICdzb2xpZCAxcHggd2hpdGUnIDogJ3NvbGlkIDFweCBibGFjaycsXG4gICAgICAgICAgcGFkZGluZ0xlZnQ6ICcwLjVjaCcsXG4gICAgICAgICAgcGFkZGluZ1JpZ2h0OiAnMC41Y2gnLFxuICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgdXNlclNlbGVjdDogJ25vbmUnLFxuICAgICAgICAgIGN1cnNvcjogJ2RlZmF1bHQnLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7bGV0dGVyID09PSAnICcgPyAnc3BhY2ViYXInIDogbGV0dGVyfVxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0SW1hZ2VDYW52YXMoaW1nKSB7XG4gICAgbGV0IGMgPSBjcmVmLmN1cnJlbnQ7XG4gICAgYy53aWR0aCA9IGltZy53aWR0aDtcbiAgICBjLmhlaWdodCA9IGltZy5oZWlnaHQ7XG4gICAgbGV0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCwgYy53aWR0aCwgYy5oZWlnaHQpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdFNjYW5DYW52YXMoaW1nKSB7XG4gICAgbGV0IGMgPSBzcmVmLmN1cnJlbnQ7XG4gICAgYy53aWR0aCA9IGltZy53aWR0aCArIGN1cnNvcl9wYWRkaW5nICogMjtcbiAgICBjLmhlaWdodCA9IGltZy5oZWlnaHQgKyBjdXJzb3JfcGFkZGluZyAqIDI7XG4gICAgbGV0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRJbWFnZShzcmMsIGZpcnN0X2xvYWQgPSBmYWxzZSkge1xuICAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGggLSBjdXJzb3JfcGFkZGluZyAqIDI7XG4gICAgbGV0IGggPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSBjdXJzb3JfcGFkZGluZyAqIDIgLSAxMCAtIGZzICogbGg7XG5cbiAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGxldCBpdyA9IGltZy53aWR0aDtcbiAgICAgIGxldCBpaCA9IGltZy5oZWlnaHQ7XG5cbiAgICAgIGxldCB3YSA9IHcgLyBoO1xuICAgICAgbGV0IGlhID0gaXcgLyBpaDtcblxuICAgICAgbGV0IHJlc2l6ZV9jaGVjayA9IGZhbHNlO1xuICAgICAgbGV0IHJ3LCByaDtcbiAgICAgIGlmIChpYSA+PSB3YSkge1xuICAgICAgICBpZiAoaXcgPiB3KSB7XG4gICAgICAgICAgcmVzaXplX2NoZWNrID0gdHJ1ZTtcbiAgICAgICAgICBydyA9IHc7XG4gICAgICAgICAgcmggPSB3IC8gaWE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpaCA+IGgpIHtcbiAgICAgICAgICByZXNpemVfY2hlY2sgPSB0cnVlO1xuICAgICAgICAgIHJoID0gaDtcbiAgICAgICAgICBydyA9IGggKiBpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocmVzaXplX2NoZWNrKSB7XG4gICAgICAgIGxldCBjb25maXJtX2NoZWNrID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFmaXJzdF9sb2FkKSB7XG4gICAgICAgICAgY29uZmlybV9jaGVjayA9IGNvbmZpcm0oXG4gICAgICAgICAgICBgVGhlIGltYWdlIHlvdSBzZWxlY3RlZCBpcyBsYXJnZXIgKCR7aXd9eCR7aWh9KSB0aGFuIHRoZSBicm93c2VyIHdpbmRvdy4gIFJlc2l6ZSBpdCB0byBmaXQgKCR7cnd9eCR7cmh9KT8gQ2hvb3NlIGNhbmNlbCB0byBpbXBvcnQgaXQgYXQgZnVsbCBzaXplLmBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maXJtX2NoZWNrKSB7XG4gICAgICAgICAgaW1nLndpZHRoID0gcnc7XG4gICAgICAgICAgaW1nLmhlaWdodCA9IHJoO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGluaXRJbWFnZUNhbnZhcyhpbWcpO1xuICAgICAgaW5pdFNjYW5DYW52YXMoaW1nKTtcbiAgICAgIGRyYXdDdXJzb3IoKTtcblxuICAgICAgcnVuRmxvdygpO1xuICAgICAgc2V0UmVhZCgpO1xuICAgIH07XG4gICAgaW1nLnNyYyA9IHNyYztcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdQb3NzRmxvd3MoKSB7XG4gICAgbGV0IGltID0gY3JlZi5jdXJyZW50O1xuICAgIGxldCBpdyA9IGltLm9mZnNldFdpZHRoO1xuICAgIGxldCBpaCA9IGltLm9mZnNldEhlaWdodDtcbiAgICBsZXQgY3Vyc29yID0gY3Vyc29ycmVmLmN1cnJlbnQ7XG4gICAgbGV0IHdlc3QgPSBbMCwgY3Vyc29yWzFdLCBjdXJzb3JbMF0sIGN1cnNvclszXV07XG4gICAgbGV0IGVhc3QgPSBbXG4gICAgICBjdXJzb3JbMF0gKyBjdXJzb3JbMl0sXG4gICAgICBjdXJzb3JbMV0sXG4gICAgICBpdyAtIChjdXJzb3JbMF0gKyBjdXJzb3JbMl0pLFxuICAgICAgY3Vyc29yWzNdLFxuICAgIF07XG4gICAgbGV0IG5vcnRoID0gW2N1cnNvclswXSwgMCwgY3Vyc29yWzJdLCBjdXJzb3JbMV1dO1xuICAgIGxldCBzb3V0aCA9IFtcbiAgICAgIGN1cnNvclswXSxcbiAgICAgIGN1cnNvclsxXSArIGN1cnNvclszXSxcbiAgICAgIGN1cnNvclsyXSxcbiAgICAgIGloIC0gKGN1cnNvclsxXSArIGN1cnNvclszXSksXG4gICAgXTtcbiAgICBsZXQgZGlycyA9IFt3ZXN0LCBlYXN0LCBub3J0aCwgc291dGhdO1xuICAgIGxldCBwYWRkZWRfZGlycyA9IGRpcnMubWFwKG4gPT5cbiAgICAgIG4ubWFwKCh2LCBpKSA9PiAoaSA9PT0gMCB8fCBpID09PSAxID8gdiArIGN1cnNvcl9wYWRkaW5nIDogdikpXG4gICAgKTtcbiAgICBsZXQgc3R4ID0gc3JlZi5jdXJyZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgc3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDAsMCwwLDAuMiknO1xuICAgIHN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDAsMCwwLDAuOCknO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFkZGVkX2RpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBkID0gcGFkZGVkX2RpcnNbaV07XG4gICAgICBzdHguZmlsbFJlY3QoLi4uZCk7XG4gICAgICBzdHguc3Ryb2tlUmVjdCguLi5kKTtcbiAgICB9XG4gICAgc3R4LnN0cm9rZVN0eWxlID0gJ3doaXRlJztcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZUZsb3dWaXNpYmlsaXR5KCkge1xuICAgIGNvbnNvbGUubG9nKCd0b2dnbGUgaXQnKTtcbiAgICBjb25zb2xlLmxvZyhmbG93c192aXNpYmxlLmN1cnJlbnQpO1xuICAgIGZsb3dzX3Zpc2libGUuY3VycmVudCA9ICFmbG93c192aXNpYmxlLmN1cnJlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3Rmxvd091dGxpbmVzKCkge1xuICAgIGxldCBzdHggPSBzcmVmLmN1cnJlbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBzdHguc3Ryb2tlU3R5bGUgPSAnI2FhYSc7XG4gICAgZm9yIChsZXQgZiA9IDA7IGYgPCBmbG93cy5jdXJyZW50Lmxlbmd0aDsgZisrKSB7XG4gICAgICBsZXQgZmxvdyA9IGZsb3dzLmN1cnJlbnRbZl07XG4gICAgICBzdHguc3Ryb2tlUmVjdChcbiAgICAgICAgZmxvd1swXSArIGN1cnNvcl9wYWRkaW5nLFxuICAgICAgICBmbG93WzFdICsgY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgIGZsb3dbMl0sXG4gICAgICAgIGZsb3dbM11cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZHJhd0N1cnNvcigpIHtcbiAgICBsZXQgc20gPSBzcmVmLmN1cnJlbnQ7XG4gICAgbGV0IHN3ID0gc20ub2Zmc2V0V2lkdGg7XG4gICAgbGV0IHNoID0gc20ub2Zmc2V0SGVpZ2h0O1xuXG4gICAgbGV0IHN0eCA9IHNyZWYuY3VycmVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGxldCBtb2RlID0gbW9kZXIuY3VycmVudDtcbiAgICBpZiAobW9kZSAhPT0gJ2FkanVzdF9mbG93Jykge1xuICAgICAgbGV0IGN1cnNvciA9IGN1cnNvcnJlZi5jdXJyZW50O1xuICAgICAgc3R4LnN0cm9rZVN0eWxlID0gbWFnZW50YTtcbiAgICAgIHN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgc3R4LnN0cm9rZVJlY3QoXG4gICAgICAgIGN1cnNvclswXSArIGN1cnNvcl9wYWRkaW5nLFxuICAgICAgICBjdXJzb3JbMV0gKyBjdXJzb3JfcGFkZGluZyxcbiAgICAgICAgY3Vyc29yWzJdLFxuICAgICAgICBjdXJzb3JbM11cbiAgICAgICk7XG5cbiAgICAgIGlmIChtb2RlID09PSAnYWRqdXN0X2N1cnNvcicpIHtcbiAgICAgICAgc3R4LmZpbGxTdHlsZSA9IG1hZ2VudGE7XG4gICAgICAgIHN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgc3R4LmFyYyhcbiAgICAgICAgICBjdXJzb3JbMF0gKyBjdXJzb3JfcGFkZGluZyxcbiAgICAgICAgICBjdXJzb3JbMV0gKyBjdXJzb3JfcGFkZGluZyxcbiAgICAgICAgICA0LFxuICAgICAgICAgIDAsXG4gICAgICAgICAgMiAqIE1hdGguUElcbiAgICAgICAgKTtcbiAgICAgICAgc3R4LmZpbGwoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaG9vc2VGbG93KGRpcikge1xuICAgIGxldCBpbSA9IGNyZWYuY3VycmVudDtcbiAgICBsZXQgaXcgPSBpbS5vZmZzZXRXaWR0aDtcbiAgICBsZXQgaWggPSBpbS5vZmZzZXRIZWlnaHQ7XG5cbiAgICBtb2Rlci5jdXJyZW50ID0gJ2FkanVzdF9mbG93JztcbiAgICBsZXQgY3Vyc29yID0gY3Vyc29ycmVmLmN1cnJlbnQ7XG4gICAgaWYgKGRpciA9PT0gJ3cnKSB7XG4gICAgICBmbG93X21hcmsuY3VycmVudCA9IFswLCBjdXJzb3JbMV0sIGN1cnNvclswXSArIGN1cnNvclsyXSwgY3Vyc29yWzNdLCBkaXJdO1xuICAgIH0gZWxzZSBpZiAoZGlyID09PSAnZScpIHtcbiAgICAgIGZsb3dfbWFyay5jdXJyZW50ID0gW1xuICAgICAgICBjdXJzb3JbMF0sXG4gICAgICAgIGN1cnNvclsxXSxcbiAgICAgICAgaXcgLSBjdXJzb3JbMF0sXG4gICAgICAgIGN1cnNvclszXSxcbiAgICAgICAgZGlyLFxuICAgICAgXTtcbiAgICB9IGVsc2UgaWYgKGRpciA9PT0gJ24nKSB7XG4gICAgICBmbG93X21hcmsuY3VycmVudCA9IFtjdXJzb3JbMF0sIDAsIGN1cnNvclsyXSwgY3Vyc29yWzFdICsgY3Vyc29yWzNdLCBkaXJdO1xuICAgIH0gZWxzZSBpZiAoZGlyID09PSAncycpIHtcbiAgICAgIGZsb3dfbWFyay5jdXJyZW50ID0gW1xuICAgICAgICBjdXJzb3JbMF0sXG4gICAgICAgIGN1cnNvclsxXSxcbiAgICAgICAgY3Vyc29yWzJdLFxuICAgICAgICBpaCAtIGN1cnNvclsxXSxcbiAgICAgICAgZGlyLFxuICAgICAgXTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBydW5GbG93KCkge1xuICAgIGxldCBjID0gY3JlZi5jdXJyZW50O1xuICAgIGxldCBjdHggPSBjLmdldENvbnRleHQoJzJkJyk7XG4gICAgbGV0IGl3ID0gYy5vZmZzZXRXaWR0aDtcbiAgICBsZXQgaWggPSBjLm9mZnNldEhlaWdodDtcbiAgICBmb3IgKGxldCBmID0gMDsgZiA8IGZsb3dzLmN1cnJlbnQubGVuZ3RoOyBmKyspIHtcbiAgICAgIGxldCBmbG93ID0gZmxvd3MuY3VycmVudFtmXTtcbiAgICAgIGxldCB0ID0gZmxvd01vdmUoZmxvdywgYyk7XG4gICAgICBjdHguZHJhd0ltYWdlKHQsIGZsb3dbMF0sIGZsb3dbMV0sIGZsb3dbMl0sIGZsb3dbM10pO1xuICAgIH1cbiAgICBoYW5kbGVycmVmLmN1cnJlbnQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocnVuRmxvdyk7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydEZsb3coKSB7XG4gICAgZmxvd3MuY3VycmVudC5wdXNoKGZsb3dfbWFyay5jdXJyZW50KTtcbiAgICBtb2Rlci5jdXJyZW50ID0gJ21vdmUnO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0UmVhZCgpIHtcbiAgICBsZXQgaW0gPSBjcmVmLmN1cnJlbnQ7XG4gICAgbGV0IGl3ID0gaW0ub2Zmc2V0V2lkdGg7XG4gICAgbGV0IGloID0gaW0ub2Zmc2V0SGVpZ2h0O1xuICAgIGxldCBmbSA9IGZsb3dfbWFyay5jdXJyZW50O1xuXG4gICAgbGV0IGN1cnNvciA9IGN1cnNvcnJlZi5jdXJyZW50O1xuICAgIGxldCByZWFkID0gcmVhZHJlZi5jdXJyZW50O1xuICAgIGlmIChtb2Rlci5jdXJyZW50ID09PSAnYWRqdXN0X2Zsb3cnKSB7XG4gICAgICByZWFkLmlubmVySFRNTCA9IGAke2ZtWzBdfSwke2ZtWzFdfSAke2ZtWzJdfXgke1xuICAgICAgICBmbVszXVxuICAgICAgfSAke2ZtWzRdLnRvVXBwZXJDYXNlKCl9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVhZC5pbm5lckhUTUwgPSBgJHtpd314JHtpaH0gICR7Y3Vyc29yWzBdfSwke2N1cnNvclsxXX0gJHtjdXJzb3JbMl19eCR7XG4gICAgICAgIGN1cnNvclszXVxuICAgICAgfWA7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24ga2V5QWN0aW9uKGtleSwgcmVwZWF0KSB7XG4gICAgbGV0IGltID0gY3JlZi5jdXJyZW50O1xuICAgIGxldCBpdyA9IGltLm9mZnNldFdpZHRoO1xuICAgIGxldCBpaCA9IGltLm9mZnNldEhlaWdodDtcblxuICAgIGxldCBtID0ga2V5bWFwLmN1cnJlbnQ7XG4gICAgbGV0IGN1cnNvciA9IGN1cnNvcnJlZi5jdXJyZW50O1xuICAgIGxldCBtb2RlID0gbW9kZXIuY3VycmVudDtcblxuICAgIGlmIChrZXkgPT09ICcgJykge1xuICAgICAgaWYgKGhhbmRsZXJyZWYuY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGVycmVmLmN1cnJlbnQpO1xuICAgICAgICBoYW5kbGVycmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcnVuRmxvdygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChrZXkgPT09ICd2Jykge1xuICAgICAgdG9nZ2xlRmxvd1Zpc2liaWxpdHkoKTtcbiAgICB9XG5cbiAgICBpZiAobW9kZXIuY3VycmVudCA9PT0gJ21vdmUnKSB7XG4gICAgICBsZXQgaW5jID0gMTtcbiAgICAgIGlmIChtWydzaGlmdCddKSBpbmMgPSAxMDtcblxuICAgICAgaWYgKG1bJ2onXSkgY3Vyc29yWzFdICs9IGluYztcbiAgICAgIGlmIChtWydrJ10pIGN1cnNvclsxXSAtPSBpbmM7XG4gICAgICBpZiAobVsnaCddKSBjdXJzb3JbMF0gLT0gaW5jO1xuICAgICAgaWYgKG1bJ2wnXSkgY3Vyc29yWzBdICs9IGluYztcblxuICAgICAgaWYgKGN1cnNvclswXSA8IDApIGN1cnNvclswXSA9IDA7XG4gICAgICBpZiAoY3Vyc29yWzBdICsgY3Vyc29yWzJdID4gaXcpIGN1cnNvclswXSA9IGl3IC0gY3Vyc29yWzJdO1xuICAgICAgaWYgKGN1cnNvclsxXSA8IDApIGN1cnNvclsxXSA9IDA7XG4gICAgICBpZiAoY3Vyc29yWzFdICsgY3Vyc29yWzNdID4gaWgpIGN1cnNvclsxXSA9IGloIC0gY3Vyc29yWzNdO1xuXG4gICAgICBpZiAoa2V5ID09PSAnMicpIHtcbiAgICAgICAgbW9kZXIuY3VycmVudCA9ICdhZGp1c3RfY3Vyc29yJztcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdlbnRlcicpIHtcbiAgICAgICAgbW9kZXIuY3VycmVudCA9ICdjaG9vc2VfZmxvdyc7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtb2Rlci5jdXJyZW50ID09PSAnYWRqdXN0X2N1cnNvcicpIHtcbiAgICAgIGxldCBpbmMgPSAxO1xuICAgICAgaWYgKG1bJ3NoaWZ0J10pIGluYyA9IDEwO1xuXG4gICAgICBpZiAobVsnaiddKSBjdXJzb3JbM10gKz0gaW5jO1xuICAgICAgaWYgKG1bJ2snXSkgY3Vyc29yWzNdIC09IGluYztcbiAgICAgIGlmIChtWydoJ10pIGN1cnNvclsyXSAtPSBpbmM7XG4gICAgICBpZiAobVsnbCddKSBjdXJzb3JbMl0gKz0gaW5jO1xuXG4gICAgICBpZiAoY3Vyc29yWzBdICsgY3Vyc29yWzJdID4gaXcpIGN1cnNvclsyXSA9IGl3IC0gY3Vyc29yWzBdO1xuICAgICAgaWYgKGN1cnNvclsxXSArIGN1cnNvclszXSA+IGloKSBjdXJzb3JbM10gPSBpaCAtIGN1cnNvclsxXTtcblxuICAgICAgaWYgKGtleSA9PT0gJ2VudGVyJykge1xuICAgICAgICBtb2Rlci5jdXJyZW50ID0gJ21vdmUnO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ2VzY2FwZScpIHtcbiAgICAgICAgbW9kZXIuY3VycmVudCA9ICdtb3ZlJztcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICcxJykge1xuICAgICAgICBtb2Rlci5jdXJyZW50ID0gJ21vdmUnO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZXIuY3VycmVudCA9PT0gJ2Nob29zZV9mbG93Jykge1xuICAgICAgaWYgKGtleSA9PT0gJ2EnKSB7XG4gICAgICAgIGNob29zZUZsb3coJ3cnKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAndycpIHtcbiAgICAgICAgY2hvb3NlRmxvdygnbicpO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdzJykge1xuICAgICAgICBjaG9vc2VGbG93KCdzJyk7XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2QnKSB7XG4gICAgICAgIGNob29zZUZsb3coJ2UnKTtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdlc2NhcGUnKSB7XG4gICAgICAgIG1vZGVyLmN1cnJlbnQgPSAnbW92ZSc7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtb2Rlci5jdXJyZW50ID09PSAnYWRqdXN0X2Zsb3cnKSB7XG4gICAgICBsZXQgZm0gPSBmbG93X21hcmsuY3VycmVudDtcbiAgICAgIGlmIChrZXkgPT09ICdlc2NhcGUnKSB7XG4gICAgICAgIG1vZGVyLmN1cnJlbnQgPSAnY2hvb3NlX2Zsb3cnO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdlbnRlcicpIHtcbiAgICAgICAgc3RhcnRGbG93KCk7XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2YnKSB7XG4gICAgICAgIGlmIChmbVs0XSA9PT0gJ3cnKSB7XG4gICAgICAgICAgZm1bNF0gPSAnZSc7XG4gICAgICAgIH0gZWxzZSBpZiAoZm1bNF0gPT09ICdlJykge1xuICAgICAgICAgIGZtWzRdID0gJ3cnO1xuICAgICAgICB9IGVsc2UgaWYgKGZtWzRdID09PSAnbicpIHtcbiAgICAgICAgICBmbVs0XSA9ICdzJztcbiAgICAgICAgfSBlbHNlIGlmIChmbVs0XSA9PT0gJ3MnKSB7XG4gICAgICAgICAgZm1bNF0gPSAnbic7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHNtID0gc3JlZi5jdXJyZW50O1xuICAgIGxldCBzdyA9IHNtLm9mZnNldFdpZHRoO1xuICAgIGxldCBzaCA9IHNtLm9mZnNldEhlaWdodDtcbiAgICBsZXQgc3R4ID0gc3JlZi5jdXJyZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgc3R4LmNsZWFyUmVjdCgwLCAwLCBzdywgc2gpO1xuICAgIGlmIChmbG93c192aXNpYmxlLmN1cnJlbnQpIHtcbiAgICAgIGRyYXdGbG93T3V0bGluZXMoKTtcbiAgICB9XG4gICAgaWYgKG1vZGVyLmN1cnJlbnQgPT09ICdjaG9vc2VfZmxvdycpIHtcbiAgICAgIGRyYXdQb3NzRmxvd3MoKTtcbiAgICB9IGVsc2UgaWYgKG1vZGVyLmN1cnJlbnQgPT09ICdhZGp1c3RfZmxvdycpIHtcbiAgICAgIHN0eC5zdHJva2VTdHlsZSA9IGdyZWVuO1xuICAgICAgbGV0IGZtID0gZmxvd19tYXJrLmN1cnJlbnQ7XG4gICAgICBzdHguc3Ryb2tlUmVjdChcbiAgICAgICAgZm1bMF0gKyBjdXJzb3JfcGFkZGluZyxcbiAgICAgICAgZm1bMV0gKyBjdXJzb3JfcGFkZGluZyxcbiAgICAgICAgZm1bMl0sXG4gICAgICAgIGZtWzNdXG4gICAgICApO1xuICAgICAgc3R4LmZpbGxTdHlsZSA9IGdyZWVuO1xuICAgICAgc3R4LmJlZ2luUGF0aCgpO1xuICAgICAgbGV0IHhhO1xuICAgICAgbGV0IHlhO1xuICAgICAgaWYgKGZtWzRdID09PSAnZScpIHtcbiAgICAgICAgeGEgPSBmbVswXTtcbiAgICAgICAgeWEgPSBmbVsxXSArIGZtWzNdIC8gMjtcbiAgICAgIH0gZWxzZSBpZiAoZm1bNF0gPT09ICdzJykge1xuICAgICAgICB4YSA9IGZtWzBdICsgZm1bMl0gLyAyO1xuICAgICAgICB5YSA9IGZtWzFdO1xuICAgICAgfSBlbHNlIGlmIChmbVs0XSA9PT0gJ3cnKSB7XG4gICAgICAgIHhhID0gZm1bMF0gKyBmbVsyXTtcbiAgICAgICAgeWEgPSBmbVsxXSArIGZtWzNdIC8gMjtcbiAgICAgIH0gZWxzZSBpZiAoZm1bNF0gPT09ICduJykge1xuICAgICAgICB4YSA9IGZtWzBdICsgZm1bMl0gLyAyO1xuICAgICAgICB5YSA9IGZtWzFdICsgZm1bM107XG4gICAgICB9XG4gICAgICBzdHguYXJjKHhhICsgY3Vyc29yX3BhZGRpbmcsIHlhICsgY3Vyc29yX3BhZGRpbmcsIDQsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgIHN0eC5maWxsKCk7XG4gICAgfVxuICAgIGRyYXdDdXJzb3IoKTtcblxuICAgIHNldFJlYWQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvd25IYW5kbGVyKGUpIHtcbiAgICBrZXltYXAuY3VycmVudFtlLmtleS50b0xvd2VyQ2FzZSgpXSA9IHRydWU7XG4gICAga2V5QWN0aW9uKGUua2V5LnRvTG93ZXJDYXNlKCksIGUucmVwZWF0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwSGFuZGxlcihlKSB7XG4gICAga2V5bWFwLmN1cnJlbnRbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSBmYWxzZTtcbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBkb3duSGFuZGxlcik7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBIYW5kbGVyKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBkb3duSGFuZGxlcik7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB1cEhhbmRsZXIpO1xuICAgICAgaWYgKGhhbmRsZXJyZWYuY3VycmVudCAhPT0gbnVsbCkgY2FuY2VsQW5pbWF0aW9uRnJhbWUoaGFuZGxlcnJlZi5jdXJyZW50KTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBpbml0SW1hZ2UoJy9oZXJvZXMuanBnJyk7XG4gICAgaW5pdEltYWdlKCcveXl5LmpwZycsIHRydWUpO1xuICAgIC8vIGluaXRJbWFnZSgnL21lc3RyaXAucG5nJyk7XG4gICAgLy8gaW5pdEltYWdlKCcvc2NydWdncy5qcGcnKTtcbiAgICAvLyBpbml0SW1hZ2UoJy9ma2EuanBnJyk7XG4gICAgLy8gaW5pdEltYWdlKCcvZ3JhbnQucG5nJyk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPHRpdGxlPldhdGVyZmFsbHM8L3RpdGxlPlxuICAgICAgICA8bGluayByZWw9XCJpY29uXCIgaHJlZj1cIi9mYXZpY29uLmljb1wiIC8+XG4gICAgICA8L0hlYWQ+XG4gICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnLCBwYWRkaW5nOiBjdXJzb3JfcGFkZGluZyB9fT5cbiAgICAgICAgPGNhbnZhcyByZWY9e2NyZWZ9IC8+XG4gICAgICAgIDxjYW52YXNcbiAgICAgICAgICByZWY9e3NyZWZ9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgbWFyZ2luTGVmdDogY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiBjdXJzb3JfcGFkZGluZyxcbiAgICAgICAgICB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLFxuICAgICAgICB9fVxuICAgICAgICByZWY9e3JlYWRyZWZ9XG4gICAgICAvPlxuXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImhlbHBcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgICAgIG91dGxpbmU6IGNvbG9yID09PSAnZGFyaycgPyAnc29saWQgMXB4IHdoaXRlJyA6ICdzb2xpZCAxcHggYmxhY2snLFxuICAgICAgICAgIGRpc3BsYXk6IGhlbHAgPyAnYmxvY2snIDogJ25vbmUnLFxuICAgICAgICAgIG1heFdpZHRoOiBgY2FsYygxMDAlIC0gNGNoKWAsXG4gICAgICAgICAgYmFja2dyb3VuZDpcbiAgICAgICAgICAgIGNvbG9yID09PSAnZGFyaycgPyAncmdiYSgwLDAsMCwwLjgpJyA6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuOCknLFxuICAgICAgICAgIHBhZGRpbmdMZWZ0OiAnMmNoJyxcbiAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICcyY2gnLFxuICAgICAgICAgIHBhZGRpbmdCb3R0b206IHJsaCAvIDIsXG4gICAgICAgICAgcGFkZGluZ1RvcDogcmxoIC8gMixcbiAgICAgICAgICByaWdodDogJzJjaCcsXG4gICAgICAgICAgYm90dG9tOiBybGgsXG4gICAgICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiBybGggLyAyLCBtYXhXaWR0aDogbWF4Y2ggfX0+XG4gICAgICAgICAgRWRpdCBhbiBpbWFnZSB1c2luZyBrZXlib2FyZC1jb250cm9sbGVkIHBpeGVsIGZsb3dzLlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IHJsaCAvIDQsIG1heFdpZHRoOiBtYXhjaCB9fT5NT1ZFPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiBybGggLyAyLCBtYXhXaWR0aDogbWF4Y2ggfX0+XG4gICAgICAgICAge0tleVRpcCgnaCcsIGNvbG9yKX0g4oaQJm5ic3A7IHtLZXlUaXAoJ2onLCBjb2xvcil9IOKGkyZuYnNwO3snICd9XG4gICAgICAgICAge0tleVRpcCgnaycsIGNvbG9yKX0g4oaRJm5ic3A7IHtLZXlUaXAoJ2wnLCBjb2xvcil9IOKGkjxiciAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IHJsaCAvIDIsIG1heFdpZHRoOiBtYXhjaCB9fT5cbiAgICAgICAgICBob2xkIHtLZXlUaXAoJ3NoaWZ0JywgY29sb3IpfSB0byBtb3ZlIGJ5IDEwXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogcmxoIC8gNCwgbWF4V2lkdGg6IG1heGNoIH19PlNFTEVDVCBGTE9XPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiBybGggLyAyLCBtYXhXaWR0aDogbWF4Y2ggfX0+XG4gICAgICAgICAge0tleVRpcCgnZW50ZXInLCBjb2xvcil9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogcmxoIC8gNCwgbWF4V2lkdGg6IG1heGNoIH19PlxuICAgICAgICAgIEFESlVTVCBDVVJTT1JcbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiBybGggLyAyLCBtYXhXaWR0aDogbWF4Y2ggfX0+XG4gICAgICAgICAge0tleVRpcCgnMicsIGNvbG9yKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPHN0eWxlIGdsb2JhbCBqc3g+e2BcbiAgICAgICAgQGZvbnQtZmFjZSB7XG4gICAgICAgICAgZm9udC1mYW1pbHk6ICdjdXN0b20nO1xuICAgICAgICAgIHNyYzogdXJsKCcvSUJNUGxleE1vbm8tUmVndWxhci53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcbiAgICAgICAgICAgIHVybCgnL0lCTVBsZXhNb25vLVJlZ3VsYXIud29mZicpIGZvcm1hdCgnd29mZicpO1xuICAgICAgICB9XG4gICAgICAgICoge1xuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIH1cbiAgICAgICAgaHRtbCB7XG4gICAgICAgICAgZm9udC1mYW1pbHk6IGN1c3RvbSwgbW9ub3NwYWNlO1xuICAgICAgICAgIGZvbnQtc2l6ZTogJHtmc31weDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogJHtsaH07XG4gICAgICAgIH1cbiAgICAgICAgYm9keSB7XG4gICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIH1cbiAgICAgICAgY2FudmFzIHtcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSG9tZTtcbiJdfQ== */\n/*@ sourceURL=/Users/grant.custer/Sites/constraint-systems/waterfalls/pages/index.js */")));
};

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ })

})
//# sourceMappingURL=index.js.acbb831d9cfb89223e25.hot-update.js.map