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

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])('move'),
      mode = _useState2[0],
      setMode = _useState2[1];

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
        lineNumber: 33
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
    setMode('adjust_flow');
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
        setMode('choose_flow');
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
      lineNumber: 446
    },
    __self: this
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_4___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 447
    },
    __self: this
  }, __jsx("title", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 448
    },
    __self: this
  }, "Waterfalls"), __jsx("link", {
    rel: "icon",
    href: "/favicon.ico",
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 449
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
      lineNumber: 451
    },
    __self: this
  }, __jsx("canvas", {
    ref: cref,
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 452
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
      lineNumber: 453
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
      lineNumber: 463
    },
    __self: this
  }), __jsx("div", {
    style: {
      position: 'fixed',
      outline: color === 'dark' ? 'solid 1px white' : 'solid 1px black',
      display: help ? 'block' : 'none',
      width: maxch,
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
      lineNumber: 472
    },
    __self: this
  }, mode === 'move' ? __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 492
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
      lineNumber: 493
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
      lineNumber: 497
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
      lineNumber: 499
    },
    __self: this
  }, KeyTip('h', color), " \u2190\xA0 ", KeyTip('j', color), " \u2193\xA0", ' ', KeyTip('k', color), " \u2191\xA0 ", KeyTip('l', color), " \u2192", __jsx("br", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 501
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
      lineNumber: 503
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
      lineNumber: 506
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
      lineNumber: 509
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
      lineNumber: 512
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
      lineNumber: 515
    },
    __self: this
  }, KeyTip('2', color))) : mode === 'choose_flow' ? __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 520
    },
    __self: this
  }, __jsx("div", {
    style: {
      marginBottom: rlh / 4,
      maxWidth: maxch
    },
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 521
    },
    __self: this
  }, "SELECT FLOW DIRECTION"), __jsx("div", {
    style: {
      marginBottom: rlh / 2,
      maxWidth: maxch
    },
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 524
    },
    __self: this
  }, KeyTip('a', color), " west\xA0 ", KeyTip('w', color), " north\xA0", ' ', KeyTip('s', color), " south\xA0 ", KeyTip('d', color), " east\xA0", ' ')) : __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 530
    },
    __self: this
  }, __jsx("div", {
    style: {
      marginBottom: rlh / 4,
      maxWidth: maxch
    },
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 531
    },
    __self: this
  }, "ADJUST FLOW"), __jsx("div", {
    style: {
      marginBottom: rlh / 2,
      maxWidth: maxch
    },
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 534
    },
    __self: this
  }, KeyTip('f', color), " flip direction", ' '))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a, {
    id: "632941774",
    dynamic: [fs, lh],
    __self: this
  }, "@font-face{font-family:'custom';src:url('/IBMPlexMono-Regular.woff2') format('woff2'), url('/IBMPlexMono-Regular.woff') format('woff');}*{box-sizing:border-box;}html{font-family:custom,monospace;font-size:".concat(fs, "px;line-height:").concat(lh, ";}body{margin:0;padding:0;}canvas{display:block;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ncmFudC5jdXN0ZXIvU2l0ZXMvY29uc3RyYWludC1zeXN0ZW1zL3dhdGVyZmFsbHMvcGFnZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNGhCeUIsQUFHZ0MsQUFLQyxBQUdRLEFBS3JCLEFBSUssU0FISixLQUlaLEtBSEEsRUFibUQsQ0FJbkQsT0FHMkMseUNBQ0EseUNBQzNDLGFBUkEiLCJmaWxlIjoiL1VzZXJzL2dyYW50LmN1c3Rlci9TaXRlcy9jb25zdHJhaW50LXN5c3RlbXMvd2F0ZXJmYWxscy9wYWdlcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZmxvd01vdmUgfSBmcm9tICcuLi9jb21wb25lbnRzL2Zsb3dzJztcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCc7XG5cbmxldCBjdXJzb3JfcGFkZGluZyA9IDEwO1xubGV0IG1hZ2VudGEgPSAncmdiYSgyNTUsMCwyNTUsMSknO1xubGV0IGdyZWVuID0gJ3JnYmEoMCwyNTUsMCwxKSc7XG5sZXQgZnMgPSAxNDtcbmxldCBsaCA9IDEuNTtcbmxldCBybGggPSBmcyAqIGxoO1xubGV0IG1heGNoID0gJzgwY2gnO1xubGV0IGNvbG9yID0gJ2xpZ2h0JztcblxuY29uc3QgSG9tZSA9ICgpID0+IHtcbiAgbGV0IGNyZWYgPSB1c2VSZWYobnVsbCk7XG4gIGxldCBzcmVmID0gdXNlUmVmKG51bGwpO1xuICBsZXQgdXJlZiA9IHVzZVJlZihudWxsKTtcbiAgbGV0IGtleW1hcCA9IHVzZVJlZih7fSk7XG4gIGxldCByZWFkcmVmID0gdXNlUmVmKG51bGwpO1xuICBsZXQgY3Vyc29ycmVmID0gdXNlUmVmKFswLCAwLCAyMCwgMjBdKTtcbiAgbGV0IHdhdGVycmVmID0gdXNlUmVmKFs0MDAsIDAsIDIwLCAxMDI0XSk7XG4gIGxldCBjb3VudGVyID0gdXNlUmVmKDApO1xuICBsZXQgaGFuZGxlcnJlZiA9IHVzZVJlZihudWxsKTtcbiAgbGV0IG1vZGVyID0gdXNlUmVmKCdtb3ZlJyk7XG4gIGxldCBmbG93X21hcmsgPSB1c2VSZWYobnVsbCk7XG4gIGxldCBmbG93cyA9IHVzZVJlZihbXSk7XG4gIGxldCBmbG93c192aXNpYmxlID0gdXNlUmVmKGZhbHNlKTtcbiAgbGV0IFtoZWxwLCBzZXRIZWxwXSA9IHVzZVN0YXRlKHRydWUpO1xuICBsZXQgW21vZGUsIHNldE1vZGVdID0gdXNlU3RhdGUoJ21vdmUnKTtcblxuICBmdW5jdGlvbiBLZXlUaXAobGV0dGVyLCBjb2xvcikge1xuICAgIHJldHVybiAoXG4gICAgICA8c3BhblxuICAgICAgICBjbGFzc05hbWU9XCJrZXl0aXBcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAga2V5bWFwci5jdXJyZW50W2xldHRlcl0gPSB0cnVlO1xuICAgICAgICAgIGtleUFjdGlvbihsZXR0ZXIsIGZhbHNlKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGtleW1hcHIuY3VycmVudFtsZXR0ZXJdID0gZmFsc2U7XG4gICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfX1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBvdXRsaW5lOiBjb2xvciA9PT0gJ2RhcmsnID8gJ3NvbGlkIDFweCB3aGl0ZScgOiAnc29saWQgMXB4IGJsYWNrJyxcbiAgICAgICAgICBwYWRkaW5nTGVmdDogJzAuNWNoJyxcbiAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICcwLjVjaCcsXG4gICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gICAgICAgICAgY3Vyc29yOiAnZGVmYXVsdCcsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtsZXR0ZXIgPT09ICcgJyA/ICdzcGFjZWJhcicgOiBsZXR0ZXJ9XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRJbWFnZUNhbnZhcyhpbWcpIHtcbiAgICBsZXQgYyA9IGNyZWYuY3VycmVudDtcbiAgICBjLndpZHRoID0gaW1nLndpZHRoO1xuICAgIGMuaGVpZ2h0ID0gaW1nLmhlaWdodDtcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBjLndpZHRoLCBjLmhlaWdodCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0U2NhbkNhbnZhcyhpbWcpIHtcbiAgICBsZXQgYyA9IHNyZWYuY3VycmVudDtcbiAgICBjLndpZHRoID0gaW1nLndpZHRoICsgY3Vyc29yX3BhZGRpbmcgKiAyO1xuICAgIGMuaGVpZ2h0ID0gaW1nLmhlaWdodCArIGN1cnNvcl9wYWRkaW5nICogMjtcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdEltYWdlKHNyYywgZmlyc3RfbG9hZCA9IGZhbHNlKSB7XG4gICAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIGN1cnNvcl9wYWRkaW5nICogMjtcbiAgICBsZXQgaCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIGN1cnNvcl9wYWRkaW5nICogMiAtIDEwIC0gZnMgKiBsaDtcblxuICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgbGV0IGl3ID0gaW1nLndpZHRoO1xuICAgICAgbGV0IGloID0gaW1nLmhlaWdodDtcblxuICAgICAgbGV0IHdhID0gdyAvIGg7XG4gICAgICBsZXQgaWEgPSBpdyAvIGloO1xuXG4gICAgICBsZXQgcmVzaXplX2NoZWNrID0gZmFsc2U7XG4gICAgICBsZXQgcncsIHJoO1xuICAgICAgaWYgKGlhID49IHdhKSB7XG4gICAgICAgIGlmIChpdyA+IHcpIHtcbiAgICAgICAgICByZXNpemVfY2hlY2sgPSB0cnVlO1xuICAgICAgICAgIHJ3ID0gdztcbiAgICAgICAgICByaCA9IHcgLyBpYTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGloID4gaCkge1xuICAgICAgICAgIHJlc2l6ZV9jaGVjayA9IHRydWU7XG4gICAgICAgICAgcmggPSBoO1xuICAgICAgICAgIHJ3ID0gaCAqIGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXNpemVfY2hlY2spIHtcbiAgICAgICAgbGV0IGNvbmZpcm1fY2hlY2sgPSB0cnVlO1xuICAgICAgICBpZiAoIWZpcnN0X2xvYWQpIHtcbiAgICAgICAgICBjb25maXJtX2NoZWNrID0gY29uZmlybShcbiAgICAgICAgICAgIGBUaGUgaW1hZ2UgeW91IHNlbGVjdGVkIGlzIGxhcmdlciAoJHtpd314JHtpaH0pIHRoYW4gdGhlIGJyb3dzZXIgd2luZG93LiAgUmVzaXplIGl0IHRvIGZpdCAoJHtyd314JHtyaH0pPyBDaG9vc2UgY2FuY2VsIHRvIGltcG9ydCBpdCBhdCBmdWxsIHNpemUuYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpcm1fY2hlY2spIHtcbiAgICAgICAgICBpbWcud2lkdGggPSBydztcbiAgICAgICAgICBpbWcuaGVpZ2h0ID0gcmg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaW5pdEltYWdlQ2FudmFzKGltZyk7XG4gICAgICBpbml0U2NhbkNhbnZhcyhpbWcpO1xuICAgICAgZHJhd0N1cnNvcigpO1xuXG4gICAgICBydW5GbG93KCk7XG4gICAgICBzZXRSZWFkKCk7XG4gICAgfTtcbiAgICBpbWcuc3JjID0gc3JjO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJhd1Bvc3NGbG93cygpIHtcbiAgICBsZXQgaW0gPSBjcmVmLmN1cnJlbnQ7XG4gICAgbGV0IGl3ID0gaW0ub2Zmc2V0V2lkdGg7XG4gICAgbGV0IGloID0gaW0ub2Zmc2V0SGVpZ2h0O1xuICAgIGxldCBjdXJzb3IgPSBjdXJzb3JyZWYuY3VycmVudDtcbiAgICBsZXQgd2VzdCA9IFswLCBjdXJzb3JbMV0sIGN1cnNvclswXSwgY3Vyc29yWzNdXTtcbiAgICBsZXQgZWFzdCA9IFtcbiAgICAgIGN1cnNvclswXSArIGN1cnNvclsyXSxcbiAgICAgIGN1cnNvclsxXSxcbiAgICAgIGl3IC0gKGN1cnNvclswXSArIGN1cnNvclsyXSksXG4gICAgICBjdXJzb3JbM10sXG4gICAgXTtcbiAgICBsZXQgbm9ydGggPSBbY3Vyc29yWzBdLCAwLCBjdXJzb3JbMl0sIGN1cnNvclsxXV07XG4gICAgbGV0IHNvdXRoID0gW1xuICAgICAgY3Vyc29yWzBdLFxuICAgICAgY3Vyc29yWzFdICsgY3Vyc29yWzNdLFxuICAgICAgY3Vyc29yWzJdLFxuICAgICAgaWggLSAoY3Vyc29yWzFdICsgY3Vyc29yWzNdKSxcbiAgICBdO1xuICAgIGxldCBkaXJzID0gW3dlc3QsIGVhc3QsIG5vcnRoLCBzb3V0aF07XG4gICAgbGV0IHBhZGRlZF9kaXJzID0gZGlycy5tYXAobiA9PlxuICAgICAgbi5tYXAoKHYsIGkpID0+IChpID09PSAwIHx8IGkgPT09IDEgPyB2ICsgY3Vyc29yX3BhZGRpbmcgOiB2KSlcbiAgICApO1xuICAgIGxldCBzdHggPSBzcmVmLmN1cnJlbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBzdHguZmlsbFN0eWxlID0gJ3JnYmEoMCwwLDAsMC4yKSc7XG4gICAgc3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoMCwwLDAsMC44KSc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWRkZWRfZGlycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGQgPSBwYWRkZWRfZGlyc1tpXTtcbiAgICAgIHN0eC5maWxsUmVjdCguLi5kKTtcbiAgICAgIHN0eC5zdHJva2VSZWN0KC4uLmQpO1xuICAgIH1cbiAgICBzdHguc3Ryb2tlU3R5bGUgPSAnd2hpdGUnO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlRmxvd1Zpc2liaWxpdHkoKSB7XG4gICAgY29uc29sZS5sb2coJ3RvZ2dsZSBpdCcpO1xuICAgIGNvbnNvbGUubG9nKGZsb3dzX3Zpc2libGUuY3VycmVudCk7XG4gICAgZmxvd3NfdmlzaWJsZS5jdXJyZW50ID0gIWZsb3dzX3Zpc2libGUuY3VycmVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdGbG93T3V0bGluZXMoKSB7XG4gICAgbGV0IHN0eCA9IHNyZWYuY3VycmVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHN0eC5zdHJva2VTdHlsZSA9ICcjYWFhJztcbiAgICBmb3IgKGxldCBmID0gMDsgZiA8IGZsb3dzLmN1cnJlbnQubGVuZ3RoOyBmKyspIHtcbiAgICAgIGxldCBmbG93ID0gZmxvd3MuY3VycmVudFtmXTtcbiAgICAgIHN0eC5zdHJva2VSZWN0KFxuICAgICAgICBmbG93WzBdICsgY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgIGZsb3dbMV0gKyBjdXJzb3JfcGFkZGluZyxcbiAgICAgICAgZmxvd1syXSxcbiAgICAgICAgZmxvd1szXVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3Q3Vyc29yKCkge1xuICAgIGxldCBzbSA9IHNyZWYuY3VycmVudDtcbiAgICBsZXQgc3cgPSBzbS5vZmZzZXRXaWR0aDtcbiAgICBsZXQgc2ggPSBzbS5vZmZzZXRIZWlnaHQ7XG5cbiAgICBsZXQgc3R4ID0gc3JlZi5jdXJyZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgbGV0IG1vZGUgPSBtb2Rlci5jdXJyZW50O1xuICAgIGlmIChtb2RlICE9PSAnYWRqdXN0X2Zsb3cnKSB7XG4gICAgICBsZXQgY3Vyc29yID0gY3Vyc29ycmVmLmN1cnJlbnQ7XG4gICAgICBzdHguc3Ryb2tlU3R5bGUgPSBtYWdlbnRhO1xuICAgICAgc3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICBzdHguc3Ryb2tlUmVjdChcbiAgICAgICAgY3Vyc29yWzBdICsgY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgIGN1cnNvclsxXSArIGN1cnNvcl9wYWRkaW5nLFxuICAgICAgICBjdXJzb3JbMl0sXG4gICAgICAgIGN1cnNvclszXVxuICAgICAgKTtcblxuICAgICAgaWYgKG1vZGUgPT09ICdhZGp1c3RfY3Vyc29yJykge1xuICAgICAgICBzdHguZmlsbFN0eWxlID0gbWFnZW50YTtcbiAgICAgICAgc3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBzdHguYXJjKFxuICAgICAgICAgIGN1cnNvclswXSArIGN1cnNvcl9wYWRkaW5nLFxuICAgICAgICAgIGN1cnNvclsxXSArIGN1cnNvcl9wYWRkaW5nLFxuICAgICAgICAgIDQsXG4gICAgICAgICAgMCxcbiAgICAgICAgICAyICogTWF0aC5QSVxuICAgICAgICApO1xuICAgICAgICBzdHguZmlsbCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNob29zZUZsb3coZGlyKSB7XG4gICAgbGV0IGltID0gY3JlZi5jdXJyZW50O1xuICAgIGxldCBpdyA9IGltLm9mZnNldFdpZHRoO1xuICAgIGxldCBpaCA9IGltLm9mZnNldEhlaWdodDtcblxuICAgIG1vZGVyLmN1cnJlbnQgPSAnYWRqdXN0X2Zsb3cnO1xuICAgIHNldE1vZGUoJ2FkanVzdF9mbG93Jyk7XG4gICAgbGV0IGN1cnNvciA9IGN1cnNvcnJlZi5jdXJyZW50O1xuICAgIGlmIChkaXIgPT09ICd3Jykge1xuICAgICAgZmxvd19tYXJrLmN1cnJlbnQgPSBbMCwgY3Vyc29yWzFdLCBjdXJzb3JbMF0gKyBjdXJzb3JbMl0sIGN1cnNvclszXSwgZGlyXTtcbiAgICB9IGVsc2UgaWYgKGRpciA9PT0gJ2UnKSB7XG4gICAgICBmbG93X21hcmsuY3VycmVudCA9IFtcbiAgICAgICAgY3Vyc29yWzBdLFxuICAgICAgICBjdXJzb3JbMV0sXG4gICAgICAgIGl3IC0gY3Vyc29yWzBdLFxuICAgICAgICBjdXJzb3JbM10sXG4gICAgICAgIGRpcixcbiAgICAgIF07XG4gICAgfSBlbHNlIGlmIChkaXIgPT09ICduJykge1xuICAgICAgZmxvd19tYXJrLmN1cnJlbnQgPSBbY3Vyc29yWzBdLCAwLCBjdXJzb3JbMl0sIGN1cnNvclsxXSArIGN1cnNvclszXSwgZGlyXTtcbiAgICB9IGVsc2UgaWYgKGRpciA9PT0gJ3MnKSB7XG4gICAgICBmbG93X21hcmsuY3VycmVudCA9IFtcbiAgICAgICAgY3Vyc29yWzBdLFxuICAgICAgICBjdXJzb3JbMV0sXG4gICAgICAgIGN1cnNvclsyXSxcbiAgICAgICAgaWggLSBjdXJzb3JbMV0sXG4gICAgICAgIGRpcixcbiAgICAgIF07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcnVuRmxvdygpIHtcbiAgICBsZXQgYyA9IGNyZWYuY3VycmVudDtcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGxldCBpdyA9IGMub2Zmc2V0V2lkdGg7XG4gICAgbGV0IGloID0gYy5vZmZzZXRIZWlnaHQ7XG4gICAgZm9yIChsZXQgZiA9IDA7IGYgPCBmbG93cy5jdXJyZW50Lmxlbmd0aDsgZisrKSB7XG4gICAgICBsZXQgZmxvdyA9IGZsb3dzLmN1cnJlbnRbZl07XG4gICAgICBsZXQgdCA9IGZsb3dNb3ZlKGZsb3csIGMpO1xuICAgICAgY3R4LmRyYXdJbWFnZSh0LCBmbG93WzBdLCBmbG93WzFdLCBmbG93WzJdLCBmbG93WzNdKTtcbiAgICB9XG4gICAgaGFuZGxlcnJlZi5jdXJyZW50ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJ1bkZsb3cpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnRGbG93KCkge1xuICAgIGZsb3dzLmN1cnJlbnQucHVzaChmbG93X21hcmsuY3VycmVudCk7XG4gICAgbW9kZXIuY3VycmVudCA9ICdtb3ZlJztcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFJlYWQoKSB7XG4gICAgbGV0IGltID0gY3JlZi5jdXJyZW50O1xuICAgIGxldCBpdyA9IGltLm9mZnNldFdpZHRoO1xuICAgIGxldCBpaCA9IGltLm9mZnNldEhlaWdodDtcbiAgICBsZXQgZm0gPSBmbG93X21hcmsuY3VycmVudDtcblxuICAgIGxldCBjdXJzb3IgPSBjdXJzb3JyZWYuY3VycmVudDtcbiAgICBsZXQgcmVhZCA9IHJlYWRyZWYuY3VycmVudDtcbiAgICBpZiAobW9kZXIuY3VycmVudCA9PT0gJ2FkanVzdF9mbG93Jykge1xuICAgICAgcmVhZC5pbm5lckhUTUwgPSBgJHtmbVswXX0sJHtmbVsxXX0gJHtmbVsyXX14JHtcbiAgICAgICAgZm1bM11cbiAgICAgIH0gJHtmbVs0XS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlYWQuaW5uZXJIVE1MID0gYCR7aXd9eCR7aWh9ICAke2N1cnNvclswXX0sJHtjdXJzb3JbMV19ICR7Y3Vyc29yWzJdfXgke1xuICAgICAgICBjdXJzb3JbM11cbiAgICAgIH1gO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGtleUFjdGlvbihrZXksIHJlcGVhdCkge1xuICAgIGxldCBpbSA9IGNyZWYuY3VycmVudDtcbiAgICBsZXQgaXcgPSBpbS5vZmZzZXRXaWR0aDtcbiAgICBsZXQgaWggPSBpbS5vZmZzZXRIZWlnaHQ7XG5cbiAgICBsZXQgbSA9IGtleW1hcC5jdXJyZW50O1xuICAgIGxldCBjdXJzb3IgPSBjdXJzb3JyZWYuY3VycmVudDtcbiAgICBsZXQgbW9kZSA9IG1vZGVyLmN1cnJlbnQ7XG5cbiAgICBpZiAoa2V5ID09PSAnICcpIHtcbiAgICAgIGlmIChoYW5kbGVycmVmLmN1cnJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoaGFuZGxlcnJlZi5jdXJyZW50KTtcbiAgICAgICAgaGFuZGxlcnJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJ1bkZsb3coKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoa2V5ID09PSAndicpIHtcbiAgICAgIHRvZ2dsZUZsb3dWaXNpYmlsaXR5KCk7XG4gICAgfVxuXG4gICAgaWYgKG1vZGVyLmN1cnJlbnQgPT09ICdtb3ZlJykge1xuICAgICAgbGV0IGluYyA9IDE7XG4gICAgICBpZiAobVsnc2hpZnQnXSkgaW5jID0gMTA7XG5cbiAgICAgIGlmIChtWydqJ10pIGN1cnNvclsxXSArPSBpbmM7XG4gICAgICBpZiAobVsnayddKSBjdXJzb3JbMV0gLT0gaW5jO1xuICAgICAgaWYgKG1bJ2gnXSkgY3Vyc29yWzBdIC09IGluYztcbiAgICAgIGlmIChtWydsJ10pIGN1cnNvclswXSArPSBpbmM7XG5cbiAgICAgIGlmIChjdXJzb3JbMF0gPCAwKSBjdXJzb3JbMF0gPSAwO1xuICAgICAgaWYgKGN1cnNvclswXSArIGN1cnNvclsyXSA+IGl3KSBjdXJzb3JbMF0gPSBpdyAtIGN1cnNvclsyXTtcbiAgICAgIGlmIChjdXJzb3JbMV0gPCAwKSBjdXJzb3JbMV0gPSAwO1xuICAgICAgaWYgKGN1cnNvclsxXSArIGN1cnNvclszXSA+IGloKSBjdXJzb3JbMV0gPSBpaCAtIGN1cnNvclszXTtcblxuICAgICAgaWYgKGtleSA9PT0gJzInKSB7XG4gICAgICAgIG1vZGVyLmN1cnJlbnQgPSAnYWRqdXN0X2N1cnNvcic7XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnZW50ZXInKSB7XG4gICAgICAgIG1vZGVyLmN1cnJlbnQgPSAnY2hvb3NlX2Zsb3cnO1xuICAgICAgICBzZXRNb2RlKCdjaG9vc2VfZmxvdycpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZXIuY3VycmVudCA9PT0gJ2FkanVzdF9jdXJzb3InKSB7XG4gICAgICBsZXQgaW5jID0gMTtcbiAgICAgIGlmIChtWydzaGlmdCddKSBpbmMgPSAxMDtcblxuICAgICAgaWYgKG1bJ2onXSkgY3Vyc29yWzNdICs9IGluYztcbiAgICAgIGlmIChtWydrJ10pIGN1cnNvclszXSAtPSBpbmM7XG4gICAgICBpZiAobVsnaCddKSBjdXJzb3JbMl0gLT0gaW5jO1xuICAgICAgaWYgKG1bJ2wnXSkgY3Vyc29yWzJdICs9IGluYztcblxuICAgICAgaWYgKGN1cnNvclswXSArIGN1cnNvclsyXSA+IGl3KSBjdXJzb3JbMl0gPSBpdyAtIGN1cnNvclswXTtcbiAgICAgIGlmIChjdXJzb3JbMV0gKyBjdXJzb3JbM10gPiBpaCkgY3Vyc29yWzNdID0gaWggLSBjdXJzb3JbMV07XG5cbiAgICAgIGlmIChrZXkgPT09ICdlbnRlcicpIHtcbiAgICAgICAgbW9kZXIuY3VycmVudCA9ICdtb3ZlJztcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdlc2NhcGUnKSB7XG4gICAgICAgIG1vZGVyLmN1cnJlbnQgPSAnbW92ZSc7XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnMScpIHtcbiAgICAgICAgbW9kZXIuY3VycmVudCA9ICdtb3ZlJztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1vZGVyLmN1cnJlbnQgPT09ICdjaG9vc2VfZmxvdycpIHtcbiAgICAgIGlmIChrZXkgPT09ICdhJykge1xuICAgICAgICBjaG9vc2VGbG93KCd3Jyk7XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ3cnKSB7XG4gICAgICAgIGNob29zZUZsb3coJ24nKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAncycpIHtcbiAgICAgICAgY2hvb3NlRmxvdygncycpO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdkJykge1xuICAgICAgICBjaG9vc2VGbG93KCdlJyk7XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnZXNjYXBlJykge1xuICAgICAgICBtb2Rlci5jdXJyZW50ID0gJ21vdmUnO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZXIuY3VycmVudCA9PT0gJ2FkanVzdF9mbG93Jykge1xuICAgICAgbGV0IGZtID0gZmxvd19tYXJrLmN1cnJlbnQ7XG4gICAgICBpZiAoa2V5ID09PSAnZXNjYXBlJykge1xuICAgICAgICBtb2Rlci5jdXJyZW50ID0gJ2Nob29zZV9mbG93JztcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnZW50ZXInKSB7XG4gICAgICAgIHN0YXJ0RmxvdygpO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdmJykge1xuICAgICAgICBpZiAoZm1bNF0gPT09ICd3Jykge1xuICAgICAgICAgIGZtWzRdID0gJ2UnO1xuICAgICAgICB9IGVsc2UgaWYgKGZtWzRdID09PSAnZScpIHtcbiAgICAgICAgICBmbVs0XSA9ICd3JztcbiAgICAgICAgfSBlbHNlIGlmIChmbVs0XSA9PT0gJ24nKSB7XG4gICAgICAgICAgZm1bNF0gPSAncyc7XG4gICAgICAgIH0gZWxzZSBpZiAoZm1bNF0gPT09ICdzJykge1xuICAgICAgICAgIGZtWzRdID0gJ24nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBzbSA9IHNyZWYuY3VycmVudDtcbiAgICBsZXQgc3cgPSBzbS5vZmZzZXRXaWR0aDtcbiAgICBsZXQgc2ggPSBzbS5vZmZzZXRIZWlnaHQ7XG4gICAgbGV0IHN0eCA9IHNyZWYuY3VycmVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHN0eC5jbGVhclJlY3QoMCwgMCwgc3csIHNoKTtcbiAgICBpZiAoZmxvd3NfdmlzaWJsZS5jdXJyZW50KSB7XG4gICAgICBkcmF3Rmxvd091dGxpbmVzKCk7XG4gICAgfVxuICAgIGlmIChtb2Rlci5jdXJyZW50ID09PSAnY2hvb3NlX2Zsb3cnKSB7XG4gICAgICBkcmF3UG9zc0Zsb3dzKCk7XG4gICAgfSBlbHNlIGlmIChtb2Rlci5jdXJyZW50ID09PSAnYWRqdXN0X2Zsb3cnKSB7XG4gICAgICBzdHguc3Ryb2tlU3R5bGUgPSBncmVlbjtcbiAgICAgIGxldCBmbSA9IGZsb3dfbWFyay5jdXJyZW50O1xuICAgICAgc3R4LnN0cm9rZVJlY3QoXG4gICAgICAgIGZtWzBdICsgY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgIGZtWzFdICsgY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgIGZtWzJdLFxuICAgICAgICBmbVszXVxuICAgICAgKTtcbiAgICAgIHN0eC5maWxsU3R5bGUgPSBncmVlbjtcbiAgICAgIHN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGxldCB4YTtcbiAgICAgIGxldCB5YTtcbiAgICAgIGlmIChmbVs0XSA9PT0gJ2UnKSB7XG4gICAgICAgIHhhID0gZm1bMF07XG4gICAgICAgIHlhID0gZm1bMV0gKyBmbVszXSAvIDI7XG4gICAgICB9IGVsc2UgaWYgKGZtWzRdID09PSAncycpIHtcbiAgICAgICAgeGEgPSBmbVswXSArIGZtWzJdIC8gMjtcbiAgICAgICAgeWEgPSBmbVsxXTtcbiAgICAgIH0gZWxzZSBpZiAoZm1bNF0gPT09ICd3Jykge1xuICAgICAgICB4YSA9IGZtWzBdICsgZm1bMl07XG4gICAgICAgIHlhID0gZm1bMV0gKyBmbVszXSAvIDI7XG4gICAgICB9IGVsc2UgaWYgKGZtWzRdID09PSAnbicpIHtcbiAgICAgICAgeGEgPSBmbVswXSArIGZtWzJdIC8gMjtcbiAgICAgICAgeWEgPSBmbVsxXSArIGZtWzNdO1xuICAgICAgfVxuICAgICAgc3R4LmFyYyh4YSArIGN1cnNvcl9wYWRkaW5nLCB5YSArIGN1cnNvcl9wYWRkaW5nLCA0LCAwLCAyICogTWF0aC5QSSk7XG4gICAgICBzdHguZmlsbCgpO1xuICAgIH1cbiAgICBkcmF3Q3Vyc29yKCk7XG5cbiAgICBzZXRSZWFkKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkb3duSGFuZGxlcihlKSB7XG4gICAga2V5bWFwLmN1cnJlbnRbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgIGtleUFjdGlvbihlLmtleS50b0xvd2VyQ2FzZSgpLCBlLnJlcGVhdCk7XG4gIH1cblxuICBmdW5jdGlvbiB1cEhhbmRsZXIoZSkge1xuICAgIGtleW1hcC5jdXJyZW50W2Uua2V5LnRvTG93ZXJDYXNlKCldID0gZmFsc2U7XG4gIH1cblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZG93bkhhbmRsZXIpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVwSGFuZGxlcik7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZG93bkhhbmRsZXIpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBIYW5kbGVyKTtcbiAgICAgIGlmIChoYW5kbGVycmVmLmN1cnJlbnQgIT09IG51bGwpIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGhhbmRsZXJyZWYuY3VycmVudCk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gaW5pdEltYWdlKCcvaGVyb2VzLmpwZycpO1xuICAgIGluaXRJbWFnZSgnL3l5eS5qcGcnLCB0cnVlKTtcbiAgICAvLyBpbml0SW1hZ2UoJy9tZXN0cmlwLnBuZycpO1xuICAgIC8vIGluaXRJbWFnZSgnL3NjcnVnZ3MuanBnJyk7XG4gICAgLy8gaW5pdEltYWdlKCcvZmthLmpwZycpO1xuICAgIC8vIGluaXRJbWFnZSgnL2dyYW50LnBuZycpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDx0aXRsZT5XYXRlcmZhbGxzPC90aXRsZT5cbiAgICAgICAgPGxpbmsgcmVsPVwiaWNvblwiIGhyZWY9XCIvZmF2aWNvbi5pY29cIiAvPlxuICAgICAgPC9IZWFkPlxuICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJywgcGFkZGluZzogY3Vyc29yX3BhZGRpbmcgfX0+XG4gICAgICAgIDxjYW52YXMgcmVmPXtjcmVmfSAvPlxuICAgICAgICA8Y2FudmFzXG4gICAgICAgICAgcmVmPXtzcmVmfVxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIG1hcmdpbkxlZnQ6IGN1cnNvcl9wYWRkaW5nLFxuICAgICAgICAgIG1hcmdpbkJvdHRvbTogY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgICAgd2hpdGVTcGFjZTogJ3ByZS13cmFwJyxcbiAgICAgICAgfX1cbiAgICAgICAgcmVmPXtyZWFkcmVmfVxuICAgICAgLz5cblxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJoZWxwXCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgICBvdXRsaW5lOiBjb2xvciA9PT0gJ2RhcmsnID8gJ3NvbGlkIDFweCB3aGl0ZScgOiAnc29saWQgMXB4IGJsYWNrJyxcbiAgICAgICAgICBkaXNwbGF5OiBoZWxwID8gJ2Jsb2NrJyA6ICdub25lJyxcbiAgICAgICAgICB3aWR0aDogbWF4Y2gsXG4gICAgICAgICAgbWF4V2lkdGg6IGBjYWxjKDEwMCUgLSA0Y2gpYCxcbiAgICAgICAgICBiYWNrZ3JvdW5kOlxuICAgICAgICAgICAgY29sb3IgPT09ICdkYXJrJyA/ICdyZ2JhKDAsMCwwLDAuOCknIDogJ3JnYmEoMjU1LDI1NSwyNTUsMC44KScsXG4gICAgICAgICAgcGFkZGluZ0xlZnQ6ICcyY2gnLFxuICAgICAgICAgIHBhZGRpbmdSaWdodDogJzJjaCcsXG4gICAgICAgICAgcGFkZGluZ0JvdHRvbTogcmxoIC8gMixcbiAgICAgICAgICBwYWRkaW5nVG9wOiBybGggLyAyLFxuICAgICAgICAgIHJpZ2h0OiAnMmNoJyxcbiAgICAgICAgICBib3R0b206IHJsaCxcbiAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge21vZGUgPT09ICdtb3ZlJyA/IChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IHJsaCAvIDIsIG1heFdpZHRoOiBtYXhjaCB9fT5cbiAgICAgICAgICAgICAgRWRpdCBhbiBpbWFnZSB1c2luZyBrZXlib2FyZC1jb250cm9sbGVkIHBpeGVsIGZsb3dzLlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiBybGggLyA0LCBtYXhXaWR0aDogbWF4Y2ggfX0+TU9WRTwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogcmxoIC8gMiwgbWF4V2lkdGg6IG1heGNoIH19PlxuICAgICAgICAgICAgICB7S2V5VGlwKCdoJywgY29sb3IpfSDihpAmbmJzcDsge0tleVRpcCgnaicsIGNvbG9yKX0g4oaTJm5ic3A7eycgJ31cbiAgICAgICAgICAgICAge0tleVRpcCgnaycsIGNvbG9yKX0g4oaRJm5ic3A7IHtLZXlUaXAoJ2wnLCBjb2xvcil9IOKGkjxiciAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogcmxoIC8gMiwgbWF4V2lkdGg6IG1heGNoIH19PlxuICAgICAgICAgICAgICBob2xkIHtLZXlUaXAoJ3NoaWZ0JywgY29sb3IpfSB0byBtb3ZlIGJ5IDEwXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiBybGggLyA0LCBtYXhXaWR0aDogbWF4Y2ggfX0+XG4gICAgICAgICAgICAgIFNFTEVDVCBGTE9XXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiBybGggLyAyLCBtYXhXaWR0aDogbWF4Y2ggfX0+XG4gICAgICAgICAgICAgIHtLZXlUaXAoJ2VudGVyJywgY29sb3IpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogcmxoIC8gNCwgbWF4V2lkdGg6IG1heGNoIH19PlxuICAgICAgICAgICAgICBBREpVU1QgQ1VSU09SXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiBybGggLyAyLCBtYXhXaWR0aDogbWF4Y2ggfX0+XG4gICAgICAgICAgICAgIHtLZXlUaXAoJzInLCBjb2xvcil9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IG1vZGUgPT09ICdjaG9vc2VfZmxvdycgPyAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiBybGggLyA0LCBtYXhXaWR0aDogbWF4Y2ggfX0+XG4gICAgICAgICAgICAgIFNFTEVDVCBGTE9XIERJUkVDVElPTlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogcmxoIC8gMiwgbWF4V2lkdGg6IG1heGNoIH19PlxuICAgICAgICAgICAgICB7S2V5VGlwKCdhJywgY29sb3IpfSB3ZXN0Jm5ic3A7IHtLZXlUaXAoJ3cnLCBjb2xvcil9IG5vcnRoJm5ic3A7eycgJ31cbiAgICAgICAgICAgICAge0tleVRpcCgncycsIGNvbG9yKX0gc291dGgmbmJzcDsge0tleVRpcCgnZCcsIGNvbG9yKX0gZWFzdCZuYnNwO3snICd9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IHJsaCAvIDQsIG1heFdpZHRoOiBtYXhjaCB9fT5cbiAgICAgICAgICAgICAgQURKVVNUIEZMT1dcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Cb3R0b206IHJsaCAvIDIsIG1heFdpZHRoOiBtYXhjaCB9fT5cbiAgICAgICAgICAgICAge0tleVRpcCgnZicsIGNvbG9yKX0gZmxpcCBkaXJlY3Rpb257JyAnfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cblxuICAgICAgPHN0eWxlIGdsb2JhbCBqc3g+e2BcbiAgICAgICAgQGZvbnQtZmFjZSB7XG4gICAgICAgICAgZm9udC1mYW1pbHk6ICdjdXN0b20nO1xuICAgICAgICAgIHNyYzogdXJsKCcvSUJNUGxleE1vbm8tUmVndWxhci53b2ZmMicpIGZvcm1hdCgnd29mZjInKSxcbiAgICAgICAgICAgIHVybCgnL0lCTVBsZXhNb25vLVJlZ3VsYXIud29mZicpIGZvcm1hdCgnd29mZicpO1xuICAgICAgICB9XG4gICAgICAgICoge1xuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIH1cbiAgICAgICAgaHRtbCB7XG4gICAgICAgICAgZm9udC1mYW1pbHk6IGN1c3RvbSwgbW9ub3NwYWNlO1xuICAgICAgICAgIGZvbnQtc2l6ZTogJHtmc31weDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogJHtsaH07XG4gICAgICAgIH1cbiAgICAgICAgYm9keSB7XG4gICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgIH1cbiAgICAgICAgY2FudmFzIHtcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSG9tZTtcbiJdfQ== */\n/*@ sourceURL=/Users/grant.custer/Sites/constraint-systems/waterfalls/pages/index.js */")));
};

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ })

})
//# sourceMappingURL=index.js.7ddb2c453e694d4bffb6.hot-update.js.map