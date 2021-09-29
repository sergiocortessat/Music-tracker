/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  atom, useRecoilState, useResetRecoilState, useSetRecoilState,
} from 'recoil';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import trackListState from './atom';

interface Props {
  tracks: Array<{ track: { id: string, name: string, album: { images:[{ url: string }] } } }>;
  selectedValue: string;
  clicked: (id: string) => void;

}

const ListBox = ({
  tracks, selectedValue, clicked,
}: Props) => {
  const setCurrentTracks = useSetRecoilState(trackListState);
  const router = useRouter();

  useEffect(() => {
    setCurrentTracks(tracks);
  }, [tracks, setCurrentTracks]);

  const handleClicked = (e: any) => {
    clicked(e.target.id);
    router.push(`/track-info/${e.target.id}`);
  };
  const x = 0;
  return (
    <div className="list-box">
      {tracks && tracks.map((item) => (
        <div className="track-container">
          <button className="search-button glow-on-hover" onClick={(e) => handleClicked(e)} id={item.track.id} type="button">
            LISTEN TO:
            {' '}
            {item.track.name}
          </button>
          <Image className="menu-image" src={item.track.album.images[0].url} alt="photo" height={165} width={160} quality={100} placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=" />
        </div>
      ))}
    </div>
  );
};

export default ListBox;
