import React, { useState, useEffect, useRef, useContext } from "react";
import {
  aCanvas,
  sPlaceCursorPixel,
  sSetDragResizeStart,
  sDragResize,
  aMode,
} from "./State.js";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

function Pointer() {
  const canvas = useRecoilValue(aCanvas);
  const placeCursorPixel = useSetRecoilState(sPlaceCursorPixel);
  const setDragResizeStart = useSetRecoilState(sSetDragResizeStart);
  const dragResize = useSetRecoilState(sDragResize);
  const [mode, setMode] = useRecoilState(aMode);
  const pointerRef = useRef({
    position: [0, 0],
    touches: [],
    isPanning: false,
  });

  useEffect(() => {
    const pointer = pointerRef.current;
    const scrollContainer = canvas.parentElement.parentElement;

    const getXY = (e) => {
      let x = e.clientX + scrollContainer.scrollLeft;
      let y = e.clientY + scrollContainer.scrollTop;
      return [x, y];
    };

    function pointerDown(e) {
      e.preventDefault();
      const position = getXY(e);

      pointer.touches.push(e.pointerId);

      if (e.isPrimary) {
        setTimeout(() => {
          if (pointer.touches.length === 1) {
            setMode("move");
            setDragResizeStart({ pixel: position });
            placeCursorPixel({ pixel: position });
          }
        }, 200);

        pointer.position = position;
      }

      canvas.setPointerCapture(e.pointerId);
    }

    function pointerMove(e) {
      e.preventDefault();
      const position = getXY(e);

      if (e.isPrimary) {
        if (pointer.touches.length === 1 && !pointer.isPanning) {
          if (mode === "move") {
            dragResize({ pixel: position });
          }
        } else if (pointer.touches.length > 1) {
          pointer.isPanning = true;
          let dx =
            position[0] -
            scrollContainer.scrollLeft -
            (pointer.position[0] - scrollContainer.scrollLeft);
          let dy =
            position[1] -
            scrollContainer.scrollTop -
            (pointer.position[1] - scrollContainer.scrollTop);
          scrollContainer.scrollBy(-dx, -dy);
        }

        pointer.position = position;
      }
    }

    function pointerUp(e) {
      e.preventDefault();
      const position = getXY(e);

      // remove pointer on up
      for (let i = 0; i < pointer.touches.length; i++) {
        if (pointer.touches[i] === e.pointerId) {
          pointer.touches.splice(i, 1);
        }
      }

      if (pointer.touches.length === 0) {
        pointer.isPanning = false;
        // setMode("flow");
      }

      if (e.isPrimary) {
        pointer.position = position;
      }
      canvas.releasePointerCapture(e.pointerId);
    }

    canvas.addEventListener("pointerdown", pointerDown);
    canvas.addEventListener("pointermove", pointerMove);
    canvas.addEventListener("pointerup", pointerUp);
    return () => {
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerup", pointerUp);
    };
  }, [mode]);

  return null;
}

export default Pointer;
