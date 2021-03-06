/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Image from 'next/image';
import { useHistory } from 'react-router-dom';
import trackListState from '../../components/atom';

interface Temp {
  id: string;
  name: string;
  album: {
    images: [{ url:string }]
  }
  external_urls?: { spotify: string }
}

const TrackInfo = () => {
  const currentTracks = useRecoilValue(trackListState);
  const [tempTrack, setTempTrack] = useState<Temp | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const history = useHistory();
  // console.log(currentTracks);

  useEffect(() => {
    const { track } = currentTracks.filter((t) => t.track.id === id)[0];
    setTempTrack(track);
  }, [currentTracks, id]);

  // const handleClick = (e: any) => {
  //   window.open = e.target.id;
  // };

  const handleBack = () => {
    router.push('/');
  };
  return (
    <div className="track-container main-body">
      {/* <button type="button" onClick={() => handleBack()}>Go Back</button> */}
      <div className="btn-container-back">
        <div className="btn-center-back">
          <button type="button" className="btn-back" onClick={() => handleBack()}>
            <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
              <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
              <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
            </svg>
            <span>GO BACK</span>
          </button>
        </div>
      </div>
      {tempTrack && (
      <div className="track-info">
        <h1>{tempTrack.name}</h1>
        <div className="image-container">
          <Image src={tempTrack.album.images[0].url} alt="Artist" height={400} width={400} quality={100} placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=" className="track-image" />

        </div>
        {/* <iframe src="https://api.spotify.com/v1/albums/5kFCfioZraFsRWpoitQjmx" width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media" title="yes" /> */}
        <div className="iframe">
          <iframe src={`https://open.spotify.com/embed/track/${tempTrack.id}`} title="track" width="400" height="80" frameBorder="0" allow="encrypted-media" />
        </div>
        <form method="get" action={tempTrack.external_urls && tempTrack.external_urls.spotify} target="_blank">
          <input type="submit" className="hover-center-1" value={`Listen to ${tempTrack.name} in Spotify`} />
        </form>
      </div>
      )}
    </div>
  );
};

export default TrackInfo;
