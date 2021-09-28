import React, { useEffect, useState } from 'react';

export default function GLTF({ url }) {
  const [src, setSrc] = useState(url);

  useEffect(() => {
    setSrc(url);
  }, [url]);

  return (
    <model-viewer
      style={{
        width: '100%',
        height: '100%',
      }}
      autoplay
      auto-rotate
      interaction-prompt="none"
      src={src}
    />
  );
}
