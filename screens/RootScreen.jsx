import { View, Text, Image, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { avatar, fontMap } from "../utils/constants";
import HomeScreen from "./HomeScreen";
import { useCallback, useContext, useEffect, useLayoutEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlaylistsScreen from "./PlaylistsScreen";
import { useNavigation } from "@react-navigation/native";
import HomeScreenContextProvider from "../contexts/HomeScreenContext";
import AudioContextProvider, { AudioContext } from "../contexts/AudioContext";
import * as Icons from "react-native-heroicons/solid";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

const RootScreen = () => {
  const { playlists } = useContext(AudioContext);
  const [fontsLoaded] = useFonts(fontMap);
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return (
    <HomeScreenContextProvider>
      <AudioContextProvider>
        <SafeAreaView
          className="bg-main pt-4 space-y-4 flex-1 "
          onLayout={onLayoutRootView}
        >
          {/* Header */}
          <View className="px-4 space-y-4 pb-2">
            <View className="flex-row ">
              <View className="flex-1">
                <Text className=" text-slate-400 font-['Montserrat-Medium']">
                  Wellcome To
                </Text>
                <Text className=" text-white text-xl font-['Montserrat-SemiBold']">
                  MY HOME
                </Text>
              </View>
              {/* avatar */}
              <View className={`justify-center`}>
                <Image
                  source={{ uri: avatar }}
                  className="rounded-full w-10 h-10"
                />
              </View>
            </View>
            {/* Search Input */}
            <View className="">
              <View className="flex-row space-x-2 items-center bg-[#242636] px-3 py-2 rounded-xl">
                <Icons.MagnifyingGlassIcon color={"#A1A1AD"} />
                <TextInput
                  className="flex-1 text-white"
                  placeholder="Search a music name"
                  placeholderTextColor={"#727385"}
                  cursorColor={"#727385"}
                />

                <Icons.AdjustmentsVerticalIcon color="#A1A1AD" />
              </View>
            </View>
          </View>
          {/* Body */}
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Playlists"
              component={PlaylistsScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </AudioContextProvider>
    </HomeScreenContextProvider>
  );
};

export default RootScreen;
