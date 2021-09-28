import React, { useEffect, useState } from 'react';

export default function Image({ url, render = 'pixelated' }) {
  const [src, setSrc] = useState(url);
  const [rendering, setRendering] = useState(render);

  useEffect(() => {
    setSrc(url);
    setRendering(rendering);
  }, [url, rendering]);

  return (
    <img
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        imageRendering: rendering,
      }}
      src={src}
    />
  );
}
