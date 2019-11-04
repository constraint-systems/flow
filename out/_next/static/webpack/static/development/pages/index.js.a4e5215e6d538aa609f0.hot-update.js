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
  var imsize = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(null);
  var flows_visible = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(false);

  function initImageCanvas(img) {
    var c = cref.current;
    c.width = img.width;
    c.height = img.height;
    var ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
  }

  function initScanCanvas(img) {
    var c = sref.current;
    c.width = img.width + cursor_padding * 2;
    c.height = img.height + cursor_padding * 2;
    var ctx = c.getContext('2d');
  }

  function initImage(src) {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var img = new Image();

    img.onload = function () {
      var iw = img.width;
      var ih = img.height;
      imsize.current = [iw, ih];
      initImageCanvas(img);
      initScanCanvas(img);
      drawCursor();
      var wa = w / h;
      var ia = iw / ih;

      if (ia >= wa) {
        alert('worry about width');
      } else {
        alert('worry about height');
      } // alert(iw + 'x' + ih);


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
    initImage('/yyy.jpg'); // initImage('/mestrip.png');
    // initImage('/scruggs.jpg');
    // initImage('/fka.jpg');
    // initImage('/grant.png');
  }, []);
  return __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 399
    },
    __self: this
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_4___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 400
    },
    __self: this
  }, __jsx("title", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 401
    },
    __self: this
  }, "Waterfalls"), __jsx("link", {
    rel: "icon",
    href: "/favicon.ico",
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 402
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
      lineNumber: 404
    },
    __self: this
  }, __jsx("canvas", {
    ref: cref,
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 405
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
      lineNumber: 406
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
      lineNumber: 416
    },
    __self: this
  }), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a, {
    id: "632941774",
    dynamic: [fs, lh],
    __self: this
  }, "@font-face{font-family:'custom';src:url('/IBMPlexMono-Regular.woff2') format('woff2'), url('/IBMPlexMono-Regular.woff') format('woff');}*{box-sizing:border-box;}html{font-family:custom,monospace;font-size:".concat(fs, "px;line-height:").concat(lh, ";}body{margin:0;padding:0;}canvas{display:block;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ncmFudC5jdXN0ZXIvU2l0ZXMvY29uc3RyYWludC1zeXN0ZW1zL3dhdGVyZmFsbHMvcGFnZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdWF5QixBQUdnQyxBQUtDLEFBR1EsQUFLckIsQUFJSyxTQUhKLEtBSVosS0FIQSxFQWJtRCxDQUluRCxPQUcyQyx5Q0FDQSx5Q0FDM0MsYUFSQSIsImZpbGUiOiIvVXNlcnMvZ3JhbnQuY3VzdGVyL1NpdGVzL2NvbnN0cmFpbnQtc3lzdGVtcy93YXRlcmZhbGxzL3BhZ2VzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBmbG93TW92ZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvZmxvd3MnO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcblxubGV0IGN1cnNvcl9wYWRkaW5nID0gMTA7XG5sZXQgbWFnZW50YSA9ICdyZ2JhKDI1NSwwLDI1NSwxKSc7XG5sZXQgZ3JlZW4gPSAncmdiYSgwLDI1NSwwLDEpJztcbmxldCBmcyA9IDE0O1xubGV0IGxoID0gMS41O1xuXG5jb25zdCBIb21lID0gKCkgPT4ge1xuICBsZXQgY3JlZiA9IHVzZVJlZihudWxsKTtcbiAgbGV0IHNyZWYgPSB1c2VSZWYobnVsbCk7XG4gIGxldCB1cmVmID0gdXNlUmVmKG51bGwpO1xuICBsZXQga2V5bWFwID0gdXNlUmVmKHt9KTtcbiAgbGV0IHJlYWRyZWYgPSB1c2VSZWYobnVsbCk7XG4gIGxldCBjdXJzb3JyZWYgPSB1c2VSZWYoWzAsIDAsIDIwLCAyMF0pO1xuICBsZXQgd2F0ZXJyZWYgPSB1c2VSZWYoWzQwMCwgMCwgMjAsIDEwMjRdKTtcbiAgbGV0IGNvdW50ZXIgPSB1c2VSZWYoMCk7XG4gIGxldCBoYW5kbGVycmVmID0gdXNlUmVmKG51bGwpO1xuICBsZXQgbW9kZXIgPSB1c2VSZWYoJ21vdmUnKTtcbiAgbGV0IGZsb3dfbWFyayA9IHVzZVJlZihudWxsKTtcbiAgbGV0IGZsb3dzID0gdXNlUmVmKFtdKTtcbiAgbGV0IGltc2l6ZSA9IHVzZVJlZihudWxsKTtcbiAgbGV0IGZsb3dzX3Zpc2libGUgPSB1c2VSZWYoZmFsc2UpO1xuXG4gIGZ1bmN0aW9uIGluaXRJbWFnZUNhbnZhcyhpbWcpIHtcbiAgICBsZXQgYyA9IGNyZWYuY3VycmVudDtcbiAgICBjLndpZHRoID0gaW1nLndpZHRoO1xuICAgIGMuaGVpZ2h0ID0gaW1nLmhlaWdodDtcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRTY2FuQ2FudmFzKGltZykge1xuICAgIGxldCBjID0gc3JlZi5jdXJyZW50O1xuICAgIGMud2lkdGggPSBpbWcud2lkdGggKyBjdXJzb3JfcGFkZGluZyAqIDI7XG4gICAgYy5oZWlnaHQgPSBpbWcuaGVpZ2h0ICsgY3Vyc29yX3BhZGRpbmcgKiAyO1xuICAgIGxldCBjdHggPSBjLmdldENvbnRleHQoJzJkJyk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0SW1hZ2Uoc3JjKSB7XG4gICAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBsZXQgaCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgbGV0IGl3ID0gaW1nLndpZHRoO1xuICAgICAgbGV0IGloID0gaW1nLmhlaWdodDtcblxuICAgICAgaW1zaXplLmN1cnJlbnQgPSBbaXcsIGloXTtcblxuICAgICAgaW5pdEltYWdlQ2FudmFzKGltZyk7XG4gICAgICBpbml0U2NhbkNhbnZhcyhpbWcpO1xuICAgICAgZHJhd0N1cnNvcigpO1xuXG4gICAgICBsZXQgd2EgPSB3IC8gaDtcbiAgICAgIGxldCBpYSA9IGl3IC8gaWg7XG5cbiAgICAgIGlmIChpYSA+PSB3YSkge1xuICAgICAgICBhbGVydCgnd29ycnkgYWJvdXQgd2lkdGgnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsZXJ0KCd3b3JyeSBhYm91dCBoZWlnaHQnKTtcbiAgICAgIH1cblxuICAgICAgLy8gYWxlcnQoaXcgKyAneCcgKyBpaCk7XG5cbiAgICAgIHJ1bkZsb3coKTtcbiAgICAgIHNldFJlYWQoKTtcbiAgICAgIC8vIGRyYXdXYXRlcigpO1xuICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyAgIHVwZGF0ZSgpO1xuICAgICAgLy8gfSwgNTAwKTtcbiAgICB9O1xuICAgIGltZy5zcmMgPSBzcmM7XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3UG9zc0Zsb3dzKCkge1xuICAgIGxldCBpbSA9IGNyZWYuY3VycmVudDtcbiAgICBsZXQgaXcgPSBpbS5vZmZzZXRXaWR0aDtcbiAgICBsZXQgaWggPSBpbS5vZmZzZXRIZWlnaHQ7XG4gICAgbGV0IGN1cnNvciA9IGN1cnNvcnJlZi5jdXJyZW50O1xuICAgIGxldCB3ZXN0ID0gWzAsIGN1cnNvclsxXSwgY3Vyc29yWzBdLCBjdXJzb3JbM11dO1xuICAgIGxldCBlYXN0ID0gW1xuICAgICAgY3Vyc29yWzBdICsgY3Vyc29yWzJdLFxuICAgICAgY3Vyc29yWzFdLFxuICAgICAgaXcgLSAoY3Vyc29yWzBdICsgY3Vyc29yWzJdKSxcbiAgICAgIGN1cnNvclszXSxcbiAgICBdO1xuICAgIGxldCBub3J0aCA9IFtjdXJzb3JbMF0sIDAsIGN1cnNvclsyXSwgY3Vyc29yWzFdXTtcbiAgICBsZXQgc291dGggPSBbXG4gICAgICBjdXJzb3JbMF0sXG4gICAgICBjdXJzb3JbMV0gKyBjdXJzb3JbM10sXG4gICAgICBjdXJzb3JbMl0sXG4gICAgICBpaCAtIChjdXJzb3JbMV0gKyBjdXJzb3JbM10pLFxuICAgIF07XG4gICAgbGV0IGRpcnMgPSBbd2VzdCwgZWFzdCwgbm9ydGgsIHNvdXRoXTtcbiAgICBsZXQgcGFkZGVkX2RpcnMgPSBkaXJzLm1hcChuID0+XG4gICAgICBuLm1hcCgodiwgaSkgPT4gKGkgPT09IDAgfHwgaSA9PT0gMSA/IHYgKyBjdXJzb3JfcGFkZGluZyA6IHYpKVxuICAgICk7XG4gICAgbGV0IHN0eCA9IHNyZWYuY3VycmVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHN0eC5maWxsU3R5bGUgPSAncmdiYSgwLDAsMCwwLjIpJztcbiAgICBzdHguc3Ryb2tlU3R5bGUgPSAncmdiYSgwLDAsMCwwLjgpJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhZGRlZF9kaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgZCA9IHBhZGRlZF9kaXJzW2ldO1xuICAgICAgc3R4LmZpbGxSZWN0KC4uLmQpO1xuICAgICAgc3R4LnN0cm9rZVJlY3QoLi4uZCk7XG4gICAgfVxuICAgIHN0eC5zdHJva2VTdHlsZSA9ICd3aGl0ZSc7XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVGbG93VmlzaWJpbGl0eSgpIHtcbiAgICBjb25zb2xlLmxvZygndG9nZ2xlIGl0Jyk7XG4gICAgY29uc29sZS5sb2coZmxvd3NfdmlzaWJsZS5jdXJyZW50KTtcbiAgICBmbG93c192aXNpYmxlLmN1cnJlbnQgPSAhZmxvd3NfdmlzaWJsZS5jdXJyZW50O1xuICB9XG5cbiAgZnVuY3Rpb24gZHJhd0Zsb3dPdXRsaW5lcygpIHtcbiAgICBsZXQgc3R4ID0gc3JlZi5jdXJyZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgc3R4LnN0cm9rZVN0eWxlID0gJyNhYWEnO1xuICAgIGZvciAobGV0IGYgPSAwOyBmIDwgZmxvd3MuY3VycmVudC5sZW5ndGg7IGYrKykge1xuICAgICAgbGV0IGZsb3cgPSBmbG93cy5jdXJyZW50W2ZdO1xuICAgICAgc3R4LnN0cm9rZVJlY3QoXG4gICAgICAgIGZsb3dbMF0gKyBjdXJzb3JfcGFkZGluZyxcbiAgICAgICAgZmxvd1sxXSArIGN1cnNvcl9wYWRkaW5nLFxuICAgICAgICBmbG93WzJdLFxuICAgICAgICBmbG93WzNdXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdDdXJzb3IoKSB7XG4gICAgbGV0IHNtID0gc3JlZi5jdXJyZW50O1xuICAgIGxldCBzdyA9IHNtLm9mZnNldFdpZHRoO1xuICAgIGxldCBzaCA9IHNtLm9mZnNldEhlaWdodDtcblxuICAgIGxldCBzdHggPSBzcmVmLmN1cnJlbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBsZXQgbW9kZSA9IG1vZGVyLmN1cnJlbnQ7XG4gICAgaWYgKG1vZGUgIT09ICdhZGp1c3RfZmxvdycpIHtcbiAgICAgIGxldCBjdXJzb3IgPSBjdXJzb3JyZWYuY3VycmVudDtcbiAgICAgIHN0eC5zdHJva2VTdHlsZSA9IG1hZ2VudGE7XG4gICAgICBzdHgubGluZVdpZHRoID0gMTtcbiAgICAgIHN0eC5zdHJva2VSZWN0KFxuICAgICAgICBjdXJzb3JbMF0gKyBjdXJzb3JfcGFkZGluZyxcbiAgICAgICAgY3Vyc29yWzFdICsgY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgIGN1cnNvclsyXSxcbiAgICAgICAgY3Vyc29yWzNdXG4gICAgICApO1xuXG4gICAgICBpZiAobW9kZSA9PT0gJ2FkanVzdF9jdXJzb3InKSB7XG4gICAgICAgIHN0eC5maWxsU3R5bGUgPSBtYWdlbnRhO1xuICAgICAgICBzdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHN0eC5hcmMoXG4gICAgICAgICAgY3Vyc29yWzBdICsgY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgICAgY3Vyc29yWzFdICsgY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgICAgNCxcbiAgICAgICAgICAwLFxuICAgICAgICAgIDIgKiBNYXRoLlBJXG4gICAgICAgICk7XG4gICAgICAgIHN0eC5maWxsKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hvb3NlRmxvdyhkaXIpIHtcbiAgICBsZXQgaW0gPSBjcmVmLmN1cnJlbnQ7XG4gICAgbGV0IGl3ID0gaW0ub2Zmc2V0V2lkdGg7XG4gICAgbGV0IGloID0gaW0ub2Zmc2V0SGVpZ2h0O1xuXG4gICAgbW9kZXIuY3VycmVudCA9ICdhZGp1c3RfZmxvdyc7XG4gICAgbGV0IGN1cnNvciA9IGN1cnNvcnJlZi5jdXJyZW50O1xuICAgIGlmIChkaXIgPT09ICd3Jykge1xuICAgICAgZmxvd19tYXJrLmN1cnJlbnQgPSBbMCwgY3Vyc29yWzFdLCBjdXJzb3JbMF0gKyBjdXJzb3JbMl0sIGN1cnNvclszXSwgZGlyXTtcbiAgICB9IGVsc2UgaWYgKGRpciA9PT0gJ2UnKSB7XG4gICAgICBmbG93X21hcmsuY3VycmVudCA9IFtcbiAgICAgICAgY3Vyc29yWzBdLFxuICAgICAgICBjdXJzb3JbMV0sXG4gICAgICAgIGl3IC0gY3Vyc29yWzBdLFxuICAgICAgICBjdXJzb3JbM10sXG4gICAgICAgIGRpcixcbiAgICAgIF07XG4gICAgfSBlbHNlIGlmIChkaXIgPT09ICduJykge1xuICAgICAgZmxvd19tYXJrLmN1cnJlbnQgPSBbY3Vyc29yWzBdLCAwLCBjdXJzb3JbMl0sIGN1cnNvclsxXSArIGN1cnNvclszXSwgZGlyXTtcbiAgICB9IGVsc2UgaWYgKGRpciA9PT0gJ3MnKSB7XG4gICAgICBmbG93X21hcmsuY3VycmVudCA9IFtcbiAgICAgICAgY3Vyc29yWzBdLFxuICAgICAgICBjdXJzb3JbMV0sXG4gICAgICAgIGN1cnNvclsyXSxcbiAgICAgICAgaWggLSBjdXJzb3JbMV0sXG4gICAgICAgIGRpcixcbiAgICAgIF07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcnVuRmxvdygpIHtcbiAgICBsZXQgYyA9IGNyZWYuY3VycmVudDtcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGxldCBpdyA9IGMub2Zmc2V0V2lkdGg7XG4gICAgbGV0IGloID0gYy5vZmZzZXRIZWlnaHQ7XG4gICAgZm9yIChsZXQgZiA9IDA7IGYgPCBmbG93cy5jdXJyZW50Lmxlbmd0aDsgZisrKSB7XG4gICAgICBsZXQgZmxvdyA9IGZsb3dzLmN1cnJlbnRbZl07XG4gICAgICBsZXQgdCA9IGZsb3dNb3ZlKGZsb3csIGMpO1xuICAgICAgY3R4LmRyYXdJbWFnZSh0LCBmbG93WzBdLCBmbG93WzFdLCBmbG93WzJdLCBmbG93WzNdKTtcbiAgICB9XG4gICAgaGFuZGxlcnJlZi5jdXJyZW50ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJ1bkZsb3cpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnRGbG93KCkge1xuICAgIGZsb3dzLmN1cnJlbnQucHVzaChmbG93X21hcmsuY3VycmVudCk7XG4gICAgbW9kZXIuY3VycmVudCA9ICdtb3ZlJztcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFJlYWQoKSB7XG4gICAgbGV0IGltID0gY3JlZi5jdXJyZW50O1xuICAgIGxldCBpdyA9IGltLm9mZnNldFdpZHRoO1xuICAgIGxldCBpaCA9IGltLm9mZnNldEhlaWdodDtcbiAgICBsZXQgZm0gPSBmbG93X21hcmsuY3VycmVudDtcblxuICAgIGxldCBjdXJzb3IgPSBjdXJzb3JyZWYuY3VycmVudDtcbiAgICBsZXQgcmVhZCA9IHJlYWRyZWYuY3VycmVudDtcbiAgICBpZiAobW9kZXIuY3VycmVudCA9PT0gJ2FkanVzdF9mbG93Jykge1xuICAgICAgcmVhZC5pbm5lckhUTUwgPSBgJHtmbVswXX0sJHtmbVsxXX0gJHtmbVsyXX14JHtcbiAgICAgICAgZm1bM11cbiAgICAgIH0gJHtmbVs0XS50b1VwcGVyQ2FzZSgpfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlYWQuaW5uZXJIVE1MID0gYCR7aXd9eCR7aWh9ICAke2N1cnNvclswXX0sJHtjdXJzb3JbMV19ICR7Y3Vyc29yWzJdfXgke1xuICAgICAgICBjdXJzb3JbM11cbiAgICAgIH1gO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGtleUFjdGlvbihrZXksIHJlcGVhdCkge1xuICAgIGxldCBpbSA9IGNyZWYuY3VycmVudDtcbiAgICBsZXQgaXcgPSBpbS5vZmZzZXRXaWR0aDtcbiAgICBsZXQgaWggPSBpbS5vZmZzZXRIZWlnaHQ7XG5cbiAgICBsZXQgbSA9IGtleW1hcC5jdXJyZW50O1xuICAgIGxldCBjdXJzb3IgPSBjdXJzb3JyZWYuY3VycmVudDtcbiAgICBsZXQgbW9kZSA9IG1vZGVyLmN1cnJlbnQ7XG5cbiAgICBpZiAoa2V5ID09PSAnICcpIHtcbiAgICAgIGlmIChoYW5kbGVycmVmLmN1cnJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoaGFuZGxlcnJlZi5jdXJyZW50KTtcbiAgICAgICAgaGFuZGxlcnJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJ1bkZsb3coKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoa2V5ID09PSAndicpIHtcbiAgICAgIHRvZ2dsZUZsb3dWaXNpYmlsaXR5KCk7XG4gICAgfVxuXG4gICAgaWYgKG1vZGVyLmN1cnJlbnQgPT09ICdtb3ZlJykge1xuICAgICAgbGV0IGluYyA9IDE7XG4gICAgICBpZiAobVsnc2hpZnQnXSkgaW5jID0gMTA7XG5cbiAgICAgIGlmIChtWydqJ10pIGN1cnNvclsxXSArPSBpbmM7XG4gICAgICBpZiAobVsnayddKSBjdXJzb3JbMV0gLT0gaW5jO1xuICAgICAgaWYgKG1bJ2gnXSkgY3Vyc29yWzBdIC09IGluYztcbiAgICAgIGlmIChtWydsJ10pIGN1cnNvclswXSArPSBpbmM7XG5cbiAgICAgIGlmIChjdXJzb3JbMF0gPCAwKSBjdXJzb3JbMF0gPSAwO1xuICAgICAgaWYgKGN1cnNvclswXSArIGN1cnNvclsyXSA+IGl3KSBjdXJzb3JbMF0gPSBpdyAtIGN1cnNvclsyXTtcbiAgICAgIGlmIChjdXJzb3JbMV0gPCAwKSBjdXJzb3JbMV0gPSAwO1xuICAgICAgaWYgKGN1cnNvclsxXSArIGN1cnNvclszXSA+IGloKSBjdXJzb3JbMV0gPSBpaCAtIGN1cnNvclszXTtcblxuICAgICAgaWYgKGtleSA9PT0gJzInKSB7XG4gICAgICAgIG1vZGVyLmN1cnJlbnQgPSAnYWRqdXN0X2N1cnNvcic7XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnZW50ZXInKSB7XG4gICAgICAgIG1vZGVyLmN1cnJlbnQgPSAnY2hvb3NlX2Zsb3cnO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZXIuY3VycmVudCA9PT0gJ2FkanVzdF9jdXJzb3InKSB7XG4gICAgICBsZXQgaW5jID0gMTtcbiAgICAgIGlmIChtWydzaGlmdCddKSBpbmMgPSAxMDtcblxuICAgICAgaWYgKG1bJ2onXSkgY3Vyc29yWzNdICs9IGluYztcbiAgICAgIGlmIChtWydrJ10pIGN1cnNvclszXSAtPSBpbmM7XG4gICAgICBpZiAobVsnaCddKSBjdXJzb3JbMl0gLT0gaW5jO1xuICAgICAgaWYgKG1bJ2wnXSkgY3Vyc29yWzJdICs9IGluYztcblxuICAgICAgaWYgKGN1cnNvclswXSArIGN1cnNvclsyXSA+IGl3KSBjdXJzb3JbMl0gPSBpdyAtIGN1cnNvclswXTtcbiAgICAgIGlmIChjdXJzb3JbMV0gKyBjdXJzb3JbM10gPiBpaCkgY3Vyc29yWzNdID0gaWggLSBjdXJzb3JbMV07XG5cbiAgICAgIGlmIChrZXkgPT09ICdlbnRlcicpIHtcbiAgICAgICAgbW9kZXIuY3VycmVudCA9ICdtb3ZlJztcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdlc2NhcGUnKSB7XG4gICAgICAgIG1vZGVyLmN1cnJlbnQgPSAnbW92ZSc7XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnMScpIHtcbiAgICAgICAgbW9kZXIuY3VycmVudCA9ICdtb3ZlJztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1vZGVyLmN1cnJlbnQgPT09ICdjaG9vc2VfZmxvdycpIHtcbiAgICAgIGlmIChrZXkgPT09ICdhJykge1xuICAgICAgICBjaG9vc2VGbG93KCd3Jyk7XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ3cnKSB7XG4gICAgICAgIGNob29zZUZsb3coJ24nKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAncycpIHtcbiAgICAgICAgY2hvb3NlRmxvdygncycpO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdkJykge1xuICAgICAgICBjaG9vc2VGbG93KCdlJyk7XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnZXNjYXBlJykge1xuICAgICAgICBtb2Rlci5jdXJyZW50ID0gJ21vdmUnO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZXIuY3VycmVudCA9PT0gJ2FkanVzdF9mbG93Jykge1xuICAgICAgbGV0IGZtID0gZmxvd19tYXJrLmN1cnJlbnQ7XG4gICAgICBpZiAoa2V5ID09PSAnZXNjYXBlJykge1xuICAgICAgICBtb2Rlci5jdXJyZW50ID0gJ2Nob29zZV9mbG93JztcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnZW50ZXInKSB7XG4gICAgICAgIHN0YXJ0RmxvdygpO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdmJykge1xuICAgICAgICBpZiAoZm1bNF0gPT09ICd3Jykge1xuICAgICAgICAgIGZtWzRdID0gJ2UnO1xuICAgICAgICB9IGVsc2UgaWYgKGZtWzRdID09PSAnZScpIHtcbiAgICAgICAgICBmbVs0XSA9ICd3JztcbiAgICAgICAgfSBlbHNlIGlmIChmbVs0XSA9PT0gJ24nKSB7XG4gICAgICAgICAgZm1bNF0gPSAncyc7XG4gICAgICAgIH0gZWxzZSBpZiAoZm1bNF0gPT09ICdzJykge1xuICAgICAgICAgIGZtWzRdID0gJ24nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBzbSA9IHNyZWYuY3VycmVudDtcbiAgICBsZXQgc3cgPSBzbS5vZmZzZXRXaWR0aDtcbiAgICBsZXQgc2ggPSBzbS5vZmZzZXRIZWlnaHQ7XG4gICAgbGV0IHN0eCA9IHNyZWYuY3VycmVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHN0eC5jbGVhclJlY3QoMCwgMCwgc3csIHNoKTtcbiAgICBpZiAoZmxvd3NfdmlzaWJsZS5jdXJyZW50KSB7XG4gICAgICBkcmF3Rmxvd091dGxpbmVzKCk7XG4gICAgfVxuICAgIGlmIChtb2Rlci5jdXJyZW50ID09PSAnY2hvb3NlX2Zsb3cnKSB7XG4gICAgICBkcmF3UG9zc0Zsb3dzKCk7XG4gICAgfSBlbHNlIGlmIChtb2Rlci5jdXJyZW50ID09PSAnYWRqdXN0X2Zsb3cnKSB7XG4gICAgICBzdHguc3Ryb2tlU3R5bGUgPSBncmVlbjtcbiAgICAgIGxldCBmbSA9IGZsb3dfbWFyay5jdXJyZW50O1xuICAgICAgc3R4LnN0cm9rZVJlY3QoXG4gICAgICAgIGZtWzBdICsgY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgIGZtWzFdICsgY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgIGZtWzJdLFxuICAgICAgICBmbVszXVxuICAgICAgKTtcbiAgICAgIHN0eC5maWxsU3R5bGUgPSBncmVlbjtcbiAgICAgIHN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGxldCB4YTtcbiAgICAgIGxldCB5YTtcbiAgICAgIGlmIChmbVs0XSA9PT0gJ2UnKSB7XG4gICAgICAgIHhhID0gZm1bMF07XG4gICAgICAgIHlhID0gZm1bMV0gKyBmbVszXSAvIDI7XG4gICAgICB9IGVsc2UgaWYgKGZtWzRdID09PSAncycpIHtcbiAgICAgICAgeGEgPSBmbVswXSArIGZtWzJdIC8gMjtcbiAgICAgICAgeWEgPSBmbVsxXTtcbiAgICAgIH0gZWxzZSBpZiAoZm1bNF0gPT09ICd3Jykge1xuICAgICAgICB4YSA9IGZtWzBdICsgZm1bMl07XG4gICAgICAgIHlhID0gZm1bMV0gKyBmbVszXSAvIDI7XG4gICAgICB9IGVsc2UgaWYgKGZtWzRdID09PSAnbicpIHtcbiAgICAgICAgeGEgPSBmbVswXSArIGZtWzJdIC8gMjtcbiAgICAgICAgeWEgPSBmbVsxXSArIGZtWzNdO1xuICAgICAgfVxuICAgICAgc3R4LmFyYyh4YSArIGN1cnNvcl9wYWRkaW5nLCB5YSArIGN1cnNvcl9wYWRkaW5nLCA0LCAwLCAyICogTWF0aC5QSSk7XG4gICAgICBzdHguZmlsbCgpO1xuICAgIH1cbiAgICBkcmF3Q3Vyc29yKCk7XG5cbiAgICBzZXRSZWFkKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkb3duSGFuZGxlcihlKSB7XG4gICAga2V5bWFwLmN1cnJlbnRbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgIGtleUFjdGlvbihlLmtleS50b0xvd2VyQ2FzZSgpLCBlLnJlcGVhdCk7XG4gIH1cblxuICBmdW5jdGlvbiB1cEhhbmRsZXIoZSkge1xuICAgIGtleW1hcC5jdXJyZW50W2Uua2V5LnRvTG93ZXJDYXNlKCldID0gZmFsc2U7XG4gIH1cblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZG93bkhhbmRsZXIpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVwSGFuZGxlcik7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZG93bkhhbmRsZXIpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBIYW5kbGVyKTtcbiAgICAgIGlmIChoYW5kbGVycmVmLmN1cnJlbnQgIT09IG51bGwpIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGhhbmRsZXJyZWYuY3VycmVudCk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gaW5pdEltYWdlKCcvaGVyb2VzLmpwZycpO1xuICAgIGluaXRJbWFnZSgnL3l5eS5qcGcnKTtcbiAgICAvLyBpbml0SW1hZ2UoJy9tZXN0cmlwLnBuZycpO1xuICAgIC8vIGluaXRJbWFnZSgnL3NjcnVnZ3MuanBnJyk7XG4gICAgLy8gaW5pdEltYWdlKCcvZmthLmpwZycpO1xuICAgIC8vIGluaXRJbWFnZSgnL2dyYW50LnBuZycpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDx0aXRsZT5XYXRlcmZhbGxzPC90aXRsZT5cbiAgICAgICAgPGxpbmsgcmVsPVwiaWNvblwiIGhyZWY9XCIvZmF2aWNvbi5pY29cIiAvPlxuICAgICAgPC9IZWFkPlxuICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJywgcGFkZGluZzogY3Vyc29yX3BhZGRpbmcgfX0+XG4gICAgICAgIDxjYW52YXMgcmVmPXtjcmVmfSAvPlxuICAgICAgICA8Y2FudmFzXG4gICAgICAgICAgcmVmPXtzcmVmfVxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIG1hcmdpbkxlZnQ6IGN1cnNvcl9wYWRkaW5nLFxuICAgICAgICAgIG1hcmdpbkJvdHRvbTogY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgICAgd2hpdGVTcGFjZTogJ3ByZS13cmFwJyxcbiAgICAgICAgfX1cbiAgICAgICAgcmVmPXtyZWFkcmVmfVxuICAgICAgLz5cbiAgICAgIDxzdHlsZSBnbG9iYWwganN4PntgXG4gICAgICAgIEBmb250LWZhY2Uge1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiAnY3VzdG9tJztcbiAgICAgICAgICBzcmM6IHVybCgnL0lCTVBsZXhNb25vLVJlZ3VsYXIud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXG4gICAgICAgICAgICB1cmwoJy9JQk1QbGV4TW9uby1SZWd1bGFyLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTtcbiAgICAgICAgfVxuICAgICAgICAqIHtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB9XG4gICAgICAgIGh0bWwge1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiBjdXN0b20sIG1vbm9zcGFjZTtcbiAgICAgICAgICBmb250LXNpemU6ICR7ZnN9cHg7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6ICR7bGh9O1xuICAgICAgICB9XG4gICAgICAgIGJvZHkge1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICB9XG4gICAgICAgIGNhbnZhcyB7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIH1cbiAgICAgIGB9PC9zdHlsZT5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhvbWU7XG4iXX0= */\n/*@ sourceURL=/Users/grant.custer/Sites/constraint-systems/waterfalls/pages/index.js */")));
};

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ })

})
//# sourceMappingURL=index.js.a4e5215e6d538aa609f0.hot-update.js.map