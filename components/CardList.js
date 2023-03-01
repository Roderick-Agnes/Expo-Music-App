import { View, ScrollView, Text, FlatList } from "react-native";
import Card from "./Card";
import { getShortString } from "./../utils/getShortString";
import { memo, useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setPlaylistId, setPlaylistName } from "../app/reducers/playlistSlice";

const CardList = ({ data }) => {
  return (
    // Container

    <FlatList
      style={{ marginTop: 5 }}
      ItemSeparatorComponent={() => <View style={{ padding: 5 }} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={({ item, index }) => (
        <Card
          index={index}
          id={item.track?.id || item?.id}
          type={item.track?.type || item?.type}
          title={item?.name || item.track?.name || item.track?.title}
          artist={
            item.track?.artists?.map((artist) => artist?.name).join(", ") ||
            item?.artists?.map((artist) => artist?.name).join(", ") ||
            item?.name
          }
          thumbnail={item.track?.album?.images[0].url || item?.images[0].url}
        />
      )}
      keyExtractor={(item) => item?.track?.id || item?.id}
    />
  );
};

export default memo(CardList);
