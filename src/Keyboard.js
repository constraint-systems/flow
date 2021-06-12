import { useEffect, useRef } from "react";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  aMode,
  sMoveCursorBy,
  sAddFlow,
  sToggleFlow,
  sToggleGrid,
  sResizeBy,
  sToggleShowFlow,
  aImage,
  aFlows,
  aShowGridMenu,
  sZoomIn,
  sZoomOut,
  sToggleShortcuts,
  aShowAbout,
} from "./State.js";
import { eq, loadImage } from "./Utils";
import { domLoadImage, saveImage } from "./Actions";
import Scene from "./Scene";

function Keyboard() {
  const kmRef = useRef({});
  const moveCursorBy = useSetRecoilState(sMoveCursorBy);
  const [mode, setMode] = useRecoilState(aMode);
  const setShowAbout = useSetRecoilState(aShowAbout);
  const addFlow = useSetRecoilState(sAddFlow);
  const toggleFlow = useSetRecoilState(sToggleFlow);
  const toggleShowFlow = useSetRecoilState(sToggleShowFlow);
  const toggleGrid = useSetRecoilState(sToggleGrid);
  const resizeBy = useSetRecoilState(sResizeBy);
  const [image, setImage] = useRecoilState(aImage);
  const setFlows = useSetRecoilState(aFlows);
  const zoomIn = useSetRecoilState(sZoomIn);
  const zoomOut = useSetRecoilState(sZoomOut);
  const setShowGridMenu = useSetRecoilState(aShowGridMenu);
  const toggleShortcuts = useSetRecoilState(sToggleShortcuts);

  useEffect(() => {
    const km = kmRef.current;
    async function pressed(press, e) {
      // global
      if (press === "o") {
        // load image
        function callback(image) {
          setImage(image);
          Scene.image = image;
          setFlows([]);
        }
        domLoadImage(callback);
      } else if (press === "i") {
        let originalImage = await loadImage(image.src);
        setImage(originalImage);
        Scene.image = originalImage;
      } else if (press === "c") {
        setFlows([]);
      } else if (press === "p") {
        saveImage();
      } else if (press === "g") {
        setShowGridMenu(true);
      } else if (press === " ") {
        toggleFlow();
      } else if (press === "+") {
        zoomIn();
      } else if (press === "-") {
        zoomOut();
      } else if (press === ";") {
        toggleGrid();
      } else if (press === "/") {
        toggleShowFlow();
      } else if (press === "?") {
        toggleShortcuts();
      } else if (press === "a") {
        setShowAbout(true);
      }

      switch (mode) {
        case "move":
          {
            switch (press) {
              case "enter": {
                setMode("flow");
                break;
              }
              case "r": {
                setMode("resize");
                break;
              }
            }

            // multiple press
            let moveBy = [0, 0];
            if (km.arrowleft || km.h) {
              moveBy[0] -= 1;
            }
            if (km.arrowright || km.l) {
              moveBy[0] += 1;
            }
            if (km.arrowup || km.k) {
              moveBy[1] -= 1;
            }
            if (km.arrowdown || km.j) {
              moveBy[1] += 1;
            }
            if (moveBy[0] !== 0 || moveBy[1] !== 0) {
              e.preventDefault();
              moveCursorBy({ moveBy, shift: e.shiftKey });
            }
          }
          break;
        case "flow":
          {
            if (eq(press, "escape")) {
              setMode("move");
            } else if (eq(press, "x")) {
              setMode("move");
            } else if (eq(press, "arrowleft") || eq(press, "h")) {
              addFlow("w");
              setMode("move");
            } else if (eq(press, "arrowright") || eq(press, "l")) {
              addFlow("e");
              setMode("move");
            } else if (eq(press, "arrowup") || eq(press, "k")) {
              addFlow("n");
              setMode("move");
            } else if (eq(press, "arrowdown") || eq(press, "j")) {
              addFlow("s");
              setMode("move");
            }
          }
          break;
        case "resize":
          {
            if (eq(press, "escape")) {
              setMode("move");
            }
            if (eq(press, "enter")) {
              setMode("move");
            }

            let diff = [0, 0];
            if (km.arrowleft || km.h) {
              diff[0] -= 1;
            }
            if (km.arrowright || km.l) {
              diff[0] += 1;
            }
            if (km.arrowup || km.k) {
              diff[1] -= 1;
            }
            if (km.arrowdown || km.j) {
              diff[1] += 1;
            }
            if (diff[0] !== 0 || diff[1] !== 0) {
              e.preventDefault();
              resizeBy({ diff });
            }
          }
          break;
      }
    }

    function downHandler(e) {
      let press = e.key.toLowerCase();
      km[press] = true;
      pressed(press, e);
    }

    function upHandler(e) {
      let press = e.key.toLowerCase();
      km[press] = false;
    }

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  });

  return null;
}

export default Keyboard;
