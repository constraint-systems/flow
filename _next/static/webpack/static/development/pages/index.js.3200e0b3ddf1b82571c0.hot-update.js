webpackHotUpdate("static/development/pages/index.js",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/get-iterator */ "./node_modules/@babel/runtime-corejs2/core-js/get-iterator.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_flows__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/flows */ "./components/flows.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/head */ "./node_modules/next/dist/next-server/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_info__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/info */ "./components/info.js");


var _jsxFileName = "/Users/grant.custer/Sites/constraint-systems/flow/pages/index.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;




var cursor_padding = 10;
var magenta = 'rgba(255,0,255,1)';
var green = 'rgba(0,255,0,1)';
var fs = 14;
var lh = 1.5;
var rlh = fs * lh;
var maxch = '80ch';
var color = 'light';

var Home = function Home() {
  var cref = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(null);
  var sref = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(null);
  var uref = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(null);
  var keymap = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])({});
  var readref = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(null);
  var cursorref = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])([0, 0, 20, 20]);
  var waterref = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])([400, 0, 20, 1024]);
  var counter = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(0);
  var handlerref = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(null);
  var moder = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])('move');
  var flow_mark = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(null);
  var flows = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])([]);
  var flows_visible = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(false);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(true),
      help = _useState[0],
      setHelp = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])('move'),
      mode = _useState2[0],
      setMode = _useState2[1];

  var image = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(null);

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
        lineNumber: 35
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

      image.current = img;
      initImageCanvas(img);
      initScanCanvas(img);
      drawCursor();
      cancelAnimationFrame(handlerref.current);
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
      stx.fillRect.apply(stx, Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(d));
      stx.strokeRect.apply(stx, Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(d));
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
      var t = Object(_components_flows__WEBPACK_IMPORTED_MODULE_4__["flowMove"])(flow, c);
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
      if (check_clear) flows.current = []; // TODO reset image
    }

    if (key === 'x' && !repeat) {
      var link = document.createElement('a');

      var revokeURL = function revokeURL() {
        var me = this;
        requestAnimationFrame(function () {
          URL.revokeObjectURL(me.href);
          me.href = null;
        });
        this.removeEventListener('click', revokeURL);
      };

      cref.current.toBlob(function (blob) {
        link.setAttribute('download', "flow-".concat(new Date().toISOString().replace(/-/g, '').replace(/:/g, '').replace(/_/g, '').replace(/\./g, ''), ".png"));
        link.setAttribute('href', URL.createObjectURL(blob));
        link.addEventListener('click', revokeURL);
        link.dispatchEvent(new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window
        }));
      });
    }

    if (key === 'o' && !repeat) {
      var handleChange = function handleChange(e) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _babel_runtime_corejs2_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0___default()(this.files), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            if (item.type.indexOf('image') < 0) {
              continue;
            }

            var src = URL.createObjectURL(item);
            initImage(src);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        this.removeEventListener('change', handleChange);
      };

      var input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.dispatchEvent(new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window
      }));
      input.addEventListener('change', handleChange);
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

  function onPaste(e) {
    e.preventDefault();
    e.stopPropagation();
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _babel_runtime_corejs2_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0___default()(e.clipboardData.items), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var item = _step2.value;

        if (item.type.indexOf('image') < 0) {
          continue;
        }

        var file = item.getAsFile();
        var src = URL.createObjectURL(file);
        initImage(src);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  function onDrag(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }

  function onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    var file = e.dataTransfer.files[0];
    var filename = file.path ? file.path : file.name ? file.name : '';
    var src = URL.createObjectURL(file);
    initImage(src);
  }

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    window.addEventListener('paste', onPaste, false);
    window.addEventListener('dragover', onDrag, false);
    window.addEventListener('drop', onDrop, false);
    return function () {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
      window.removeEventListener('paste', onPaste);
      window.removeEventListener('dragover', onDrag, false);
      window.removeEventListener('drop', onDrop, false);
      if (handlerref.current !== null) cancelAnimationFrame(handlerref.current);
    };
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    initImage('/yyy.jpg', true); // initImage('/heroes.jpg');
    // initImage('/mestrip.png');
    // initImage('/scruggs.jpg');
    // initImage('/fka.jpg');
    // initImage('/grant.png');
  }, []);
  return __jsx("div", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_2___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 558
    },
    __self: this
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_5___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 559
    },
    __self: this
  }, __jsx("title", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_2___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 560
    },
    __self: this
  }, "Waterfalls"), __jsx("link", {
    rel: "icon",
    href: "/favicon.ico",
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_2___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 561
    },
    __self: this
  })), __jsx("div", {
    style: {
      position: 'relative',
      padding: cursor_padding
    },
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_2___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 563
    },
    __self: this
  }, __jsx("canvas", {
    ref: cref,
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_2___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 564
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
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_2___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 565
    },
    __self: this
  })), __jsx("div", {
    style: {
      marginLeft: cursor_padding,
      marginBottom: cursor_padding,
      whiteSpace: 'pre-wrap'
    },
    ref: readref,
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_2___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 575
    },
    __self: this
  }), __jsx(_components_info__WEBPACK_IMPORTED_MODULE_6__["default"], {
    rlh: rlh,
    mode: mode,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 583
    },
    __self: this
  }), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_2___default.a, {
    id: "632941774",
    dynamic: [fs, lh],
    __self: this
  }, "@font-face{font-family:'custom';src:url('/IBMPlexMono-Regular.woff2') format('woff2'), url('/IBMPlexMono-Regular.woff') format('woff');}*{box-sizing:border-box;}html{font-family:custom,monospace;font-size:".concat(fs, "px;line-height:").concat(lh, ";}body{margin:0;padding:0;}canvas{display:block;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ncmFudC5jdXN0ZXIvU2l0ZXMvY29uc3RyYWludC1zeXN0ZW1zL2Zsb3cvcGFnZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd2tCeUIsQUFHZ0MsQUFLQyxBQUdRLEFBS3JCLEFBSUssU0FISixLQUlaLEtBSEEsRUFibUQsQ0FJbkQsT0FHMkMseUNBQ0EseUNBQzNDLGFBUkEiLCJmaWxlIjoiL1VzZXJzL2dyYW50LmN1c3Rlci9TaXRlcy9jb25zdHJhaW50LXN5c3RlbXMvZmxvdy9wYWdlcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZmxvd01vdmUgfSBmcm9tICcuLi9jb21wb25lbnRzL2Zsb3dzJztcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCc7XG5pbXBvcnQgSW5mbyBmcm9tICcuLi9jb21wb25lbnRzL2luZm8nO1xuXG5sZXQgY3Vyc29yX3BhZGRpbmcgPSAxMDtcbmxldCBtYWdlbnRhID0gJ3JnYmEoMjU1LDAsMjU1LDEpJztcbmxldCBncmVlbiA9ICdyZ2JhKDAsMjU1LDAsMSknO1xubGV0IGZzID0gMTQ7XG5sZXQgbGggPSAxLjU7XG5sZXQgcmxoID0gZnMgKiBsaDtcbmxldCBtYXhjaCA9ICc4MGNoJztcbmxldCBjb2xvciA9ICdsaWdodCc7XG5cbmNvbnN0IEhvbWUgPSAoKSA9PiB7XG4gIGxldCBjcmVmID0gdXNlUmVmKG51bGwpO1xuICBsZXQgc3JlZiA9IHVzZVJlZihudWxsKTtcbiAgbGV0IHVyZWYgPSB1c2VSZWYobnVsbCk7XG4gIGxldCBrZXltYXAgPSB1c2VSZWYoe30pO1xuICBsZXQgcmVhZHJlZiA9IHVzZVJlZihudWxsKTtcbiAgbGV0IGN1cnNvcnJlZiA9IHVzZVJlZihbMCwgMCwgMjAsIDIwXSk7XG4gIGxldCB3YXRlcnJlZiA9IHVzZVJlZihbNDAwLCAwLCAyMCwgMTAyNF0pO1xuICBsZXQgY291bnRlciA9IHVzZVJlZigwKTtcbiAgbGV0IGhhbmRsZXJyZWYgPSB1c2VSZWYobnVsbCk7XG4gIGxldCBtb2RlciA9IHVzZVJlZignbW92ZScpO1xuICBsZXQgZmxvd19tYXJrID0gdXNlUmVmKG51bGwpO1xuICBsZXQgZmxvd3MgPSB1c2VSZWYoW10pO1xuICBsZXQgZmxvd3NfdmlzaWJsZSA9IHVzZVJlZihmYWxzZSk7XG4gIGxldCBbaGVscCwgc2V0SGVscF0gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgbGV0IFttb2RlLCBzZXRNb2RlXSA9IHVzZVN0YXRlKCdtb3ZlJyk7XG4gIGxldCBpbWFnZSA9IHVzZVJlZihudWxsKTtcblxuICBmdW5jdGlvbiBLZXlUaXAobGV0dGVyLCBjb2xvcikge1xuICAgIHJldHVybiAoXG4gICAgICA8c3BhblxuICAgICAgICBjbGFzc05hbWU9XCJrZXl0aXBcIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAga2V5bWFwci5jdXJyZW50W2xldHRlcl0gPSB0cnVlO1xuICAgICAgICAgIGtleUFjdGlvbihsZXR0ZXIsIGZhbHNlKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGtleW1hcHIuY3VycmVudFtsZXR0ZXJdID0gZmFsc2U7XG4gICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfX1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBvdXRsaW5lOiBjb2xvciA9PT0gJ2RhcmsnID8gJ3NvbGlkIDFweCB3aGl0ZScgOiAnc29saWQgMXB4IGJsYWNrJyxcbiAgICAgICAgICBwYWRkaW5nTGVmdDogJzAuNWNoJyxcbiAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICcwLjVjaCcsXG4gICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gICAgICAgICAgY3Vyc29yOiAnZGVmYXVsdCcsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtsZXR0ZXIgPT09ICcgJyA/ICdzcGFjZWJhcicgOiBsZXR0ZXJ9XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRJbWFnZUNhbnZhcyhpbWcpIHtcbiAgICBsZXQgYyA9IGNyZWYuY3VycmVudDtcbiAgICBjLndpZHRoID0gaW1nLndpZHRoO1xuICAgIGMuaGVpZ2h0ID0gaW1nLmhlaWdodDtcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBjLndpZHRoLCBjLmhlaWdodCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0U2NhbkNhbnZhcyhpbWcpIHtcbiAgICBsZXQgYyA9IHNyZWYuY3VycmVudDtcbiAgICBjLndpZHRoID0gaW1nLndpZHRoICsgY3Vyc29yX3BhZGRpbmcgKiAyO1xuICAgIGMuaGVpZ2h0ID0gaW1nLmhlaWdodCArIGN1cnNvcl9wYWRkaW5nICogMjtcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdEltYWdlKHNyYywgZmlyc3RfbG9hZCA9IGZhbHNlKSB7XG4gICAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIGN1cnNvcl9wYWRkaW5nICogMjtcbiAgICBsZXQgaCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIGN1cnNvcl9wYWRkaW5nICogMiAtIDEwIC0gZnMgKiBsaDtcblxuICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgbGV0IGl3ID0gaW1nLndpZHRoO1xuICAgICAgbGV0IGloID0gaW1nLmhlaWdodDtcblxuICAgICAgbGV0IHdhID0gdyAvIGg7XG4gICAgICBsZXQgaWEgPSBpdyAvIGloO1xuXG4gICAgICBsZXQgcmVzaXplX2NoZWNrID0gZmFsc2U7XG4gICAgICBsZXQgcncsIHJoO1xuICAgICAgaWYgKGlhID49IHdhKSB7XG4gICAgICAgIGlmIChpdyA+IHcpIHtcbiAgICAgICAgICByZXNpemVfY2hlY2sgPSB0cnVlO1xuICAgICAgICAgIHJ3ID0gdztcbiAgICAgICAgICByaCA9IHcgLyBpYTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGloID4gaCkge1xuICAgICAgICAgIHJlc2l6ZV9jaGVjayA9IHRydWU7XG4gICAgICAgICAgcmggPSBoO1xuICAgICAgICAgIHJ3ID0gaCAqIGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXNpemVfY2hlY2spIHtcbiAgICAgICAgbGV0IGNvbmZpcm1fY2hlY2sgPSB0cnVlO1xuICAgICAgICBpZiAoIWZpcnN0X2xvYWQpIHtcbiAgICAgICAgICBjb25maXJtX2NoZWNrID0gY29uZmlybShcbiAgICAgICAgICAgIGBUaGUgaW1hZ2UgeW91IHNlbGVjdGVkIGlzIGxhcmdlciAoJHtpd314JHtpaH0pIHRoYW4gdGhlIGJyb3dzZXIgd2luZG93LiAgUmVzaXplIGl0IHRvIGZpdCAoJHtyd314JHtyaH0pPyBDaG9vc2UgY2FuY2VsIHRvIGltcG9ydCBpdCBhdCBmdWxsIHNpemUuYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpcm1fY2hlY2spIHtcbiAgICAgICAgICBpbWcud2lkdGggPSBydztcbiAgICAgICAgICBpbWcuaGVpZ2h0ID0gcmg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaW1hZ2UuY3VycmVudCA9IGltZztcblxuICAgICAgaW5pdEltYWdlQ2FudmFzKGltZyk7XG4gICAgICBpbml0U2NhbkNhbnZhcyhpbWcpO1xuICAgICAgZHJhd0N1cnNvcigpO1xuXG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGVycmVmLmN1cnJlbnQpO1xuICAgICAgcnVuRmxvdygpO1xuICAgICAgc2V0UmVhZCgpO1xuICAgIH07XG4gICAgaW1nLnNyYyA9IHNyYztcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdQb3NzRmxvd3MoKSB7XG4gICAgbGV0IGltID0gY3JlZi5jdXJyZW50O1xuICAgIGxldCBpdyA9IGltLm9mZnNldFdpZHRoO1xuICAgIGxldCBpaCA9IGltLm9mZnNldEhlaWdodDtcbiAgICBsZXQgY3Vyc29yID0gY3Vyc29ycmVmLmN1cnJlbnQ7XG4gICAgbGV0IHdlc3QgPSBbMCwgY3Vyc29yWzFdLCBjdXJzb3JbMF0sIGN1cnNvclszXV07XG4gICAgbGV0IGVhc3QgPSBbXG4gICAgICBjdXJzb3JbMF0gKyBjdXJzb3JbMl0sXG4gICAgICBjdXJzb3JbMV0sXG4gICAgICBpdyAtIChjdXJzb3JbMF0gKyBjdXJzb3JbMl0pLFxuICAgICAgY3Vyc29yWzNdLFxuICAgIF07XG4gICAgbGV0IG5vcnRoID0gW2N1cnNvclswXSwgMCwgY3Vyc29yWzJdLCBjdXJzb3JbMV1dO1xuICAgIGxldCBzb3V0aCA9IFtcbiAgICAgIGN1cnNvclswXSxcbiAgICAgIGN1cnNvclsxXSArIGN1cnNvclszXSxcbiAgICAgIGN1cnNvclsyXSxcbiAgICAgIGloIC0gKGN1cnNvclsxXSArIGN1cnNvclszXSksXG4gICAgXTtcbiAgICBsZXQgZGlycyA9IFt3ZXN0LCBlYXN0LCBub3J0aCwgc291dGhdO1xuICAgIGxldCBwYWRkZWRfZGlycyA9IGRpcnMubWFwKG4gPT5cbiAgICAgIG4ubWFwKCh2LCBpKSA9PiAoaSA9PT0gMCB8fCBpID09PSAxID8gdiArIGN1cnNvcl9wYWRkaW5nIDogdikpXG4gICAgKTtcbiAgICBsZXQgc3R4ID0gc3JlZi5jdXJyZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgc3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDAsMCwwLDAuMiknO1xuICAgIHN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDAsMCwwLDAuOCknO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFkZGVkX2RpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBkID0gcGFkZGVkX2RpcnNbaV07XG4gICAgICBzdHguZmlsbFJlY3QoLi4uZCk7XG4gICAgICBzdHguc3Ryb2tlUmVjdCguLi5kKTtcbiAgICB9XG4gICAgc3R4LnN0cm9rZVN0eWxlID0gJ3doaXRlJztcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZUZsb3dWaXNpYmlsaXR5KCkge1xuICAgIGNvbnNvbGUubG9nKCd0b2dnbGUgaXQnKTtcbiAgICBjb25zb2xlLmxvZyhmbG93c192aXNpYmxlLmN1cnJlbnQpO1xuICAgIGZsb3dzX3Zpc2libGUuY3VycmVudCA9ICFmbG93c192aXNpYmxlLmN1cnJlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3Rmxvd091dGxpbmVzKCkge1xuICAgIGxldCBzdHggPSBzcmVmLmN1cnJlbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBzdHguc3Ryb2tlU3R5bGUgPSAnI2FhYSc7XG4gICAgZm9yIChsZXQgZiA9IDA7IGYgPCBmbG93cy5jdXJyZW50Lmxlbmd0aDsgZisrKSB7XG4gICAgICBsZXQgZmxvdyA9IGZsb3dzLmN1cnJlbnRbZl07XG4gICAgICBzdHguc3Ryb2tlUmVjdChcbiAgICAgICAgZmxvd1swXSArIGN1cnNvcl9wYWRkaW5nLFxuICAgICAgICBmbG93WzFdICsgY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgIGZsb3dbMl0sXG4gICAgICAgIGZsb3dbM11cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZHJhd0N1cnNvcigpIHtcbiAgICBsZXQgc20gPSBzcmVmLmN1cnJlbnQ7XG4gICAgbGV0IHN3ID0gc20ub2Zmc2V0V2lkdGg7XG4gICAgbGV0IHNoID0gc20ub2Zmc2V0SGVpZ2h0O1xuXG4gICAgbGV0IHN0eCA9IHNyZWYuY3VycmVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGxldCBtb2RlID0gbW9kZXIuY3VycmVudDtcbiAgICBpZiAobW9kZSAhPT0gJ2FkanVzdF9mbG93Jykge1xuICAgICAgbGV0IGN1cnNvciA9IGN1cnNvcnJlZi5jdXJyZW50O1xuICAgICAgc3R4LnN0cm9rZVN0eWxlID0gbWFnZW50YTtcbiAgICAgIHN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgc3R4LnN0cm9rZVJlY3QoXG4gICAgICAgIGN1cnNvclswXSArIGN1cnNvcl9wYWRkaW5nLFxuICAgICAgICBjdXJzb3JbMV0gKyBjdXJzb3JfcGFkZGluZyxcbiAgICAgICAgY3Vyc29yWzJdLFxuICAgICAgICBjdXJzb3JbM11cbiAgICAgICk7XG5cbiAgICAgIGlmIChtb2RlID09PSAnYWRqdXN0X2N1cnNvcicpIHtcbiAgICAgICAgc3R4LmZpbGxTdHlsZSA9IG1hZ2VudGE7XG4gICAgICAgIHN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgc3R4LmFyYyhcbiAgICAgICAgICBjdXJzb3JbMF0gKyBjdXJzb3JfcGFkZGluZyxcbiAgICAgICAgICBjdXJzb3JbMV0gKyBjdXJzb3JfcGFkZGluZyxcbiAgICAgICAgICA0LFxuICAgICAgICAgIDAsXG4gICAgICAgICAgMiAqIE1hdGguUElcbiAgICAgICAgKTtcbiAgICAgICAgc3R4LmZpbGwoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjaG9vc2VGbG93KGRpcikge1xuICAgIGxldCBpbSA9IGNyZWYuY3VycmVudDtcbiAgICBsZXQgaXcgPSBpbS5vZmZzZXRXaWR0aDtcbiAgICBsZXQgaWggPSBpbS5vZmZzZXRIZWlnaHQ7XG5cbiAgICBtb2Rlci5jdXJyZW50ID0gJ2FkanVzdF9mbG93JztcbiAgICBzZXRNb2RlKCdhZGp1c3RfZmxvdycpO1xuICAgIGxldCBjdXJzb3IgPSBjdXJzb3JyZWYuY3VycmVudDtcbiAgICBpZiAoZGlyID09PSAndycpIHtcbiAgICAgIGZsb3dfbWFyay5jdXJyZW50ID0gWzAsIGN1cnNvclsxXSwgY3Vyc29yWzBdICsgY3Vyc29yWzJdLCBjdXJzb3JbM10sIGRpcl07XG4gICAgfSBlbHNlIGlmIChkaXIgPT09ICdlJykge1xuICAgICAgZmxvd19tYXJrLmN1cnJlbnQgPSBbXG4gICAgICAgIGN1cnNvclswXSxcbiAgICAgICAgY3Vyc29yWzFdLFxuICAgICAgICBpdyAtIGN1cnNvclswXSxcbiAgICAgICAgY3Vyc29yWzNdLFxuICAgICAgICBkaXIsXG4gICAgICBdO1xuICAgIH0gZWxzZSBpZiAoZGlyID09PSAnbicpIHtcbiAgICAgIGZsb3dfbWFyay5jdXJyZW50ID0gW2N1cnNvclswXSwgMCwgY3Vyc29yWzJdLCBjdXJzb3JbMV0gKyBjdXJzb3JbM10sIGRpcl07XG4gICAgfSBlbHNlIGlmIChkaXIgPT09ICdzJykge1xuICAgICAgZmxvd19tYXJrLmN1cnJlbnQgPSBbXG4gICAgICAgIGN1cnNvclswXSxcbiAgICAgICAgY3Vyc29yWzFdLFxuICAgICAgICBjdXJzb3JbMl0sXG4gICAgICAgIGloIC0gY3Vyc29yWzFdLFxuICAgICAgICBkaXIsXG4gICAgICBdO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bkZsb3coKSB7XG4gICAgbGV0IGMgPSBjcmVmLmN1cnJlbnQ7XG4gICAgbGV0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBsZXQgaXcgPSBjLm9mZnNldFdpZHRoO1xuICAgIGxldCBpaCA9IGMub2Zmc2V0SGVpZ2h0O1xuICAgIGZvciAobGV0IGYgPSAwOyBmIDwgZmxvd3MuY3VycmVudC5sZW5ndGg7IGYrKykge1xuICAgICAgbGV0IGZsb3cgPSBmbG93cy5jdXJyZW50W2ZdO1xuICAgICAgbGV0IHQgPSBmbG93TW92ZShmbG93LCBjKTtcbiAgICAgIGN0eC5kcmF3SW1hZ2UodCwgZmxvd1swXSwgZmxvd1sxXSwgZmxvd1syXSwgZmxvd1szXSk7XG4gICAgfVxuICAgIGhhbmRsZXJyZWYuY3VycmVudCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShydW5GbG93KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0RmxvdygpIHtcbiAgICBmbG93cy5jdXJyZW50LnB1c2goZmxvd19tYXJrLmN1cnJlbnQpO1xuICAgIG1vZGVyLmN1cnJlbnQgPSAnbW92ZSc7XG4gICAgc2V0TW9kZSgnbW92ZScpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0UmVhZCgpIHtcbiAgICBsZXQgaW0gPSBjcmVmLmN1cnJlbnQ7XG4gICAgbGV0IGl3ID0gaW0ub2Zmc2V0V2lkdGg7XG4gICAgbGV0IGloID0gaW0ub2Zmc2V0SGVpZ2h0O1xuICAgIGxldCBmbSA9IGZsb3dfbWFyay5jdXJyZW50O1xuXG4gICAgbGV0IGN1cnNvciA9IGN1cnNvcnJlZi5jdXJyZW50O1xuICAgIGxldCByZWFkID0gcmVhZHJlZi5jdXJyZW50O1xuICAgIGlmIChtb2Rlci5jdXJyZW50ID09PSAnYWRqdXN0X2Zsb3cnKSB7XG4gICAgICByZWFkLmlubmVySFRNTCA9IGAke2ZtWzBdfSwke2ZtWzFdfSAke2ZtWzJdfXgke1xuICAgICAgICBmbVszXVxuICAgICAgfSAke2ZtWzRdLnRvVXBwZXJDYXNlKCl9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVhZC5pbm5lckhUTUwgPSBgJHtpd314JHtpaH0gICR7Y3Vyc29yWzBdfSwke2N1cnNvclsxXX0gJHtjdXJzb3JbMl19eCR7XG4gICAgICAgIGN1cnNvclszXVxuICAgICAgfWA7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24ga2V5QWN0aW9uKGtleSwgcmVwZWF0KSB7XG4gICAgbGV0IGltID0gY3JlZi5jdXJyZW50O1xuICAgIGxldCBpdyA9IGltLm9mZnNldFdpZHRoO1xuICAgIGxldCBpaCA9IGltLm9mZnNldEhlaWdodDtcblxuICAgIGxldCBtID0ga2V5bWFwLmN1cnJlbnQ7XG4gICAgbGV0IGN1cnNvciA9IGN1cnNvcnJlZi5jdXJyZW50O1xuICAgIGxldCBtb2RlID0gbW9kZXIuY3VycmVudDtcblxuICAgIGlmIChrZXkgPT09ICcgJykge1xuICAgICAgaWYgKGhhbmRsZXJyZWYuY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGVycmVmLmN1cnJlbnQpO1xuICAgICAgICBoYW5kbGVycmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcnVuRmxvdygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChrZXkgPT09ICd2Jykge1xuICAgICAgdG9nZ2xlRmxvd1Zpc2liaWxpdHkoKTtcbiAgICB9XG5cbiAgICBpZiAoa2V5ID09PSAnYycpIHtcbiAgICAgIGxldCBjaGVja19jbGVhciA9IGNvbmZpcm0oJ0NsZWFyIGFsbCBmbG93cz8nKTtcbiAgICAgIGlmIChjaGVja19jbGVhcikgZmxvd3MuY3VycmVudCA9IFtdO1xuICAgICAgLy8gVE9ETyByZXNldCBpbWFnZVxuICAgIH1cblxuICAgIGlmIChrZXkgPT09ICd4JyAmJiAhcmVwZWF0KSB7XG4gICAgICBsZXQgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblxuICAgICAgdmFyIHJldm9rZVVSTCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgbWUgPSB0aGlzO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChtZS5ocmVmKTtcbiAgICAgICAgICBtZS5ocmVmID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZXZva2VVUkwpO1xuICAgICAgfTtcblxuICAgICAgY3JlZi5jdXJyZW50LnRvQmxvYihmdW5jdGlvbihibG9iKSB7XG4gICAgICAgIGxpbmsuc2V0QXR0cmlidXRlKFxuICAgICAgICAgICdkb3dubG9hZCcsXG4gICAgICAgICAgYGZsb3ctJHtuZXcgRGF0ZSgpXG4gICAgICAgICAgICAudG9JU09TdHJpbmcoKVxuICAgICAgICAgICAgLnJlcGxhY2UoLy0vZywgJycpXG4gICAgICAgICAgICAucmVwbGFjZSgvOi9nLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9fL2csICcnKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcLi9nLCAnJyl9LnBuZ2BcbiAgICAgICAgKTtcbiAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpKTtcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJldm9rZVVSTCk7XG4gICAgICAgIGxpbmsuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICBuZXcgTW91c2VFdmVudChgY2xpY2tgLCB7XG4gICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXc6IHdpbmRvdyxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gJ28nICYmICFyZXBlYXQpIHtcbiAgICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnZmlsZScpO1xuICAgICAgaW5wdXQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IE1vdXNlRXZlbnQoYGNsaWNrYCwge1xuICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICB2aWV3OiB3aW5kb3csXG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBmdW5jdGlvbiBoYW5kbGVDaGFuZ2UoZSkge1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5maWxlcykge1xuICAgICAgICAgIGlmIChpdGVtLnR5cGUuaW5kZXhPZignaW1hZ2UnKSA8IDApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChpdGVtKTtcbiAgICAgICAgICBpbml0SW1hZ2Uoc3JjKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGhhbmRsZUNoYW5nZSk7XG4gICAgICB9XG4gICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBoYW5kbGVDaGFuZ2UpO1xuICAgIH1cblxuICAgIGlmIChtb2Rlci5jdXJyZW50ID09PSAnbW92ZScpIHtcbiAgICAgIGxldCBpbmMgPSAxO1xuICAgICAgaWYgKG1bJ3NoaWZ0J10pIGluYyA9IDEwO1xuXG4gICAgICBpZiAobVsnaiddKSBjdXJzb3JbMV0gKz0gaW5jO1xuICAgICAgaWYgKG1bJ2snXSkgY3Vyc29yWzFdIC09IGluYztcbiAgICAgIGlmIChtWydoJ10pIGN1cnNvclswXSAtPSBpbmM7XG4gICAgICBpZiAobVsnbCddKSBjdXJzb3JbMF0gKz0gaW5jO1xuXG4gICAgICBpZiAoY3Vyc29yWzBdIDwgMCkgY3Vyc29yWzBdID0gMDtcbiAgICAgIGlmIChjdXJzb3JbMF0gKyBjdXJzb3JbMl0gPiBpdykgY3Vyc29yWzBdID0gaXcgLSBjdXJzb3JbMl07XG4gICAgICBpZiAoY3Vyc29yWzFdIDwgMCkgY3Vyc29yWzFdID0gMDtcbiAgICAgIGlmIChjdXJzb3JbMV0gKyBjdXJzb3JbM10gPiBpaCkgY3Vyc29yWzFdID0gaWggLSBjdXJzb3JbM107XG5cbiAgICAgIGlmIChrZXkgPT09ICcyJykge1xuICAgICAgICBtb2Rlci5jdXJyZW50ID0gJ2FkanVzdF9jdXJzb3InO1xuICAgICAgICBzZXRNb2RlKCdhZGp1c3RfY3Vyc29yJyk7XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnZW50ZXInKSB7XG4gICAgICAgIG1vZGVyLmN1cnJlbnQgPSAnY2hvb3NlX2Zsb3cnO1xuICAgICAgICBzZXRNb2RlKCdjaG9vc2VfZmxvdycpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZXIuY3VycmVudCA9PT0gJ2FkanVzdF9jdXJzb3InKSB7XG4gICAgICBsZXQgaW5jID0gMTtcbiAgICAgIGlmIChtWydzaGlmdCddKSBpbmMgPSAxMDtcblxuICAgICAgaWYgKG1bJ2onXSkgY3Vyc29yWzNdICs9IGluYztcbiAgICAgIGlmIChtWydrJ10pIGN1cnNvclszXSAtPSBpbmM7XG4gICAgICBpZiAobVsnaCddKSBjdXJzb3JbMl0gLT0gaW5jO1xuICAgICAgaWYgKG1bJ2wnXSkgY3Vyc29yWzJdICs9IGluYztcblxuICAgICAgaWYgKGN1cnNvclswXSArIGN1cnNvclsyXSA+IGl3KSBjdXJzb3JbMl0gPSBpdyAtIGN1cnNvclswXTtcbiAgICAgIGlmIChjdXJzb3JbMV0gKyBjdXJzb3JbM10gPiBpaCkgY3Vyc29yWzNdID0gaWggLSBjdXJzb3JbMV07XG4gICAgICBpZiAoY3Vyc29yWzJdIDwgMSkgY3Vyc29yWzJdID0gMTtcbiAgICAgIGlmIChjdXJzb3JbM10gPCAxKSBjdXJzb3JbM10gPSAxO1xuXG4gICAgICBpZiAoa2V5ID09PSAnZW50ZXInKSB7XG4gICAgICAgIG1vZGVyLmN1cnJlbnQgPSAnbW92ZSc7XG4gICAgICAgIHNldE1vZGUoJ21vdmUnKTtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdlc2NhcGUnKSB7XG4gICAgICAgIG1vZGVyLmN1cnJlbnQgPSAnbW92ZSc7XG4gICAgICAgIHNldE1vZGUoJ21vdmUnKTtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICcxJykge1xuICAgICAgICBtb2Rlci5jdXJyZW50ID0gJ21vdmUnO1xuICAgICAgICBzZXRNb2RlKCdtb3ZlJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtb2Rlci5jdXJyZW50ID09PSAnY2hvb3NlX2Zsb3cnKSB7XG4gICAgICBpZiAoa2V5ID09PSAnYScpIHtcbiAgICAgICAgY2hvb3NlRmxvdygndycpO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICd3Jykge1xuICAgICAgICBjaG9vc2VGbG93KCduJyk7XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ3MnKSB7XG4gICAgICAgIGNob29zZUZsb3coJ3MnKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnZCcpIHtcbiAgICAgICAgY2hvb3NlRmxvdygnZScpO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ2VzY2FwZScpIHtcbiAgICAgICAgbW9kZXIuY3VycmVudCA9ICdtb3ZlJztcbiAgICAgICAgc2V0TW9kZSgnbW92ZScpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZXIuY3VycmVudCA9PT0gJ2FkanVzdF9mbG93Jykge1xuICAgICAgbGV0IGZtID0gZmxvd19tYXJrLmN1cnJlbnQ7XG4gICAgICBpZiAoa2V5ID09PSAnZXNjYXBlJykge1xuICAgICAgICBtb2Rlci5jdXJyZW50ID0gJ2Nob29zZV9mbG93JztcbiAgICAgICAgc2V0TW9kZSgnY2hvb3NlX2Zsb3cnKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnZW50ZXInKSB7XG4gICAgICAgIHN0YXJ0RmxvdygpO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdmJykge1xuICAgICAgICBpZiAoZm1bNF0gPT09ICd3Jykge1xuICAgICAgICAgIGZtWzRdID0gJ2UnO1xuICAgICAgICB9IGVsc2UgaWYgKGZtWzRdID09PSAnZScpIHtcbiAgICAgICAgICBmbVs0XSA9ICd3JztcbiAgICAgICAgfSBlbHNlIGlmIChmbVs0XSA9PT0gJ24nKSB7XG4gICAgICAgICAgZm1bNF0gPSAncyc7XG4gICAgICAgIH0gZWxzZSBpZiAoZm1bNF0gPT09ICdzJykge1xuICAgICAgICAgIGZtWzRdID0gJ24nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBzbSA9IHNyZWYuY3VycmVudDtcbiAgICBsZXQgc3cgPSBzbS5vZmZzZXRXaWR0aDtcbiAgICBsZXQgc2ggPSBzbS5vZmZzZXRIZWlnaHQ7XG4gICAgbGV0IHN0eCA9IHNyZWYuY3VycmVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHN0eC5jbGVhclJlY3QoMCwgMCwgc3csIHNoKTtcbiAgICBpZiAoZmxvd3NfdmlzaWJsZS5jdXJyZW50KSB7XG4gICAgICBkcmF3Rmxvd091dGxpbmVzKCk7XG4gICAgfVxuICAgIGlmIChtb2Rlci5jdXJyZW50ID09PSAnY2hvb3NlX2Zsb3cnKSB7XG4gICAgICBkcmF3UG9zc0Zsb3dzKCk7XG4gICAgfSBlbHNlIGlmIChtb2Rlci5jdXJyZW50ID09PSAnYWRqdXN0X2Zsb3cnKSB7XG4gICAgICBzdHguc3Ryb2tlU3R5bGUgPSBncmVlbjtcbiAgICAgIGxldCBmbSA9IGZsb3dfbWFyay5jdXJyZW50O1xuICAgICAgc3R4LnN0cm9rZVJlY3QoXG4gICAgICAgIGZtWzBdICsgY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgIGZtWzFdICsgY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgIGZtWzJdLFxuICAgICAgICBmbVszXVxuICAgICAgKTtcbiAgICAgIHN0eC5maWxsU3R5bGUgPSBncmVlbjtcbiAgICAgIHN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGxldCB4YTtcbiAgICAgIGxldCB5YTtcbiAgICAgIGlmIChmbVs0XSA9PT0gJ2UnKSB7XG4gICAgICAgIHhhID0gZm1bMF07XG4gICAgICAgIHlhID0gZm1bMV0gKyBmbVszXSAvIDI7XG4gICAgICB9IGVsc2UgaWYgKGZtWzRdID09PSAncycpIHtcbiAgICAgICAgeGEgPSBmbVswXSArIGZtWzJdIC8gMjtcbiAgICAgICAgeWEgPSBmbVsxXTtcbiAgICAgIH0gZWxzZSBpZiAoZm1bNF0gPT09ICd3Jykge1xuICAgICAgICB4YSA9IGZtWzBdICsgZm1bMl07XG4gICAgICAgIHlhID0gZm1bMV0gKyBmbVszXSAvIDI7XG4gICAgICB9IGVsc2UgaWYgKGZtWzRdID09PSAnbicpIHtcbiAgICAgICAgeGEgPSBmbVswXSArIGZtWzJdIC8gMjtcbiAgICAgICAgeWEgPSBmbVsxXSArIGZtWzNdO1xuICAgICAgfVxuICAgICAgc3R4LmFyYyh4YSArIGN1cnNvcl9wYWRkaW5nLCB5YSArIGN1cnNvcl9wYWRkaW5nLCA0LCAwLCAyICogTWF0aC5QSSk7XG4gICAgICBzdHguZmlsbCgpO1xuICAgIH1cbiAgICBkcmF3Q3Vyc29yKCk7XG5cbiAgICBzZXRSZWFkKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkb3duSGFuZGxlcihlKSB7XG4gICAga2V5bWFwLmN1cnJlbnRbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgIGtleUFjdGlvbihlLmtleS50b0xvd2VyQ2FzZSgpLCBlLnJlcGVhdCk7XG4gIH1cblxuICBmdW5jdGlvbiB1cEhhbmRsZXIoZSkge1xuICAgIGtleW1hcC5jdXJyZW50W2Uua2V5LnRvTG93ZXJDYXNlKCldID0gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBvblBhc3RlKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZS5jbGlwYm9hcmREYXRhLml0ZW1zKSB7XG4gICAgICBpZiAoaXRlbS50eXBlLmluZGV4T2YoJ2ltYWdlJykgPCAwKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgbGV0IGZpbGUgPSBpdGVtLmdldEFzRmlsZSgpO1xuICAgICAgbGV0IHNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XG4gICAgICBpbml0SW1hZ2Uoc3JjKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkRyYWcoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weSc7XG4gIH1cblxuICBmdW5jdGlvbiBvbkRyb3AoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGxldCBmaWxlID0gZS5kYXRhVHJhbnNmZXIuZmlsZXNbMF07XG4gICAgbGV0IGZpbGVuYW1lID0gZmlsZS5wYXRoID8gZmlsZS5wYXRoIDogZmlsZS5uYW1lID8gZmlsZS5uYW1lIDogJyc7XG4gICAgbGV0IHNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XG4gICAgaW5pdEltYWdlKHNyYyk7XG4gIH1cblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZG93bkhhbmRsZXIpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVwSGFuZGxlcik7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Bhc3RlJywgb25QYXN0ZSwgZmFsc2UpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIG9uRHJhZywgZmFsc2UpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgb25Ecm9wLCBmYWxzZSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZG93bkhhbmRsZXIpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBIYW5kbGVyKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwYXN0ZScsIG9uUGFzdGUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgb25EcmFnLCBmYWxzZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJvcCcsIG9uRHJvcCwgZmFsc2UpO1xuICAgICAgaWYgKGhhbmRsZXJyZWYuY3VycmVudCAhPT0gbnVsbCkgY2FuY2VsQW5pbWF0aW9uRnJhbWUoaGFuZGxlcnJlZi5jdXJyZW50KTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpbml0SW1hZ2UoJy95eXkuanBnJywgdHJ1ZSk7XG4gICAgLy8gaW5pdEltYWdlKCcvaGVyb2VzLmpwZycpO1xuICAgIC8vIGluaXRJbWFnZSgnL21lc3RyaXAucG5nJyk7XG4gICAgLy8gaW5pdEltYWdlKCcvc2NydWdncy5qcGcnKTtcbiAgICAvLyBpbml0SW1hZ2UoJy9ma2EuanBnJyk7XG4gICAgLy8gaW5pdEltYWdlKCcvZ3JhbnQucG5nJyk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPHRpdGxlPldhdGVyZmFsbHM8L3RpdGxlPlxuICAgICAgICA8bGluayByZWw9XCJpY29uXCIgaHJlZj1cIi9mYXZpY29uLmljb1wiIC8+XG4gICAgICA8L0hlYWQ+XG4gICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnLCBwYWRkaW5nOiBjdXJzb3JfcGFkZGluZyB9fT5cbiAgICAgICAgPGNhbnZhcyByZWY9e2NyZWZ9IC8+XG4gICAgICAgIDxjYW52YXNcbiAgICAgICAgICByZWY9e3NyZWZ9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgbWFyZ2luTGVmdDogY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiBjdXJzb3JfcGFkZGluZyxcbiAgICAgICAgICB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLFxuICAgICAgICB9fVxuICAgICAgICByZWY9e3JlYWRyZWZ9XG4gICAgICAvPlxuICAgICAgPEluZm8gcmxoPXtybGh9IG1vZGU9e21vZGV9IC8+XG5cbiAgICAgIDxzdHlsZSBnbG9iYWwganN4PntgXG4gICAgICAgIEBmb250LWZhY2Uge1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiAnY3VzdG9tJztcbiAgICAgICAgICBzcmM6IHVybCgnL0lCTVBsZXhNb25vLVJlZ3VsYXIud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXG4gICAgICAgICAgICB1cmwoJy9JQk1QbGV4TW9uby1SZWd1bGFyLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTtcbiAgICAgICAgfVxuICAgICAgICAqIHtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB9XG4gICAgICAgIGh0bWwge1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiBjdXN0b20sIG1vbm9zcGFjZTtcbiAgICAgICAgICBmb250LXNpemU6ICR7ZnN9cHg7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6ICR7bGh9O1xuICAgICAgICB9XG4gICAgICAgIGJvZHkge1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICB9XG4gICAgICAgIGNhbnZhcyB7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIH1cbiAgICAgIGB9PC9zdHlsZT5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhvbWU7XG4iXX0= */\n/*@ sourceURL=/Users/grant.custer/Sites/constraint-systems/flow/pages/index.js */")));
};

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ })

})
//# sourceMappingURL=index.js.3200e0b3ddf1b82571c0.hot-update.js.map