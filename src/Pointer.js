import React, { useState, useEffect, useRef, useContext } from "react";
import {
  aCanvas,
  sPlaceCursorPixel,
  sSetDragResizeStart,
  sDragResize,
  aMode,
  sSetCursorMoveStart,
  sCursorMoveDrag,
  aZoom,
  sAdjustZoom,
  aPadding,
} from "./State.js";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Scene from "./Scene";

function checkCursorPixel({ Scene, pixel }) {
  let cp = Scene.visibleCursor;
  let [x, y] = pixel;
  return x > cp[0] && x < cp[0] + cp[2] && y > cp[1] && y < cp[1] + cp[3];
}

function Pointer() {
  const canvas = useRecoilValue(aCanvas);
  const container = canvas.parentElement.parentElement;
  const padding = useRecoilValue(aPadding);
  const placeCursorPixel = useSetRecoilState(sPlaceCursorPixel);
  const [mode, setMode] = useRecoilState(aMode);
  const setDragResizeStart = useSetRecoilState(sSetDragResizeStart);
  const setCursorMoveStart = useSetRecoilState(sSetCursorMoveStart);
  const adjustZoom = useSetRecoilState(sAdjustZoom);
  const dragCursor = useSetRecoilState(sCursorMoveDrag);
  const dragResize = useSetRecoilState(sDragResize);
  const pointerRef = useRef({
    primary: {
      down: false,
    },
    secondary: {
      down: false,
    },
    clickWindow: false,
    oneDrag: false,
    twoDrag: false,
    cursorDrag: false,
    ignore: false,
  });

  useEffect(() => {
    const pointer = pointerRef.current;
    const scrollContainer = canvas.parentElement.parentElement;

    const getXY = (e) => {
      let bounds = canvas.getBoundingClientRect();
      let x = e.clientX - bounds.left;
      let y = e.clientY - bounds.top;
      return [x, y];
    };

    function handleClick(e, position) {
      // one finger only
      placeCursorPixel({ pixel: pointer.primary.position });
    }

    function boundPosition(position) {
      return [
        Math.min(canvas.width - padding * 2, Math.max(padding, position[0])),
        Math.min(canvas.height - padding * 2, Math.max(padding, position[1])),
      ];
    }

    function pointerDown(e) {
      if (e.target.classList.contains("stopClick")) {
        pointer.ignore = true;
      } else {
        const position = getXY(e);
        if (e.isPrimary) {
          pointer.primary.down = true;
          pointer.primary.position = position;
        } else {
          pointer.secondary.down = true;
          pointer.secondary.position = position;
        }
        let check = checkCursorPixel({ Scene, pixel: position });
        if (check) {
          pointer.cursorDrag = true;
          setMode("move");
          setCursorMoveStart({ pixel: position });
        } else {
          handleClick(e, position);
        }

        container.setPointerCapture(e.pointerId);
      }
    }

    function pointerMove(e) {
      const position = getXY(e);

      if (pointer.primary.down && pointer.secondary.down) {
        // pointer.oneDrag = false;
        // pointer.twoDrag = true;
        // let distX = pointer.secondary.position[0] - pointer.primary.position[0];
        // let distY = pointer.secondary.position[1] - pointer.primary.position[1];
        // pointer.twoDist = Math.sqrt(distX * distX + distY * distY);
      } else if (pointer.primary.down) {
        if (!pointer.twoDrag) {
          if (!pointer.oneDrag) {
            // initialize one drag
            if (pointer.cursorDrag) {
              dragCursor({ pixel: position });
            } else {
              setDragResizeStart({ pixel: boundPosition(position) });
              setMode("resize");
              pointer.oneDrag = true;
            }
          }
        }
      }

      if (e.isPrimary) {
        if (pointer.primary.down) {
          pointer.primary.position = position;
        }
      } else {
        if (pointer.secondary.down) {
          pointer.secondary.position = position;
        }
      }

      if (pointer.oneDrag) {
        if (pointer.cursorDrag) {
        } else {
          setMode("resize");
          dragResize({ pixel: position });
        }
      } else if (pointer.twoDrag) {
        if (e.isPrimary) {
          let dx = position[0] - pointer.primary.position[0];
          let dy = position[1] - pointer.primary.position[1];
          scrollContainer.scrollBy(-dx, -dy);
        } else {
          // Abandoned zoom interaction
          // let distX =
          //   pointer.secondary.position[0] - pointer.primary.position[0];
          // let distY =
          //   pointer.secondary.position[1] - pointer.primary.position[1];
          // let twoDist = Math.sqrt(distX * distX + distY * distY);
          // let twoDistDiff = twoDist - pointer.twoDisto;
          // // let dx = position[0] - pointer.secondary.position[0];
          // adjustZoom({ diff: twoDistDiff / 100 });
          // pointer.twoDist = twoDist;
        }
      }
    }

    function pointerUp(e) {
      if (pointer.ignore) {
        pointer.ignore = false;
      } else {
        const position = getXY(e);

        if (e.isPrimary) {
          pointer.primary.down = false;
          pointer.primary.position = position;
        } else {
          pointer.secondary.down = false;
          pointer.secondary.position = position;
        }

        if (e.isPrimary) {
          if (!pointer.oneDrag && !pointer.twoDrag) {
            if (!pointer.primary.down) {
              if (pointer.clickWindow) {
                pointer.clickWindow = false;
                placeCursorPixel({ pixel: pointer.primary.position });
              }
            }
          }
        }

        if (!pointer.primary.down) {
          if (!pointer.twoDrag) {
            setMode("flow");
          }
          pointer.oneDrag = false;
          pointer.twoDrag = false;
          pointer.cursorDrag = false;
        }

        container.releasePointerCapture(e.pointerId);
      }
    }

    container.addEventListener("pointerdown", pointerDown);
    container.addEventListener("pointermove", pointerMove);
    container.addEventListener("pointerup", pointerUp);
    return () => {
      container.removeEventListener("pointerdown", pointerDown);
      container.removeEventListener("pointermove", pointerMove);
      container.removeEventListener("pointerup", pointerUp);
    };
  }, [mode]);

  return null;
}

export default Pointer;
