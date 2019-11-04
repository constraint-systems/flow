export function flowMove(flow, c) {
  let t = document.createElement('canvas');
  let tx = t.getContext('2d');
  t.width = flow[2];
  t.height = flow[3];
  if (flow[4] === 'e') {
    tx.drawImage(
      c,
      flow[0],
      flow[1],
      flow[2] - 1,
      flow[3],
      1,
      0,
      flow[2] - 1,
      flow[3]
    );
    tx.drawImage(
      c,
      flow[0] + flow[2] - 1,
      flow[1],
      1,
      flow[3],
      0,
      0,
      1,
      flow[3]
    );
  } else if (flow[4] === 'w') {
    tx.drawImage(
      c,
      flow[0] + 1,
      flow[1],
      flow[2] - 1,
      flow[3],
      0,
      0,
      flow[2] - 1,
      flow[3]
    );
    tx.drawImage(c, flow[0], flow[1], 1, flow[3], flow[2] - 1, 0, 1, flow[3]);
  } else if (flow[4] === 's') {
    tx.drawImage(
      c,
      flow[0],
      flow[1],
      flow[2],
      flow[3] - 1,
      0,
      0 + 1,
      flow[2],
      flow[3] - 1
    );
    tx.drawImage(
      c,
      flow[0],
      flow[1] + flow[3] - 1,
      flow[2],
      1,
      0,
      0,
      flow[2],
      1
    );
  } else if (flow[4] === 'n') {
    tx.drawImage(
      c,
      flow[0],
      flow[1] + 1,
      flow[2],
      flow[3] - 1,
      0,
      0,
      flow[2],
      flow[3] - 1
    );
    tx.drawImage(c, flow[0], flow[1], flow[2], 1, 0, flow[3] - 1, flow[2], 1);
  }
  return t;
}
