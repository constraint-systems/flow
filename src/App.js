import React, { useEffect, useRef, useState } from "react";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  aWindowSize,
  sSetWindowSize,
  aCanvas,
  aImage,
  aPadding,
  sRenderSize,
  aMode,
  aCell,
  aCursor,
  aZoom,
  sGrid,
  sImageBounds,
  sVisibleCursor,
  sCursorOverlap,
  aFlows,
  aFlow,
  sAddFlow,
  aShowGrid,
  aShowFlow,
  aButtonSize,
  aCursorColor,
  aShowGridMenu,
  sShortcutPadding,
  aShowShortcuts,
} from "./State";
import Keyboard from "./Keyboard";
import Pointer from "./Pointer";
import Scene from "./Scene";
import MenuBar from "./Menu";
import StatusBar from "./Status";
import Shortcuts from "./Shortcuts";
import FlowControl from "./FlowControl";
import Pan from "./Pan";
import { loadImage } from "./Utils";

function Wrapper() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}

function App() {
  const size = useRecoilValue(aWindowSize);
  const setWindowSize = useSetRecoilState(sSetWindowSize);
  const setShowShortcuts = useSetRecoilState(aShowShortcuts);

  useEffect(() => {
    setWindowSize();
    if (window.innerWidth > 1200) setShowShortcuts(true);
    window.addEventListener("resize", setWindowSize);
    return () => {
      window.removeEventListener("resize", setWindowSize);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        touchAction: "none",
      }}
    >
      <input type="file" id="fileInput" style={{ display: "none" }} />
      {size[0] !== null ? <Body /> : null}
    </div>
  );
}

function Body() {
  // guarantee access to size
  return (
    <div id="scrollContainer">
      <MenuBar />
      <Canvas />
      <StatusBar />
      <Shortcuts />
    </div>
  );
}

function Canvas() {
  const renderRef = useRef(null);
  const shortcutPadding = useRecoilValue(sShortcutPadding);
  const [canvas, setCanvas] = useRecoilState(aCanvas);
  useEffect(() => {
    setCanvas(renderRef.current);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        flexGrow: 1,
        overflow: "auto",
        display: "flex",
        paddingRight: shortcutPadding,
        cursor: "crosshair",
        touchAction: "none",
      }}
    >
      <div style={{ position: "relative", margin: "auto" }}>
        <canvas id="render" ref={renderRef}>
          {canvas !== null ? <CanvasBody /> : null}
        </canvas>
        <Pan />
        <FlowControl />
      </div>
      <Shadow />
    </div>
  );
}

function Shadow() {
  const cell = useRecoilValue(aCell);
  const grid = useRecoilValue(sGrid);
  const padding = useRecoilValue(aPadding);
  const zoom = useRecoilValue(aZoom);
  const windowSize = useRecoilValue(aWindowSize);
  const image = useRecoilValue(aImage);
  const visibleCursor = useRecoilValue(sVisibleCursor);

  useEffect(() => {
    Scene.visibleCursor = visibleCursor;
    Scene.zoom = zoom;
    Scene.padding = padding;
    Scene.windowSize = windowSize;
    Scene.image = image;
  }, [padding, grid, cell, visibleCursor, zoom, windowSize, image]);

  return null;
}

function CanvasBody() {
  // guarantee canvas access
  return (
    <>
      <Render />
      <Keyboard />
      <Pointer />
    </>
  );
}

const compose = ({ canvas, layers }) => {
  const c = canvas;
  const cx = canvas.getContext("2d");
  cx.clearRect(0, 0, c.width, c.height);
  cx.drawImage(
    layers.imageLayer,
    0,
    0,
    Scene.image.width,
    Scene.image.height,
    Scene.padding,
    Scene.padding,
    c.width - Scene.padding * 2,
    c.height - Scene.padding * 2
  );
  cx.drawImage(
    layers.flowsLayer,
    0,
    0,
    c.width,
    c.height,
    0,
    0,
    c.width,
    c.height
  );
  cx.globalAlpha = 0.3;
  cx.drawImage(
    layers.gridLayer,
    0,
    0,
    c.width,
    c.height,
    0,
    0,
    c.width,
    c.height
  );
  cx.globalAlpha = 1;
  cx.drawImage(
    layers.cursorLayer,
    0,
    0,
    c.width,
    c.height,
    0,
    0,
    c.width,
    c.height
  );
};

