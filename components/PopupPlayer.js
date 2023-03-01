import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Progress } from "@ant-design/react-native";
import DiscCard from "./DiscCard";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTrackIsPlaying,
  setTrackIsPlaying,
  setTrackUrlIsPlaying,
} from "../app/reducers/musicSlice";
import useMusic from "../hooks/useMusic";
import { Audio } from "expo-av";
import TextTicker from "react-native-text-ticker";
import { LinearGradient } from "expo-linear-gradient";
import {
  getAudioUrlFromServer,
  handleTrackDetructoring,
} from "../utils/helpers";
import Slider from "@react-native-community/slider";

const screenWidth = Dimensions.get("window").width;

const PopupPlayer = () => {
  // state
  const [show, setShow] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [audioUrl, setAudioUrl] = useState();
  const [sound, setSound] = useState(new Audio.Sound());
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioPosition, setAudioPosition] = useState(0);

  // store
  const { trackId, track } = useSelector((state) => state.music.trackIsPlaying);

  const dispatch = useDispatch();

  // hook custom
  const { fetchTrack } = useMusic();

  const handleClosePopup = async () => {
    // reset the track data in popup
    if (sound) {
      await sound.unloadAsync();
      // close player popup
      setShow(false);
    } else console.log("not sound loaded");
  };

  // reset the track
  const resetTrack = async () => {
    // unload the audio
    sound && (await sound.unloadAsync());

    // reset the track in store
    dispatch(setTrackIsPlaying(null));

    console.log("track data have been reset");
  };

  // start play track
  const startTrack = async (audioUri) => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: audioUri },
      { shouldPlay: true }
    );

    setSound(sound);

    await sound.playAsync();
  };

  const getTrackUrl = async (track) => {
    if (track) {
      console.log("track?.name: ", track.name);
      const {
        data: { audioUrl },
      } = await getAudioUrlFromServer(track.name);

      return audioUrl;
    }
  };
  const handleSliderValueChange = async (value) => {
    setAudioPosition(value);
    await sound.setPositionAsync(value);
  };
  const formatTime = (timeInMillis) => {
    const minutes = Math.floor(timeInMillis / 60000);
    const seconds = Math.floor((timeInMillis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  // 215301 - 3:35
  useEffect(() => {
    trackId &&
      resetTrack() &&
      fetchTrack(trackId).then(async (track) => {
        // detructoring
        const trackObj = handleTrackDetructoring(track.data);

        // set track info after call to server
        dispatch(setTrackIsPlaying(trackObj));

        getTrackUrl(trackObj).then(async (trackUrl) => {
          setAudioUrl(trackUrl);
          // await sound.loadAsync({ uri: trackUrl });

          // const statusAsync = await sound.getStatusAsync();
          // console.log("statusAsync.", statusAsync.durationMillis);

          // setAudioDuration(statusAsync.durationMillis);
          // await sound.playAsync();
          // console.log("track is playing...");
        });
      });
    return () => {
      sound.unloadAsync();
    };
  }, [trackId]);

  useEffect(() => {
    track && setShow(true);
  }, [track]);

  useEffect(() => {
    // console.log("audio url changed");
  }, [audioUrl]);

  if (!show) return null;

  return (
    <LinearGradient colors={["transparent", "rgba(207, 189, 189, 0.05)"]}>
      <View className="flex-row items-center justify-between py-2 px-3 space-x-4 bg-[rgba(207, 189, 189, 0.054901960784313725)]">
        {/* <TouchableOpacity onPress={handleClosePopup}>
          <MaterialIcons name="close" color="#b4c1cf" size={18} />
        </TouchableOpacity> */}

        <View className="flex-row space-x-3 flex-1">
          <DiscCard
            width={14}
            height={14}
            thumbnail={track && track.image}
            playing={playing}
          />
          <View
            className="flex-col justify-center space-y-1"
            style={{ maxWidth: screenWidth * 0.4 }}
          >
            <View>
              <TextTicker
                duration={5000}
                loop
                bounce
                repeatSpacer={100}
                marqueeDelay={2000}
              >
                <Text className="text-white text-base font-['Montserrat-SemiBold']">
                  {track && track.name}
                </Text>
              </TextTicker>
            </View>
            <View>
              <TextTicker
                duration={5000}
                loop
                bounce
                repeatSpacer={100}
                marqueeDelay={2000}
              >
                <Text className="text-xs text-[#708090]">
                  {track && track.artist}
                </Text>
              </TextTicker>
            </View>
          </View>
        </View>

        <View className="flex-row items-center space-x-3 ">
          <TouchableOpacity>
            <MaterialIcons name="skip-previous" color="#fff" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            className="justify-center items-center bg-slate-700 w-11 h-11 rounded-full"
            onPress={() => setPlaying((cur) => !cur)}
          >
            <MaterialIcons
              name={`${!playing ? "play-arrow" : "pause"}`}
              color="#fff"
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="skip-next" color="#fff" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <Slider
        // step={1}
        value={audioPosition}
        minimumValue={1}
        maximumValue={audioDuration}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        thumbTintColor="#FFFFFF"
        onSlidingComplete={handleSliderValueChange}
      />
      {/* <Progress percent={1} position="normal" appearTransition={false} /> */}
    </LinearGradient>
  );
};

export default PopupPlayer;
