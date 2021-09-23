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

  // console.log(trackDetail);
  return (
    <>
      <Dropdown label="Genres: " listOfItems={genres.listOfGenresFromAPI} selectedValue={genres.selectedGenre} changed={genreChanged} />
      <Dropdown label="Categories: " listOfItems={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged} />
      <button type="submit" className="submit-button" onClick={(e) => buttonClicked(e)}>
        Search songs
      </button>
      <Listbox
        tracks={tracks.listOfTracksFromAPI}
        selectedValue={tracks.selectedTrack}
      />
    </>
  );
};

export default Layout;
