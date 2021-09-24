/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Image from 'next/image';
import { useHistory } from 'react-router-dom';
import todoListState from '../../components/atom';
import blurImage from '../../public/image.png';

interface Tracks {
  track: {
    id: string;
  }
}

interface TrackInformation {
  track: {
    id: string;
    name: string;
    album: {
      images: [{ url:string }]
    }
    external_urls: { spotify: string }
  }
}

interface Temp {
  id: string;
  name: string;
  album: {
    images: [{ url:string }]
  }
  external_urls: { spotify: string }
}

const TrackInfo = () => {
  const currentTracks = useRecoilValue<[][] | []>(todoListState);
  const [tempTrack, setTempTrack] = useState<null | Temp>(null);
  const router = useRouter();
  const { id } = router.query;
  const history = useHistory();
  // console.log(currentTracks);

  useEffect(() => {
    // const trackInfo:Temp = currentTracks[0].filter((t:Tracks) => t.track.id === id)[0];
    const track :TrackInformation = currentTracks[0].filter((t:Tracks) => t.track.id === id)[0];
    setTempTrack(track.track);
  }, [currentTracks, id]);
  // console.log(track.album && track.album.images);

  const handleClick = (e: any) => {
    window.open = e.target.id;
  };

  const handleBack = () => {
    router.push('/');
    // console.log(router);
  };
  return (
    <div>
      <button type="button" onClick={() => handleBack()}>Go Back</button>
      {tempTrack && (
      <div>
        <h1>{tempTrack.id}</h1>
        <h1>{tempTrack.name}</h1>
        <Image src={tempTrack.album.images[0].url} alt="Artist" height={400} width={400} quality={100} placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=" />
        <form method="get" action={tempTrack.external_urls.spotify} target="_blank">
          <input type="submit" value={`Listen to ${tempTrack.name}`} />
        </form>
      </div>
      )}
    </div>
  );
};

export default TrackInfo;
