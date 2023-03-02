import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BrowserScreen from "./screens/BrowserScreen";
import Navigations from "./components/Navigations";
import { store } from "./app/store";
import { Provider } from "react-redux";
import TrackPlayerContextProvider from "./contexts/TrackPlayerContext";
import HomeScreenContextProvider from "./contexts/HomeScreenContext";
import { memo } from "react";
import RootScreen from "./screens/RootScreen";
import AudioPlayer from "./components/AudioPlayer";
import GlobalContextProvider from "./contexts/GlobalContext";
import Loader from "./components/Loader";
import ArtistScreen from "./screens/ArtistScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <GlobalContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Browser">
            <Stack.Screen
              name="Browser"
              component={BrowserScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AudioPlayer"
              component={AudioPlayer}
              options={{
                presentation: "modal",
                // headerShown: false,
              }}
            />
            <Stack.Screen
              name="Artists"
              component={ArtistScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
          <Navigations />
        </NavigationContainer>
      </GlobalContextProvider>
    </Provider>
  );
};
export default App;
