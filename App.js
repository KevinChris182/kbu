import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./router";
import { navigationRef } from "./RootNavigation";
import { Provider as AuthProvider } from "./context/AuthContext";
import { Provider as DataProvider } from "./context/DataContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DoubleTapToClose from "./screens/DoubleTapToClose";

export default function App() {
  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: "#E3F2F9",
        100: "#C5E4F3",
        200: "#A2D4EC",
        300: "#7AC1E4",
        400: "#47A9DA",
        500: "#0088CC",
        600: "#007AB8",
        700: "#006BA1",
        800: "#005885",
        900: "#003F5E",
      },
      // Redefining only one shade, rest of the color will remain same.
      amber: {
        400: "#d97706",
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: "light",
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <AuthProvider>
        <DataProvider>
          <SafeAreaProvider>
            <NavigationContainer ref={navigationRef}>
              <DoubleTapToClose />
              <Router />
            </NavigationContainer>
          </SafeAreaProvider>
        </DataProvider>
      </AuthProvider>
    </NativeBaseProvider>
  );
}
