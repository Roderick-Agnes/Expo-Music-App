import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
  Button,
} from "react-native";
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AudioControl from "./AudioControl";
import { useFonts } from "expo-font";
import { fontMap } from "../utils/constants";
import * as SplashScreen from "expo-splash-screen";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { LOCAL_SERVER_API_URL } from "../configs";
import AudioTracks from "./AudioTracks";
import { joinArtistsName } from "../utils/helpers";
import { AudioContext } from "../contexts/AudioContext";
import { GlobalContext } from "../contexts/GlobalContext";
import Loader from "./Loader";

const { height: heightScreen } = Dimensions.get("window");

const AudioPlayer = () => {
  // context
  // get track list is playing
  const {
    isLoading,
    turnOnLoading,
    playlistIsPlaying,
    setPlaylistTracksIsPlaying,
  } = useContext(GlobalContext);

  const [trackIndexIsPlaying, setTrackIndexIsPlaying] = useState(0);
  const [showAudioQueue, setShowAudioQueue] = useState(false);
  const handleShowQueue = () => {
    setShowAudioQueue((prev) => !prev);
  };
  // store
  // const { playlistId, playlistName } = useSelector((state) => state.playlist);

  const navigator = useNavigation();

  useLayoutEffect(() => {
    navigator.setOptions({ headerShown: false });
  }, []);

  const goBack = () => {
    turnOnLoading();
    setPlaylistTracksIsPlaying([]);
    navigator.goBack();
  };

  if (isLoading && playlistIsPlaying.length === 0) return <Loader />;

  return (
    <SafeAreaView className="relative bg-main pt-4 space-y-2 h-full">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 mb-2">
        <TouchableOpacity onPress={goBack}>
          <MaterialIcons name="arrow-back" size={22} color={"#fff"} />
        </TouchableOpacity>
        <Text className="text-xl text-white  font-extrabold">Now Playing</Text>
        <TouchableOpacity onPress={() => setShowAudioQueue((cur) => !cur)}>
          <MaterialIcons name="playlist-play" size={26} color={"#fff"} />
        </TouchableOpacity>
      </View>

      {/* Thumbnail Playlists  */}

      <AudioControl
        tracks={playlistIsPlaying}
        trackIndexIsPlaying={trackIndexIsPlaying}
        setTrackIndexIsPlaying={setTrackIndexIsPlaying}
      />

      {/* All track of this playlist */}
      <AudioTracks
        tracks={playlistIsPlaying}
        trackIndexIsPlaying={trackIndexIsPlaying}
        setTrackIndexIsPlaying={setTrackIndexIsPlaying}
        showAudioQueue={showAudioQueue}
        handleShowQueue={handleShowQueue}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
export default memo(AudioPlayer);
