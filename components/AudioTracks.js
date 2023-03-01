import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { formatTime, joinArtistsName } from "../utils/helpers";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withSpring,
} from "react-native-reanimated";
import { BottomSheet } from "react-native-btr";

const { width: widthScreen, height: heightScreen } = Dimensions.get("window");

const AudioTracks = ({
  tracks,
  trackIndexIsPlaying,
  setTrackIndexIsPlaying,
  showAudioQueue,
  handleShowQueue,
}) => {
  const offset = useSharedValue(0);

  // toggleAudioQueue
  useEffect(() => {
    if (!showAudioQueue) {
      // hidden
      offset.value = withTiming(widthScreen, {
        duration: 500,
        easing: Easing.linear,
      });
    }
    // show
    else
      offset.value = withTiming(0, {
        duration: 500,
        easing: Easing.linear,
      });
  }, [showAudioQueue]);

  // 191B28
  return (
    <BottomSheet
      visible={showAudioQueue}
      //setting the visibility state of the bottom shee
      onBackButtonPress={handleShowQueue}
      //Toggling the visibility state on the click of the back botton
      onBackdropPress={handleShowQueue}
      //Toggling the visibility state on the clicking out side of the sheet
    >
      <Animated.View
        style={[{ height: heightScreen * 0.65 }]}
        className={`w-full bg-[#191b287e] ${
          showAudioQueue ? "absolute top-[30%]" : ""
        } `}
      >
        {/* Header  */}
        <View className="flex-row justify-between items-center p-4 mb-4 bg-[#21234e98] ">
          <View className="flex-row space-x-1">
            <Text className="font-['Montserrat-SemiBold'] text-xl text-white">
              All
            </Text>
            <Text className="font-['Montserrat-ExtraLight'] text-xl text-white">
              Audio
            </Text>
          </View>
          <TouchableOpacity>
            <View className="flex-row  items-center">
              <Text className="text-slate-400 text-xs">Sort</Text>
              <MaterialIcons
                name={`arrow-drop-down`}
                color={"#A4AEB9"}
                size={18}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* tracks  */}
        <ScrollView
          className="space-y-2 px-4"
          showsVerticalScrollIndicator={false}
        >
          {/* 21234e3f, 21234E */}
          {tracks.length > 0 &&
            tracks.map((item, index) => (
              <TouchableOpacity
                key={item?.name}
                className={`${
                  trackIndexIsPlaying === index
                    ? "bg-[#21234E]"
                    : "bg-[#21234e3f]"
                }  py-3 px-3 rounded-md justify-center`}
                onPress={() => setTrackIndexIsPlaying(index)}
              >
                <View className="flex-row space-x-3">
                  <View>
                    <Image
                      source={{ uri: item?.thumbnail }}
                      className="w-20 h-20 rounded-md"
                    />
                  </View>
                  <View
                    style={{ width: widthScreen * 0.6 }}
                    className="flex-col justify-between space-y-1"
                  >
                    <View>
                      <Text className="text-white font-['Montserrat-Medium'] text-base">
                        {item?.name}
                      </Text>

                      <Text className="font-['Montserrat-Medium'] text-slate-400 text-xs">
                        {joinArtistsName(item?.artists)}
                      </Text>
                    </View>
                    <View className="flex-row space-x-2">
                      <View className="flex-row items-center space-x-1">
                        <MaterialIcons
                          name={`timer`}
                          color="#404494"
                          size={15}
                        />
                        <Text className="font-['Montserrat-Medium'] text-slate-400 text-xs">
                          {formatTime(item?.durationMs)}
                        </Text>
                      </View>

                      <LinearGradient
                        colors={["#404494", "#40449452"]}
                        start={{ x: 0, y: 0.2 }}
                        end={{ x: 0.2, y: 1 }}
                        className=" rounded-full p-1 right-0 bottom-0"
                      >
                        <TouchableOpacity onPress={() => {}}>
                          <MaterialIcons
                            name={`play-arrow`}
                            color="#fff"
                            size={14}
                          />
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </Animated.View>
    </BottomSheet>
  );
};

export default AudioTracks;
// "bg-[#21234E]"
//   "bg-[#21234e3f]"

// const toggleAudioQueueStyles = useAnimatedStyle(() => {
//   return {
//     transform: [{ translateX: withSpring(offset.value) }],
//   };
// });
