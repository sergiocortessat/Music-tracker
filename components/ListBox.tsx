/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  atom, useRecoilState, useResetRecoilState, useSetRecoilState,
} from 'recoil';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import todoListState from './atom';

interface Props {
  tracks: Array<{ track: { id: string, name: string, album: { images:[{ url: string }] } } }>;
  selectedValue: string;
  clicked: (id: string) => void;

}

interface Track {
  tracks: Array<{ track: { id: string, name: string, album: { images:[{ url: string }] } } }>;
}

const ListBox = ({
  tracks, selectedValue, clicked,
}: Props) => {
  // const setText = useSetRecoilState(todoListState);
  const setTodoList = useSetRecoilState<any>(todoListState);
  // const [todoList, setTodoList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const currentTracks = [tracks];
    setTodoList(currentTracks);
  }, [tracks, setTodoList]);

  const handleClicked = (e: any) => {
    clicked(e.target.id);
    router.push(`/track-info/${e.target.id}`);
  };
  // console.log(todoList);
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
