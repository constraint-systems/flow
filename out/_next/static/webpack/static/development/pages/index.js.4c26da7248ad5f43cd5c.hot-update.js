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
        if (!first_load) {
          var _confirm_check = confirm("The image you selected is larger (".concat(iw, "x").concat(ih, ") than the browser window.  Resize it to fit (").concat(rw, "x").concat(rh, ")? Choose cancel to import it at full size."));
        } else {
          confirm_check = true;
        }

        if (confirm_check) {
          img.width = rw;
          img.height = rh;
        }
      }

      initImageCanvas(img);
      initScanCanvas(img);
      drawCursor(); // alert(iw + 'x' + ih);

      runFlow();
      setRead(); // drawWater();
      // setTimeout(() => {
      //   update();
      // }, 500);
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
      lineNumber: 420
    },
    __self: this
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_4___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 421
    },
    __self: this
  }, __jsx("title", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 422
    },
    __self: this
  }, "Waterfalls"), __jsx("link", {
    rel: "icon",
    href: "/favicon.ico",
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 423
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
      lineNumber: 425
    },
    __self: this
  }, __jsx("canvas", {
    ref: cref,
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 426
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
      lineNumber: 427
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
      lineNumber: 437
    },
    __self: this
  }), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a, {
    id: "632941774",
    dynamic: [fs, lh],
    __self: this
  }, "@font-face{font-family:'custom';src:url('/IBMPlexMono-Regular.woff2') format('woff2'), url('/IBMPlexMono-Regular.woff') format('woff');}*{box-sizing:border-box;}html{font-family:custom,monospace;font-size:".concat(fs, "px;line-height:").concat(lh, ";}body{margin:0;padding:0;}canvas{display:block;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ncmFudC5jdXN0ZXIvU2l0ZXMvY29uc3RyYWludC1zeXN0ZW1zL3dhdGVyZmFsbHMvcGFnZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNGJ5QixBQUdnQyxBQUtDLEFBR1EsQUFLckIsQUFJSyxTQUhKLEtBSVosS0FIQSxFQWJtRCxDQUluRCxPQUcyQyx5Q0FDQSx5Q0FDM0MsYUFSQSIsImZpbGUiOiIvVXNlcnMvZ3JhbnQuY3VzdGVyL1NpdGVzL2NvbnN0cmFpbnQtc3lzdGVtcy93YXRlcmZhbGxzL3BhZ2VzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBmbG93TW92ZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvZmxvd3MnO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcblxubGV0IGN1cnNvcl9wYWRkaW5nID0gMTA7XG5sZXQgbWFnZW50YSA9ICdyZ2JhKDI1NSwwLDI1NSwxKSc7XG5sZXQgZ3JlZW4gPSAncmdiYSgwLDI1NSwwLDEpJztcbmxldCBmcyA9IDE0O1xubGV0IGxoID0gMS41O1xuXG5jb25zdCBIb21lID0gKCkgPT4ge1xuICBsZXQgY3JlZiA9IHVzZVJlZihudWxsKTtcbiAgbGV0IHNyZWYgPSB1c2VSZWYobnVsbCk7XG4gIGxldCB1cmVmID0gdXNlUmVmKG51bGwpO1xuICBsZXQga2V5bWFwID0gdXNlUmVmKHt9KTtcbiAgbGV0IHJlYWRyZWYgPSB1c2VSZWYobnVsbCk7XG4gIGxldCBjdXJzb3JyZWYgPSB1c2VSZWYoWzAsIDAsIDIwLCAyMF0pO1xuICBsZXQgd2F0ZXJyZWYgPSB1c2VSZWYoWzQwMCwgMCwgMjAsIDEwMjRdKTtcbiAgbGV0IGNvdW50ZXIgPSB1c2VSZWYoMCk7XG4gIGxldCBoYW5kbGVycmVmID0gdXNlUmVmKG51bGwpO1xuICBsZXQgbW9kZXIgPSB1c2VSZWYoJ21vdmUnKTtcbiAgbGV0IGZsb3dfbWFyayA9IHVzZVJlZihudWxsKTtcbiAgbGV0IGZsb3dzID0gdXNlUmVmKFtdKTtcbiAgbGV0IGZsb3dzX3Zpc2libGUgPSB1c2VSZWYoZmFsc2UpO1xuXG4gIGZ1bmN0aW9uIGluaXRJbWFnZUNhbnZhcyhpbWcpIHtcbiAgICBsZXQgYyA9IGNyZWYuY3VycmVudDtcbiAgICBjLndpZHRoID0gaW1nLndpZHRoO1xuICAgIGMuaGVpZ2h0ID0gaW1nLmhlaWdodDtcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBjLndpZHRoLCBjLmhlaWdodCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0U2NhbkNhbnZhcyhpbWcpIHtcbiAgICBsZXQgYyA9IHNyZWYuY3VycmVudDtcbiAgICBjLndpZHRoID0gaW1nLndpZHRoICsgY3Vyc29yX3BhZGRpbmcgKiAyO1xuICAgIGMuaGVpZ2h0ID0gaW1nLmhlaWdodCArIGN1cnNvcl9wYWRkaW5nICogMjtcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdEltYWdlKHNyYywgZmlyc3RfbG9hZCA9IGZhbHNlKSB7XG4gICAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIGN1cnNvcl9wYWRkaW5nICogMjtcbiAgICBsZXQgaCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIGN1cnNvcl9wYWRkaW5nICogMiAtIDEwIC0gZnMgKiBsaDtcblxuICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgbGV0IGl3ID0gaW1nLndpZHRoO1xuICAgICAgbGV0IGloID0gaW1nLmhlaWdodDtcblxuICAgICAgbGV0IHdhID0gdyAvIGg7XG4gICAgICBsZXQgaWEgPSBpdyAvIGloO1xuXG4gICAgICBsZXQgcmVzaXplX2NoZWNrID0gZmFsc2U7XG4gICAgICBsZXQgcncsIHJoO1xuICAgICAgaWYgKGlhID49IHdhKSB7XG4gICAgICAgIGlmIChpdyA+IHcpIHtcbiAgICAgICAgICByZXNpemVfY2hlY2sgPSB0cnVlO1xuICAgICAgICAgIHJ3ID0gdztcbiAgICAgICAgICByaCA9IHcgLyBpYTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGloID4gaCkge1xuICAgICAgICAgIHJlc2l6ZV9jaGVjayA9IHRydWU7XG4gICAgICAgICAgcmggPSBoO1xuICAgICAgICAgIHJ3ID0gaCAqIGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXNpemVfY2hlY2spIHtcbiAgICAgICAgaWYgKCFmaXJzdF9sb2FkKSB7XG4gICAgICAgICAgbGV0IGNvbmZpcm1fY2hlY2sgPSBjb25maXJtKFxuICAgICAgICAgICAgYFRoZSBpbWFnZSB5b3Ugc2VsZWN0ZWQgaXMgbGFyZ2VyICgke2l3fXgke2lofSkgdGhhbiB0aGUgYnJvd3NlciB3aW5kb3cuICBSZXNpemUgaXQgdG8gZml0ICgke3J3fXgke3JofSk/IENob29zZSBjYW5jZWwgdG8gaW1wb3J0IGl0IGF0IGZ1bGwgc2l6ZS5gXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25maXJtX2NoZWNrID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZmlybV9jaGVjaykge1xuICAgICAgICAgIGltZy53aWR0aCA9IHJ3O1xuICAgICAgICAgIGltZy5oZWlnaHQgPSByaDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpbml0SW1hZ2VDYW52YXMoaW1nKTtcbiAgICAgIGluaXRTY2FuQ2FudmFzKGltZyk7XG4gICAgICBkcmF3Q3Vyc29yKCk7XG5cbiAgICAgIC8vIGFsZXJ0KGl3ICsgJ3gnICsgaWgpO1xuXG4gICAgICBydW5GbG93KCk7XG4gICAgICBzZXRSZWFkKCk7XG4gICAgICAvLyBkcmF3V2F0ZXIoKTtcbiAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gICB1cGRhdGUoKTtcbiAgICAgIC8vIH0sIDUwMCk7XG4gICAgfTtcbiAgICBpbWcuc3JjID0gc3JjO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJhd1Bvc3NGbG93cygpIHtcbiAgICBsZXQgaW0gPSBjcmVmLmN1cnJlbnQ7XG4gICAgbGV0IGl3ID0gaW0ub2Zmc2V0V2lkdGg7XG4gICAgbGV0IGloID0gaW0ub2Zmc2V0SGVpZ2h0O1xuICAgIGxldCBjdXJzb3IgPSBjdXJzb3JyZWYuY3VycmVudDtcbiAgICBsZXQgd2VzdCA9IFswLCBjdXJzb3JbMV0sIGN1cnNvclswXSwgY3Vyc29yWzNdXTtcbiAgICBsZXQgZWFzdCA9IFtcbiAgICAgIGN1cnNvclswXSArIGN1cnNvclsyXSxcbiAgICAgIGN1cnNvclsxXSxcbiAgICAgIGl3IC0gKGN1cnNvclswXSArIGN1cnNvclsyXSksXG4gICAgICBjdXJzb3JbM10sXG4gICAgXTtcbiAgICBsZXQgbm9ydGggPSBbY3Vyc29yWzBdLCAwLCBjdXJzb3JbMl0sIGN1cnNvclsxXV07XG4gICAgbGV0IHNvdXRoID0gW1xuICAgICAgY3Vyc29yWzBdLFxuICAgICAgY3Vyc29yWzFdICsgY3Vyc29yWzNdLFxuICAgICAgY3Vyc29yWzJdLFxuICAgICAgaWggLSAoY3Vyc29yWzFdICsgY3Vyc29yWzNdKSxcbiAgICBdO1xuICAgIGxldCBkaXJzID0gW3dlc3QsIGVhc3QsIG5vcnRoLCBzb3V0aF07XG4gICAgbGV0IHBhZGRlZF9kaXJzID0gZGlycy5tYXAobiA9PlxuICAgICAgbi5tYXAoKHYsIGkpID0+IChpID09PSAwIHx8IGkgPT09IDEgPyB2ICsgY3Vyc29yX3BhZGRpbmcgOiB2KSlcbiAgICApO1xuICAgIGxldCBzdHggPSBzcmVmLmN1cnJlbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBzdHguZmlsbFN0eWxlID0gJ3JnYmEoMCwwLDAsMC4yKSc7XG4gICAgc3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoMCwwLDAsMC44KSc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWRkZWRfZGlycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGQgPSBwYWRkZWRfZGlyc1tpXTtcbiAgICAgIHN0eC5maWxsUmVjdCguLi5kKTtcbiAgICAgIHN0eC5zdHJva2VSZWN0KC4uLmQpO1xuICAgIH1cbiAgICBzdHguc3Ryb2tlU3R5bGUgPSAnd2hpdGUnO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlRmxvd1Zpc2liaWxpdHkoKSB7XG4gICAgY29uc29sZS5sb2coJ3RvZ2dsZSBpdCcpO1xuICAgIGNvbnNvbGUubG9nKGZsb3dzX3Zpc2libGUuY3VycmVudCk7XG4gICAgZmxvd3NfdmlzaWJsZS5jdXJyZW50ID0gIWZsb3dzX3Zpc2libGUuY3VycmVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdGbG93T3V0bGluZXMoKSB7XG4gICAgbGV0IHN0eCA9IHNyZWYuY3VycmVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHN0eC5zdHJva2VTdHlsZSA9ICcjYWFhJztcbiAgICBmb3IgKGxldCBmID0gMDsgZiA8IGZsb3dzLmN1cnJlbnQubGVuZ3RoOyBmKyspIHtcbiAgICAgIGxldCBmbG93ID0gZmxvd3MuY3VycmVudFtmXTtcbiAgICAgIHN0eC5zdHJva2VSZWN0KFxuICAgICAgICBmbG93WzBdICsgY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgIGZsb3dbMV0gKyBjdXJzb3JfcGFkZGluZyxcbiAgICAgICAgZmxvd1syXSxcbiAgICAgICAgZmxvd1szXVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3Q3Vyc29yKCkge1xuICAgIGxldCBzbSA9IHNyZWYuY3VycmVudDtcbiAgICBsZXQgc3cgPSBzbS5vZmZzZXRXaWR0aDtcbiAgICBsZXQgc2ggPSBzbS5vZmZzZXRIZWlnaHQ7XG5cbiAgICBsZXQgc3R4ID0gc3JlZi5jdXJyZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgbGV0IG1vZGUgPSBtb2Rlci5jdXJyZW50O1xuICAgIGlmIChtb2RlICE9PSAnYWRqdXN0X2Zsb3cnKSB7XG4gICAgICBsZXQgY3Vyc29yID0gY3Vyc29ycmVmLmN1cnJlbnQ7XG4gICAgICBzdHguc3Ryb2tlU3R5bGUgPSBtYWdlbnRhO1xuICAgICAgc3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICBzdHguc3Ryb2tlUmVjdChcbiAgICAgICAgY3Vyc29yWzBdICsgY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgIGN1cnNvclsxXSArIGN1cnNvcl9wYWRkaW5nLFxuICAgICAgICBjdXJzb3JbMl0sXG4gICAgICAgIGN1cnNvclszXVxuICAgICAgKTtcblxuICAgICAgaWYgKG1vZGUgPT09ICdhZGp1c3RfY3Vyc29yJykge1xuICAgICAgICBzdHguZmlsbFN0eWxlID0gbWFnZW50YTtcbiAgICAgICAgc3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBzdHguYXJjKFxuICAgICAgICAgIGN1cnNvclswXSArIGN1cnNvcl9wYWRkaW5nLFxuICAgICAgICAgIGN1cnNvclsxXSArIGN1cnNvcl9wYWRkaW5nLFxuICAgICAgICAgIDQsXG4gICAgICAgICAgMCxcbiAgICAgICAgICAyICogTWF0aC5QSVxuICAgICAgICApO1xuICAgICAgICBzdHguZmlsbCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNob29zZUZsb3coZGlyKSB7XG4gICAgbGV0IGltID0gY3JlZi5jdXJyZW50O1xuICAgIGxldCBpdyA9IGltLm9mZnNldFdpZHRoO1xuICAgIGxldCBpaCA9IGltLm9mZnNldEhlaWdodDtcblxuICAgIG1vZGVyLmN1cnJlbnQgPSAnYWRqdXN0X2Zsb3cnO1xuICAgIGxldCBjdXJzb3IgPSBjdXJzb3JyZWYuY3VycmVudDtcbiAgICBpZiAoZGlyID09PSAndycpIHtcbiAgICAgIGZsb3dfbWFyay5jdXJyZW50ID0gWzAsIGN1cnNvclsxXSwgY3Vyc29yWzBdICsgY3Vyc29yWzJdLCBjdXJzb3JbM10sIGRpcl07XG4gICAgfSBlbHNlIGlmIChkaXIgPT09ICdlJykge1xuICAgICAgZmxvd19tYXJrLmN1cnJlbnQgPSBbXG4gICAgICAgIGN1cnNvclswXSxcbiAgICAgICAgY3Vyc29yWzFdLFxuICAgICAgICBpdyAtIGN1cnNvclswXSxcbiAgICAgICAgY3Vyc29yWzNdLFxuICAgICAgICBkaXIsXG4gICAgICBdO1xuICAgIH0gZWxzZSBpZiAoZGlyID09PSAnbicpIHtcbiAgICAgIGZsb3dfbWFyay5jdXJyZW50ID0gW2N1cnNvclswXSwgMCwgY3Vyc29yWzJdLCBjdXJzb3JbMV0gKyBjdXJzb3JbM10sIGRpcl07XG4gICAgfSBlbHNlIGlmIChkaXIgPT09ICdzJykge1xuICAgICAgZmxvd19tYXJrLmN1cnJlbnQgPSBbXG4gICAgICAgIGN1cnNvclswXSxcbiAgICAgICAgY3Vyc29yWzFdLFxuICAgICAgICBjdXJzb3JbMl0sXG4gICAgICAgIGloIC0gY3Vyc29yWzFdLFxuICAgICAgICBkaXIsXG4gICAgICBdO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bkZsb3coKSB7XG4gICAgbGV0IGMgPSBjcmVmLmN1cnJlbnQ7XG4gICAgbGV0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBsZXQgaXcgPSBjLm9mZnNldFdpZHRoO1xuICAgIGxldCBpaCA9IGMub2Zmc2V0SGVpZ2h0O1xuICAgIGZvciAobGV0IGYgPSAwOyBmIDwgZmxvd3MuY3VycmVudC5sZW5ndGg7IGYrKykge1xuICAgICAgbGV0IGZsb3cgPSBmbG93cy5jdXJyZW50W2ZdO1xuICAgICAgbGV0IHQgPSBmbG93TW92ZShmbG93LCBjKTtcbiAgICAgIGN0eC5kcmF3SW1hZ2UodCwgZmxvd1swXSwgZmxvd1sxXSwgZmxvd1syXSwgZmxvd1szXSk7XG4gICAgfVxuICAgIGhhbmRsZXJyZWYuY3VycmVudCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShydW5GbG93KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0RmxvdygpIHtcbiAgICBmbG93cy5jdXJyZW50LnB1c2goZmxvd19tYXJrLmN1cnJlbnQpO1xuICAgIG1vZGVyLmN1cnJlbnQgPSAnbW92ZSc7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRSZWFkKCkge1xuICAgIGxldCBpbSA9IGNyZWYuY3VycmVudDtcbiAgICBsZXQgaXcgPSBpbS5vZmZzZXRXaWR0aDtcbiAgICBsZXQgaWggPSBpbS5vZmZzZXRIZWlnaHQ7XG4gICAgbGV0IGZtID0gZmxvd19tYXJrLmN1cnJlbnQ7XG5cbiAgICBsZXQgY3Vyc29yID0gY3Vyc29ycmVmLmN1cnJlbnQ7XG4gICAgbGV0IHJlYWQgPSByZWFkcmVmLmN1cnJlbnQ7XG4gICAgaWYgKG1vZGVyLmN1cnJlbnQgPT09ICdhZGp1c3RfZmxvdycpIHtcbiAgICAgIHJlYWQuaW5uZXJIVE1MID0gYCR7Zm1bMF19LCR7Zm1bMV19ICR7Zm1bMl19eCR7XG4gICAgICAgIGZtWzNdXG4gICAgICB9ICR7Zm1bNF0udG9VcHBlckNhc2UoKX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWFkLmlubmVySFRNTCA9IGAke2l3fXgke2lofSAgJHtjdXJzb3JbMF19LCR7Y3Vyc29yWzFdfSAke2N1cnNvclsyXX14JHtcbiAgICAgICAgY3Vyc29yWzNdXG4gICAgICB9YDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBrZXlBY3Rpb24oa2V5LCByZXBlYXQpIHtcbiAgICBsZXQgaW0gPSBjcmVmLmN1cnJlbnQ7XG4gICAgbGV0IGl3ID0gaW0ub2Zmc2V0V2lkdGg7XG4gICAgbGV0IGloID0gaW0ub2Zmc2V0SGVpZ2h0O1xuXG4gICAgbGV0IG0gPSBrZXltYXAuY3VycmVudDtcbiAgICBsZXQgY3Vyc29yID0gY3Vyc29ycmVmLmN1cnJlbnQ7XG4gICAgbGV0IG1vZGUgPSBtb2Rlci5jdXJyZW50O1xuXG4gICAgaWYgKGtleSA9PT0gJyAnKSB7XG4gICAgICBpZiAoaGFuZGxlcnJlZi5jdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGhhbmRsZXJyZWYuY3VycmVudCk7XG4gICAgICAgIGhhbmRsZXJyZWYuY3VycmVudCA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBydW5GbG93KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gJ3YnKSB7XG4gICAgICB0b2dnbGVGbG93VmlzaWJpbGl0eSgpO1xuICAgIH1cblxuICAgIGlmIChtb2Rlci5jdXJyZW50ID09PSAnbW92ZScpIHtcbiAgICAgIGxldCBpbmMgPSAxO1xuICAgICAgaWYgKG1bJ3NoaWZ0J10pIGluYyA9IDEwO1xuXG4gICAgICBpZiAobVsnaiddKSBjdXJzb3JbMV0gKz0gaW5jO1xuICAgICAgaWYgKG1bJ2snXSkgY3Vyc29yWzFdIC09IGluYztcbiAgICAgIGlmIChtWydoJ10pIGN1cnNvclswXSAtPSBpbmM7XG4gICAgICBpZiAobVsnbCddKSBjdXJzb3JbMF0gKz0gaW5jO1xuXG4gICAgICBpZiAoY3Vyc29yWzBdIDwgMCkgY3Vyc29yWzBdID0gMDtcbiAgICAgIGlmIChjdXJzb3JbMF0gKyBjdXJzb3JbMl0gPiBpdykgY3Vyc29yWzBdID0gaXcgLSBjdXJzb3JbMl07XG4gICAgICBpZiAoY3Vyc29yWzFdIDwgMCkgY3Vyc29yWzFdID0gMDtcbiAgICAgIGlmIChjdXJzb3JbMV0gKyBjdXJzb3JbM10gPiBpaCkgY3Vyc29yWzFdID0gaWggLSBjdXJzb3JbM107XG5cbiAgICAgIGlmIChrZXkgPT09ICcyJykge1xuICAgICAgICBtb2Rlci5jdXJyZW50ID0gJ2FkanVzdF9jdXJzb3InO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ2VudGVyJykge1xuICAgICAgICBtb2Rlci5jdXJyZW50ID0gJ2Nob29zZV9mbG93JztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1vZGVyLmN1cnJlbnQgPT09ICdhZGp1c3RfY3Vyc29yJykge1xuICAgICAgbGV0IGluYyA9IDE7XG4gICAgICBpZiAobVsnc2hpZnQnXSkgaW5jID0gMTA7XG5cbiAgICAgIGlmIChtWydqJ10pIGN1cnNvclszXSArPSBpbmM7XG4gICAgICBpZiAobVsnayddKSBjdXJzb3JbM10gLT0gaW5jO1xuICAgICAgaWYgKG1bJ2gnXSkgY3Vyc29yWzJdIC09IGluYztcbiAgICAgIGlmIChtWydsJ10pIGN1cnNvclsyXSArPSBpbmM7XG5cbiAgICAgIGlmIChjdXJzb3JbMF0gKyBjdXJzb3JbMl0gPiBpdykgY3Vyc29yWzJdID0gaXcgLSBjdXJzb3JbMF07XG4gICAgICBpZiAoY3Vyc29yWzFdICsgY3Vyc29yWzNdID4gaWgpIGN1cnNvclszXSA9IGloIC0gY3Vyc29yWzFdO1xuXG4gICAgICBpZiAoa2V5ID09PSAnZW50ZXInKSB7XG4gICAgICAgIG1vZGVyLmN1cnJlbnQgPSAnbW92ZSc7XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnZXNjYXBlJykge1xuICAgICAgICBtb2Rlci5jdXJyZW50ID0gJ21vdmUnO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJzEnKSB7XG4gICAgICAgIG1vZGVyLmN1cnJlbnQgPSAnbW92ZSc7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtb2Rlci5jdXJyZW50ID09PSAnY2hvb3NlX2Zsb3cnKSB7XG4gICAgICBpZiAoa2V5ID09PSAnYScpIHtcbiAgICAgICAgY2hvb3NlRmxvdygndycpO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICd3Jykge1xuICAgICAgICBjaG9vc2VGbG93KCduJyk7XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ3MnKSB7XG4gICAgICAgIGNob29zZUZsb3coJ3MnKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnZCcpIHtcbiAgICAgICAgY2hvb3NlRmxvdygnZScpO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ2VzY2FwZScpIHtcbiAgICAgICAgbW9kZXIuY3VycmVudCA9ICdtb3ZlJztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1vZGVyLmN1cnJlbnQgPT09ICdhZGp1c3RfZmxvdycpIHtcbiAgICAgIGxldCBmbSA9IGZsb3dfbWFyay5jdXJyZW50O1xuICAgICAgaWYgKGtleSA9PT0gJ2VzY2FwZScpIHtcbiAgICAgICAgbW9kZXIuY3VycmVudCA9ICdjaG9vc2VfZmxvdyc7XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2VudGVyJykge1xuICAgICAgICBzdGFydEZsb3coKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnZicpIHtcbiAgICAgICAgaWYgKGZtWzRdID09PSAndycpIHtcbiAgICAgICAgICBmbVs0XSA9ICdlJztcbiAgICAgICAgfSBlbHNlIGlmIChmbVs0XSA9PT0gJ2UnKSB7XG4gICAgICAgICAgZm1bNF0gPSAndyc7XG4gICAgICAgIH0gZWxzZSBpZiAoZm1bNF0gPT09ICduJykge1xuICAgICAgICAgIGZtWzRdID0gJ3MnO1xuICAgICAgICB9IGVsc2UgaWYgKGZtWzRdID09PSAncycpIHtcbiAgICAgICAgICBmbVs0XSA9ICduJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBsZXQgc20gPSBzcmVmLmN1cnJlbnQ7XG4gICAgbGV0IHN3ID0gc20ub2Zmc2V0V2lkdGg7XG4gICAgbGV0IHNoID0gc20ub2Zmc2V0SGVpZ2h0O1xuICAgIGxldCBzdHggPSBzcmVmLmN1cnJlbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBzdHguY2xlYXJSZWN0KDAsIDAsIHN3LCBzaCk7XG4gICAgaWYgKGZsb3dzX3Zpc2libGUuY3VycmVudCkge1xuICAgICAgZHJhd0Zsb3dPdXRsaW5lcygpO1xuICAgIH1cbiAgICBpZiAobW9kZXIuY3VycmVudCA9PT0gJ2Nob29zZV9mbG93Jykge1xuICAgICAgZHJhd1Bvc3NGbG93cygpO1xuICAgIH0gZWxzZSBpZiAobW9kZXIuY3VycmVudCA9PT0gJ2FkanVzdF9mbG93Jykge1xuICAgICAgc3R4LnN0cm9rZVN0eWxlID0gZ3JlZW47XG4gICAgICBsZXQgZm0gPSBmbG93X21hcmsuY3VycmVudDtcbiAgICAgIHN0eC5zdHJva2VSZWN0KFxuICAgICAgICBmbVswXSArIGN1cnNvcl9wYWRkaW5nLFxuICAgICAgICBmbVsxXSArIGN1cnNvcl9wYWRkaW5nLFxuICAgICAgICBmbVsyXSxcbiAgICAgICAgZm1bM11cbiAgICAgICk7XG4gICAgICBzdHguZmlsbFN0eWxlID0gZ3JlZW47XG4gICAgICBzdHguYmVnaW5QYXRoKCk7XG4gICAgICBsZXQgeGE7XG4gICAgICBsZXQgeWE7XG4gICAgICBpZiAoZm1bNF0gPT09ICdlJykge1xuICAgICAgICB4YSA9IGZtWzBdO1xuICAgICAgICB5YSA9IGZtWzFdICsgZm1bM10gLyAyO1xuICAgICAgfSBlbHNlIGlmIChmbVs0XSA9PT0gJ3MnKSB7XG4gICAgICAgIHhhID0gZm1bMF0gKyBmbVsyXSAvIDI7XG4gICAgICAgIHlhID0gZm1bMV07XG4gICAgICB9IGVsc2UgaWYgKGZtWzRdID09PSAndycpIHtcbiAgICAgICAgeGEgPSBmbVswXSArIGZtWzJdO1xuICAgICAgICB5YSA9IGZtWzFdICsgZm1bM10gLyAyO1xuICAgICAgfSBlbHNlIGlmIChmbVs0XSA9PT0gJ24nKSB7XG4gICAgICAgIHhhID0gZm1bMF0gKyBmbVsyXSAvIDI7XG4gICAgICAgIHlhID0gZm1bMV0gKyBmbVszXTtcbiAgICAgIH1cbiAgICAgIHN0eC5hcmMoeGEgKyBjdXJzb3JfcGFkZGluZywgeWEgKyBjdXJzb3JfcGFkZGluZywgNCwgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgc3R4LmZpbGwoKTtcbiAgICB9XG4gICAgZHJhd0N1cnNvcigpO1xuXG4gICAgc2V0UmVhZCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZG93bkhhbmRsZXIoZSkge1xuICAgIGtleW1hcC5jdXJyZW50W2Uua2V5LnRvTG93ZXJDYXNlKCldID0gdHJ1ZTtcbiAgICBrZXlBY3Rpb24oZS5rZXkudG9Mb3dlckNhc2UoKSwgZS5yZXBlYXQpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBIYW5kbGVyKGUpIHtcbiAgICBrZXltYXAuY3VycmVudFtlLmtleS50b0xvd2VyQ2FzZSgpXSA9IGZhbHNlO1xuICB9XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGRvd25IYW5kbGVyKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB1cEhhbmRsZXIpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGRvd25IYW5kbGVyKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVwSGFuZGxlcik7XG4gICAgICBpZiAoaGFuZGxlcnJlZi5jdXJyZW50ICE9PSBudWxsKSBjYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGVycmVmLmN1cnJlbnQpO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIGluaXRJbWFnZSgnL2hlcm9lcy5qcGcnKTtcbiAgICBpbml0SW1hZ2UoJy95eXkuanBnJywgdHJ1ZSk7XG4gICAgLy8gaW5pdEltYWdlKCcvbWVzdHJpcC5wbmcnKTtcbiAgICAvLyBpbml0SW1hZ2UoJy9zY3J1Z2dzLmpwZycpO1xuICAgIC8vIGluaXRJbWFnZSgnL2ZrYS5qcGcnKTtcbiAgICAvLyBpbml0SW1hZ2UoJy9ncmFudC5wbmcnKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8dGl0bGU+V2F0ZXJmYWxsczwvdGl0bGU+XG4gICAgICAgIDxsaW5rIHJlbD1cImljb25cIiBocmVmPVwiL2Zhdmljb24uaWNvXCIgLz5cbiAgICAgIDwvSGVhZD5cbiAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScsIHBhZGRpbmc6IGN1cnNvcl9wYWRkaW5nIH19PlxuICAgICAgICA8Y2FudmFzIHJlZj17Y3JlZn0gLz5cbiAgICAgICAgPGNhbnZhc1xuICAgICAgICAgIHJlZj17c3JlZn1cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBtYXJnaW5MZWZ0OiBjdXJzb3JfcGFkZGluZyxcbiAgICAgICAgICBtYXJnaW5Cb3R0b206IGN1cnNvcl9wYWRkaW5nLFxuICAgICAgICAgIHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcsXG4gICAgICAgIH19XG4gICAgICAgIHJlZj17cmVhZHJlZn1cbiAgICAgIC8+XG4gICAgICA8c3R5bGUgZ2xvYmFsIGpzeD57YFxuICAgICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgICBmb250LWZhbWlseTogJ2N1c3RvbSc7XG4gICAgICAgICAgc3JjOiB1cmwoJy9JQk1QbGV4TW9uby1SZWd1bGFyLndvZmYyJykgZm9ybWF0KCd3b2ZmMicpLFxuICAgICAgICAgICAgdXJsKCcvSUJNUGxleE1vbm8tUmVndWxhci53b2ZmJykgZm9ybWF0KCd3b2ZmJyk7XG4gICAgICAgIH1cbiAgICAgICAgKiB7XG4gICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgfVxuICAgICAgICBodG1sIHtcbiAgICAgICAgICBmb250LWZhbWlseTogY3VzdG9tLCBtb25vc3BhY2U7XG4gICAgICAgICAgZm9udC1zaXplOiAke2ZzfXB4O1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAke2xofTtcbiAgICAgICAgfVxuICAgICAgICBib2R5IHtcbiAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgfVxuICAgICAgICBjYW52YXMge1xuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB9XG4gICAgICBgfTwvc3R5bGU+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIb21lO1xuIl19 */\n/*@ sourceURL=/Users/grant.custer/Sites/constraint-systems/waterfalls/pages/index.js */")));
};

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ })

})
//# sourceMappingURL=index.js.4c26da7248ad5f43cd5c.hot-update.js.map