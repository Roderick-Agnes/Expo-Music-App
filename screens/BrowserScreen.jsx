import { View, Text, Image, ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { albums, avatar, fontMap, trendingData } from "../utils/constants";
import TabList from "../components/TabList";
import FeatureRow from "../components/FeatureRow";
import TrendingList from "../components/TrendingList";
import CompactDiscList from "../components/CompactDiscList";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";

SplashScreen.preventAutoHideAsync();

const BrowserScreen = () => {
  const [fontsLoaded] = useFonts(fontMap);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView
      className="bg-[#191B28] pt-4 pb-1 space-y-4 flex-1"
      onLayout={onLayoutRootView}
    >
      {/* Header */}
      <View className="flex-row px-4">
        <View className="flex-1">
          <Text className=" text-white text-2xl font-['Montserrat-SemiBold']">
            Browser
          </Text>
        </View>
        {/* avatar */}
        <View className={`justify-center`}>
          <Image source={{ uri: avatar }} className="rounded-full w-10 h-10" />
        </View>
      </View>

      {/* tab list */}
      <View className="px-4">
        <TabList />
      </View>
      <ScrollView className="space-y-4 px-4">
        {/* Trending Music */}
        <View>
          <FeatureRow
            title="Trending Music"
            component={<TrendingList trendingData={trendingData} />}
          />
        </View>
        <View>
          <FeatureRow
            title="Latest Albums"
            component={<CompactDiscList albums={albums} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BrowserScreen;
