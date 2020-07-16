import * as React from 'react';

export default function App() {
  return (
    <div>
      {[
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'button',
        'caption',
        'overline',
      ].map((val) => (
        <div className={`m-2 p-1 text-${val}`} key={val}>
          Text {val}
        </div>
      ))}
    </div>
  );
}
