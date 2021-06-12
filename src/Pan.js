import React, { useEffect, useRef, useState } from "react";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  aWindowSize,
  sRenderSize,
  aButtonSize,
  sShortcutPadding,
} from "./State";

function Pan() {
  const size = useRecoilValue(aWindowSize);
  const renderSize = useRecoilValue(sRenderSize);
  const buttonSize = useRecoilValue(aButtonSize);
  const panRef = useRef(null);
  const positionRef = useRef([0, 0]);
  const downRef = useRef(false);
  const shortcutPadding = useRecoilValue(sShortcutPadding);

  const barHeight = buttonSize + 2;
  const availableHeight = size[1] - barHeight * 2;

  useEffect(() => {
    const panEl = panRef.current;

    const panCanvas = (diff) => {
      panEl.parentElement.parentElement.scrollBy(...diff);
    };

    const pointerDown = (e) => {
      e.stopPropagation();
      positionRef.current = [e.clientX, e.clientY];
      downRef.current = true;
      panEl.setPointerCapture(e.pointerId);
    };
    const pointerMove = (e) => {
      e.stopPropagation();
      if (downRef.current) {
        let position = [e.clientX, e.clientY];
        let diff = [
          (position[0] - positionRef.current[0]) * 4,
          (position[1] - positionRef.current[1]) * 4,
        ];
        panCanvas(diff);
        positionRef.current = position;
      }
    };
    const pointerUp = (e) => {
      e.stopPropagation();
      downRef.current = false;
      panEl.releasePointerCapture(e.pointerId);
    };

    panEl.addEventListener("pointerdown", pointerDown);
    panEl.addEventListener("pointermove", pointerMove);
    panEl.addEventListener("pointerup", pointerUp);
    return () => {
      panEl.removeEventListener("pointerdown", pointerDown);
      panEl.removeEventListener("pointermove", pointerMove);
      panEl.removeEventListener("pointerup", pointerUp);
    };
  }, []);

  let buttSize = 48;
  let showButton =
    renderSize[1] > availableHeight ||
    renderSize[0] > size[0] - shortcutPadding;
  return (
    <div
      ref={panRef}
      style={{
        position: "fixed",
        left: `calc(50% - ${shortcutPadding / 2}px)`,
        top: "50%",
        marginTop: -buttSize / 2,
        marginLeft: -buttSize / 2,
        width: buttSize,
        height: buttSize,
        border: "solid 8px rgba(255,255,255,0.5)",
        background: "rgba(0,0,0,0.6)",
        zIndex: 999,
        borderRadius: "100%",
        touchAction: "none",
        display: showButton ? "block" : "none",
        cursor: "grab",
        userSelect: "none",
      }}
    ></div>
  );
}

export default Pan;
