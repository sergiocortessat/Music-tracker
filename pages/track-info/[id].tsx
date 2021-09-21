/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import todoListState from '../../components/atom';

interface Props {

}

const TrackInfo = (props: Props) => {
  const currentTracks = useRecoilValue(todoListState);
  const [track, setTrack] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const trackInfo = currentTracks[0].filter((t) => t.track.id === id)[0];

    setTrack(trackInfo.track);
  }, []);
  console.log(track);
  return (
    <div>
      {track && (
      <div>
        <h1>{track.id}</h1>
        <h1>{track.name}</h1>

      </div>
      )}
    </div>
  );
};

export default TrackInfo;
