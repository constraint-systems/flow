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
  sToggleFlow,
  sZoomLevels,
  sZoomIn,
  sZoomOut,
} from "./State";
import { domLoadImage, saveImage } from "./Actions";

function Button({ children, click, style }) {
  return (
    <div
      role="button"
      className="hover"
      onClick={click}
      style={{
        textAlign: "center",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function StatusBar() {
  const [zoom, setZoom] = useRecoilState(aZoom);
  const [flow, setFlow] = useRecoilState(aFlow);
  const image = useRecoilValue(aImage);
  const cursorColor = useRecoilValue(aCursorColor);
  const toggleFlow = useSetRecoilState(sToggleFlow);
  const zoomLevels = useRecoilValue(sZoomLevels);
  const size = useRecoilValue(aWindowSize);
  const zoomIn = useSetRecoilState(sZoomIn);
  const zoomOut = useSetRecoilState(sZoomOut);
  const buttonSize = useRecoilValue(aButtonSize);

  return (
    <div
      style={{
        borderTop: "solid 1px #000",
        display: "flex",
        justifyContent: size[0] < 640 ? "space-evenly" : "center",
        lineHeight: buttonSize + 6 + "px",
        textAlign: "center",
      }}
    >
      <Button
        click={saveImage}
        style={{
          width: "8.5ch",
        }}
      >
        Save
      </Button>
      {flow ? (
        <Button
          click={toggleFlow}
          style={{
            width: "8.5ch",
          }}
        >
          Pause
        </Button>
      ) : (
        <Button
          click={toggleFlow}
          style={{ width: "8.5ch", background: "#444", color: '#fff' }}
        >
          Paused
        </Button>
      )}
      <div style={{ width: "8.5ch" }}>{Math.round(zoom * 10000) / 100}%</div>
      <Button
        style={{ minWidth: "5.5ch" }}
        click={() => {
          zoomIn();
        }}
      >
        +
      </Button>
      <Button
        style={{ minWidth: "5.5ch" }}
        click={() => {
          zoomOut();
        }}
      >
        -
      </Button>
    </div>
  );
}

export default StatusBar;
