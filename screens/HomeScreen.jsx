import MusicCarousel from "../components/MusicCarousel";
import FeatureRow from "../components/FeatureRow";
import CardList from "../components/CardList";
import useMusic from "../hooks/useMusic";
import { memo, useCallback, useContext, useEffect } from "react";
import { HomeScreenContext } from "../contexts/HomeScreenContext";
import { View, Text, Image, TextInput, ScrollView } from "react-native";

const HomeScreen = () => {
  const { homeFeatures } = useContext(HomeScreenContext);

  if (!homeFeatures) return null;
  return (
    <ScrollView className="space-y-4 p-4 bg-main">
      {/* Carousel */}
      <View>
        <MusicCarousel />
      </View>
      {/* Feature Row */}
      <View className="">
        {homeFeatures.map((feature) => {
          return (
            <FeatureRow
              key={feature?.type}
              title={feature.title}
              type={feature.type}
              component={<CardList data={feature?.data} />}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
