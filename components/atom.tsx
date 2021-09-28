import { atom } from 'recoil';

interface Track {

  track: {
    id: string;
    name: string;
    album: {
      images: [{ url:string }]
    }
    external_urls?: { spotify: string }
  }

}

const trackListState = atom({ key: 'todoListState', default: [] as Track[] });
export default trackListState;
