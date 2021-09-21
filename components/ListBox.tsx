/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import todoListState from './atom';

interface Props {
  tracks: Array<{ track: { id: string, name: string } }>;
  selectedValue: string;

}

const ListBox = ({
  tracks, selectedValue,
}: Props) => {
  // const setText = useSetRecoilState(todoListState);
  const [todoList, setTodoList] = useRecoilState(todoListState);

  useEffect(() => {
    const currentTracks = [tracks];
    setTodoList(currentTracks);
  }, [tracks]);
  // const listboxClicked = () => {
  //   console.log(currentTracks);
  //   // const trackInfo = currentTracks.filter((t) => t.track.id === e.target.id);

  // };
  // console.log(todoList);
  const x = 0;
  return (
    <div>
      {tracks && tracks.map((item) => (
        <Link href={`/track-info/${item.track.id}`} key={item.track.id} passHref>
          <button type="button">{item.track.name}</button>
        </Link>
      ))}
    </div>
  );
};

export default ListBox;
