import { atom, atomFamily, selector } from "recoil";
import Scene from "./Scene";

export let aWindowSize = atom({
  key: "windowSize",
  default: [null, null],
});

export let sSetWindowSize = selector({
  key: "setWindowSize",
  set: ({ set }) => {
    console.log("set window size");
    set(aWindowSize, [window.innerWidth, window.innerHeight]);
  },
});

export let aCanvas = atom({
  key: "canvas",
  default: null,
});

export let aPadding = atom({
  key: "padding",
  default: 8,
});

export let aImage = atom({
  key: "image",
  default: new Image(10, 10),
});

export let aZoom = atom({
  key: "zoom",
  default: 1,
});

export let sAdjustZoom = selector({
  key: "adjustZoom",
  set: ({ get, set }, { diff }) => {
    let zoom = get(aZoom);
    set(aZoom, zoom + diff);
  },
});

export let aCell = atom({
  key: "cell",
  default: [0, 0, 32, 32],
});

export let aCursor = atom({
  key: "cursor",
  default: [2, 8, 14, 12],
});

export let sCursorLimited = selector({
  key: "cursorLimited",
  set: ({ get, set }, cursor) => {
    let grid = get(sGrid);
    let newCursor = limitCursor(cursor, grid);
    set(aCursor, newCursor);
  },
});

export let sImageCursor = selector({
  key: "imageCursor",
  get: ({ get }) => {
    // TODO clean up logic sometime
    let cursor = get(aCursor);
    let grid = get(sGrid);
    let image = get(aImage);
    let cell = get(aCell);
    let x = Math.max(0, cursor[0]);
    let y = Math.max(0, cursor[1]);
    let w = Math.min(grid.cols, cursor[0] + cursor[2]) - x;
    let h = Math.min(grid.rows, cursor[1] + cursor[3]) - y;
    // final
    x = x * cell[2] + grid.xoff;
    y = y * cell[3] + grid.yoff;
    w = w * cell[2];
    h = h * cell[3];
    let x1 = Math.min(x + w, image.width);
    let y1 = Math.min(y + h, image.height);
    x = Math.max(x, 0);
    y = Math.max(y, 0);
    return [x, y, x1 - x, y1 - y];
  },
});

export let sVisibleCursor = selector({
  key: "visibleCursor",
  get: ({ get }) => {
    let zoom = get(aZoom);
    let padding = get(aPadding);
    const imageCursor = get(sImageCursor);
    let collected = imageCursor.map((v) => v * zoom);
    collected[0] += padding;
    collected[1] += padding;
    return collected;
  },
});

export let sCursorOverlap = selector({
  key: "cursorOverlap",
  get: ({ get }) => {
    let cursor = get(aCursor);
    let grid = get(sGrid);
    let x = cursor[0] < 0;
    let y = cursor[1] < 0;
    let x1 = grid.cols < cursor[0] + cursor[2];
    let y1 = grid.rows < cursor[1] + cursor[3];
    return [x, y, x1, y1];
  },
});

function limitCursor(cursor, grid) {
  // limit width and height to grid size
  cursor[2] = Math.min(grid.cols, cursor[2]);
  cursor[3] = Math.min(grid.rows, cursor[3]);

  // limit right movement
  cursor[0] = Math.min(cursor[0], grid.cols - 1);
  // limit left movement
  if (cursor[0] + cursor[2] < 1) cursor[0] = 1 - cursor[2];
  // limit down movement
  cursor[1] = Math.min(cursor[1], grid.rows - 1);
  // limit up movement
  if (cursor[1] + cursor[3] < 1) cursor[1] = 1 - cursor[3];

  return cursor;
}

export let sMoveCursorBy = selector({
  key: "moveCursorBy",
  set: ({ get, set }, { moveBy, shift }) => {
    let newCursor = get(aCursor).slice();
    const grid = get(sGrid);
    if (shift) {
      newCursor[0] += moveBy[0] * newCursor[2];
      newCursor[1] += moveBy[1] * newCursor[3];
    } else {
      newCursor[0] += moveBy[0];
      newCursor[1] += moveBy[1];
    }
    set(sCursorLimited, newCursor);
  },
});

