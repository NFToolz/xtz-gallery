import React, { useEffect, useState } from 'react';

export default function Video({ url }) {
  const [src, setSrc] = useState(url);

  useEffect(() => {
    setSrc(url);
  }, [url]);

  return (
    <video
      style={{
        width: '100%',
        height: '100%',
      }}
      autoPlay
      loop
      muted
      playsInline
      src={src}
    />
  );
}
