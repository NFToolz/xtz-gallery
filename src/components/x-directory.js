import React, { useEffect, useState } from 'react';

export default function XDirectory({ url }) {
  const [src, setSrc] = useState(url);

  useEffect(() => {
    setSrc(url);
  }, [url]);

  return (
    <iframe
      style={{
        width: '100%',
        height: '100%',
        border: 0,
      }}
      src={src}
    />
  );
}
