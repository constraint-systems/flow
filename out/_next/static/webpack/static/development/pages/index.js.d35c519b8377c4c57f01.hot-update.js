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
/* harmony import */ var _components_info__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/info */ "./components/info.js");

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
        lineNumber: 34
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
    setMode('move');
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

    if (key === 'c') {
      var check_clear = confirm('Clear all flows?');
      if (check_clear) flows.current = [];
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
        setMode('adjust_cursor');
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
      if (cursor[2] < 1) cursor[2] = 1;
      if (cursor[3] < 1) cursor[3] = 1;

      if (key === 'enter') {
        moder.current = 'move';
        setMode('move');
      }

      if (key === 'escape') {
        moder.current = 'move';
        setMode('move');
      }

      if (key === '1') {
        moder.current = 'move';
        setMode('move');
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
        setMode('move');
      }
    } else if (moder.current === 'adjust_flow') {
      var fm = flow_mark.current;

      if (key === 'escape') {
        moder.current = 'choose_flow';
        setMode('choose_flow');
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
      lineNumber: 461
    },
    __self: this
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_4___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 462
    },
    __self: this
  }, __jsx("title", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 463
    },
    __self: this
  }, "Waterfalls"), __jsx("link", {
    rel: "icon",
    href: "/favicon.ico",
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 464
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
      lineNumber: 466
    },
    __self: this
  }, __jsx("canvas", {
    ref: cref,
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 467
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
      lineNumber: 468
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
      lineNumber: 478
    },
    __self: this
  }), __jsx(_components_info__WEBPACK_IMPORTED_MODULE_5__["default"], {
    rlh: rlh,
    mode: mode,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 486
    },
    __self: this
  }), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a, {
    id: "632941774",
    dynamic: [fs, lh],
    __self: this
  }, "@font-face{font-family:'custom';src:url('/IBMPlexMono-Regular.woff2') format('woff2'), url('/IBMPlexMono-Regular.woff') format('woff');}*{box-sizing:border-box;}html{font-family:custom,monospace;font-size:".concat(fs, "px;line-height:").concat(lh, ";}body{margin:0;padding:0;}canvas{display:block;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ncmFudC5jdXN0ZXIvU2l0ZXMvY29uc3RyYWludC1zeXN0ZW1zL3dhdGVyZmFsbHMvcGFnZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdWV5QixBQUdnQyxBQUtDLEFBR1EsQUFLckIsQUFJSyxTQUhKLEtBSVosS0FIQSxFQWJtRCxDQUluRCxPQUcyQyx5Q0FDQSx5Q0FDM0MsYUFSQSIsImZpbGUiOiIvVXNlcnMvZ3JhbnQuY3VzdGVyL1NpdGVzL2NvbnN0cmFpbnQtc3lzdGVtcy93YXRlcmZhbGxzL3BhZ2VzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBmbG93TW92ZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvZmxvd3MnO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcbmltcG9ydCBJbmZvIGZyb20gJy4uL2NvbXBvbmVudHMvaW5mbyc7XG5cbmxldCBjdXJzb3JfcGFkZGluZyA9IDEwO1xubGV0IG1hZ2VudGEgPSAncmdiYSgyNTUsMCwyNTUsMSknO1xubGV0IGdyZWVuID0gJ3JnYmEoMCwyNTUsMCwxKSc7XG5sZXQgZnMgPSAxNDtcbmxldCBsaCA9IDEuNTtcbmxldCBybGggPSBmcyAqIGxoO1xubGV0IG1heGNoID0gJzgwY2gnO1xubGV0IGNvbG9yID0gJ2xpZ2h0JztcblxuY29uc3QgSG9tZSA9ICgpID0+IHtcbiAgbGV0IGNyZWYgPSB1c2VSZWYobnVsbCk7XG4gIGxldCBzcmVmID0gdXNlUmVmKG51bGwpO1xuICBsZXQgdXJlZiA9IHVzZVJlZihudWxsKTtcbiAgbGV0IGtleW1hcCA9IHVzZVJlZih7fSk7XG4gIGxldCByZWFkcmVmID0gdXNlUmVmKG51bGwpO1xuICBsZXQgY3Vyc29ycmVmID0gdXNlUmVmKFswLCAwLCAyMCwgMjBdKTtcbiAgbGV0IHdhdGVycmVmID0gdXNlUmVmKFs0MDAsIDAsIDIwLCAxMDI0XSk7XG4gIGxldCBjb3VudGVyID0gdXNlUmVmKDApO1xuICBsZXQgaGFuZGxlcnJlZiA9IHVzZVJlZihudWxsKTtcbiAgbGV0IG1vZGVyID0gdXNlUmVmKCdtb3ZlJyk7XG4gIGxldCBmbG93X21hcmsgPSB1c2VSZWYobnVsbCk7XG4gIGxldCBmbG93cyA9IHVzZVJlZihbXSk7XG4gIGxldCBmbG93c192aXNpYmxlID0gdXNlUmVmKGZhbHNlKTtcbiAgbGV0IFtoZWxwLCBzZXRIZWxwXSA9IHVzZVN0YXRlKHRydWUpO1xuICBsZXQgW21vZGUsIHNldE1vZGVdID0gdXNlU3RhdGUoJ21vdmUnKTtcblxuICBmdW5jdGlvbiBLZXlUaXAobGV0dGVyLCBjb2xvcikge1xuICAgIHJldHVybiAoXG4gICAgICA8c3BhblxuICAgICAgICBjbGFzc05hbWU9XCJrZXl0aXBcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAga2V5bWFwci5jdXJyZW50W2xldHRlcl0gPSB0cnVlO1xuICAgICAgICAgIGtleUFjdGlvbihsZXR0ZXIsIGZhbHNlKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGtleW1hcHIuY3VycmVudFtsZXR0ZXJdID0gZmFsc2U7XG4gICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfX1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBvdXRsaW5lOiBjb2xvciA9PT0gJ2RhcmsnID8gJ3NvbGlkIDFweCB3aGl0ZScgOiAnc29saWQgMXB4IGJsYWNrJyxcbiAgICAgICAgICBwYWRkaW5nTGVmdDogJzAuNWNoJyxcbiAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICcwLjVjaCcsXG4gICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gICAgICAgICAgY3Vyc29yOiAnZGVmYXVsdCcsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtsZXR0ZXIgPT09ICcgJyA/ICdzcGFjZWJhcicgOiBsZXR0ZXJ9XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRJbWFnZUNhbnZhcyhpbWcpIHtcbiAgICBsZXQgYyA9IGNyZWYuY3VycmVudDtcbiAgICBjLndpZHRoID0gaW1nLndpZHRoO1xuICAgIGMuaGVpZ2h0ID0gaW1nLmhlaWdodDtcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBjLndpZHRoLCBjLmhlaWdodCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0U2NhbkNhbnZhcyhpbWcpIHtcbiAgICBsZXQgYyA9IHNyZWYuY3VycmVudDtcbiAgICBjLndpZHRoID0gaW1nLndpZHRoICsgY3Vyc29yX3BhZGRpbmcgKiAyO1xuICAgIGMuaGVpZ2h0ID0gaW1nLmhlaWdodCArIGN1cnNvcl9wYWRkaW5nICogMjtcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdEltYWdlKHNyYywgZmlyc3RfbG9hZCA9IGZhbHNlKSB7XG4gICAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIGN1cnNvcl9wYWRkaW5nICogMjtcbiAgICBsZXQgaCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIGN1cnNvcl9wYWRkaW5nICogMiAtIDEwIC0gZnMgKiBsaDtcblxuICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgbGV0IGl3ID0gaW1nLndpZHRoO1xuICAgICAgbGV0IGloID0gaW1nLmhlaWdodDtcblxuICAgICAgbGV0IHdhID0gdyAvIGg7XG4gICAgICBsZXQgaWEgPSBpdyAvIGloO1xuXG4gICAgICBsZXQgcmVzaXplX2NoZWNrID0gZmFsc2U7XG4gICAgICBsZXQgcncsIHJoO1xuICAgICAgaWYgKGlhID49IHdhKSB7XG4gICAgICAgIGlmIChpdyA+IHcpIHtcbiAgICAgICAgICByZXNpemVfY2hlY2sgPSB0cnVlO1xuICAgICAgICAgIHJ3ID0gdztcbiAgICAgICAgICByaCA9IHcgLyBpYTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGloID4gaCkge1xuICAgICAgICAgIHJlc2l6ZV9jaGVjayA9IHRydWU7XG4gICAgICAgICAgcmggPSBoO1xuICAgICAgICAgIHJ3ID0gaCAqIGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXNpemVfY2hlY2spIHtcbiAgICAgICAgbGV0IGNvbmZpcm1fY2hlY2sgPSB0cnVlO1xuICAgICAgICBpZiAoIWZpcnN0X2xvYWQpIHtcbiAgICAgICAgICBjb25maXJtX2NoZWNrID0gY29uZmlybShcbiAgICAgICAgICAgIGBUaGUgaW1hZ2UgeW91IHNlbGVjdGVkIGlzIGxhcmdlciAoJHtpd314JHtpaH0pIHRoYW4gdGhlIGJyb3dzZXIgd2luZG93LiAgUmVzaXplIGl0IHRvIGZpdCAoJHtyd314JHtyaH0pPyBDaG9vc2UgY2FuY2VsIHRvIGltcG9ydCBpdCBhdCBmdWxsIHNpemUuYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpcm1fY2hlY2spIHtcbiAgICAgICAgICBpbWcud2lkdGggPSBydztcbiAgICAgICAgICBpbWcuaGVpZ2h0ID0gcmg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaW5pdEltYWdlQ2FudmFzKGltZyk7XG4gICAgICBpbml0U2NhbkNhbnZhcyhpbWcpO1xuICAgICAgZHJhd0N1cnNvcigpO1xuXG4gICAgICBydW5GbG93KCk7XG4gICAgICBzZXRSZWFkKCk7XG4gICAgfTtcbiAgICBpbWcuc3JjID0gc3JjO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJhd1Bvc3NGbG93cygpIHtcbiAgICBsZXQgaW0gPSBjcmVmLmN1cnJlbnQ7XG4gICAgbGV0IGl3ID0gaW0ub2Zmc2V0V2lkdGg7XG4gICAgbGV0IGloID0gaW0ub2Zmc2V0SGVpZ2h0O1xuICAgIGxldCBjdXJzb3IgPSBjdXJzb3JyZWYuY3VycmVudDtcbiAgICBsZXQgd2VzdCA9IFswLCBjdXJzb3JbMV0sIGN1cnNvclswXSwgY3Vyc29yWzNdXTtcbiAgICBsZXQgZWFzdCA9IFtcbiAgICAgIGN1cnNvclswXSArIGN1cnNvclsyXSxcbiAgICAgIGN1cnNvclsxXSxcbiAgICAgIGl3IC0gKGN1cnNvclswXSArIGN1cnNvclsyXSksXG4gICAgICBjdXJzb3JbM10sXG4gICAgXTtcbiAgICBsZXQgbm9ydGggPSBbY3Vyc29yWzBdLCAwLCBjdXJzb3JbMl0sIGN1cnNvclsxXV07XG4gICAgbGV0IHNvdXRoID0gW1xuICAgICAgY3Vyc29yWzBdLFxuICAgICAgY3Vyc29yWzFdICsgY3Vyc29yWzNdLFxuICAgICAgY3Vyc29yWzJdLFxuICAgICAgaWggLSAoY3Vyc29yWzFdICsgY3Vyc29yWzNdKSxcbiAgICBdO1xuICAgIGxldCBkaXJzID0gW3dlc3QsIGVhc3QsIG5vcnRoLCBzb3V0aF07XG4gICAgbGV0IHBhZGRlZF9kaXJzID0gZGlycy5tYXAobiA9PlxuICAgICAgbi5tYXAoKHYsIGkpID0+IChpID09PSAwIHx8IGkgPT09IDEgPyB2ICsgY3Vyc29yX3BhZGRpbmcgOiB2KSlcbiAgICApO1xuICAgIGxldCBzdHggPSBzcmVmLmN1cnJlbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBzdHguZmlsbFN0eWxlID0gJ3JnYmEoMCwwLDAsMC4yKSc7XG4gICAgc3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoMCwwLDAsMC44KSc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWRkZWRfZGlycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGQgPSBwYWRkZWRfZGlyc1tpXTtcbiAgICAgIHN0eC5maWxsUmVjdCguLi5kKTtcbiAgICAgIHN0eC5zdHJva2VSZWN0KC4uLmQpO1xuICAgIH1cbiAgICBzdHguc3Ryb2tlU3R5bGUgPSAnd2hpdGUnO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlRmxvd1Zpc2liaWxpdHkoKSB7XG4gICAgY29uc29sZS5sb2coJ3RvZ2dsZSBpdCcpO1xuICAgIGNvbnNvbGUubG9nKGZsb3dzX3Zpc2libGUuY3VycmVudCk7XG4gICAgZmxvd3NfdmlzaWJsZS5jdXJyZW50ID0gIWZsb3dzX3Zpc2libGUuY3VycmVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdGbG93T3V0bGluZXMoKSB7XG4gICAgbGV0IHN0eCA9IHNyZWYuY3VycmVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHN0eC5zdHJva2VTdHlsZSA9ICcjYWFhJztcbiAgICBmb3IgKGxldCBmID0gMDsgZiA8IGZsb3dzLmN1cnJlbnQubGVuZ3RoOyBmKyspIHtcbiAgICAgIGxldCBmbG93ID0gZmxvd3MuY3VycmVudFtmXTtcbiAgICAgIHN0eC5zdHJva2VSZWN0KFxuICAgICAgICBmbG93WzBdICsgY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgIGZsb3dbMV0gKyBjdXJzb3JfcGFkZGluZyxcbiAgICAgICAgZmxvd1syXSxcbiAgICAgICAgZmxvd1szXVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3Q3Vyc29yKCkge1xuICAgIGxldCBzbSA9IHNyZWYuY3VycmVudDtcbiAgICBsZXQgc3cgPSBzbS5vZmZzZXRXaWR0aDtcbiAgICBsZXQgc2ggPSBzbS5vZmZzZXRIZWlnaHQ7XG5cbiAgICBsZXQgc3R4ID0gc3JlZi5jdXJyZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgbGV0IG1vZGUgPSBtb2Rlci5jdXJyZW50O1xuICAgIGlmIChtb2RlICE9PSAnYWRqdXN0X2Zsb3cnKSB7XG4gICAgICBsZXQgY3Vyc29yID0gY3Vyc29ycmVmLmN1cnJlbnQ7XG4gICAgICBzdHguc3Ryb2tlU3R5bGUgPSBtYWdlbnRhO1xuICAgICAgc3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICBzdHguc3Ryb2tlUmVjdChcbiAgICAgICAgY3Vyc29yWzBdICsgY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgIGN1cnNvclsxXSArIGN1cnNvcl9wYWRkaW5nLFxuICAgICAgICBjdXJzb3JbMl0sXG4gICAgICAgIGN1cnNvclszXVxuICAgICAgKTtcblxuICAgICAgaWYgKG1vZGUgPT09ICdhZGp1c3RfY3Vyc29yJykge1xuICAgICAgICBzdHguZmlsbFN0eWxlID0gbWFnZW50YTtcbiAgICAgICAgc3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBzdHguYXJjKFxuICAgICAgICAgIGN1cnNvclswXSArIGN1cnNvcl9wYWRkaW5nLFxuICAgICAgICAgIGN1cnNvclsxXSArIGN1cnNvcl9wYWRkaW5nLFxuICAgICAgICAgIDQsXG4gICAgICAgICAgMCxcbiAgICAgICAgICAyICogTWF0aC5QSVxuICAgICAgICApO1xuICAgICAgICBzdHguZmlsbCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNob29zZUZsb3coZGlyKSB7XG4gICAgbGV0IGltID0gY3JlZi5jdXJyZW50O1xuICAgIGxldCBpdyA9IGltLm9mZnNldFdpZHRoO1xuICAgIGxldCBpaCA9IGltLm9mZnNldEhlaWdodDtcblxuICAgIG1vZGVyLmN1cnJlbnQgPSAnYWRqdXN0X2Zsb3cnO1xuICAgIHNldE1vZGUoJ2FkanVzdF9mbG93Jyk7XG4gICAgbGV0IGN1cnNvciA9IGN1cnNvcnJlZi5jdXJyZW50O1xuICAgIGlmIChkaXIgPT09ICd3Jykge1xuICAgICAgZmxvd19tYXJrLmN1cnJlbnQgPSBbMCwgY3Vyc29yWzFdLCBjdXJzb3JbMF0gKyBjdXJzb3JbMl0sIGN1cnNvclszXSwgZGlyXTtcbiAgICB9IGVsc2UgaWYgKGRpciA9PT0gJ2UnKSB7XG4gICAgICBmbG93X21hcmsuY3VycmVudCA9IFtcbiAgICAgICAgY3Vyc29yWzBdLFxuICAgICAgICBjdXJzb3JbMV0sXG4gICAgICAgIGl3IC0gY3Vyc29yWzBdLFxuICAgICAgICBjdXJzb3JbM10sXG4gICAgICAgIGRpcixcbiAgICAgIF07XG4gICAgfSBlbHNlIGlmIChkaXIgPT09ICduJykge1xuICAgICAgZmxvd19tYXJrLmN1cnJlbnQgPSBbY3Vyc29yWzBdLCAwLCBjdXJzb3JbMl0sIGN1cnNvclsxXSArIGN1cnNvclszXSwgZGlyXTtcbiAgICB9IGVsc2UgaWYgKGRpciA9PT0gJ3MnKSB7XG4gICAgICBmbG93X21hcmsuY3VycmVudCA9IFtcbiAgICAgICAgY3Vyc29yWzBdLFxuICAgICAgICBjdXJzb3JbMV0sXG4gICAgICAgIGN1cnNvclsyXSxcbiAgICAgICAgaWggLSBjdXJzb3JbMV0sXG4gICAgICAgIGRpcixcbiAgICAgIF07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcnVuRmxvdygpIHtcbiAgICBsZXQgYyA9IGNyZWYuY3VycmVudDtcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGxldCBpdyA9IGMub2Zmc2V0V2lkdGg7XG4gICAgbGV0IGloID0gYy5vZmZzZXRIZWlnaHQ7XG4gICAgZm9yIChsZXQgZiA9IDA7IGYgPCBmbG93cy5jdXJyZW50Lmxlbmd0aDsgZisrKSB7XG4gICAgICBsZXQgZmxvdyA9IGZsb3dzLmN1cnJlbnRbZl07XG4gICAgICBsZXQgdCA9IGZsb3dNb3ZlKGZsb3csIGMpO1xuICAgICAgY3R4LmRyYXdJbWFnZSh0LCBmbG93WzBdLCBmbG93WzFdLCBmbG93WzJdLCBmbG93WzNdKTtcbiAgICB9XG4gICAgaGFuZGxlcnJlZi5jdXJyZW50ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJ1bkZsb3cpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnRGbG93KCkge1xuICAgIGZsb3dzLmN1cnJlbnQucHVzaChmbG93X21hcmsuY3VycmVudCk7XG4gICAgbW9kZXIuY3VycmVudCA9ICdtb3ZlJztcbiAgICBzZXRNb2RlKCdtb3ZlJyk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRSZWFkKCkge1xuICAgIGxldCBpbSA9IGNyZWYuY3VycmVudDtcbiAgICBsZXQgaXcgPSBpbS5vZmZzZXRXaWR0aDtcbiAgICBsZXQgaWggPSBpbS5vZmZzZXRIZWlnaHQ7XG4gICAgbGV0IGZtID0gZmxvd19tYXJrLmN1cnJlbnQ7XG5cbiAgICBsZXQgY3Vyc29yID0gY3Vyc29ycmVmLmN1cnJlbnQ7XG4gICAgbGV0IHJlYWQgPSByZWFkcmVmLmN1cnJlbnQ7XG4gICAgaWYgKG1vZGVyLmN1cnJlbnQgPT09ICdhZGp1c3RfZmxvdycpIHtcbiAgICAgIHJlYWQuaW5uZXJIVE1MID0gYCR7Zm1bMF19LCR7Zm1bMV19ICR7Zm1bMl19eCR7XG4gICAgICAgIGZtWzNdXG4gICAgICB9ICR7Zm1bNF0udG9VcHBlckNhc2UoKX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWFkLmlubmVySFRNTCA9IGAke2l3fXgke2lofSAgJHtjdXJzb3JbMF19LCR7Y3Vyc29yWzFdfSAke2N1cnNvclsyXX14JHtcbiAgICAgICAgY3Vyc29yWzNdXG4gICAgICB9YDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBrZXlBY3Rpb24oa2V5LCByZXBlYXQpIHtcbiAgICBsZXQgaW0gPSBjcmVmLmN1cnJlbnQ7XG4gICAgbGV0IGl3ID0gaW0ub2Zmc2V0V2lkdGg7XG4gICAgbGV0IGloID0gaW0ub2Zmc2V0SGVpZ2h0O1xuXG4gICAgbGV0IG0gPSBrZXltYXAuY3VycmVudDtcbiAgICBsZXQgY3Vyc29yID0gY3Vyc29ycmVmLmN1cnJlbnQ7XG4gICAgbGV0IG1vZGUgPSBtb2Rlci5jdXJyZW50O1xuXG4gICAgaWYgKGtleSA9PT0gJyAnKSB7XG4gICAgICBpZiAoaGFuZGxlcnJlZi5jdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGhhbmRsZXJyZWYuY3VycmVudCk7XG4gICAgICAgIGhhbmRsZXJyZWYuY3VycmVudCA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBydW5GbG93KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gJ3YnKSB7XG4gICAgICB0b2dnbGVGbG93VmlzaWJpbGl0eSgpO1xuICAgIH1cblxuICAgIGlmIChrZXkgPT09ICdjJykge1xuICAgICAgbGV0IGNoZWNrX2NsZWFyID0gY29uZmlybSgnQ2xlYXIgYWxsIGZsb3dzPycpO1xuICAgICAgaWYgKGNoZWNrX2NsZWFyKSBmbG93cy5jdXJyZW50ID0gW107XG4gICAgfVxuXG4gICAgaWYgKG1vZGVyLmN1cnJlbnQgPT09ICdtb3ZlJykge1xuICAgICAgbGV0IGluYyA9IDE7XG4gICAgICBpZiAobVsnc2hpZnQnXSkgaW5jID0gMTA7XG5cbiAgICAgIGlmIChtWydqJ10pIGN1cnNvclsxXSArPSBpbmM7XG4gICAgICBpZiAobVsnayddKSBjdXJzb3JbMV0gLT0gaW5jO1xuICAgICAgaWYgKG1bJ2gnXSkgY3Vyc29yWzBdIC09IGluYztcbiAgICAgIGlmIChtWydsJ10pIGN1cnNvclswXSArPSBpbmM7XG5cbiAgICAgIGlmIChjdXJzb3JbMF0gPCAwKSBjdXJzb3JbMF0gPSAwO1xuICAgICAgaWYgKGN1cnNvclswXSArIGN1cnNvclsyXSA+IGl3KSBjdXJzb3JbMF0gPSBpdyAtIGN1cnNvclsyXTtcbiAgICAgIGlmIChjdXJzb3JbMV0gPCAwKSBjdXJzb3JbMV0gPSAwO1xuICAgICAgaWYgKGN1cnNvclsxXSArIGN1cnNvclszXSA+IGloKSBjdXJzb3JbMV0gPSBpaCAtIGN1cnNvclszXTtcblxuICAgICAgaWYgKGtleSA9PT0gJzInKSB7XG4gICAgICAgIG1vZGVyLmN1cnJlbnQgPSAnYWRqdXN0X2N1cnNvcic7XG4gICAgICAgIHNldE1vZGUoJ2FkanVzdF9jdXJzb3InKTtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdlbnRlcicpIHtcbiAgICAgICAgbW9kZXIuY3VycmVudCA9ICdjaG9vc2VfZmxvdyc7XG4gICAgICAgIHNldE1vZGUoJ2Nob29zZV9mbG93Jyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtb2Rlci5jdXJyZW50ID09PSAnYWRqdXN0X2N1cnNvcicpIHtcbiAgICAgIGxldCBpbmMgPSAxO1xuICAgICAgaWYgKG1bJ3NoaWZ0J10pIGluYyA9IDEwO1xuXG4gICAgICBpZiAobVsnaiddKSBjdXJzb3JbM10gKz0gaW5jO1xuICAgICAgaWYgKG1bJ2snXSkgY3Vyc29yWzNdIC09IGluYztcbiAgICAgIGlmIChtWydoJ10pIGN1cnNvclsyXSAtPSBpbmM7XG4gICAgICBpZiAobVsnbCddKSBjdXJzb3JbMl0gKz0gaW5jO1xuXG4gICAgICBpZiAoY3Vyc29yWzBdICsgY3Vyc29yWzJdID4gaXcpIGN1cnNvclsyXSA9IGl3IC0gY3Vyc29yWzBdO1xuICAgICAgaWYgKGN1cnNvclsxXSArIGN1cnNvclszXSA+IGloKSBjdXJzb3JbM10gPSBpaCAtIGN1cnNvclsxXTtcbiAgICAgIGlmIChjdXJzb3JbMl0gPCAxKSBjdXJzb3JbMl0gPSAxO1xuICAgICAgaWYgKGN1cnNvclszXSA8IDEpIGN1cnNvclszXSA9IDE7XG5cbiAgICAgIGlmIChrZXkgPT09ICdlbnRlcicpIHtcbiAgICAgICAgbW9kZXIuY3VycmVudCA9ICdtb3ZlJztcbiAgICAgICAgc2V0TW9kZSgnbW92ZScpO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ2VzY2FwZScpIHtcbiAgICAgICAgbW9kZXIuY3VycmVudCA9ICdtb3ZlJztcbiAgICAgICAgc2V0TW9kZSgnbW92ZScpO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJzEnKSB7XG4gICAgICAgIG1vZGVyLmN1cnJlbnQgPSAnbW92ZSc7XG4gICAgICAgIHNldE1vZGUoJ21vdmUnKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1vZGVyLmN1cnJlbnQgPT09ICdjaG9vc2VfZmxvdycpIHtcbiAgICAgIGlmIChrZXkgPT09ICdhJykge1xuICAgICAgICBjaG9vc2VGbG93KCd3Jyk7XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ3cnKSB7XG4gICAgICAgIGNob29zZUZsb3coJ24nKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAncycpIHtcbiAgICAgICAgY2hvb3NlRmxvdygncycpO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdkJykge1xuICAgICAgICBjaG9vc2VGbG93KCdlJyk7XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnZXNjYXBlJykge1xuICAgICAgICBtb2Rlci5jdXJyZW50ID0gJ21vdmUnO1xuICAgICAgICBzZXRNb2RlKCdtb3ZlJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtb2Rlci5jdXJyZW50ID09PSAnYWRqdXN0X2Zsb3cnKSB7XG4gICAgICBsZXQgZm0gPSBmbG93X21hcmsuY3VycmVudDtcbiAgICAgIGlmIChrZXkgPT09ICdlc2NhcGUnKSB7XG4gICAgICAgIG1vZGVyLmN1cnJlbnQgPSAnY2hvb3NlX2Zsb3cnO1xuICAgICAgICBzZXRNb2RlKCdjaG9vc2VfZmxvdycpO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdlbnRlcicpIHtcbiAgICAgICAgc3RhcnRGbG93KCk7XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2YnKSB7XG4gICAgICAgIGlmIChmbVs0XSA9PT0gJ3cnKSB7XG4gICAgICAgICAgZm1bNF0gPSAnZSc7XG4gICAgICAgIH0gZWxzZSBpZiAoZm1bNF0gPT09ICdlJykge1xuICAgICAgICAgIGZtWzRdID0gJ3cnO1xuICAgICAgICB9IGVsc2UgaWYgKGZtWzRdID09PSAnbicpIHtcbiAgICAgICAgICBmbVs0XSA9ICdzJztcbiAgICAgICAgfSBlbHNlIGlmIChmbVs0XSA9PT0gJ3MnKSB7XG4gICAgICAgICAgZm1bNF0gPSAnbic7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHNtID0gc3JlZi5jdXJyZW50O1xuICAgIGxldCBzdyA9IHNtLm9mZnNldFdpZHRoO1xuICAgIGxldCBzaCA9IHNtLm9mZnNldEhlaWdodDtcbiAgICBsZXQgc3R4ID0gc3JlZi5jdXJyZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgc3R4LmNsZWFyUmVjdCgwLCAwLCBzdywgc2gpO1xuICAgIGlmIChmbG93c192aXNpYmxlLmN1cnJlbnQpIHtcbiAgICAgIGRyYXdGbG93T3V0bGluZXMoKTtcbiAgICB9XG4gICAgaWYgKG1vZGVyLmN1cnJlbnQgPT09ICdjaG9vc2VfZmxvdycpIHtcbiAgICAgIGRyYXdQb3NzRmxvd3MoKTtcbiAgICB9IGVsc2UgaWYgKG1vZGVyLmN1cnJlbnQgPT09ICdhZGp1c3RfZmxvdycpIHtcbiAgICAgIHN0eC5zdHJva2VTdHlsZSA9IGdyZWVuO1xuICAgICAgbGV0IGZtID0gZmxvd19tYXJrLmN1cnJlbnQ7XG4gICAgICBzdHguc3Ryb2tlUmVjdChcbiAgICAgICAgZm1bMF0gKyBjdXJzb3JfcGFkZGluZyxcbiAgICAgICAgZm1bMV0gKyBjdXJzb3JfcGFkZGluZyxcbiAgICAgICAgZm1bMl0sXG4gICAgICAgIGZtWzNdXG4gICAgICApO1xuICAgICAgc3R4LmZpbGxTdHlsZSA9IGdyZWVuO1xuICAgICAgc3R4LmJlZ2luUGF0aCgpO1xuICAgICAgbGV0IHhhO1xuICAgICAgbGV0IHlhO1xuICAgICAgaWYgKGZtWzRdID09PSAnZScpIHtcbiAgICAgICAgeGEgPSBmbVswXTtcbiAgICAgICAgeWEgPSBmbVsxXSArIGZtWzNdIC8gMjtcbiAgICAgIH0gZWxzZSBpZiAoZm1bNF0gPT09ICdzJykge1xuICAgICAgICB4YSA9IGZtWzBdICsgZm1bMl0gLyAyO1xuICAgICAgICB5YSA9IGZtWzFdO1xuICAgICAgfSBlbHNlIGlmIChmbVs0XSA9PT0gJ3cnKSB7XG4gICAgICAgIHhhID0gZm1bMF0gKyBmbVsyXTtcbiAgICAgICAgeWEgPSBmbVsxXSArIGZtWzNdIC8gMjtcbiAgICAgIH0gZWxzZSBpZiAoZm1bNF0gPT09ICduJykge1xuICAgICAgICB4YSA9IGZtWzBdICsgZm1bMl0gLyAyO1xuICAgICAgICB5YSA9IGZtWzFdICsgZm1bM107XG4gICAgICB9XG4gICAgICBzdHguYXJjKHhhICsgY3Vyc29yX3BhZGRpbmcsIHlhICsgY3Vyc29yX3BhZGRpbmcsIDQsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgIHN0eC5maWxsKCk7XG4gICAgfVxuICAgIGRyYXdDdXJzb3IoKTtcblxuICAgIHNldFJlYWQoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvd25IYW5kbGVyKGUpIHtcbiAgICBrZXltYXAuY3VycmVudFtlLmtleS50b0xvd2VyQ2FzZSgpXSA9IHRydWU7XG4gICAga2V5QWN0aW9uKGUua2V5LnRvTG93ZXJDYXNlKCksIGUucmVwZWF0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwSGFuZGxlcihlKSB7XG4gICAga2V5bWFwLmN1cnJlbnRbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSBmYWxzZTtcbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBkb3duSGFuZGxlcik7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBIYW5kbGVyKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBkb3duSGFuZGxlcik7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB1cEhhbmRsZXIpO1xuICAgICAgaWYgKGhhbmRsZXJyZWYuY3VycmVudCAhPT0gbnVsbCkgY2FuY2VsQW5pbWF0aW9uRnJhbWUoaGFuZGxlcnJlZi5jdXJyZW50KTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBpbml0SW1hZ2UoJy9oZXJvZXMuanBnJyk7XG4gICAgaW5pdEltYWdlKCcveXl5LmpwZycsIHRydWUpO1xuICAgIC8vIGluaXRJbWFnZSgnL21lc3RyaXAucG5nJyk7XG4gICAgLy8gaW5pdEltYWdlKCcvc2NydWdncy5qcGcnKTtcbiAgICAvLyBpbml0SW1hZ2UoJy9ma2EuanBnJyk7XG4gICAgLy8gaW5pdEltYWdlKCcvZ3JhbnQucG5nJyk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPHRpdGxlPldhdGVyZmFsbHM8L3RpdGxlPlxuICAgICAgICA8bGluayByZWw9XCJpY29uXCIgaHJlZj1cIi9mYXZpY29uLmljb1wiIC8+XG4gICAgICA8L0hlYWQ+XG4gICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnLCBwYWRkaW5nOiBjdXJzb3JfcGFkZGluZyB9fT5cbiAgICAgICAgPGNhbnZhcyByZWY9e2NyZWZ9IC8+XG4gICAgICAgIDxjYW52YXNcbiAgICAgICAgICByZWY9e3NyZWZ9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgbWFyZ2luTGVmdDogY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiBjdXJzb3JfcGFkZGluZyxcbiAgICAgICAgICB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLFxuICAgICAgICB9fVxuICAgICAgICByZWY9e3JlYWRyZWZ9XG4gICAgICAvPlxuICAgICAgPEluZm8gcmxoPXtybGh9IG1vZGU9e21vZGV9IC8+XG5cbiAgICAgIDxzdHlsZSBnbG9iYWwganN4PntgXG4gICAgICAgIEBmb250LWZhY2Uge1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiAnY3VzdG9tJztcbiAgICAgICAgICBzcmM6IHVybCgnL0lCTVBsZXhNb25vLVJlZ3VsYXIud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXG4gICAgICAgICAgICB1cmwoJy9JQk1QbGV4TW9uby1SZWd1bGFyLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTtcbiAgICAgICAgfVxuICAgICAgICAqIHtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB9XG4gICAgICAgIGh0bWwge1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiBjdXN0b20sIG1vbm9zcGFjZTtcbiAgICAgICAgICBmb250LXNpemU6ICR7ZnN9cHg7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6ICR7bGh9O1xuICAgICAgICB9XG4gICAgICAgIGJvZHkge1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICB9XG4gICAgICAgIGNhbnZhcyB7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIH1cbiAgICAgIGB9PC9zdHlsZT5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhvbWU7XG4iXX0= */\n/*@ sourceURL=/Users/grant.custer/Sites/constraint-systems/waterfalls/pages/index.js */")));
};

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ })

})
//# sourceMappingURL=index.js.d35c519b8377c4c57f01.hot-update.js.map