function getCR({ pixel, cell, padding, grid, zoom }) {
  const x = pixel[0] / zoom;
  const y = pixel[1] / zoom;
  const [_x, _y, w, h] = cell;
  const { xoff, yoff, cols, rows } = grid;
  const clickX = Math.round((x - xoff - padding) / w);
  const clickY = Math.round((y - yoff - padding) / h);
  return [clickX, clickY];
}

export let sPlaceCursorPixel = selector({
  key: "placeCursor",
  set: ({ get, set }, { pixel }) => {
    let newCursor = get(aCursor).slice();
    const padding = get(aPadding);
    const cell = get(aCell);
    const grid = get(sGrid);
    const zoom = get(aZoom);
    const [clickX, clickY] = getCR({
      pixel,
      cell,
      padding,
      grid,
      zoom,
    });
    newCursor[0] = clickX;
    newCursor[1] = clickY;
    newCursor[2] = 1;
    newCursor[3] = 1;
    set(sCursorLimited, newCursor);
  },
});

export let aDragResizeStart = atom({
  key: "dragResizeStart",
  default: [0, 0],
});

export let sSetDragResizeStart = selector({
  key: "setDragResizeStart",
  set: ({ get, set }, { pixel }) => {
    const padding = get(aPadding);
    const cell = get(aCell);
    const grid = get(sGrid);
    const zoom = get(aZoom);
    let cr = getCR({ pixel, cell, padding, grid, zoom });
    cr = [
      Math.min(Math.max(0, cr[0]), grid.cols),
      Math.min(Math.max(0, cr[1]), grid.rows),
    ];
    set(aDragResizeStart, cr);
  },
});

export let sSetCornerResizeStart = selector({
  key: "setCornerResizeStart",
  set: ({ get, set }, { pinCorner }) => {
    let cursor = get(aCursor).slice();
    let grid = get(sGrid);
    let cr;
    if (pinCorner === "topLeft") {
      cr = [cursor[0], cursor[1]];
    } else if (pinCorner === "topRight") {
      cr = [cursor[0] + cursor[2], cursor[1]];
    } else if (pinCorner === "bottomLeft") {
      cr = [cursor[0], cursor[1] + cursor[3]];
    } else if (pinCorner === "bottomRight") {
      cr = [cursor[0] + cursor[2], cursor[1] + cursor[3]];
    }
    set(aDragResizeStart, cr);
  },
});

export let sResizeBy = selector({
  key: "resizeBy",
  set: ({ get, set }, { diff }) => {
    let cursor = get(aCursor).slice();
    let grid = get(sGrid);
    cursor[2] += diff[0];
    cursor[3] += diff[1];
    cursor[2] = Math.max(1, cursor[2]);
    cursor[3] = Math.max(1, cursor[3]);
    cursor[2] = Math.min(cursor[2], grid.cols - cursor[0]);
    cursor[3] = Math.min(cursor[3], grid.rows - cursor[1]);
    set(aCursor, cursor);
  },
});

export let aCursorMoveStart = atom({
  key: "cursorMoveStart",
  default: [0, 0],
});

export let sSetCursorMoveStart = selector({
  key: "setCursorMoveStart",
  set: ({ get, set }, { pixel }) => {
    const padding = get(aPadding);
    const cell = get(aCell);
    const grid = get(sGrid);
    const cursor = get(aCursor);
    const zoom = get(aZoom);
    const cr = getCR({ pixel, cell, padding, grid, zoom });
    const xoff = cr[0] - cursor[0];
    const yoff = cr[1] - cursor[1];
    set(aCursorMoveStart, [...cr, xoff, yoff]);
  },
});

