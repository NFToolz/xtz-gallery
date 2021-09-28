import React, { useEffect, useState } from 'react';
import Image from './components/image';
import XDirectory from './components/x-directory';
import GLTF from './components/gltf';
import './main.css';

export default function App() {
  const [current, setCurrent] = useState(null);
  const [address, setAddress] = useState(null);
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    setAddress(window.prompt('Tezos address?'));
  }, []);

  useEffect(() => {
    if (address) {
      getTokens(address).then((tokens) => {
        setTokens(tokens);
      });
    }
  }, [address]);

  useEffect(() => {
    if (current) {
      setCurrent(tokens[(tokens.indexOf(current) + 1) % tokens.length])
    } else {
      setCurrent(tokens[0])
    }
  }, [tokens]);

  useEffect(() => {
    console.log(current);
  }, [current]);

  function getTokens(address, offset = 0, tokens = []) {
    return new Promise((resolve, reject) => fetch(`https://api.better-call.dev/v1/account/mainnet/${address}/token_balances?size=50&offset=${offset}`)
      .then((response) => {
        if (!response.ok) {
          throw `HTTP error ${response.status}`;
        }
        response.json().then((data) => {
          tokens = tokens.concat(data.balances);

          if (tokens.length < data.total) {
            getTokens(address, tokens.length, tokens).then(resolve).catch(reject);
          } else {
            resolve(tokens);
          }
        }).catch(reject)
      }).catch(reject)
    );
  }

  function replaceIPFS(url) {
    return (url) ? url.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/') : null;
  }

  function renderObject(object) {
    switch (object.formats[0].mimeType) {
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
        return <Image url={replaceIPFS(current.formats[0].uri)} />
        break;
      case 'application/x-directory':
      case 'image/svg+xml':
        return <XDirectory url={replaceIPFS(current.formats[0].uri)} />
        break;
      case 'model/gltf-binary':
      case 'model/gltf+json':
        return <GLTF url={replaceIPFS(current.formats[0].uri)} />
        break;
    }
  }

  return (
    <div>
      {current && <div
        style= {{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      >
        {renderObject(current)}
      </div>}
      <div
        style= {{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: '80%',
          cursor: 'e-resize',
        }}
        onClick={() => {
          setCurrent(tokens[(tokens.indexOf(current) + 1) % tokens.length])
        }}
      />
      <div
        style= {{
          position: 'absolute',
          top: 0,
          right: '80%',
          bottom: 0,
          left: 0,
          cursor: 'w-resize',
        }}
        onClick={() => {
          setCurrent(tokens[(tokens.indexOf(current) - 1) % tokens.length])
        }}
      />
    </div>
  );
}
