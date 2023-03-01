import { View, Text, Image, TouchableOpacity } from "react-native";
import { getShortString } from "./../utils/getShortString";
import { setTrackIdIsPlaying } from "../app/reducers/musicSlice";
import { useDispatch } from "react-redux";
import { memo, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { setPlaylistId, setPlaylistName } from "../app/reducers/playlistSlice";
import { GlobalContext } from "../contexts/GlobalContext";
import { AudioContext } from "./../contexts/AudioContext";

const Card = ({ index, id, type, title, artist, thumbnail }) => {
  const navigator = useNavigation();
  const dispatch = useDispatch();

  // context
  const { setPlaylistWillPlay, setTypePlay, setIdPlayFirst } =
    useContext(AudioContext);

  const handlePress = () => {
    if (type === "track") {
      // dispatch(setTrackIdIsPlaying(id));
      setTypePlay("track");
      setIdPlayFirst(id);
    }
    if (type === "playlist") {
      setPlaylistWillPlay(id);
    }
    navigator.navigate("AudioPlayer");
  };

  return (
    <TouchableOpacity className="" onPress={handlePress}>
      <Image
        source={{ uri: thumbnail }}
        className="w-28 h-28 rounded-lg object-cover"
      />
      <View className="py-1 w-28">
        <Text className="text-white font-['Montserrat-Medium'] text-sm flex-wrap">
          {getShortString(title, 30)}
        </Text>
        <Text className="font-['Montserrat-Medium'] text-slate-400 text-xs">
          {getShortString(artist, 15)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Card);