export let sCursorMoveDrag = selector({
  key: "setCursorMoveDrag",
  set: ({ get, set }, { pixel }) => {
    const padding = get(aPadding);
    const cell = get(aCell);
    const grid = get(sGrid);

    const zoom = get(aZoom);
    const cr = getCR({ pixel, cell, padding, grid, zoom });
    const moveCursorStart = get(aCursorMoveStart);
    const newCursor = get(aCursor).slice();
    const diffx = cr[0] - moveCursorStart[0];
    const diffy = cr[1] - moveCursorStart[1];
    newCursor[0] = Math.max(
      0,
      Math.min(
        grid.cols - newCursor[2],
        diffx + moveCursorStart[0] - moveCursorStart[2]
      )
    );
    newCursor[1] = Math.max(
      0,
      Math.min(
        grid.rows - newCursor[3],
        diffy + moveCursorStart[1] - moveCursorStart[3]
      )
    );

    set(sCursorLimited, newCursor);
  },
});

export let sDragResize = selector({
  key: "dragResize",
  set: ({ get, set }, { pixel }) => {
    const padding = get(aPadding);
    const cell = get(aCell);
    const grid = get(sGrid);

    const dragStart = get(aDragResizeStart);
    const zoom = get(aZoom);
    const cr = getCR({ pixel, cell, padding, grid, zoom });

    let cx = Math.min(dragStart[0], cr[0]);
    let cy = Math.min(dragStart[1], cr[1]);
    let cx1 = Math.max(dragStart[0], cr[0]);
    let cy1 = Math.max(dragStart[1], cr[1]);
    cx = Math.max(0, cx);
    cy = Math.max(0, cy);
    let cw = Math.min(grid.cols - cx, Math.abs(cx1 - cx));
    let ch = Math.min(grid.rows - cy, Math.abs(cy1 - cy));
    if (cw === 0) cw = 1;
    if (ch === 0) ch = 1;
    set(sCursorLimited, [cx, cy, cw, ch]);
  },
});

export let sImageBounds = selector({
  key: "imageBounds",
  get: ({ get, set }) => {
    const image = get(aImage);
    return { x1: 0, y1: 0, x2: image.width, y2: image.height };
  },
});

export let sGrid = selector({
  key: "grid",
  get: ({ get, set }) => {
    const cell = get(aCell);
    const image = get(aImage);
    let xoff = cell[0] % cell[2];
    if (xoff > 0) xoff -= cell[2];
    let cols = Math.ceil((image.width - xoff) / cell[2]);
    let yoff = cell[1] % cell[3];
    if (yoff > 0) yoff -= cell[3];
    let rows = Math.ceil((image.height - yoff) / cell[3]);
    return { xoff, yoff, cols, rows };
  },
});

export let sRenderSize = selector({
  key: "renderSize",
  get: ({ get }) => {
    const image = get(aImage);
    if (image === null) return [20, 20];
    const padding = get(aPadding);
    const zoom = get(aZoom);
    return [
      image.width * zoom + padding * 2,
      image.height * zoom + padding * 2,
    ];
  },
});

export let aMode = atom({
  key: "mode",
  default: "flow",
});

export let aFlowChoicePoint = atom({
  key: "flowChoicePoint",
  default: [0, 0],
});

export let aFlows = atom({
  key: "flows",
  default: [],
});

export let sAddFlow = selector({
  key: "addFlow",
  set: ({ get, set }, dir) => {
    let flows = get(aFlows).slice();
    let imageCursor = get(sImageCursor);
    flows.push({ cursor: imageCursor, dir });
    set(aFlows, flows);
  },
});

export let aFlow = atom({
  key: "flow",
  default: true,
});

export let sToggleFlow = selector({
  key: "toggleFlow",
  set: ({ get, set }) => {
    let flow = get(aFlow);
    set(aFlow, !flow);
  },
});

export let aShowGrid = atom({
  key: "showGrid",
  default: false,
});

export let sToggleGrid = selector({
  key: "toggleGrid",
  set: ({ get, set }) => {
    let showGrid = get(aShowGrid);
    set(aShowGrid, !showGrid);
  },
});

export let aShowFlow = atom({
  key: "showFlow",
  default: false,
});

export let sToggleShowFlow = selector({
  key: "toggleShowFlow",
  set: ({ get, set }) => {
    let showFlow = get(aShowFlow);
    set(aShowFlow, !showFlow);
  },
});

