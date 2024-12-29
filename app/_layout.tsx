import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import * as SystemUI from 'expo-system-ui';
import { useColorScheme } from '@/hooks/useColorScheme';
import TabTwoScreen from './(tabs)/explore';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    SystemUI.setBackgroundColorAsync('#75428c');
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }}>
        <StatusBar
          backgroundColor={colorScheme === 'dark' ? '#000' : '#fff'}
        />
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <TabTwoScreen />
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
