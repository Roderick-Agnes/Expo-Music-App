import {
  View,
  Image,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useState } from "react";
import { getLimitItems } from "./../utils/getLimitItems";
import axios from "axios";
import { SERVER_API_URL, LOCAL_SERVER_API_URL } from "../configs";
import { HomeScreenContext } from "../contexts/HomeScreenContext";

const screenWidth = Dimensions.get("window").width;

const MusicCarousel = () => {
  // const [topAlbums, setTopAlbums] = useState(null);

  // homescreen context
  const { homeFeatures } = useContext(HomeScreenContext);

  return (
    <SwiperFlatList
      autoplay
      autoplayDelay={5}
      autoplayLoop
      index={2}
      showPagination
      paginationStyle={styles.paginationContainer}
      paginationStyleItem={styles.pagination}
      paginationStyleItemActive={styles.dotActive}
    >
      {homeFeatures[homeFeatures.length - 1].type === "albums" &&
        homeFeatures[homeFeatures.length - 1].data?.map((album) => (
          <TouchableOpacity
            key={album.id + `carousel`}
            className="flex-1 relative rounded-t-md"
          >
            <Image
              source={{
                uri: album?.images[0]?.url,
              }}
              style={{ width: screenWidth - 32, height: screenWidth - 32 }}
              className="object-cover"
            />
            <LinearGradient
              colors={["transparent", "#191b28"]}
              locations={[-1, 1]}
              className="absolute w-full space-y-1 bottom-0 p-4"
            >
              <View className="bottom-1 space-y-1 py-5 text-center items-center">
                <Text className="text-white text-base uppercase font-thin">
                  {album.name}
                </Text>
                <Text className="text-white text-4xl font-['DancingScript']">
                  {album.artists[0].name}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
    </SwiperFlatList>
  );
};

const styles = StyleSheet.create({
  paginationContainer: { justifyContent: "center", alignItems: "center" },
  pagination: {
    borderRadius: 3,
    width: 5,
    height: 5,
  },
  dotActive: {
    borderRadius: 5,
    width: 7,
    height: 7,
  },
});

export default MusicCarousel;