export let aButtonSize = atom({
  key: "buttonSize",
  default: matchMedia("(pointer:coarse)").matches ? 48 : 32,
});

export let aPointer = atom({
  key: "pointer",
  default: matchMedia("(pointer:coarse)").matches ? "coarse" : "fine",
});

export let aDrawer = atom({
  key: "drawer",
  default: { w: 320, h: 220, o: "side" },
});

export let aShowImageMenu = atom({
  key: "showImageMenu",
  default: false,
});

export let aShowViewMenu = atom({
  key: "showViewMenu",
  default: false,
});

export let aShowGridMenu = atom({
  key: "showGridMenu",
  default: false,
});

export let aCursorColor = atom({
  key: "cursorColor",
  default: "#00ffff",
});

export let sZoomLevels = selector({
  key: "zoomLevels",
  get: ({ get }) => {
    let [w, h] = get(aWindowSize);
    let buttonSize = get(aButtonSize);
    let showShortcuts = get(aShowShortcuts);
    let image = get(aImage);
    h -= buttonSize * 2 + 2 + 6;
    if (showShortcuts) w -= 320;
    let sizeW = image.width + Scene.padding * 2;
    let sizeH = image.height + Scene.padding * 2;
    let ratio = null;
    let imageRatio = sizeW / sizeH;
    let windowRatio = w / h;
    if (imageRatio > windowRatio) {
      ratio = (w - Scene.padding * 2) / image.width;
    } else {
      ratio = (h - Scene.padding * 2) / image.height;
    }
    let levels = [0.25, 0.5, 1.0, 1.5, 2, 4];
    if (ratio !== null) levels.push(ratio);
    levels.sort();
    return levels;
  },
});

export let sZoomIn = selector({
  key: "zoomIn",
  set: ({ get, set }) => {
    let zoomLevels = get(sZoomLevels);
    let zoom = get(aZoom);
    let closest = zoomLevels.reduce(function (prev, curr) {
      return Math.abs(curr - zoom) < Math.abs(prev - zoom) ? curr : prev;
    });
    let index = zoomLevels.indexOf(closest);
    let newIndex = index + 1;
    if (newIndex < zoomLevels.length) {
      set(aZoom, zoomLevels[newIndex]);
    }
  },
});

export let sZoomOut = selector({
  key: "zoomOut",
  set: ({ get, set }) => {
    let zoomLevels = get(sZoomLevels);
    let zoom = get(aZoom);
    let closest = zoomLevels.reduce(function (prev, curr) {
      return Math.abs(curr - zoom) < Math.abs(prev - zoom) ? curr : prev;
    });
    let index = zoomLevels.indexOf(closest);
    let newIndex = index - 1;
    if (newIndex > -1) {
      set(aZoom, zoomLevels[newIndex]);
    }
  },
});

export let sModifyCell = selector({
  key: "modifyCell",
  set: ({ get, set }, modifications) => {
    let cell = get(aCell).slice();
    for (let i = 0; i < cell.length; i++) {
      cell[i] = parseInt(cell[i]) + parseInt(modifications[i]);
    }
    set(aCell, cell);
  },
});

export let aShowShortcuts = atom({
  key: "showShortuts",
  default: false,
});

export let sShortcutPadding = selector({
  key: "shortcutPadding",
  get: ({ get }) => {
    let showShortcuts = get(aShowShortcuts);
    let windowWidth = get(aWindowSize)[0];
    let renderWidth = get(sRenderSize)[0];

    let p = 0;
    if (showShortcuts) {
      if ((windowWidth - renderWidth) / 2 < 320) {
        p = 320;
      }
    }
    return p;
  },
});

export let sToggleShortcuts = selector({
  key: "toggleShortcuts",
  set: ({ get, set }) => {
    let shortcuts = get(aShowShortcuts);
    set(aShowShortcuts, !shortcuts);
  },
});

export let aShowAbout = atom({
  key: "showAbout",
  default: false,
});

export let sToggleShowAbout = selector({
  key: "toggleShowAbout",
  set: ({ get, set }) => {
    let about = get(aShowAbout);
    set(aShowAbout, !about);
  },
});
