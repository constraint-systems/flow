<div
  className="help"
  style={{
    position: 'fixed',
    outline: color === 'dark' ? 'solid 1px white' : 'solid 1px black',
    display: help ? 'block' : 'none',
    width: maxch,
    maxWidth: `calc(100% - 4ch)`,
    background: color === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
    paddingLeft: '2ch',
    paddingRight: '2ch',
    paddingBottom: rlh / 2,
    paddingTop: rlh / 2,
    right: '2ch',
    bottom: rlh,
    overflowY: 'auto',
  }}
>
  {mode === 'move' ? (
    <div>
      <div style={{ marginBottom: rlh / 2, maxWidth: maxch }}>
        Edit an image using keyboard-controlled pixel flows.
      </div>
      <div style={{ marginBottom: rlh / 4, maxWidth: maxch }}>MOVE</div>
      <div style={{ marginBottom: rlh / 2, maxWidth: maxch }}>
        {KeyTip('h', color)} ←&nbsp; {KeyTip('j', color)} ↓&nbsp;{' '}
        {KeyTip('k', color)} ↑&nbsp; {KeyTip('l', color)} →<br />
      </div>
      <div style={{ marginBottom: rlh / 2, maxWidth: maxch }}>
        hold {KeyTip('shift', color)} to move by 10
      </div>
      <div style={{ marginBottom: rlh / 4, maxWidth: maxch }}>SELECT FLOW</div>
      <div style={{ marginBottom: rlh / 2, maxWidth: maxch }}>
        {KeyTip('enter', color)}
      </div>
      <div style={{ marginBottom: rlh / 4, maxWidth: maxch }}>
        ADJUST CURSOR
      </div>
      <div style={{ marginBottom: rlh / 2, maxWidth: maxch }}>
        {KeyTip('2', color)}
      </div>
    </div>
  ) : mode === 'choose_flow' ? (
    <div>
      <div style={{ marginBottom: rlh / 4, maxWidth: maxch }}>
        SELECT FLOW DIRECTION
      </div>
      <div style={{ marginBottom: rlh / 2, maxWidth: maxch }}>
        {KeyTip('a', color)} west&nbsp; {KeyTip('w', color)} north&nbsp;{' '}
        {KeyTip('s', color)} south&nbsp; {KeyTip('d', color)} east&nbsp;{' '}
      </div>
      <div style={{ marginBottom: rlh / 2, maxWidth: maxch }}>
        {KeyTip('escape', color)} cancel
      </div>
    </div>
  ) : mode === 'adjust_flow' ? (
    <div>
      <div style={{ marginBottom: rlh / 4, maxWidth: maxch }}>ADJUST FLOW</div>
      <div style={{ marginBottom: rlh / 2, maxWidth: maxch }}>
        {KeyTip('f', color)} flip direction{' '}
      </div>
      <div style={{ marginBottom: rlh / 2, maxWidth: maxch }}>
        {KeyTip('enter', color)} start flow
      </div>
      <div style={{ marginBottom: rlh / 2, maxWidth: maxch }}>
        {KeyTip('escape', color)} cancel
      </div>
    </div>
  ) : (
    <div>
      <div style={{ marginBottom: rlh / 4, maxWidth: maxch }}>
        ADJUST CURSOR SIZE
      </div>
      <div style={{ marginBottom: rlh / 2, maxWidth: maxch }}>
        {KeyTip('h', color)} ←&nbsp; {KeyTip('j', color)} ↓&nbsp;{' '}
        {KeyTip('k', color)} ↑&nbsp; {KeyTip('l', color)} →<br />
      </div>
      <div style={{ marginBottom: rlh / 2, maxWidth: maxch }}>
        hold {KeyTip('shift', color)} to adjust by 10
      </div>
      <div style={{ marginBottom: rlh / 2, maxWidth: maxch }}>
        {KeyTip('enter', color)} finish
      </div>
    </div>
  )}
  <div>
    <div style={{ marginBottom: rlh / 4, maxWidth: maxch }}>SPECIAL</div>
    <div style={{ marginBottom: rlh / 2, maxWidth: maxch }}>
      {KeyTip('x', color)} save frame as png&nbsp; {KeyTip('space', color)}{' '}
      pause/play flows&nbsp; {KeyTip('v', color)} show flow outlines&nbsp;{' '}
      {KeyTip('c', color)} clear flows&nbsp; {KeyTip('?', color)} help
    </div>
  </div>
</div>;
