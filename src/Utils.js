export function eq(c1, c2) {
  return c1 === c2;
}

export function or(c1, c2) {
  return c1 || c2;
}

export const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = function () {
      resolve(image);
    };
    image.src = src;
  });
};
