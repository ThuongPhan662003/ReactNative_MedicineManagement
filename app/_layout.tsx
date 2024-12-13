import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import GlobalProvider,  { useGlobalContext, GlobalContextType }  from "@/context/GlobalContext";
import "react-native-reanimated";

// Ngăn splash screen tự động ẩn
SplashScreen.preventAutoHideAsync();

function AppContent() {
  const colorScheme = useColorScheme();
  const { isLogged, loading } = useGlobalContext(); // Sử dụng GlobalContext
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded && !loading) {
      SplashScreen.hideAsync();
      if (isLogged) {
        router.replace("/human-manage"); // Điều hướng nếu đã đăng nhập
      } else {
        router.replace("/sign-in"); // Điều hướng tới trang đăng nhập
      }
    }
  }, [loaded, loading, isLogged]);

  if (!loaded || loading) {
    return null; // Hiển thị màn hình chờ
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="(humanresource)" options={{ headerShown: true }} /> {/* Màn hình humanresource */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
  );
}
