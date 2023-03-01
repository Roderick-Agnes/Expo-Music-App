import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import AlbumList from "./CardList";
import { memo, useCallback, useEffect } from "react";
import { splitText } from "../utils/splitText";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

const FeatureRow = ({ type, title, component }) => {
  const { result: titleHead, orderText: order } = splitText(title, 0);

  const navigator = useNavigation();

  const renderFeatureComponent = () => {
    return component;
  };

  const handleNavigation = () => {
    console.log("navigator: ", type);
    if (type === "playlist") navigator.navigate("Playlists");
  };

  return (
    <View>
      {/* Header */}
      <View className="flex-row justify-between items-center py-2">
        <View className="flex-row space-x-1">
          <Text className="font-['Montserrat-SemiBold'] text-xl text-white">
            {titleHead}
          </Text>
          <Text className="font-['Montserrat-ExtraLight'] text-xl text-white">
            {order}
          </Text>
        </View>
        <TouchableOpacity onPress={handleNavigation}>
          <Text className="text-indigo-400 text-xs">See All</Text>
        </TouchableOpacity>
      </View>
      {/* Body */}
      <View>
        {/* Albums List */}
        {component && renderFeatureComponent()}
      </View>
    </View>
  );
};

export default FeatureRow;
