import { View, Text } from "react-native";
import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

export const GlobalContext = createContext([]);

const GlobalContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // setters
  const setPlaylistTracksIsPlaying = (playlist) => {
    // update new state
    setPlaylistTracks(playlist);
  };

  const turnOnLoading = () => {
    setIsLoading(true);
  };
  const turnOffLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (playlistTracks.length > 0) setIsLoading(false);
  }, [playlistTracks]);

  const globalContextDynamicData = useMemo(
    () => ({
      playlistIsPlaying: playlistTracks,
      setPlaylistTracksIsPlaying,
      isLoading,
      turnOnLoading,
    }),
    [playlistTracks, isLoading]
  );
  return (
    <GlobalContext.Provider value={globalContextDynamicData}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
