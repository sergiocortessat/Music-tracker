/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

interface Props {
  tracks: Array<{
    name: string;
    id: number
    track: {
      name: string
    }
  }>;
  selectedValue: string;

}

const ListBox = ({ tracks, selectedValue }: Props) => {
  const x = 0;
  console.log(tracks[0].track.name);
  return (
    <div>
      {tracks && tracks.map((track) => (
        <div key={track.id}>
          <p>{track.track.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ListBox;
