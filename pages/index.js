import React, { useState, useEffect, useRef, useCallback } from 'react';
import { flowMove } from '../components/flows';
import Info from '../components/info';

let cursor_padding = 10;
let magenta = 'rgba(255,0,255,1)';
let green = 'rgba(0,255,0,1)';
let fs = 14;
let lh = 1.5;
let rlh = fs * lh;
let maxch = '80ch';
let color = 'light';

const Home = () => {
  let cref = useRef(null);
  let sref = useRef(null);
  let uref = useRef(null);
  let keymap = useRef({});
  let readref = useRef(null);
  let cursorref = useRef([0, 0, 20, 20]);
  let handlerref = useRef(null);
  let moder = useRef('move');
  let flow_mark = useRef(null);
  let flows = useRef([]);
  let flows_visible = useRef(false);
  let [help, setHelp] = useState(true);
  let [mode, setMode] = useState('move');
  let image = useRef(null);

  function KeyTip(letter, color) {
    return (
      <span
        className="keytip"
        onClick={() => {
          keymapr.current[letter] = true;
          keyAction(letter, false);
          setTimeout(() => {
            keymapr.current[letter] = false;
          }, 300);
        }}
        style={{
          outline: color === 'dark' ? 'solid 1px white' : 'solid 1px black',
          paddingLeft: '0.5ch',
          paddingRight: '0.5ch',
          textAlign: 'center',
          display: 'inline-block',
          userSelect: 'none',
          cursor: 'default',
        }}
      >
        {letter === ' ' ? 'spacebar' : letter}
      </span>
    );
  }

  function initImageCanvas(img) {
    let c = cref.current;
    c.width = img.width;
    c.height = img.height;
    let ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0, c.width, c.height);
  }

  function initScanCanvas(img) {
    let c = sref.current;
    c.width = img.width + cursor_padding * 2;
    c.height = img.height + cursor_padding * 2;
    let ctx = c.getContext('2d');
  }

  function initImage(src, first_load = false) {
    let w = window.innerWidth - cursor_padding * 2;
    let h = window.innerHeight - cursor_padding * 2 - 10 - fs * lh;

    let img = new Image();
    img.onload = () => {
      let iw = img.width;
      let ih = img.height;

      let wa = w / h;
      let ia = iw / ih;

      let resize_check = false;
      let rw, rh;
      if (ia >= wa) {
        if (iw > w) {
          resize_check = true;
          rw = w;
          rh = Math.round(w / ia);
        }
      } else {
        if (ih > h) {
          resize_check = true;
          rh = h;
          rw = Math.round(h * ia);
        }
      }

      if (resize_check) {
        let confirm_check = true;
        if (!first_load) {
          confirm_check = confirm(
            `The image you selected is larger (${iw}x${ih}) than the browser window.  Resize it to fit (${rw}x${rh})? Choose cancel to import it at full size.`
          );
        }
        if (confirm_check) {
          img.width = rw;
          img.height = rh;
        }
      }

      image.current = img;

      moder.current = 'move';
      setMode('move');
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
    let im = cref.current;
    let iw = im.offsetWidth;
    let ih = im.offsetHeight;
    let cursor = cursorref.current;
    let west = [0, cursor[1], cursor[0], cursor[3]];
    let east = [
      cursor[0] + cursor[2],
      cursor[1],
      iw - (cursor[0] + cursor[2]),
      cursor[3],
    ];
    let north = [cursor[0], 0, cursor[2], cursor[1]];
    let south = [
      cursor[0],
      cursor[1] + cursor[3],
      cursor[2],
      ih - (cursor[1] + cursor[3]),
    ];
    let dirs = [west, east, north, south];
    let padded_dirs = dirs.map(n =>
      n.map((v, i) => (i === 0 || i === 1 ? v + cursor_padding : v))
    );
    let stx = sref.current.getContext('2d');
    stx.fillStyle = 'rgba(0,0,0,0.2)';
    stx.strokeStyle = 'rgba(0,0,0,0.8)';
    for (let i = 0; i < padded_dirs.length; i++) {
      let d = padded_dirs[i];
      stx.fillRect(...d);
      stx.strokeRect(...d);
    }
    stx.strokeStyle = 'white';
  }

  function toggleFlowVisibility() {
    console.log('toggle it');
    console.log(flows_visible.current);
    flows_visible.current = !flows_visible.current;
  }

  function drawFlowOutlines() {
    let stx = sref.current.getContext('2d');
    stx.strokeStyle = '#aaa';
    for (let f = 0; f < flows.current.length; f++) {
      let flow = flows.current[f];
      stx.strokeRect(
        flow[0] + cursor_padding,
        flow[1] + cursor_padding,
        flow[2],
        flow[3]
      );
    }
  }

  function drawCursor() {
    let sm = sref.current;
    let sw = sm.offsetWidth;
    let sh = sm.offsetHeight;

    let stx = sref.current.getContext('2d');
    let mode = moder.current;
    if (mode !== 'adjust_flow') {
      let cursor = cursorref.current;
      stx.strokeStyle = magenta;
      stx.lineWidth = 1;
      stx.strokeRect(
        cursor[0] + cursor_padding,
        cursor[1] + cursor_padding,
        cursor[2],
        cursor[3]
      );

      if (mode === 'adjust_cursor') {
        stx.fillStyle = magenta;
        stx.beginPath();
        stx.arc(
          cursor[0] + cursor_padding,
          cursor[1] + cursor_padding,
          4,
          0,
          2 * Math.PI
        );
        stx.fill();
      }
    }
  }

  function chooseFlow(dir) {
    let im = cref.current;
    let iw = im.offsetWidth;
    let ih = im.offsetHeight;

    moder.current = 'adjust_flow';
    setMode('adjust_flow');
    let cursor = cursorref.current;
    if (dir === 'w') {
      flow_mark.current = [0, cursor[1], cursor[0] + cursor[2], cursor[3], dir];
    } else if (dir === 'e') {
      flow_mark.current = [
        cursor[0],
        cursor[1],
        iw - cursor[0],
        cursor[3],
        dir,
      ];
    } else if (dir === 'n') {
      flow_mark.current = [cursor[0], 0, cursor[2], cursor[1] + cursor[3], dir];
    } else if (dir === 's') {
      flow_mark.current = [
        cursor[0],
        cursor[1],
        cursor[2],
        ih - cursor[1],
        dir,
      ];
    }
  }

  function runFlow() {
    let c = cref.current;
    let ctx = c.getContext('2d');
    let iw = c.offsetWidth;
    let ih = c.offsetHeight;
    for (let f = 0; f < flows.current.length; f++) {
      let flow = flows.current[f];
      let t = flowMove(flow, c);
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
    let im = cref.current;
    let iw = im.offsetWidth;
    let ih = im.offsetHeight;
    let fm = flow_mark.current;

    let cursor = cursorref.current;
    let read = readref.current;
    if (moder.current === 'adjust_flow') {
      read.innerHTML = `${fm[0]},${fm[1]} ${fm[2]}x${
        fm[3]
      } ${fm[4].toUpperCase()}`;
    } else {
      read.innerHTML = `${iw}x${ih}  ${cursor[0]},${cursor[1]} ${cursor[2]}x${
        cursor[3]
      }`;
    }
  }

  function keyAction(key, repeat) {
    let im = cref.current;
    let iw = im.offsetWidth;
    let ih = im.offsetHeight;

    let m = keymap.current;
    let cursor = cursorref.current;
    let mode = moder.current;

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

    if (key === '?') {
      setHelp(prevState => {
        return !prevState;
      });
    }

    if (key === 'c') {
      let check_clear = confirm('Clear all flows and reset image?');
      if (check_clear) {
        moder.current = 'move';
        setMode('move');
        flows.current = [];
        flow_mark.current = null;
        let img = image.current;
        let c = cref.current;
        c.width = img.width;
        c.height = img.height;
        let ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0, c.width, c.height);
      }
    }

    if (key === 'x' && !repeat) {
      let link = document.createElement('a');

      var revokeURL = function() {
        let me = this;
        requestAnimationFrame(function() {
          URL.revokeObjectURL(me.href);
          me.href = null;
        });
        this.removeEventListener('click', revokeURL);
      };

      cref.current.toBlob(function(blob) {
        link.setAttribute(
          'download',
          `flow-${new Date()
            .toISOString()
            .slice(0, -4)
            .replace(/-/g, '')
            .replace(/:/g, '')
            .replace(/_/g, '')
            .replace(/\./g, '')}Z.png`
        );
        link.setAttribute('href', URL.createObjectURL(blob));
        link.addEventListener('click', revokeURL);
        link.dispatchEvent(
          new MouseEvent(`click`, {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );
      });
    }

    if (key === 'o' && !repeat) {
      let input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.dispatchEvent(
        new MouseEvent(`click`, {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );

      function handleChange(e) {
        for (const item of this.files) {
          if (item.type.indexOf('image') < 0) {
            continue;
          }
          let src = URL.createObjectURL(item);
          initImage(src);
        }
        this.removeEventListener('change', handleChange);
      }
      input.addEventListener('change', handleChange);
    }

    if (moder.current === 'move') {
      let inc = 1;
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
      let inc = 1;
      if (m['shift']) inc = 10;

      if (m['j']) cursor[3] += inc;
      if (m['k']) cursor[3] -= inc;
      if (m['h']) cursor[2] -= inc;
      if (m['l']) cursor[2] += inc;

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
      let fm = flow_mark.current;
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
    let sm = sref.current;
    let sw = sm.offsetWidth;
    let sh = sm.offsetHeight;
    let stx = sref.current.getContext('2d');
    stx.clearRect(0, 0, sw, sh);
    if (flows_visible.current) {
      drawFlowOutlines();
    }
    if (moder.current === 'choose_flow') {
      drawPossFlows();
    } else if (moder.current === 'adjust_flow') {
      stx.strokeStyle = green;
      let fm = flow_mark.current;
      stx.strokeRect(
        fm[0] + cursor_padding,
        fm[1] + cursor_padding,
        fm[2],
        fm[3]
      );
      stx.fillStyle = green;
      stx.beginPath();
      let xa;
      let ya;
      if (fm[4] === 'e') {
        xa = fm[0];
        ya = fm[1] + fm[3] / 2;
      } else if (fm[4] === 's') {
        xa = fm[0] + fm[2] / 2;
        ya = fm[1];
      } else if (fm[4] === 'w') {
        xa = fm[0] + fm[2];
        ya = fm[1] + fm[3] / 2;
      } else if (fm[4] === 'n') {
        xa = fm[0] + fm[2] / 2;
        ya = fm[1] + fm[3];
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
    for (const item of e.clipboardData.items) {
      if (item.type.indexOf('image') < 0) {
        continue;
      }
      let file = item.getAsFile();
      let src = URL.createObjectURL(file);
      initImage(src);
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
    let file = e.dataTransfer.files[0];
    let filename = file.path ? file.path : file.name ? file.name : '';
    let src = URL.createObjectURL(file);
    initImage(src);
  }

  function clickKey(key) {
    keymap.current[key] = true;
    keyAction(key, false);
    setTimeout(() => {
      keymap.current[key] = false;
    }, 300);
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    window.addEventListener('paste', onPaste, false);
    window.addEventListener('dragover', onDrag, false);
    window.addEventListener('drop', onDrop, false);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
      window.removeEventListener('paste', onPaste);
      window.removeEventListener('dragover', onDrag, false);
      window.removeEventListener('drop', onDrop, false);
      if (handlerref.current !== null) cancelAnimationFrame(handlerref.current);
    };
  }, []);

  useEffect(() => {
    initImage('/yyy.jpg', true);
    // initImage('/heroes.jpg');
    // initImage('/mestrip.png');
    // initImage('/scruggs.jpg');
    // initImage('/fka.jpg');
    // initImage('/grant.png');
  }, []);

  return (
    <div>
      <div style={{ position: 'relative', padding: cursor_padding }}>
        <canvas ref={cref} />
        <canvas
          ref={sref}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            pointerEvents: 'none',
          }}
        />
      </div>
      <div
        style={{
          marginLeft: cursor_padding,
          marginBottom: cursor_padding,
          whiteSpace: 'pre-wrap',
        }}
        ref={readref}
      />
      <Info rlh={rlh} mode={mode} help={help} clickKey={clickKey} />

      <style global jsx>{`
        @font-face {
          font-family: 'custom';
          src: url('/IBMPlexMono-Regular.woff2') format('woff2'),
            url('/IBMPlexMono-Regular.woff') format('woff');
        }
        * {
          box-sizing: border-box;
        }
        html {
          font-family: custom, monospace;
          font-size: ${fs}px;
          line-height: ${lh};
        }
        body {
          margin: 0;
          padding: 0;
        }
        canvas {
          display: block;
        }
        a {
          color: inherit;
        }
      `}</style>
    </div>
  );
};

export default Home;
