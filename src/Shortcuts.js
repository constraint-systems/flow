import React, { useEffect, useRef, useState } from "react";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { aWindowSize, aMode, aButtonSize, aShowShortcuts } from "./State";

function Entry({ children, style }) {
  return (
    <div
      style={{
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: "1ch",
        paddingRight: "1ch",
        display: "flex",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function KeyEntry({ char, children, style }) {
  return (
    <Entry>
      <div
        style={{
          outline: "solid 1px black",
          paddingLeft: "0.5ch",
          paddingRight: "0.5ch",
          marginRight: "1ch",
          ...style,
        }}
      >
        {char}
      </div>{" "}
      <div>{children}</div>
    </Entry>
  );
}

function Shortcuts() {
  const size = useRecoilValue(aWindowSize);
  const mode = useRecoilValue(aMode);
  const buttonSize = useRecoilValue(aButtonSize);
  const [showShortcuts, setShowShortcuts] = useRecoilState(aShowShortcuts);

  let bg = "#e6e6e6";
  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: buttonSize + 1,
        height: size[1] - (buttonSize * 2 + 6 + 2),
        borderLeft: "solid 1px #000",
        background: "white",
        width: 320,
        overflow: "auto",
        display: showShortcuts ? "block" : "none",
      }}
    >
      <div
        className="hover"
        onClick={() => setShowShortcuts(false)}
        style={{
          width: "6ch",
          position: "absolute",
          cursor: "pointer",
          textAlign: "center",
          right: 0,
          paddingTop: 4,
          paddingBottom: 4,
          lineHeight: buttonSize + "px",
        }}
      >
        &times;
      </div>
      <Entry style={{ lineHeight: buttonSize + "px" }}>Keyboard controls</Entry>
      <div
        style={{
          background: mode === "move" ? bg : "none",
          paddingBottom: 4,
        }}
      >
        <Entry>Move</Entry>
        <KeyEntry char="←↑↓→">Move cursor</KeyEntry>
        <KeyEntry char="+shift">Move by cursor size</KeyEntry>
        <KeyEntry char="enter">Flow mode</KeyEntry>
        <KeyEntry char="r">Resize cursor mode</KeyEntry>
      </div>
      <div
        style={{
          background: mode === "flow" ? bg : "none",
          paddingBottom: 4,
        }}
      >
        <Entry>Flow</Entry>
        <KeyEntry char="←↑↓→">Choose flow direction</KeyEntry>
        <KeyEntry char="escape/x">cancel</KeyEntry>
      </div>
      <div
        style={{
          background: mode === "resize" ? bg : "none",
          paddingBottom: 4,
        }}
      >
        <Entry>Resize cursor</Entry>
        <KeyEntry char="←→">Change width</KeyEntry>
        <KeyEntry char="↑↓">Change height</KeyEntry>
        <KeyEntry char="enter/escape">finish</KeyEntry>
      </div>
      <div
        style={{
          paddingBottom: 4,
        }}
      >
        <Entry>Image</Entry>
        <KeyEntry char="o">Open image</KeyEntry>
        <KeyEntry char="i">Revert image</KeyEntry>
        <KeyEntry char="p">Save as image</KeyEntry>
        <KeyEntry char="space">Toggle flows</KeyEntry>
        <KeyEntry char="c">Clear flows</KeyEntry>
      </div>
      <div
        style={{
          paddingBottom: 4,
        }}
      >
        <Entry>Grid</Entry>
        <KeyEntry char="g">Show grid controls</KeyEntry>
      </div>
      <div
        style={{
          paddingBottom: 4,
        }}
      >
        <Entry>View</Entry>
        <KeyEntry char="+/-">Zoom in/out</KeyEntry>
        <KeyEntry char=";">Toggle grid</KeyEntry>
        <KeyEntry char="/">Toggle flow outlines</KeyEntry>
        <KeyEntry char="?">Toggle shortcuts</KeyEntry>
      </div>
      <div
        style={{
          paddingBottom: 4,
        }}
      >
        <Entry>Vimkeys</Entry>
        <KeyEntry char="hjkl">Alternative to arrows</KeyEntry>
      </div>
      <div
        style={{
          paddingBottom: 4,
        }}
      >
        <Entry>About</Entry>
        <KeyEntry char="a">Show about</KeyEntry>
      </div>
    </div>
  );
}

export default Shortcuts;