function Render() {
  const canvas = useRecoilValue(aCanvas);
  const [image, setImage] = useRecoilState(aImage);
  const renderSize = useRecoilValue(sRenderSize);
  const buttonSize = useRecoilValue(aButtonSize);
  const setZoom = useSetRecoilState(aZoom);
  const layersRef = useRef({
    imageLayer: new OffscreenCanvas(10, 10),
    flowsLayer: new OffscreenCanvas(10, 10),
    gridLayer: new OffscreenCanvas(10, 10),
    cursorLayer: new OffscreenCanvas(10, 10),
    scratchLayer: new OffscreenCanvas(10, 10),
  });
  const flowRef = useRef(null);
  const flow = useRecoilValue(aFlow);

  useEffect(() => {
    // init
    async function init() {
      let image = await loadImage(process.env.PUBLIC_URL + "/images/iron.jpg");
      setImage(image);
      Scene.image = image;
    }
    init();

    Scene.layersRef = layersRef;
  }, []);

  function runFlow() {
    if (flow) {
      if (flowRef.current !== null) clearInterval(flowRef.current);
      flowRef.current = setInterval(() => {
        const im = layersRef.current.imageLayer;
        const imx = im.getContext("2d");

        const scratchLayer = layersRef.current.scratchLayer;
        const cx = scratchLayer.getContext("2d");

        for (let i = 0; i < Scene.flows.length; i++) {
          const flowbox = Scene.flows[i];
          let dir = flowbox.dir;
          let [x, y, w, h] = flowbox.cursor;
          scratchLayer.width = w;
          scratchLayer.height = h;
          if (dir === "e") {
            cx.drawImage(im, x, y, w - 1, h, 1, 0, w - 1, h);
            cx.drawImage(im, x + w - 1, y, 1, h, 0, 0, 1, h);
          } else if (dir === "w") {
            cx.drawImage(im, x + 1, y, w - 1, h, 0, 0, w - 1, h);
            cx.drawImage(im, x, y, 1, h, w - 1, 0, 1, h);
          } else if (dir === "s") {
            cx.drawImage(im, x, y, w, h - 1, 0, 1, w, h - 1);
            cx.drawImage(im, x, y + h - 1, w, 1, 0, 0, w, 1);
          } else if (dir === "n") {
            cx.drawImage(im, x, y + 1, w, h - 1, 0, 0, w, h - 1);
            cx.drawImage(im, x, y, w, 1, 0, h - 1, w, 1);
          }
          imx.drawImage(scratchLayer, 0, 0, w, h, x, y, w, h);
        }
        compose({ canvas, layers: layersRef.current });
      }, 20);
    } else {
      clearInterval(flowRef.current);
    }
  }

  useEffect(() => {
    if (image.src !== "") {
      runFlow();
    }
  }, [flow, image]);

  useEffect(() => {
    if (image.src !== "") {
      let [w, h] = Scene.windowSize;
      // add border and status bar extra
      h -= buttonSize * 2 + 2 + 6;
      let sizeW = image.width + Scene.padding * 2;
      let sizeH = image.height + Scene.padding * 2;
      let ratio = null;
      let imageRatio = sizeW / sizeH;
      let windowRatio = w / h;
      if (imageRatio > windowRatio) {
        ratio = (w - Scene.padding * 2) / image.width;
        setZoom(ratio);
      } else {
        ratio = (h - Scene.padding * 2) / image.height;
      }
      setZoom(ratio);
    }
  }, [image, buttonSize]);

  useEffect(() => {
    canvas.width = renderSize[0];
    canvas.height = renderSize[1];
    compose({ canvas, layers: layersRef.current });
  }, [renderSize]);

  return (
    <>
      <ImageLayer layersRef={layersRef} />
      <GridLayer layersRef={layersRef} />
      <CursorLayer layersRef={layersRef} />
      <FlowsLayer layersRef={layersRef} />
    </>
  );
}

function ImageLayer({ layersRef }) {
  const canvas = useRecoilValue(aCanvas);
  const image = useRecoilValue(aImage);
  const layers = layersRef.current;

  useEffect(() => {
    if (image) {
      const c = layers.imageLayer;
      c.width = image.width;
      c.height = image.height;
      const cx = c.getContext("2d");
      cx.clearRect(0, 0, c.width, c.height);
      // image should always be full size
      // compose draws it at proper zoom level
      cx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        image.width,
        image.height
      );
      compose({ canvas, layers });
    }
  }, [image]);

  return null;
}

function FlowsLayer({ layersRef }) {
  const canvas = useRecoilValue(aCanvas);
  const image = useRecoilValue(aImage);
  const layers = layersRef.current;
  const padding = useRecoilValue(aPadding);
  const renderSize = useRecoilValue(sRenderSize);
  const zoom = useRecoilValue(aZoom);
  const flows = useRecoilValue(aFlows);
  const showFlow = useRecoilValue(aShowFlow);

  useEffect(() => {
    if (image) {
      const c = layers.flowsLayer;
      c.width = renderSize[0];
      c.height = renderSize[1];
      const cx = c.getContext("2d");
      cx.clearRect(0, 0, c.width, c.height);
      if (showFlow) {
        cx.strokeStyle = "white";
        cx.lineWidth = 2;
        for (let i = 0; i < flows.length; i++) {
          let flow = flows[i];
          let [x, y, w, h] = flow.cursor;
          cx.strokeRect(
            x * zoom + padding,
            y * zoom + padding,
            w * zoom,
            h * zoom
          );
        }
      }
      compose({ canvas, layers });
    }
  }, [renderSize, image, zoom, flows, showFlow]);

  useEffect(() => {
    Scene.flows = flows;
  }, [flows]);

  return null;
}

