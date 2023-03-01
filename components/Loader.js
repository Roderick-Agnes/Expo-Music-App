import { View, Text } from "react-native";
import React from "react";
import { Wave } from "react-native-animated-spinkit";
import { SafeAreaView } from "react-native-safe-area-context";

const Loader = () => {
  return (
    <SafeAreaView className="bg-main justify-center items-center flex-1">
      <Wave color="#FFF" size={48} />
    </SafeAreaView>
  );
};

export default Loader;
