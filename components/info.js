let fs = 14;
let lh = 1.5;
let rlh = fs * lh;
let ts = {
  textTransform: 'uppercase',
};
let maxch = '74ch';

let Key = item => {
  let [key, label] = item;
  return (
    <div
      style={{
        marginRight: '1ch',
        display: 'flex',
        marginBottom: rlh / 4,
      }}
    >
      <div
        style={{
          border: 'solid 1px black',
          paddingLeft: '0.5ch',
          paddingRight: '0.5ch',
          background: '#fff',
        }}
      >
        {key}
      </div>
      <div
        style={{
          paddingLeft: '1ch',
          paddingRight: '1ch',
          borderTop: 'dotted 1px white',
          borderRight: 'dotted 1px white',
          borderBottom: 'dotted 1px white',
        }}
      >
        {label}
      </div>
    </div>
  );
};

let KeyList = ({ items }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {items.map(item => {
        return Key(item);
      })}
    </div>
  );
};

let Relevant = ({ mode }) => {
  switch (mode) {
    case 'move':
      return (
        <div>
          <div
            style={{
              marginBottom: rlh / 4,
            }}
          >
            <div style={ts}>Move cursor</div>
            <KeyList items={[['h', '←'], ['j', '↓'], ['k', '↑'], ['l', '→']]} />
            <KeyList items={[['shift', 'hold to move by 10']]} />
          </div>
          <div
            style={{
              marginBottom: rlh / 4,
            }}
          >
            <div style={ts}>Action</div>
            <KeyList
              items={[['enter', 'select flow'], ['2', 'adjust cursor']]}
            />
          </div>
        </div>
      );
      break;
    case 'choose_flow':
      return (
        <div>
          <div
            style={{
              marginBottom: rlh / 4,
            }}
          >
            <div style={ts}>Choose flow direction</div>
            <KeyList
              items={[
                ['a', 'west'],
                ['w', 'north'],
                ['s', 'south'],
                ['d', 'east'],
              ]}
            />
            <KeyList items={[['escape', 'cancel']]} />
          </div>
        </div>
      );
      break;
    case 'adjust_flow':
      return (
        <div>
          <div
            style={{
              marginBottom: rlh / 4,
            }}
          >
            <div style={ts}>Adjust flow</div>
            <KeyList items={[['f', 'flip direction']]} />
            <KeyList items={[['enter', 'start flow']]} />
            <KeyList items={[['escape', 'cancel']]} />
          </div>
        </div>
      );
      break;
    case 'adjust_cursor':
      return (
        <div>
          <div
            style={{
              marginBottom: rlh / 4,
            }}
          >
            <div style={ts}>Adjust cursor size</div>
            <KeyList items={[['h', '←'], ['j', '↓'], ['k', '↑'], ['l', '→']]} />
            <KeyList items={[['shift', 'hold to adjust by 10']]} />
          </div>
        </div>
      );
      break;
    default:
      return null;
  }
};

export default ({ rlh, mode }) => {
  return (
    <div
      style={{
        paddingRight: '1ch',
        paddingLeft: '1ch',
        paddingTop: rlh / 4,
        paddingBottom: rlh / 4,
        position: 'fixed',
        outline: 'solid 1px black',
        width: maxch,
        maxWidth: `calc(100% - 4ch)`,
        background: 'white',
        paddingLeft: '2ch',
        paddingRight: '2ch',
        paddingBottom: rlh / 2,
        paddingTop: rlh / 2,
        right: '2ch',
        bottom: rlh,
        overflowY: 'auto',
      }}
    >
      <div style={{ marginBottom: rlh / 4 }}>
        Edit an image using keyboard-controlled pixel flows.
      </div>

      <div
        style={{
          background: '#efefef',
          marginLeft: '-2ch',
          marginRight: '-2ch',
          paddingLeft: '2ch',
          paddingRight: '2ch',
        }}
      >
        <Relevant mode={mode} />
      </div>
      <div
        style={{
          marginBottom: rlh / 4,
        }}
      >
        <div style={ts}>Image</div>
        <div>To add an image you can paste, drop or press</div>
        <KeyList items={[['o', 'to open a file dialog']]} />
      </div>
      <div style={ts}>Special</div>
      <KeyList
        items={[
          ['x', 'save frame as png'],
          ['space', 'pause/play flows'],
          ['v', 'show flow outlines'],
          ['r', 'clear and reset image'],
          ['?', 'help'],
        ]}
      />
    </div>
  );
};
