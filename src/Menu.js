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
  aShowImageMenu,
  aShowViewMenu,
  sToggleShowFlow,
  sToggleGrid,
  aCursorColor,
  aShowGridMenu,
  sModifyCell,
  sToggleShortcuts,
  aShowShortcuts,
  aShowAbout,
  sToggleShowAbout,
} from "./State";
import { loadImage } from "./Utils";
import { domLoadImage, saveImage } from "./Actions";
import Scene from "./Scene";

function Button({ children, click, style }) {
  return (
    <div
      role="button"
      className="hover"
      onClick={click}
      style={{
        padding: "0 12px",
        textAlign: "center",
        minWidth: 44,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function RepeatButton({ children, click, style }) {
  let intervalId = useRef(null);
  let repeat = useRef(false);

  function pointerDown(e) {
    click();
    repeat.current = true;
    clearInterval(intervalId.current);
    setTimeout(() => {
      if (repeat.current) {
        clearInterval(intervalId.current);
        intervalId.current = setInterval(click, 40);
      }
    }, 300);
    e.target.setPointerCapture(e.pointerId);
  }

  function pointerUp(e) {
    repeat.current = false;
    clearInterval(intervalId.current);
    e.target.releasePointerCapture(e.pointerId);
  }

  return (
    <div
      role="button"
      className="hover"
      onPointerDown={pointerDown}
      onPointerUp={pointerUp}
      style={{
        textAlign: "center",
        minWidth: 44,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Option({ children, click, k, c }) {
  function handleClick(e) {
    click(e);
  }

  return (
    <div
      className="clickButton"
      onClick={handleClick}
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 8px",
        cursor: "pointer",
        height: 44,
        borderBottom: "solid 1px #000",
        alignItems: "center",
      }}
    >
      <div>{children}</div>{" "}
    </div>
  );
}

function Box({ children, style }) {
  function handleClick(e) {
    e.stopPropagation();
  }

  return (
    <div
      onClick={handleClick}
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 8px",
        cursor: "pointer",
        height: 44,
        lineHeight: "44px",
        alignItems: "center",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function NumberInput({ val, setVal, modifyVal }) {
  const buttonSize = useRecoilValue(aButtonSize);
  function increment() {
    modifyVal(1);
  }
  function decrement() {
    modifyVal(-1);
  }
  function handleChange(e) {
    setVal(e.target.value);
  }

  return (
    <React.Fragment>
      <input
        style={{
          padding: 0,
          textAlign: "right",
          flexGrow: 1,
          height: 26,
        }}
        value={val}
        onChange={handleChange}
        type="number"
      />
      <RepeatButton click={decrement}>↓</RepeatButton>
      <RepeatButton click={increment}>↑</RepeatButton>
    </React.Fragment>
  );
}

function Menu({ children, setState }) {
  const buttonSize = useRecoilValue(aButtonSize);

  useEffect(() => {
    function downHandler(e) {
      if (e.key.toLowerCase() === "escape") {
        setState(false);
      }
    }

    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []);

  function handleClick(e) {
    setState(false);
  }

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: buttonSize,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        paddingTop: 16,
      }}
      onClick={handleClick}
    >
      <div
        style={{
          background: "white",
          width: 320,
          border: "solid 1px #000",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function MenuItem({ name, children, style, state, setState }) {
  function handleClick(e) {
    setState(!state);
  }

  return (
    <div>
      <div
        className={state ? "active" : "hover"}
        role="button"
        onClick={handleClick}
        style={{
          width: "8.5ch",
          cursor: "pointer",
          userSelect: "none",
          ...style,
        }}
      >
        {name}
      </div>
      {state ? <Menu setState={setState}>{children}</Menu> : null}
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        background: "#000",
        height: 2,
        borderTop: "solid 1px white",
        width: "100%",
      }}
    ></div>
  );
}

function MenuBar() {
  let [showImageMenu, setShowImageMenu] = useRecoilState(aShowImageMenu);
  let [showViewMenu, setShowViewMenu] = useRecoilState(aShowViewMenu);
  let [showAbout, setShowAbout] = useRecoilState(aShowAbout);
  const [image, setImage] = useRecoilState(aImage);
  const setFlows = useSetRecoilState(aFlows);
  const size = useRecoilValue(aWindowSize);
  const toggleShowFlow = useSetRecoilState(sToggleShowFlow);
  const toggleGrid = useSetRecoilState(sToggleGrid);
  const toggleShortcuts = useSetRecoilState(sToggleShortcuts);
  const showShortcuts = useRecoilValue(aShowShortcuts);
  const [showGrid, setShowGrid] = useRecoilState(aShowGrid);
  const showFlow = useRecoilValue(aShowFlow);
  const [cell, setCell] = useRecoilState(aCell);
  const modifyCell = useSetRecoilState(sModifyCell);
  const buttonSize = useRecoilValue(aButtonSize);
  const [showGridMenu, setShowGridMenu] = useRecoilState(aShowGridMenu);
  const [cursorColor, setCursorColor] = useRecoilState(aCursorColor);
  const [flow, setFlow] = useRecoilState(aFlow);

  function imageLoader() {
    function callback(image) {
      setImage(image);
      Scene.image = image;
      setFlows([]);
    }
    domLoadImage(callback);
  }
  async function revertImage() {
    let originalImage = await loadImage(image.src);
    setImage(originalImage);
    Scene.image = originalImage;
  }
  function setCellWidth(val) {
    let newCell = cell.slice();
    newCell[2] = val;
    setCell(newCell);
  }
  function modifyCellWidth(mod) {
    modifyCell([0, 0, mod, 0]);
  }
  function setCellHeight(val) {
    let newCell = cell.slice();
    newCell[3] = val;
    setCell(newCell);
  }
  function modifyCellHeight(mod) {
    modifyCell([0, 0, 0, mod]);
  }
  function setCellX(val) {
    let newCell = cell.slice();
    newCell[0] = val;
    setCell(newCell);
  }
  function setCellY(val) {
    let newCell = cell.slice();
    newCell[1] = val;
    setCell(newCell);
  }
  function modifyCellX(mod) {
    modifyCell([mod, 0, 0, 0]);
  }
  function modifyCellY(mod) {
    modifyCell([0, mod, 0, 0]);
  }

  function clearAndSet(callback, val) {
    setShowImageMenu(false);
    setShowGridMenu(false);
    setShowViewMenu(false);
    setShowAbout(false);
    callback(val);
  }

  return (
    <div
      style={{
        borderBottom: "solid 1px #000",
        display: "flex",
        justifyContent: size[0] < 640 ? "space-evenly" : "center",
        lineHeight: buttonSize + "px",
        position: "relative",
        zIndex: 9,
        textAlign: "center",
        userSelect: "none",
      }}
    >
      <MenuItem
        name="Image"
        state={showImageMenu}
        setState={clearAndSet.bind(null, setShowImageMenu)}
      >
        <Option click={imageLoader}>Open image</Option>
        <Option click={revertImage}>Revert image</Option>
        <Option click={saveImage}>Save as image</Option>
        <Option
          click={() => {
            setFlow(!flow);
          }}
        >
          {flow ? "Pause" : "Unpause"} flows
        </Option>
        <Option
          click={() => {
            setFlows([]);
          }}
        >
          Clear flows
        </Option>
      </MenuItem>
      <MenuItem
        name="Grid"
        state={showGridMenu}
        setState={clearAndSet.bind(null, setShowGridMenu)}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{
            display: "flex",
            justifyContent: "space-Between",
          }}
        >
          <div
            style={{
              lineHeight: 44 + "px",
              height: 44,
              padding: "0 8px",
            }}
          >
            Cell size
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowGridMenu(false);
            }}
            className="hover"
            style={{
              lineHeight: 44 + "px",
              height: 44,
              width: 44,
              cursor: "pointer",
            }}
          >
            &times;
          </div>
        </div>
        <Box
          style={{
            padding: 0,
            paddingLeft: "1ch",
            cursor: "default",
          }}
        >
          <div
            style={{
              width: "9ch",
              flexShrink: 0,
              textAlign: "left",
              userSelect: "none",
            }}
          >
            Width
          </div>{" "}
          <NumberInput
            val={cell[2]}
            setVal={setCellWidth}
            modifyVal={modifyCellWidth}
          />
        </Box>
        <Box
          style={{
            padding: 0,
            paddingLeft: "1ch",
            cursor: "default",
          }}
        >
          <div
            style={{
              width: "9ch",
              flexShrink: 0,
              textAlign: "left",
              userSelect: "none",
            }}
          >
            Height
          </div>
          <NumberInput
            val={cell[3]}
            setVal={setCellHeight}
            modifyVal={modifyCellHeight}
          />
        </Box>
        <Box
          style={{
            padding: 0,
            paddingLeft: "1ch",
            cursor: "default",
          }}
        >
          <div
            style={{
              width: "9ch",
              flexShrink: 0,
              textAlign: "left",
              userSelect: "none",
            }}
          >
            X offset
          </div>{" "}
          <NumberInput
            val={cell[0]}
            setVal={setCellX}
            modifyVal={modifyCellX}
          />
        </Box>
        <Box
          style={{
            padding: 0,
            paddingLeft: "1ch",
            userSelect: "none",
            cursor: "default",
          }}
        >
          <div
            style={{
              width: "9ch",
              flexShrink: 0,
              textAlign: "left",
            }}
          >
            Y offset
          </div>{" "}
          <NumberInput
            val={cell[1]}
            setVal={setCellY}
            modifyVal={modifyCellY}
          />
        </Box>
      </MenuItem>
      <MenuItem
        name="View"
        state={showViewMenu}
        setState={clearAndSet.bind(null, setShowViewMenu)}
      >
        <Option click={toggleGrid}>{showGrid ? "Hide" : "Show"} grid</Option>
        <Option click={toggleShowFlow}>
          {showFlow ? "Hide" : "Show"} flow outlines
        </Option>
        <Option click={toggleShortcuts}>
          {showShortcuts ? "Hide" : "Show"} keyboard controls
        </Option>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 8px",
            height: 44,
            borderBottom: "solid 1px #000",
            alignItems: "center",
            userSelect: "none",
          }}
        >
          <div>Cursor color</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              style={{ display: "block" }}
              type="color"
              value={cursorColor}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={(e) => {
                setCursorColor(e.target.value);
              }}
            />
            &nbsp;
            <div>Reset</div>
          </div>
        </div>
      </MenuItem>
      <MenuItem
        name="About"
        state={showAbout}
        setState={clearAndSet.bind(null, setShowAbout)}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{
            display: "flex",
            justifyContent: "space-Between",
          }}
        >
          <div
            style={{
              lineHeight: 44 + "px",
              height: 44,
              padding: "0 8px",
            }}
          >
            About
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowAbout(false);
            }}
            className="hover"
            style={{
              lineHeight: 44 + "px",
              height: 44,
              width: 44,
              cursor: "pointer",
            }}
          >
            &times;
          </div>
        </div>
        <div
          style={{
            textAlign: "left",
            padding: "0 8px 8px",
            lineHeight: "18px",
          }}
        >
          <p>
            Flow is an experimental image editor. Set and direct pixel-flows
            using touch or keyboard controls. Overlap flows to create
            interesting effects.
          </p>
          <p>
            A{" "}
            <a
              href="https://constraint.systems"
              target="_blank"
              rel="noreferrer"
            >
              Constraint Systems
            </a>{" "}
            project
          </p>
        </div>
      </MenuItem>
    </div>
  );
}

export default MenuBar;
