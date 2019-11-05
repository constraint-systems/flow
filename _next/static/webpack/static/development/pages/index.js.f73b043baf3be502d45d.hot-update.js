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

      image.current = img;
      moder.current = 'move';
      cursorref.current[0] = 0;
      cursorref.current[1] = 0;
      cursorref.current[2] = Math.min(cursorref.current[2], iw);
      cursorref.current[3] = Math.min(cursorref.current[3], ih);
      flows.current = [];
      flow_mark.current = null;
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
        link.setAttribute('download', "flow-".concat(new Date().toISOString().slice(0, -4).replace(/-/g, '').replace(/:/g, '').replace(/_/g, '').replace(/\./g, ''), "Z.png"));
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
      lineNumber: 566
    },
    __self: this
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_5___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 567
    },
    __self: this
  }, __jsx("title", {
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_2___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 568
    },
    __self: this
  }, "Waterfalls"), __jsx("link", {
    rel: "icon",
    href: "/favicon.ico",
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_2___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 569
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
      lineNumber: 571
    },
    __self: this
  }, __jsx("canvas", {
    ref: cref,
    className: styled_jsx_style__WEBPACK_IMPORTED_MODULE_2___default.a.dynamic([["632941774", [fs, lh]]]),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 572
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
      lineNumber: 573
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
      lineNumber: 583
    },
    __self: this
  }), __jsx(_components_info__WEBPACK_IMPORTED_MODULE_6__["default"], {
    rlh: rlh,
    mode: mode,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 591
    },
    __self: this
  }), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_2___default.a, {
    id: "632941774",
    dynamic: [fs, lh],
    __self: this
  }, "@font-face{font-family:'custom';src:url('/IBMPlexMono-Regular.woff2') format('woff2'), url('/IBMPlexMono-Regular.woff') format('woff');}*{box-sizing:border-box;}html{font-family:custom,monospace;font-size:".concat(fs, "px;line-height:").concat(lh, ";}body{margin:0;padding:0;}canvas{display:block;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9ncmFudC5jdXN0ZXIvU2l0ZXMvY29uc3RyYWludC1zeXN0ZW1zL2Zsb3cvcGFnZXMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ2xCeUIsQUFHZ0MsQUFLQyxBQUdRLEFBS3JCLEFBSUssU0FISixLQUlaLEtBSEEsRUFibUQsQ0FJbkQsT0FHMkMseUNBQ0EseUNBQzNDLGFBUkEiLCJmaWxlIjoiL1VzZXJzL2dyYW50LmN1c3Rlci9TaXRlcy9jb25zdHJhaW50LXN5c3RlbXMvZmxvdy9wYWdlcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZmxvd01vdmUgfSBmcm9tICcuLi9jb21wb25lbnRzL2Zsb3dzJztcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCc7XG5pbXBvcnQgSW5mbyBmcm9tICcuLi9jb21wb25lbnRzL2luZm8nO1xuXG5sZXQgY3Vyc29yX3BhZGRpbmcgPSAxMDtcbmxldCBtYWdlbnRhID0gJ3JnYmEoMjU1LDAsMjU1LDEpJztcbmxldCBncmVlbiA9ICdyZ2JhKDAsMjU1LDAsMSknO1xubGV0IGZzID0gMTQ7XG5sZXQgbGggPSAxLjU7XG5sZXQgcmxoID0gZnMgKiBsaDtcbmxldCBtYXhjaCA9ICc4MGNoJztcbmxldCBjb2xvciA9ICdsaWdodCc7XG5cbmNvbnN0IEhvbWUgPSAoKSA9PiB7XG4gIGxldCBjcmVmID0gdXNlUmVmKG51bGwpO1xuICBsZXQgc3JlZiA9IHVzZVJlZihudWxsKTtcbiAgbGV0IHVyZWYgPSB1c2VSZWYobnVsbCk7XG4gIGxldCBrZXltYXAgPSB1c2VSZWYoe30pO1xuICBsZXQgcmVhZHJlZiA9IHVzZVJlZihudWxsKTtcbiAgbGV0IGN1cnNvcnJlZiA9IHVzZVJlZihbMCwgMCwgMjAsIDIwXSk7XG4gIGxldCBoYW5kbGVycmVmID0gdXNlUmVmKG51bGwpO1xuICBsZXQgbW9kZXIgPSB1c2VSZWYoJ21vdmUnKTtcbiAgbGV0IGZsb3dfbWFyayA9IHVzZVJlZihudWxsKTtcbiAgbGV0IGZsb3dzID0gdXNlUmVmKFtdKTtcbiAgbGV0IGZsb3dzX3Zpc2libGUgPSB1c2VSZWYoZmFsc2UpO1xuICBsZXQgW2hlbHAsIHNldEhlbHBdID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGxldCBbbW9kZSwgc2V0TW9kZV0gPSB1c2VTdGF0ZSgnbW92ZScpO1xuICBsZXQgaW1hZ2UgPSB1c2VSZWYobnVsbCk7XG5cbiAgZnVuY3Rpb24gS2V5VGlwKGxldHRlciwgY29sb3IpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW5cbiAgICAgICAgY2xhc3NOYW1lPVwia2V5dGlwXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgIGtleW1hcHIuY3VycmVudFtsZXR0ZXJdID0gdHJ1ZTtcbiAgICAgICAgICBrZXlBY3Rpb24obGV0dGVyLCBmYWxzZSk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBrZXltYXByLmN1cnJlbnRbbGV0dGVyXSA9IGZhbHNlO1xuICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH19XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgb3V0bGluZTogY29sb3IgPT09ICdkYXJrJyA/ICdzb2xpZCAxcHggd2hpdGUnIDogJ3NvbGlkIDFweCBibGFjaycsXG4gICAgICAgICAgcGFkZGluZ0xlZnQ6ICcwLjVjaCcsXG4gICAgICAgICAgcGFkZGluZ1JpZ2h0OiAnMC41Y2gnLFxuICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgdXNlclNlbGVjdDogJ25vbmUnLFxuICAgICAgICAgIGN1cnNvcjogJ2RlZmF1bHQnLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7bGV0dGVyID09PSAnICcgPyAnc3BhY2ViYXInIDogbGV0dGVyfVxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0SW1hZ2VDYW52YXMoaW1nKSB7XG4gICAgbGV0IGMgPSBjcmVmLmN1cnJlbnQ7XG4gICAgYy53aWR0aCA9IGltZy53aWR0aDtcbiAgICBjLmhlaWdodCA9IGltZy5oZWlnaHQ7XG4gICAgbGV0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCwgYy53aWR0aCwgYy5oZWlnaHQpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdFNjYW5DYW52YXMoaW1nKSB7XG4gICAgbGV0IGMgPSBzcmVmLmN1cnJlbnQ7XG4gICAgYy53aWR0aCA9IGltZy53aWR0aCArIGN1cnNvcl9wYWRkaW5nICogMjtcbiAgICBjLmhlaWdodCA9IGltZy5oZWlnaHQgKyBjdXJzb3JfcGFkZGluZyAqIDI7XG4gICAgbGV0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRJbWFnZShzcmMsIGZpcnN0X2xvYWQgPSBmYWxzZSkge1xuICAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGggLSBjdXJzb3JfcGFkZGluZyAqIDI7XG4gICAgbGV0IGggPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSBjdXJzb3JfcGFkZGluZyAqIDIgLSAxMCAtIGZzICogbGg7XG5cbiAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGxldCBpdyA9IGltZy53aWR0aDtcbiAgICAgIGxldCBpaCA9IGltZy5oZWlnaHQ7XG5cbiAgICAgIGxldCB3YSA9IHcgLyBoO1xuICAgICAgbGV0IGlhID0gaXcgLyBpaDtcblxuICAgICAgbGV0IHJlc2l6ZV9jaGVjayA9IGZhbHNlO1xuICAgICAgbGV0IHJ3LCByaDtcbiAgICAgIGlmIChpYSA+PSB3YSkge1xuICAgICAgICBpZiAoaXcgPiB3KSB7XG4gICAgICAgICAgcmVzaXplX2NoZWNrID0gdHJ1ZTtcbiAgICAgICAgICBydyA9IHc7XG4gICAgICAgICAgcmggPSB3IC8gaWE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpaCA+IGgpIHtcbiAgICAgICAgICByZXNpemVfY2hlY2sgPSB0cnVlO1xuICAgICAgICAgIHJoID0gaDtcbiAgICAgICAgICBydyA9IGggKiBpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocmVzaXplX2NoZWNrKSB7XG4gICAgICAgIGxldCBjb25maXJtX2NoZWNrID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFmaXJzdF9sb2FkKSB7XG4gICAgICAgICAgY29uZmlybV9jaGVjayA9IGNvbmZpcm0oXG4gICAgICAgICAgICBgVGhlIGltYWdlIHlvdSBzZWxlY3RlZCBpcyBsYXJnZXIgKCR7aXd9eCR7aWh9KSB0aGFuIHRoZSBicm93c2VyIHdpbmRvdy4gIFJlc2l6ZSBpdCB0byBmaXQgKCR7cnd9eCR7cmh9KT8gQ2hvb3NlIGNhbmNlbCB0byBpbXBvcnQgaXQgYXQgZnVsbCBzaXplLmBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maXJtX2NoZWNrKSB7XG4gICAgICAgICAgaW1nLndpZHRoID0gcnc7XG4gICAgICAgICAgaW1nLmhlaWdodCA9IHJoO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGltYWdlLmN1cnJlbnQgPSBpbWc7XG5cbiAgICAgIG1vZGVyLmN1cnJlbnQgPSAnbW92ZSdcbiAgICAgIGN1cnNvcnJlZi5jdXJyZW50WzBdID0gMFxuICAgICAgY3Vyc29ycmVmLmN1cnJlbnRbMV0gPSAwXG4gICAgICBjdXJzb3JyZWYuY3VycmVudFsyXSA9IE1hdGgubWluKGN1cnNvcnJlZi5jdXJyZW50WzJdLCBpdylcbiAgICAgIGN1cnNvcnJlZi5jdXJyZW50WzNdID0gTWF0aC5taW4oY3Vyc29ycmVmLmN1cnJlbnRbM10sIGloKVxuICAgICAgZmxvd3MuY3VycmVudCA9IFtdXG4gICAgICBmbG93X21hcmsuY3VycmVudCA9IG51bGxcblxuXG4gICAgICBpbml0SW1hZ2VDYW52YXMoaW1nKTtcbiAgICAgIGluaXRTY2FuQ2FudmFzKGltZyk7XG4gICAgICBkcmF3Q3Vyc29yKCk7XG5cbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGhhbmRsZXJyZWYuY3VycmVudCk7XG4gICAgICBydW5GbG93KCk7XG4gICAgICBzZXRSZWFkKCk7XG4gICAgfTtcbiAgICBpbWcuc3JjID0gc3JjO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJhd1Bvc3NGbG93cygpIHtcbiAgICBsZXQgaW0gPSBjcmVmLmN1cnJlbnQ7XG4gICAgbGV0IGl3ID0gaW0ub2Zmc2V0V2lkdGg7XG4gICAgbGV0IGloID0gaW0ub2Zmc2V0SGVpZ2h0O1xuICAgIGxldCBjdXJzb3IgPSBjdXJzb3JyZWYuY3VycmVudDtcbiAgICBsZXQgd2VzdCA9IFswLCBjdXJzb3JbMV0sIGN1cnNvclswXSwgY3Vyc29yWzNdXTtcbiAgICBsZXQgZWFzdCA9IFtcbiAgICAgIGN1cnNvclswXSArIGN1cnNvclsyXSxcbiAgICAgIGN1cnNvclsxXSxcbiAgICAgIGl3IC0gKGN1cnNvclswXSArIGN1cnNvclsyXSksXG4gICAgICBjdXJzb3JbM10sXG4gICAgXTtcbiAgICBsZXQgbm9ydGggPSBbY3Vyc29yWzBdLCAwLCBjdXJzb3JbMl0sIGN1cnNvclsxXV07XG4gICAgbGV0IHNvdXRoID0gW1xuICAgICAgY3Vyc29yWzBdLFxuICAgICAgY3Vyc29yWzFdICsgY3Vyc29yWzNdLFxuICAgICAgY3Vyc29yWzJdLFxuICAgICAgaWggLSAoY3Vyc29yWzFdICsgY3Vyc29yWzNdKSxcbiAgICBdO1xuICAgIGxldCBkaXJzID0gW3dlc3QsIGVhc3QsIG5vcnRoLCBzb3V0aF07XG4gICAgbGV0IHBhZGRlZF9kaXJzID0gZGlycy5tYXAobiA9PlxuICAgICAgbi5tYXAoKHYsIGkpID0+IChpID09PSAwIHx8IGkgPT09IDEgPyB2ICsgY3Vyc29yX3BhZGRpbmcgOiB2KSlcbiAgICApO1xuICAgIGxldCBzdHggPSBzcmVmLmN1cnJlbnQuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBzdHguZmlsbFN0eWxlID0gJ3JnYmEoMCwwLDAsMC4yKSc7XG4gICAgc3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoMCwwLDAsMC44KSc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWRkZWRfZGlycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGQgPSBwYWRkZWRfZGlyc1tpXTtcbiAgICAgIHN0eC5maWxsUmVjdCguLi5kKTtcbiAgICAgIHN0eC5zdHJva2VSZWN0KC4uLmQpO1xuICAgIH1cbiAgICBzdHguc3Ryb2tlU3R5bGUgPSAnd2hpdGUnO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlRmxvd1Zpc2liaWxpdHkoKSB7XG4gICAgY29uc29sZS5sb2coJ3RvZ2dsZSBpdCcpO1xuICAgIGNvbnNvbGUubG9nKGZsb3dzX3Zpc2libGUuY3VycmVudCk7XG4gICAgZmxvd3NfdmlzaWJsZS5jdXJyZW50ID0gIWZsb3dzX3Zpc2libGUuY3VycmVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdGbG93T3V0bGluZXMoKSB7XG4gICAgbGV0IHN0eCA9IHNyZWYuY3VycmVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHN0eC5zdHJva2VTdHlsZSA9ICcjYWFhJztcbiAgICBmb3IgKGxldCBmID0gMDsgZiA8IGZsb3dzLmN1cnJlbnQubGVuZ3RoOyBmKyspIHtcbiAgICAgIGxldCBmbG93ID0gZmxvd3MuY3VycmVudFtmXTtcbiAgICAgIHN0eC5zdHJva2VSZWN0KFxuICAgICAgICBmbG93WzBdICsgY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgIGZsb3dbMV0gKyBjdXJzb3JfcGFkZGluZyxcbiAgICAgICAgZmxvd1syXSxcbiAgICAgICAgZmxvd1szXVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3Q3Vyc29yKCkge1xuICAgIGxldCBzbSA9IHNyZWYuY3VycmVudDtcbiAgICBsZXQgc3cgPSBzbS5vZmZzZXRXaWR0aDtcbiAgICBsZXQgc2ggPSBzbS5vZmZzZXRIZWlnaHQ7XG5cbiAgICBsZXQgc3R4ID0gc3JlZi5jdXJyZW50LmdldENvbnRleHQoJzJkJyk7XG4gICAgbGV0IG1vZGUgPSBtb2Rlci5jdXJyZW50O1xuICAgIGlmIChtb2RlICE9PSAnYWRqdXN0X2Zsb3cnKSB7XG4gICAgICBsZXQgY3Vyc29yID0gY3Vyc29ycmVmLmN1cnJlbnQ7XG4gICAgICBzdHguc3Ryb2tlU3R5bGUgPSBtYWdlbnRhO1xuICAgICAgc3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICBzdHguc3Ryb2tlUmVjdChcbiAgICAgICAgY3Vyc29yWzBdICsgY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgIGN1cnNvclsxXSArIGN1cnNvcl9wYWRkaW5nLFxuICAgICAgICBjdXJzb3JbMl0sXG4gICAgICAgIGN1cnNvclszXVxuICAgICAgKTtcblxuICAgICAgaWYgKG1vZGUgPT09ICdhZGp1c3RfY3Vyc29yJykge1xuICAgICAgICBzdHguZmlsbFN0eWxlID0gbWFnZW50YTtcbiAgICAgICAgc3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBzdHguYXJjKFxuICAgICAgICAgIGN1cnNvclswXSArIGN1cnNvcl9wYWRkaW5nLFxuICAgICAgICAgIGN1cnNvclsxXSArIGN1cnNvcl9wYWRkaW5nLFxuICAgICAgICAgIDQsXG4gICAgICAgICAgMCxcbiAgICAgICAgICAyICogTWF0aC5QSVxuICAgICAgICApO1xuICAgICAgICBzdHguZmlsbCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNob29zZUZsb3coZGlyKSB7XG4gICAgbGV0IGltID0gY3JlZi5jdXJyZW50O1xuICAgIGxldCBpdyA9IGltLm9mZnNldFdpZHRoO1xuICAgIGxldCBpaCA9IGltLm9mZnNldEhlaWdodDtcblxuICAgIG1vZGVyLmN1cnJlbnQgPSAnYWRqdXN0X2Zsb3cnO1xuICAgIHNldE1vZGUoJ2FkanVzdF9mbG93Jyk7XG4gICAgbGV0IGN1cnNvciA9IGN1cnNvcnJlZi5jdXJyZW50O1xuICAgIGlmIChkaXIgPT09ICd3Jykge1xuICAgICAgZmxvd19tYXJrLmN1cnJlbnQgPSBbMCwgY3Vyc29yWzFdLCBjdXJzb3JbMF0gKyBjdXJzb3JbMl0sIGN1cnNvclszXSwgZGlyXTtcbiAgICB9IGVsc2UgaWYgKGRpciA9PT0gJ2UnKSB7XG4gICAgICBmbG93X21hcmsuY3VycmVudCA9IFtcbiAgICAgICAgY3Vyc29yWzBdLFxuICAgICAgICBjdXJzb3JbMV0sXG4gICAgICAgIGl3IC0gY3Vyc29yWzBdLFxuICAgICAgICBjdXJzb3JbM10sXG4gICAgICAgIGRpcixcbiAgICAgIF07XG4gICAgfSBlbHNlIGlmIChkaXIgPT09ICduJykge1xuICAgICAgZmxvd19tYXJrLmN1cnJlbnQgPSBbY3Vyc29yWzBdLCAwLCBjdXJzb3JbMl0sIGN1cnNvclsxXSArIGN1cnNvclszXSwgZGlyXTtcbiAgICB9IGVsc2UgaWYgKGRpciA9PT0gJ3MnKSB7XG4gICAgICBmbG93X21hcmsuY3VycmVudCA9IFtcbiAgICAgICAgY3Vyc29yWzBdLFxuICAgICAgICBjdXJzb3JbMV0sXG4gICAgICAgIGN1cnNvclsyXSxcbiAgICAgICAgaWggLSBjdXJzb3JbMV0sXG4gICAgICAgIGRpcixcbiAgICAgIF07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcnVuRmxvdygpIHtcbiAgICBsZXQgYyA9IGNyZWYuY3VycmVudDtcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGxldCBpdyA9IGMub2Zmc2V0V2lkdGg7XG4gICAgbGV0IGloID0gYy5vZmZzZXRIZWlnaHQ7XG4gICAgZm9yIChsZXQgZiA9IDA7IGYgPCBmbG93cy5jdXJyZW50Lmxlbmd0aDsgZisrKSB7XG4gICAgICBsZXQgZmxvdyA9IGZsb3dzLmN1cnJlbnRbZl07XG4gICAgICBsZXQgdCA9IGZsb3dNb3ZlKGZsb3csIGMpO1xuICAgICAgY3R4LmRyYXdJbWFnZSh0LCBmbG93WzBdLCBmbG93WzFdLCBmbG93WzJdLCBmbG93WzNdKTtcbiAgICB9XG4gICAgaGFuZGxlcnJlZi5jdXJyZW50ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJ1bkZsb3cpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnRGbG93KCkge1xuICAgIGZsb3dzLmN1cnJlbnQucHVzaChmbG93X21hcmsuY3VycmVudCk7XG4gICAgbW9kZXIuY3VycmVudCA9ICdtb3ZlJztcbiAgICBzZXRNb2RlKCdtb3ZlJyk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRSZWFkKCkge1xuICAgIGxldCBpbSA9IGNyZWYuY3VycmVudDtcbiAgICBsZXQgaXcgPSBpbS5vZmZzZXRXaWR0aDtcbiAgICBsZXQgaWggPSBpbS5vZmZzZXRIZWlnaHQ7XG4gICAgbGV0IGZtID0gZmxvd19tYXJrLmN1cnJlbnQ7XG5cbiAgICBsZXQgY3Vyc29yID0gY3Vyc29ycmVmLmN1cnJlbnQ7XG4gICAgbGV0IHJlYWQgPSByZWFkcmVmLmN1cnJlbnQ7XG4gICAgaWYgKG1vZGVyLmN1cnJlbnQgPT09ICdhZGp1c3RfZmxvdycpIHtcbiAgICAgIHJlYWQuaW5uZXJIVE1MID0gYCR7Zm1bMF19LCR7Zm1bMV19ICR7Zm1bMl19eCR7XG4gICAgICAgIGZtWzNdXG4gICAgICB9ICR7Zm1bNF0udG9VcHBlckNhc2UoKX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWFkLmlubmVySFRNTCA9IGAke2l3fXgke2lofSAgJHtjdXJzb3JbMF19LCR7Y3Vyc29yWzFdfSAke2N1cnNvclsyXX14JHtcbiAgICAgICAgY3Vyc29yWzNdXG4gICAgICB9YDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBrZXlBY3Rpb24oa2V5LCByZXBlYXQpIHtcbiAgICBsZXQgaW0gPSBjcmVmLmN1cnJlbnQ7XG4gICAgbGV0IGl3ID0gaW0ub2Zmc2V0V2lkdGg7XG4gICAgbGV0IGloID0gaW0ub2Zmc2V0SGVpZ2h0O1xuXG4gICAgbGV0IG0gPSBrZXltYXAuY3VycmVudDtcbiAgICBsZXQgY3Vyc29yID0gY3Vyc29ycmVmLmN1cnJlbnQ7XG4gICAgbGV0IG1vZGUgPSBtb2Rlci5jdXJyZW50O1xuXG4gICAgaWYgKGtleSA9PT0gJyAnKSB7XG4gICAgICBpZiAoaGFuZGxlcnJlZi5jdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGhhbmRsZXJyZWYuY3VycmVudCk7XG4gICAgICAgIGhhbmRsZXJyZWYuY3VycmVudCA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBydW5GbG93KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gJ3YnKSB7XG4gICAgICB0b2dnbGVGbG93VmlzaWJpbGl0eSgpO1xuICAgIH1cblxuICAgIGlmIChrZXkgPT09ICdjJykge1xuICAgICAgbGV0IGNoZWNrX2NsZWFyID0gY29uZmlybSgnQ2xlYXIgYWxsIGZsb3dzPycpO1xuICAgICAgaWYgKGNoZWNrX2NsZWFyKSBmbG93cy5jdXJyZW50ID0gW107XG4gICAgICAvLyBUT0RPIHJlc2V0IGltYWdlXG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gJ3gnICYmICFyZXBlYXQpIHtcbiAgICAgIGxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXG4gICAgICB2YXIgcmV2b2tlVVJMID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBtZSA9IHRoaXM7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKG1lLmhyZWYpO1xuICAgICAgICAgIG1lLmhyZWYgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHJldm9rZVVSTCk7XG4gICAgICB9O1xuXG4gICAgICBjcmVmLmN1cnJlbnQudG9CbG9iKGZ1bmN0aW9uKGJsb2IpIHtcbiAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgJ2Rvd25sb2FkJyxcbiAgICAgICAgICBgZmxvdy0ke25ldyBEYXRlKClcbiAgICAgICAgICAgIC50b0lTT1N0cmluZygpXG4gICAgICAgICAgICAuc2xpY2UoMCwgLTQpXG4gICAgICAgICAgICAucmVwbGFjZSgvLS9nLCAnJylcbiAgICAgICAgICAgIC5yZXBsYWNlKC86L2csICcnKVxuICAgICAgICAgICAgLnJlcGxhY2UoL18vZywgJycpXG4gICAgICAgICAgICAucmVwbGFjZSgvXFwuL2csICcnKX1aLnBuZ2BcbiAgICAgICAgKTtcbiAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpKTtcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJldm9rZVVSTCk7XG4gICAgICAgIGxpbmsuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICBuZXcgTW91c2VFdmVudChgY2xpY2tgLCB7XG4gICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXc6IHdpbmRvdyxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gJ28nICYmICFyZXBlYXQpIHtcbiAgICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnZmlsZScpO1xuICAgICAgaW5wdXQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IE1vdXNlRXZlbnQoYGNsaWNrYCwge1xuICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICB2aWV3OiB3aW5kb3csXG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBmdW5jdGlvbiBoYW5kbGVDaGFuZ2UoZSkge1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5maWxlcykge1xuICAgICAgICAgIGlmIChpdGVtLnR5cGUuaW5kZXhPZignaW1hZ2UnKSA8IDApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChpdGVtKTtcbiAgICAgICAgICBpbml0SW1hZ2Uoc3JjKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGhhbmRsZUNoYW5nZSk7XG4gICAgICB9XG4gICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBoYW5kbGVDaGFuZ2UpO1xuICAgIH1cblxuICAgIGlmIChtb2Rlci5jdXJyZW50ID09PSAnbW92ZScpIHtcbiAgICAgIGxldCBpbmMgPSAxO1xuICAgICAgaWYgKG1bJ3NoaWZ0J10pIGluYyA9IDEwO1xuXG4gICAgICBpZiAobVsnaiddKSBjdXJzb3JbMV0gKz0gaW5jO1xuICAgICAgaWYgKG1bJ2snXSkgY3Vyc29yWzFdIC09IGluYztcbiAgICAgIGlmIChtWydoJ10pIGN1cnNvclswXSAtPSBpbmM7XG4gICAgICBpZiAobVsnbCddKSBjdXJzb3JbMF0gKz0gaW5jO1xuXG4gICAgICBpZiAoY3Vyc29yWzBdIDwgMCkgY3Vyc29yWzBdID0gMDtcbiAgICAgIGlmIChjdXJzb3JbMF0gKyBjdXJzb3JbMl0gPiBpdykgY3Vyc29yWzBdID0gaXcgLSBjdXJzb3JbMl07XG4gICAgICBpZiAoY3Vyc29yWzFdIDwgMCkgY3Vyc29yWzFdID0gMDtcbiAgICAgIGlmIChjdXJzb3JbMV0gKyBjdXJzb3JbM10gPiBpaCkgY3Vyc29yWzFdID0gaWggLSBjdXJzb3JbM107XG5cbiAgICAgIGlmIChrZXkgPT09ICcyJykge1xuICAgICAgICBtb2Rlci5jdXJyZW50ID0gJ2FkanVzdF9jdXJzb3InO1xuICAgICAgICBzZXRNb2RlKCdhZGp1c3RfY3Vyc29yJyk7XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnZW50ZXInKSB7XG4gICAgICAgIG1vZGVyLmN1cnJlbnQgPSAnY2hvb3NlX2Zsb3cnO1xuICAgICAgICBzZXRNb2RlKCdjaG9vc2VfZmxvdycpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZXIuY3VycmVudCA9PT0gJ2FkanVzdF9jdXJzb3InKSB7XG4gICAgICBsZXQgaW5jID0gMTtcbiAgICAgIGlmIChtWydzaGlmdCddKSBpbmMgPSAxMDtcblxuICAgICAgaWYgKG1bJ2onXSkgY3Vyc29yWzNdICs9IGluYztcbiAgICAgIGlmIChtWydrJ10pIGN1cnNvclszXSAtPSBpbmM7XG4gICAgICBpZiAobVsnaCddKSBjdXJzb3JbMl0gLT0gaW5jO1xuICAgICAgaWYgKG1bJ2wnXSkgY3Vyc29yWzJdICs9IGluYztcblxuICAgICAgaWYgKGN1cnNvclswXSArIGN1cnNvclsyXSA+IGl3KSBjdXJzb3JbMl0gPSBpdyAtIGN1cnNvclswXTtcbiAgICAgIGlmIChjdXJzb3JbMV0gKyBjdXJzb3JbM10gPiBpaCkgY3Vyc29yWzNdID0gaWggLSBjdXJzb3JbMV07XG4gICAgICBpZiAoY3Vyc29yWzJdIDwgMSkgY3Vyc29yWzJdID0gMTtcbiAgICAgIGlmIChjdXJzb3JbM10gPCAxKSBjdXJzb3JbM10gPSAxO1xuXG4gICAgICBpZiAoa2V5ID09PSAnZW50ZXInKSB7XG4gICAgICAgIG1vZGVyLmN1cnJlbnQgPSAnbW92ZSc7XG4gICAgICAgIHNldE1vZGUoJ21vdmUnKTtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdlc2NhcGUnKSB7XG4gICAgICAgIG1vZGVyLmN1cnJlbnQgPSAnbW92ZSc7XG4gICAgICAgIHNldE1vZGUoJ21vdmUnKTtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICcxJykge1xuICAgICAgICBtb2Rlci5jdXJyZW50ID0gJ21vdmUnO1xuICAgICAgICBzZXRNb2RlKCdtb3ZlJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtb2Rlci5jdXJyZW50ID09PSAnY2hvb3NlX2Zsb3cnKSB7XG4gICAgICBpZiAoa2V5ID09PSAnYScpIHtcbiAgICAgICAgY2hvb3NlRmxvdygndycpO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICd3Jykge1xuICAgICAgICBjaG9vc2VGbG93KCduJyk7XG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ3MnKSB7XG4gICAgICAgIGNob29zZUZsb3coJ3MnKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnZCcpIHtcbiAgICAgICAgY2hvb3NlRmxvdygnZScpO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ2VzY2FwZScpIHtcbiAgICAgICAgbW9kZXIuY3VycmVudCA9ICdtb3ZlJztcbiAgICAgICAgc2V0TW9kZSgnbW92ZScpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobW9kZXIuY3VycmVudCA9PT0gJ2FkanVzdF9mbG93Jykge1xuICAgICAgbGV0IGZtID0gZmxvd19tYXJrLmN1cnJlbnQ7XG4gICAgICBpZiAoa2V5ID09PSAnZXNjYXBlJykge1xuICAgICAgICBtb2Rlci5jdXJyZW50ID0gJ2Nob29zZV9mbG93JztcbiAgICAgICAgc2V0TW9kZSgnY2hvb3NlX2Zsb3cnKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnZW50ZXInKSB7XG4gICAgICAgIHN0YXJ0RmxvdygpO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdmJykge1xuICAgICAgICBpZiAoZm1bNF0gPT09ICd3Jykge1xuICAgICAgICAgIGZtWzRdID0gJ2UnO1xuICAgICAgICB9IGVsc2UgaWYgKGZtWzRdID09PSAnZScpIHtcbiAgICAgICAgICBmbVs0XSA9ICd3JztcbiAgICAgICAgfSBlbHNlIGlmIChmbVs0XSA9PT0gJ24nKSB7XG4gICAgICAgICAgZm1bNF0gPSAncyc7XG4gICAgICAgIH0gZWxzZSBpZiAoZm1bNF0gPT09ICdzJykge1xuICAgICAgICAgIGZtWzRdID0gJ24nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBzbSA9IHNyZWYuY3VycmVudDtcbiAgICBsZXQgc3cgPSBzbS5vZmZzZXRXaWR0aDtcbiAgICBsZXQgc2ggPSBzbS5vZmZzZXRIZWlnaHQ7XG4gICAgbGV0IHN0eCA9IHNyZWYuY3VycmVudC5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHN0eC5jbGVhclJlY3QoMCwgMCwgc3csIHNoKTtcbiAgICBpZiAoZmxvd3NfdmlzaWJsZS5jdXJyZW50KSB7XG4gICAgICBkcmF3Rmxvd091dGxpbmVzKCk7XG4gICAgfVxuICAgIGlmIChtb2Rlci5jdXJyZW50ID09PSAnY2hvb3NlX2Zsb3cnKSB7XG4gICAgICBkcmF3UG9zc0Zsb3dzKCk7XG4gICAgfSBlbHNlIGlmIChtb2Rlci5jdXJyZW50ID09PSAnYWRqdXN0X2Zsb3cnKSB7XG4gICAgICBzdHguc3Ryb2tlU3R5bGUgPSBncmVlbjtcbiAgICAgIGxldCBmbSA9IGZsb3dfbWFyay5jdXJyZW50O1xuICAgICAgc3R4LnN0cm9rZVJlY3QoXG4gICAgICAgIGZtWzBdICsgY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgIGZtWzFdICsgY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgIGZtWzJdLFxuICAgICAgICBmbVszXVxuICAgICAgKTtcbiAgICAgIHN0eC5maWxsU3R5bGUgPSBncmVlbjtcbiAgICAgIHN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGxldCB4YTtcbiAgICAgIGxldCB5YTtcbiAgICAgIGlmIChmbVs0XSA9PT0gJ2UnKSB7XG4gICAgICAgIHhhID0gZm1bMF07XG4gICAgICAgIHlhID0gZm1bMV0gKyBmbVszXSAvIDI7XG4gICAgICB9IGVsc2UgaWYgKGZtWzRdID09PSAncycpIHtcbiAgICAgICAgeGEgPSBmbVswXSArIGZtWzJdIC8gMjtcbiAgICAgICAgeWEgPSBmbVsxXTtcbiAgICAgIH0gZWxzZSBpZiAoZm1bNF0gPT09ICd3Jykge1xuICAgICAgICB4YSA9IGZtWzBdICsgZm1bMl07XG4gICAgICAgIHlhID0gZm1bMV0gKyBmbVszXSAvIDI7XG4gICAgICB9IGVsc2UgaWYgKGZtWzRdID09PSAnbicpIHtcbiAgICAgICAgeGEgPSBmbVswXSArIGZtWzJdIC8gMjtcbiAgICAgICAgeWEgPSBmbVsxXSArIGZtWzNdO1xuICAgICAgfVxuICAgICAgc3R4LmFyYyh4YSArIGN1cnNvcl9wYWRkaW5nLCB5YSArIGN1cnNvcl9wYWRkaW5nLCA0LCAwLCAyICogTWF0aC5QSSk7XG4gICAgICBzdHguZmlsbCgpO1xuICAgIH1cbiAgICBkcmF3Q3Vyc29yKCk7XG5cbiAgICBzZXRSZWFkKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkb3duSGFuZGxlcihlKSB7XG4gICAga2V5bWFwLmN1cnJlbnRbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgIGtleUFjdGlvbihlLmtleS50b0xvd2VyQ2FzZSgpLCBlLnJlcGVhdCk7XG4gIH1cblxuICBmdW5jdGlvbiB1cEhhbmRsZXIoZSkge1xuICAgIGtleW1hcC5jdXJyZW50W2Uua2V5LnRvTG93ZXJDYXNlKCldID0gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBvblBhc3RlKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZS5jbGlwYm9hcmREYXRhLml0ZW1zKSB7XG4gICAgICBpZiAoaXRlbS50eXBlLmluZGV4T2YoJ2ltYWdlJykgPCAwKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgbGV0IGZpbGUgPSBpdGVtLmdldEFzRmlsZSgpO1xuICAgICAgbGV0IHNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XG4gICAgICBpbml0SW1hZ2Uoc3JjKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkRyYWcoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weSc7XG4gIH1cblxuICBmdW5jdGlvbiBvbkRyb3AoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGxldCBmaWxlID0gZS5kYXRhVHJhbnNmZXIuZmlsZXNbMF07XG4gICAgbGV0IGZpbGVuYW1lID0gZmlsZS5wYXRoID8gZmlsZS5wYXRoIDogZmlsZS5uYW1lID8gZmlsZS5uYW1lIDogJyc7XG4gICAgbGV0IHNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XG4gICAgaW5pdEltYWdlKHNyYyk7XG4gIH1cblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZG93bkhhbmRsZXIpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVwSGFuZGxlcik7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Bhc3RlJywgb25QYXN0ZSwgZmFsc2UpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIG9uRHJhZywgZmFsc2UpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgb25Ecm9wLCBmYWxzZSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZG93bkhhbmRsZXIpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBIYW5kbGVyKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwYXN0ZScsIG9uUGFzdGUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgb25EcmFnLCBmYWxzZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJvcCcsIG9uRHJvcCwgZmFsc2UpO1xuICAgICAgaWYgKGhhbmRsZXJyZWYuY3VycmVudCAhPT0gbnVsbCkgY2FuY2VsQW5pbWF0aW9uRnJhbWUoaGFuZGxlcnJlZi5jdXJyZW50KTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpbml0SW1hZ2UoJy95eXkuanBnJywgdHJ1ZSk7XG4gICAgLy8gaW5pdEltYWdlKCcvaGVyb2VzLmpwZycpO1xuICAgIC8vIGluaXRJbWFnZSgnL21lc3RyaXAucG5nJyk7XG4gICAgLy8gaW5pdEltYWdlKCcvc2NydWdncy5qcGcnKTtcbiAgICAvLyBpbml0SW1hZ2UoJy9ma2EuanBnJyk7XG4gICAgLy8gaW5pdEltYWdlKCcvZ3JhbnQucG5nJyk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPHRpdGxlPldhdGVyZmFsbHM8L3RpdGxlPlxuICAgICAgICA8bGluayByZWw9XCJpY29uXCIgaHJlZj1cIi9mYXZpY29uLmljb1wiIC8+XG4gICAgICA8L0hlYWQ+XG4gICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnLCBwYWRkaW5nOiBjdXJzb3JfcGFkZGluZyB9fT5cbiAgICAgICAgPGNhbnZhcyByZWY9e2NyZWZ9IC8+XG4gICAgICAgIDxjYW52YXNcbiAgICAgICAgICByZWY9e3NyZWZ9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgbWFyZ2luTGVmdDogY3Vyc29yX3BhZGRpbmcsXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiBjdXJzb3JfcGFkZGluZyxcbiAgICAgICAgICB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnLFxuICAgICAgICB9fVxuICAgICAgICByZWY9e3JlYWRyZWZ9XG4gICAgICAvPlxuICAgICAgPEluZm8gcmxoPXtybGh9IG1vZGU9e21vZGV9IC8+XG5cbiAgICAgIDxzdHlsZSBnbG9iYWwganN4PntgXG4gICAgICAgIEBmb250LWZhY2Uge1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiAnY3VzdG9tJztcbiAgICAgICAgICBzcmM6IHVybCgnL0lCTVBsZXhNb25vLVJlZ3VsYXIud29mZjInKSBmb3JtYXQoJ3dvZmYyJyksXG4gICAgICAgICAgICB1cmwoJy9JQk1QbGV4TW9uby1SZWd1bGFyLndvZmYnKSBmb3JtYXQoJ3dvZmYnKTtcbiAgICAgICAgfVxuICAgICAgICAqIHtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB9XG4gICAgICAgIGh0bWwge1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiBjdXN0b20sIG1vbm9zcGFjZTtcbiAgICAgICAgICBmb250LXNpemU6ICR7ZnN9cHg7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6ICR7bGh9O1xuICAgICAgICB9XG4gICAgICAgIGJvZHkge1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICB9XG4gICAgICAgIGNhbnZhcyB7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIH1cbiAgICAgIGB9PC9zdHlsZT5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhvbWU7XG4iXX0= */\n/*@ sourceURL=/Users/grant.custer/Sites/constraint-systems/flow/pages/index.js */")));
};

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ })

})
//# sourceMappingURL=index.js.f73b043baf3be502d45d.hot-update.js.map