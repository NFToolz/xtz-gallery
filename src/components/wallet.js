import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Image from './image';
import XDirectory from './x-directory';
import GLTF from './gltf';
import Video from './video';
import '../main.css';
import { useParams } from "react-router-dom";

async function getTokens(address, offset = 0, tokens = []) {
  const response = await fetch(`https://api.better-call.dev/v1/account/mainnet/${address}/token_balances?size=50&offset=${offset}`);

  const data = await response.json();

  tokens = tokens.concat(data.balances);

  if (tokens.length < data.total) {
    return await getTokens(address, tokens.length, tokens)
  } else {
    return tokens
  }
}

function replaceIPFS(url, alt) {
  if (alt) {
    return (url) ? url.replace('ipfs://', 'https://ipfs.infura.io/') : null;
  } else {
    return (url) ? url.replace('ipfs://', 'https://ipfs.infura.io/') : null;
  }
}

function renderObject(object) {
  const {mimeType, uri} = object.formats[0];
  const key = object.artifact_uri;

  switch (mimeType) {
    case 'image/jpeg':
    case 'image/png':
    case 'image/gif':
      return <Image key={key} url={replaceIPFS(uri)} />
    case 'application/x-directory':
    case 'image/svg+xml':
      return <XDirectory key={key} url={replaceIPFS(uri)} />
    case 'model/gltf-binary':
    case 'model/gltf+json':
      return <GLTF key={key} url={replaceIPFS(uri)} />
    case 'video/mp4':
    case 'video/ogg':
      return <Video key={key} url={replaceIPFS(uri, true)} />
    default:
      return null;
  }
}

function useTokens(address) {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    async function fetchTokens() {
      if(address) {
        const tokens = await getTokens(address);
        setTokens(tokens);
      }
    }
    fetchTokens()
  }, [address]);

  return tokens;
}

export default function Wallet() {
  const {address} = useParams();
  const tokens = useTokens(address);
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = useMemo(() => tokens[currentIndex], [tokens, currentIndex]);

  const next = useCallback(() =>
    setCurrentIndex((currentIndex + 1) % tokens.length),
  [currentIndex, tokens])

  const prev = useCallback(() =>
    setCurrentIndex(currentIndex + 1 >= tokens.length ? 0 : currentIndex - 1),
  [currentIndex, tokens])

  useEffect(() => {
    console.log({address, current, currentIndex})
  }, [address, current, currentIndex])

  return (
    <div>
      {current && <div
        style={{
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
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: '80%',
          cursor: 'e-resize',
        }}
        onClick={next}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: '80%',
          bottom: 0,
          left: 0,
          cursor: 'w-resize',
        }}
        onClick={prev}
      />
    </div>
  )
}
