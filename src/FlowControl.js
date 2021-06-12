import React, { useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  aPadding,
  sRenderSize,
  aMode,
  aCell,
  aZoom,
  sGrid,
  sVisibleCursor,
  sAddFlow,
  aButtonSize,
  aCursorColor,
  sSetDragResizeStart,
  sDragResize,
  aCanvas,
  sSetCornerResizeStart,
} from "./State";

function FlowControl() {
  const [mode, setMode] = useRecoilState(aMode);
  // might regret this renaming
  const visibleCursor = useRecoilValue(sVisibleCursor);
  const padding = useRecoilValue(aPadding);
  const renderSize = useRecoilValue(sRenderSize);
  const dragResize = useSetRecoilState(sDragResize);
  const addFlow = useSetRecoilState(sAddFlow);
  const buttonSize = useRecoilValue(aButtonSize);
  const cursorColor = useRecoilValue(aCursorColor);
  const canvas = useRecoilValue(aCanvas);
  const setCornerResizeStart = useSetRecoilState(sSetCornerResizeStart);
  const resizeRef = useRef(false);

  const getXY = (e) => {
    let bounds = canvas.getBoundingClientRect();
    let x = e.clientX - bounds.left;
    let y = e.clientY - bounds.top;
    return [x, y];
  };

  const setFlow = (dir) => {
    addFlow(dir);
    setMode("move");
  };

  let [x, y, w, h] = visibleCursor;

  const size = buttonSize;

  let rsize = buttonSize;
  let rdisplay = padding + 2;

  function startResize(pinCorner, e) {
    resizeRef.current = true;
    setCornerResizeStart({ pinCorner });
    let position = getXY(e);
    dragResize({ pixel: position });
    setMode("resize");
    e.target.setPointerCapture(e.pointerId);
  }
  function resize(e) {
    if (resizeRef.current) {
      let position = getXY(e);
      dragResize({ pixel: position });
    }
  }
  function endResize(e) {
    if (resizeRef.current) {
      let position = getXY(e);
      dragResize({ pixel: position });
      resizeRef.current = false;
      setMode("flow");
      e.target.releasePointerCapture(e.pointerId);
    }
  }

  let cx = x + w / 2;
  let cy = y + h / 2;

  // keep arrows in bounds
  let fx = cx;
  let fy = cy;
  let fbw = Math.max(w, buttonSize * 3);
  let fbh = Math.max(h, buttonSize * 3);
  let afx = fx - fbw / 2;
  let afy = fy - fbh / 2;
  if (afx < padding + buttonSize / 2) {
    afx = buttonSize / 2 + padding;
    if (fbw > buttonSize * 3) {
      fbw -= buttonSize / 2;
    }
  }
  if (afy < padding + buttonSize / 2) {
    afy = buttonSize / 2 + padding;
    if (fbh > buttonSize * 3) {
      fbh -= buttonSize / 2;
    }
  }
  if (afx + fbw > renderSize[0] - padding * 2) {
    if (fbw > buttonSize * 3) {
      fbw -= buttonSize / 2;
    } else {
      afx -= buttonSize + padding * 2;
    }
  }
  if (afy + fbh > renderSize[1] - padding * 2) {
    if (fbh > buttonSize * 3) {
      fbh -= buttonSize / 2;
    } else {
      afy -= buttonSize + padding * 2;
    }
  }

  let roff = rsize - 2;

  return mode === "flow" || mode === "resize" ? (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: renderSize[0],
        height: renderSize[1],
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: cx - w / 2,
          top: cy - h / 2,
          width: w,
          height: h,
          fontSize: size > 40 ? 20 : 15,
          lineHeight: buttonSize + "px",
          textAlign: "center",
          userSelect: "none",
        }}
      >
        <div
          className="stopClick"
          onPointerDown={startResize.bind(null, "bottomRight")}
          onPointerMove={resize}
          onPointerUp={endResize}
          style={{
            position: "absolute",
            left: -roff,
            top: -roff,
            width: rsize,
            height: rsize,
            cursor: "nwse-resize",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: rdisplay,
              height: rdisplay,
              pointerEvents: "none",
              background: cursorColor,
            }}
          ></div>
        </div>
        <div
          className="stopClick"
          onPointerDown={startResize.bind(null, "bottomLeft")}
          onPointerMove={resize}
          onPointerUp={endResize}
          style={{
            position: "absolute",
            right: -roff,
            top: -roff,
            width: rsize,
            height: rsize,
            cursor: "nesw-resize",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: rdisplay,
              height: rdisplay,
              pointerEvents: "none",
              background: cursorColor,
            }}
          ></div>
        </div>
        <div
          className="stopClick"
          onPointerDown={startResize.bind(null, "topRight")}
          onPointerMove={resize}
          onPointerUp={endResize}
          style={{
            position: "absolute",
            left: -roff,
            bottom: -roff,
            width: rsize,
            height: rsize,
            cursor: "nesw-resize",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: rdisplay,
              height: rdisplay,
              pointerEvents: "none",
              background: cursorColor,
            }}
          ></div>
        </div>
        <div
          className="stopClick hover"
          onPointerDown={startResize.bind(null, "topLeft")}
          onPointerMove={resize}
          onPointerUp={endResize}
          style={{
            position: "absolute",
            right: -roff,
            bottom: -roff,
            width: rsize,
            height: rsize,
            cursor: "nwse-resize",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: rdisplay,
              height: rdisplay,
              pointerEvents: "none",
              background: cursorColor,
            }}
          ></div>
        </div>
      </div>
      {mode === "flow" ? (
        <div
          style={{
            position: "absolute",
            left: afx,
            top: afy,
            width: fbw,
            height: fbh,
            fontSize: size > 40 ? 20 : 15,
            lineHeight: buttonSize + "px",
            textAlign: "center",
            userSelect: "none",
          }}
        >
          <div
            className="stopClick hover"
            onPointerDown={() => setMode("resize")}
            style={{
              position: "absolute",
              top: `calc(50% - ${buttonSize / 2}px)`,
              left: `calc(50% - ${buttonSize / 2}px)`,
              width: buttonSize,
              height: buttonSize,
              background: cursorColor,
              cursor: "pointer",
            }}
          >
            &times;
          </div>
          <div
            className="stopClick hoverParent"
            onPointerDown={() => setFlow("n")}
            style={{
              position: "absolute",
              top: -buttonSize / 2,
              left: `calc(50% - ${buttonSize / 2}px)`,
              width: buttonSize,
              height: buttonSize * 1.25,
              cursor: "pointer",
            }}
          >
            <div
              className="hoverChild"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: buttonSize,
                height: buttonSize,
                background: cursorColor,
                cursor: "pointer",
                pointerEvents: "none",
              }}
            >
              ↑
            </div>
          </div>
          <div
            className="stopClick hoverParent"
            onPointerDown={() => setFlow("s")}
            style={{
              position: "absolute",
              bottom: -buttonSize / 2,
              left: `calc(50% - ${buttonSize / 2}px)`,
              width: buttonSize,
              height: buttonSize * 1.25,
              cursor: "pointer",
            }}
          >
            <div
              className="hoverChild"
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: buttonSize,
                height: buttonSize,
                background: cursorColor,
                cursor: "pointer",
                pointerEvents: "none",
              }}
            >
              ↓
            </div>
          </div>
          <div
            className="stopClick hoverParent"
            onPointerDown={() => setFlow("w")}
            style={{
              position: "absolute",
              left: -buttonSize / 2,
              top: `calc(50% - ${buttonSize / 2}px)`,
              width: buttonSize * 1.25,
              height: buttonSize,
              cursor: "pointer",
            }}
          >
            <div
              className="hoverChild"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: buttonSize,
                height: buttonSize,
                background: cursorColor,
                cursor: "pointer",
                pointerEvents: "none",
              }}
            >
              ←
            </div>
          </div>
          <div
            className="stopClick hoverParent"
            onPointerDown={() => setFlow("e")}
            style={{
              position: "absolute",
              right: -buttonSize / 2,
              top: `calc(50% - ${buttonSize / 2}px)`,
              width: buttonSize * 1.25,
              height: buttonSize,
              cursor: "pointer",
            }}
          >
            <div
              className="hoverChild"
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: buttonSize,
                height: buttonSize,
                background: cursorColor,
                cursor: "pointer",
                pointerEvents: "none",
              }}
            >
              →
            </div>
          </div>
        </div>
      ) : null}
    </div>
  ) : null;
}

export default FlowControl;
