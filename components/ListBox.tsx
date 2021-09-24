/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/dist/client/router';
import todoListState from './atom';

interface Props {
  tracks: Array<{ track: { id: string, name: string } }>;
  selectedValue: string;
  clicked: (id: string) => void;

}

interface Track {
  tracks: Array<{ track: { id: string, name: string } }>;
}

const ListBox = ({
  tracks, selectedValue, clicked,
}: Props) => {
  // const setText = useSetRecoilState(todoListState);
  const [todoList, setTodoList] = useRecoilState<string[]>(todoListState);
  // const [todoList, setTodoList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const currentTracks:Track = [tracks];
    setTodoList(currentTracks);
  }, [tracks]);
  // const listboxClicked = () => {
  //   console.log(currentTracks);
  //   // const trackInfo = currentTracks.filter((t) => t.track.id === e.target.id);

  // };
  // <Link href={`/track-info/${item.track.id}`} key={item.track.id} passHref onClick={(e) => handleClicked(e)}>

  const handleClicked = (e: any) => {
    clicked(e.target.id);
    router.push(`/track-info/${e.target.id}`);
  };
  // console.log(todoList);
  const x = 0;
  return (
    <div className="list-box">
      {tracks && tracks.map((item) => (

        <button className="search-button" onClick={(e) => handleClicked(e)} id={item.track.id} type="button">{item.track.name}</button>

      ))}
    </div>
  );
};

export default ListBox;
