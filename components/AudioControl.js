import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { thumbnailPlaylists } from "../utils/constants";
import { debounce, joinArtistsName } from "../utils/helpers";
import Slider from "@react-native-community/slider";
import { MaterialIcons } from "@expo/vector-icons";
import TextTicker from "react-native-text-ticker";
import { Audio } from "expo-av";
import { Shadow } from "react-native-shadow-2";
import ImageBlurShadow from "react-native-image-blur-shadow";

const { width: widthScreen, height: heightScreen } = Dimensions.get("window");

const repeatState = {
  NULL: "NULL",
  ONE: "ONE",
  ALWAYS: "ALWAYS",
};

const AudioControl = ({
  tracks,
  trackIndexIsPlaying,
  setTrackIndexIsPlaying,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volumeIsOpening, setVolumeIsOpening] = useState(true);

  // ref
  const scrollX = useRef(new Animated.Value(trackIndexIsPlaying)).current;
  const thumbnailRef = useRef(null);
  const repeatModeRef = useRef(repeatState.NULL);
  const trackIndexRef = useRef(0);

  // state of track
  const [sound] = useState(new Audio.Sound());
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioPosition, setAudioPosition] = useState(0);

  // scroll event
  // change next or previous audio with scroll position
  const handleGetIndexByScrollEvent = (value) => {
    trackIndexRef.current = Math.round(value / widthScreen);
    if (trackIndexRef.current !== Math.round(value / widthScreen)) {
      setAudioDuration(0);
      setAudioPosition(0);
    }
  };

  // controll

  const skipPreviousAudio = async () => {
    await sound.pauseAsync();

    if (trackIndexRef.current === 0) {
      setTrackIndexIsPlaying(tracks.length - 1);
      changeThumbnailAudio(tracks.length - 1);
    } else {
      setTrackIndexIsPlaying(trackIndexRef.current - 1);
      changeThumbnailAudio(trackIndexRef.current - 1);
    }
  };

  const skipNextAudio = async () => {
    await sound.pauseAsync();
    if (trackIndexIsPlaying === tracks.length - 1) {
      setTrackIndexIsPlaying(0);
      changeThumbnailAudio(0);
    } else {
      setTrackIndexIsPlaying(trackIndexRef.current + 1);
      changeThumbnailAudio(trackIndexRef.current + 1);
    }
  };

  const changeRepeatMode = () => {
    switch (repeatModeRef.current) {
      case repeatState.NULL:
        repeatModeRef.current = repeatState.ALWAYS;
        // set looping mode
        sound.setIsLoopingAsync(true);
        console.log("mode: ", repeatModeRef.current);

        break;
      default:
        repeatModeRef.current = repeatState.NULL;
        // set looping mode
        sound.setIsLoopingAsync(false);
        console.log("mode: ", repeatModeRef.current);

        break;
    }
  };

  const changeVolumeState = async () => {
    setVolumeIsOpening((prev) => !prev);
    await sound.setIsMutedAsync(volumeIsOpening);
  };

  const changeStateAudioIsPlaying = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
      console.log("track is pausing...");
    } else {
      await sound.playAsync();
      console.log("track is playing...");
    }

    setIsPlaying((prev) => !prev);
  };

  const changeThumbnailAudio = (index) => {
    thumbnailRef.current.scrollToOffset({
      offset: index * widthScreen,
    });
    console.log("index: ", index);
  };

  const handleSliderValueChange = async (value) => {
    await sound.setPositionAsync(value);
    setAudioPosition(value);
  };

  const formatTime = (timeInMillis) => {
    const minutes = Math.floor(timeInMillis / 60000);
    const seconds = Math.floor((timeInMillis % 60000) / 1000);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const handlePlaybackStatus = async (playbackStatus) => {
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state
      if (playbackStatus.error) {
        console.log(
          `Encountered a fatal error during playback: ${playbackStatus.error}`
        );
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      // Update your UI for the loaded state

      if (playbackStatus.isPlaying) {
        // Update your UI for the playing state

        setAudioPosition(playbackStatus.positionMillis);
      } else {
        // Update your UI for the paused state
      }

      if (playbackStatus.isBuffering) {
        // Update your UI for the buffering state
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        // The player has just finished playing and will stop. Maybe you want to play something else?
        console.log("playbackStatus.isLooping: ", playbackStatus.isLooping);
        console.log("play completed...");
        if (trackIndexIsPlaying === tracks.length - 1) {
          setTrackIndexIsPlaying(0);
        } else {
          setTrackIndexIsPlaying((index) => index + 1);
        }
      }
    }
  };

  const renderItems = ({ item, idex }) => (
    <Animated.View className="items-center rounded-lg">
      <View style={{ width: widthScreen }} className="items-center  pt-4">
        <ImageBlurShadow
          source={{ uri: item?.thumbnail }}
          imageWidth={widthScreen * 0.6}
          imageHeight={widthScreen * 0.6}
          imageBorderRadius={22}
          shadowOffset={38}
          shadowBlurRadius={48}
          shadowBackgroundColor={"#191B28"}
        />
      </View>
      <View
        style={{
          width: widthScreen * 0.7,
        }}
        className="gap-2 items-center"
      >
        <TextTicker
          duration={5000}
          loop
          bounce
          repeatSpacer={100}
          marqueeDelay={2000}
        >
          <Text className="text-center text-3xl text-white font-bold">
            {item?.name}
          </Text>
        </TextTicker>
        <Text className="text-center text-base text-slate-500">
          {joinArtistsName(item?.artists)}
        </Text>
      </View>
    </Animated.View>
  );

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      handleGetIndexByScrollEvent(value);
    });

    return () => scrollX.removeAllListeners();
  }, []);

  useEffect(() => {
    // new track index from AudioTrack component
    changeThumbnailAudio(trackIndexIsPlaying);

    const startPlaying = async () => {
      // reset duration time in ui

      setAudioDuration(0);
      setAudioPosition(0);

      // listen playback status of audio  every second
      sound.setOnPlaybackStatusUpdate(handlePlaybackStatus);

      if (tracks.length > 0) {
        await sound.loadAsync({ uri: tracks[trackIndexIsPlaying]?.audioUrl });

        // show duration time of track is playing
        const statusAsync = await sound.getStatusAsync();
        setAudioDuration(statusAsync.durationMillis);

        await sound.playAsync();
        // update repeat loop mode to new track
        if (repeatModeRef.current !== repeatState.NULL) {
          await sound.setIsLoopingAsync(true);
        }
      }
    };

    // start playing
    if (tracks.length > 0) startPlaying();

    return async () => {
      await sound.unloadAsync();
    };
  }, [tracks, trackIndexIsPlaying]);

  useEffect(() => {
    setTrackIndexIsPlaying(trackIndexRef.current);
  }, [trackIndexRef.current]);

  return (
    <View className="mt-4">
      <Animated.FlatList
        ref={thumbnailRef}
        data={tracks}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItems}
        keyExtractor={(item) => item?.id}
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x: scrollX },
              },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
      />
      <View className="space-y-2 mt-5">
        <View>
          <Slider
            value={audioPosition}
            minimumValue={0}
            maximumValue={audioDuration}
            minimumTrackTintColor="tomato"
            maximumTrackTintColor="#000000"
            thumbTintColor="#FFFFFF"
            onSlidingComplete={handleSliderValueChange}
          />
          <View className="flex-row justify-between px-4">
            <Text className=" text-slate-500">{formatTime(audioPosition)}</Text>
            <Text className="text-slate-500">{formatTime(audioDuration)}</Text>
          </View>
        </View>
        <View className="flex-row justify-around items-center px-4">
          <TouchableOpacity onPress={changeVolumeState}>
            <MaterialIcons
              name={`${volumeIsOpening ? "volume-up" : "volume-off"}`}
              color={"#fff"}
              size={24}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipPreviousAudio}>
            <MaterialIcons name="skip-previous" color={"#fff"} size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2 bg-[#21234ef5] rounded-full"
            onPress={changeStateAudioIsPlaying}
          >
            <MaterialIcons
              name={`${isPlaying ? "pause" : "play-arrow"}`}
              color={"#fff"}
              size={28}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipNextAudio}>
            <MaterialIcons name="skip-next" color={"#fff"} size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={changeRepeatMode}>
            <MaterialIcons
              name={`${
                repeatModeRef.current === repeatState.NULL
                  ? "repeat"
                  : "repeat-one-on"
              }`}
              color={"#fff"}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AudioControl;

// // change next or previous audio with scroll position
// const handleSetTrackIndexByScrollEvent = (value) => {
//   const trackIndex = Math.round(value / widthScreen);
//   setTrackIndexIsPlaying(trackIndex);
// };

// useEffect(() => {
//   // scrollX.addListener(({ value }) => {
//   //   // handleSetTrackIndexByScrollEvent(value);
//   // });

//   return () => scrollX.removeAllListeners();
// }, []);

{
  /* <Shadow distance={15} startColor={"#282648b0"} offset={[1, 4]}>
          <ImageBackground
            className="rounded-lg items-center justify-center"
            imageStyle={{ borderRadius: 8 }}
            style={{
              width: widthScreen * 0.7,
              height: widthScreen * 0.7,
            }}
            blurRadius={40}
            source={{ uri: item.thumbnail }}
          >
            <Image
              className="rounded-lg "
              style={{
                width: widthScreen * 0.6,
                height: widthScreen * 0.6,
                elevation: 2,
              }}
              source={{ uri: item.thumbnail }}
            />
          </ImageBackground>
        </Shadow> */
}