function GridLayer({ layersRef }) {
  const canvas = useRecoilValue(aCanvas);
  const image = useRecoilValue(aImage);
  const layers = layersRef.current;
  const padding = useRecoilValue(aPadding);
  const renderSize = useRecoilValue(sRenderSize);
  const zoom = useRecoilValue(aZoom);
  const cell = useRecoilValue(aCell);
  const grid = useRecoilValue(sGrid);
  const imageBounds = useRecoilValue(sImageBounds);
  const showGrid = useRecoilValue(aShowGrid);
  const showGridMenu = useRecoilValue(aShowGridMenu);

  useEffect(() => {
    const p = (v) => v + padding;
    const c = layers.gridLayer;
    c.width = renderSize[0];
    c.height = renderSize[1];
    const cx = c.getContext("2d");
    cx.clearRect(0, 0, c.width, c.height);
    if (showGrid || showGridMenu) {
      cx.strokeStyle = "#ccc";
      cx.lineWidth = 2;
      for (let c = 0; c < grid.cols; c++) {
        let x = c * cell[2] + grid.xoff;
        cx.beginPath();
        cx.moveTo(p(x * zoom), p(imageBounds.y1 * zoom));
        cx.lineTo(p(x * zoom), p(imageBounds.y2 * zoom));
        cx.stroke();
      }
      for (let r = 0; r < grid.rows; r++) {
        let y = r * cell[3] + grid.yoff;
        cx.beginPath();
        cx.moveTo(p(imageBounds.x1 * zoom), p(y * zoom));
        cx.lineTo(p(imageBounds.x2 * zoom), p(y * zoom));
        cx.stroke();
      }
    }
    compose({ canvas, layers });
  }, [cell, renderSize, zoom, showGrid, showGridMenu]);

  return null;
}

function CursorLayer({ layersRef }) {
  const canvas = useRecoilValue(aCanvas);
  const layers = layersRef.current;
  const padding = useRecoilValue(aPadding);
  const renderSize = useRecoilValue(sRenderSize);
  const zoom = useRecoilValue(aZoom);
  const cell = useRecoilValue(aCell);
  const grid = useRecoilValue(sGrid);
  const cursor = useRecoilValue(aCursor);
  const visibleCursor = useRecoilValue(sVisibleCursor);
  const cursorOverlap = useRecoilValue(sCursorOverlap);
  const mode = useRecoilValue(aMode);
  const cursorColor = useRecoilValue(aCursorColor);

  useEffect(() => {
    const c = layers.cursorLayer;
    c.width = renderSize[0];
    c.height = renderSize[1];
    const cx = c.getContext("2d");
    cx.clearRect(0, 0, c.width, c.height);
    let [x, y, w, h] = visibleCursor;
    cx.strokeStyle = cursorColor;
    cx.lineWidth = 2;
    cx.strokeRect(x, y, w, h);

    // draw oob indicator
    let [ol, ot, or, ob] = cursorOverlap;
    cx.lineWidth = 4;
    if (ol) {
      cx.beginPath();
      cx.moveTo(x, y);
      cx.lineTo(x, y + h);
      cx.stroke();
    }
    if (ot) {
      cx.beginPath();
      cx.moveTo(x, y);
      cx.lineTo(x + w, y);
      cx.stroke();
    }
    if (or) {
      cx.beginPath();
      cx.moveTo(x + w, y);
      cx.lineTo(x + w, y + h);
      cx.stroke();
    }
    if (ob) {
      cx.beginPath();
      cx.moveTo(x, y + h);
      cx.lineTo(x + w, y + h);
      cx.stroke();
    }

    // if (mode === "resize") {
    //   let size = 14;
    //   cx.fillStyle = cursorColor;
    //   cx.fillRect(x - size / 2, y - size / 2, size, size);
    //   cx.fillRect(x + w - size / 2, y + h - size / 2, size, size);
    //   cx.fillRect(x - size / 2, y + h - size / 2, size, size);
    //   cx.fillRect(x + w - size / 2, y - size / 2, size, size);
    // }

    compose({ canvas, layers });
  }, [cell, cursor, renderSize, zoom, mode, cursorColor]);

  return null;
}

export default Wrapper;
