import React, { useRef, useEffect } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';

export default function TabTwoScreen() {
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    const handleBackPress = () => {
      if (webViewRef.current && webViewRef.current.canGoBack) {
        webViewRef.current.goBack();
        return true; // Prevent the app from closing
      }
      return false; // Allow default behavior (app closing) if WebView cannot go back
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    if (webViewRef.current) {
      webViewRef.current.canGoBack = navState.canGoBack;
    }
  };

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: 'https://beta.ledgerx365.com' }}
      style={{ flex: 1 }}
      onNavigationStateChange={handleNavigationStateChange}
      allowsBackForwardNavigationGestures // For iOS swipe back gesture
    />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
