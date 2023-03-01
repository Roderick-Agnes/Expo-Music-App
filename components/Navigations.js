import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { useState, useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { bgHome, fontMap, routes } from "../utils/constants";
import { useNavigation } from "@react-navigation/native";
import PopupPlayer from "./PopupPlayer";
import { discCard } from "./../utils/constants";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get("window");

const Navigations = () => {
  const [routeActive, setRouteActive] = useState("Root");
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts(fontMap);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return (
    <View className="bg-[#191B28]" onLayout={onLayoutRootView}>
      <PopupPlayer />
      <View className="flex-row justify-between items-center px-4">
        {/* Routes */}
        {routes?.map((route) => (
          <TouchableOpacity
            key={route.name}
            onPress={() => {
              setRouteActive(route.name);
              navigation.navigate(route.route);
            }}
          >
            <View
              className={`relative justify-center items-center ${
                route.name === "Root"
                  ? " bg-slate-700 w-14 h-14 rounded-full "
                  : " space-y-1 py-4 "
              } ${routeActive === "Root" && "bg-transparent"}`}
            >
              <Image
                source={bgHome}
                className={`absolute w-14 h-14 ${
                  route.name !== "Root" && " hidden "
                } ${routeActive === "Root" ? " " : " hidden "}`}
              />
              <MaterialIcons
                name={route.icon}
                color={routeActive === route.name ? "#fff" : "#708090"}
                size={route.name === "Root" ? 28 : 24}
              />
              <Text
                className={`${
                  routeActive === route.name
                    ? "text-white font-['Montserrat-Medium']"
                    : "text-slate-400 font-['Montserrat-Thin']"
                }  text-xs ${route.name === "Root" && " hidden"}`}
              >
                {route.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
// ${!route.name ? " hidden" : ""}
export default Navigations;
