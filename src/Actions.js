import { loadImage } from "./Utils";
import Scene from "./Scene";

export function domLoadImage(callback) {
  let input = document.querySelector("#fileInput");
  async function handleChange(e) {
    for (let item of this.files) {
      if (item.type.indexOf("image") < 0) {
        continue;
      }
      let src = URL.createObjectURL(item);
      let image = await loadImage(src);
      callback(image);
      this.removeEventListener("change", handleChange);
    }
  }
  input.addEventListener("change", handleChange);

  input.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );
  return input;
}

export function saveImage() {
  let c = document.createElement("canvas");
  let link = document.createElement("a");
  let ic = Scene.layersRef.current.imageLayer;
  c.width = ic.width;
  c.height = ic.height;
  let cx = c.getContext("2d");
  cx.drawImage(ic, 0, 0);
  c.toBlob(function (blob) {
    link.setAttribute(
      "download",
      "flow-" + Math.round(new Date().getTime() / 1000) + ".png"
    );
    link.setAttribute("href", URL.createObjectURL(blob));
    link.dispatchEvent(
      new MouseEvent(`click`, {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );
  });
}
