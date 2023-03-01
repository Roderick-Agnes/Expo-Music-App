import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ImageBlurShadow from "react-native-image-blur-shadow";
import { topTracksOfArtist, artistInfo } from "../utils/constants";
import {
  formatTime,
  joinArtistsName,
  uppercaseFirstCharacter,
} from "./../utils/helpers/index";
import * as Icons from "react-native-heroicons/solid";
import { Shadow } from "react-native-shadow-2";
import { LinearGradient } from "expo-linear-gradient";
import { splitText } from "../utils/splitText";

const { width: widthScreen, height: heightScreen } = Dimensions.get("window");

const ArtistScreen = () => {
  const navigator = useNavigation();
  const { data } = artistInfo;
  return (
    <SafeAreaView className="relative bg-main pt-4 space-y-2 h-full">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 mb-2">
        <TouchableOpacity onPress={() => navigator.goBack()}>
          <Icons.ChevronLeftIcon color={"#fff"} />
        </TouchableOpacity>
        <Text className="text-xl text-white font-extrabold">{data.name}</Text>
        <TouchableOpacity></TouchableOpacity>
      </View>

      {/* Artist info */}
      <View className="px-4 items-center">
        <ImageBackground
          className="rounded-lg items-center justify-center space-y-2"
          style={{
            width: widthScreen,
            height: widthScreen / 2.5,
          }}
          blurRadius={10}
          source={{ uri: data.images[0].url }}
        >
          {/* Avatar  */}
          <Image
            source={{ uri: data.images[0].url }}
            style={{
              width: widthScreen * 0.35,
              height: widthScreen * 0.35,
              borderRadius: 8,
            }}
          />
        </ImageBackground>
      </View>
      <View className="px-4">
        {/* All track of this artist */}
        {/* Header  */}
        <View className="flex-row justify-between items-center pt-2 mb-4">
          <Text className="text-xl text-slate-300 font-bold">Songs</Text>

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
          className="space-y-2"
          showsVerticalScrollIndicator={false}
          style={{ height: widthScreen - 50 }}
        >
          {/* 21234e3f, 21234E */}
          {topTracksOfArtist.data.tracks.length > 0 &&
            topTracksOfArtist.data.tracks.map((item, index) => (
              <TouchableOpacity
                key={item?.name}
                className={`py-3 px-3 rounded-md justify-center`}
                onPress={() => {}}
              >
                <View className="flex-row space-x-3">
                  <View>
                    <Image
                      source={{ uri: item?.album?.images[0]?.url }}
                      className="w-20 h-20 rounded-md"
                    />
                  </View>
                  <View
                    style={{ width: widthScreen * 0.6 }}
                    className="flex-col justify-between space-y-1"
                  >
                    <View>
                      <Text className="text-white text-base">{item?.name}</Text>

                      <Text className=" text-slate-400 text-xs">
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
                        <Text className=" text-slate-400 text-xs">
                          {formatTime(item?.duration_ms)}
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
      </View>
    </SafeAreaView>
  );
};

export default ArtistScreen;
