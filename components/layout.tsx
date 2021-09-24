import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Credential from '../credentials/credentials';
import Dropdown from './Dropdown';
import Listbox from './ListBox';

interface Genre {
  id: string;
  name: string;
}

const Layout = () => {
  const spotify = Credential();

  const [token, setToken] = useState('');
  const [genres, setGenres] = useState({ selectedGenre: '', listOfGenresFromAPI: [] });
  const [playlist, setPlaylist] = useState({ selectedPlaylist: '', listOfPlaylistFromAPI: [] });
  const [tracks, setTracks] = useState({ selectedTrack: '', listOfTracksFromAPI: [] });
  const [trackDetail, setTrackDetail] = useState(null);
  const [temp, setTemp] = useState(true);
  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${spotify.ClientId}:${spotify.ClientSecret}`)}`,
      },
      data: 'grant_type=client_credentials',
      method: 'POST',
    })
      .then((tokenResponse) => {
        setToken(tokenResponse.data.access_token);

        axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
          method: 'GET',
          headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` },
        })
          .then((genreResponse) => {
            setGenres({
              selectedGenre: genres.selectedGenre,
              listOfGenresFromAPI: genreResponse.data.categories.items,
            });
          });
      });
  }, []);

  const genreChanged = (val:string) => {
    setGenres({
      selectedGenre: val,
      listOfGenresFromAPI: genres.listOfGenresFromAPI,
    });
    setTemp(true);

    axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((playlistResponse) => {
        setPlaylist({
          selectedPlaylist: playlist.selectedPlaylist,
          listOfPlaylistFromAPI: playlistResponse.data.playlists.items,
        });
      });
  };

  const playlistChanged = (val:string) => {
    setPlaylist({
      selectedPlaylist: val,
      listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI,
    });
    setTemp(false);
    // console.log(playlist.listOfPlaylistFromAPI.length > 0);
  };

  const buttonClicked = (e:any) => {
    e.preventDefault();

    axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((tracksResponse) => {
        setTracks({
          selectedTrack: tracks.selectedTrack,
          listOfTracksFromAPI: tracksResponse.data.items,
        });
      });
  };

  const listboxClicked = (val:string) => {
    const currentTracks = [...tracks.listOfTracksFromAPI];

    const trackInfo = currentTracks.filter((t) => t.track.id === val);

    setTrackDetail(trackInfo[0].track);
    // console.log(trackInfo);
    // history.push('/detail');
  };

  // console.log(tracks);

  return (
    <>
      <Dropdown label="Genres: " listOfItems={genres.listOfGenresFromAPI} selectedValue={genres.selectedGenre} changed={genreChanged} />
      <Dropdown label="Categories: " listOfItems={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged} />
      {/* <button type="submit" className="submit-button" onClick={(e) => buttonClicked(e)} disabled={temp}>
        Search songs
      </button> */}

      <div className="btn-container">
        <div className="btn-center">
          <button type="button" className="btn" onClick={(e) => buttonClicked(e)} disabled={temp}>
            <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
              <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
              <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
            </svg>
            <span>SEARCH</span>
          </button>
        </div>
      </div>
      <Listbox
        tracks={tracks.listOfTracksFromAPI}
        selectedValue={tracks.selectedTrack}
        clicked={listboxClicked}
      />
    </>
  );
};

export default Layout;
