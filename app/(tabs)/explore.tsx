import React, { useRef, useEffect, useState } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

export default function TabTwoScreen() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const handleBackPress = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true; // Prevent the app from closing
      }
      return false; // Allow default behavior (app closing) if WebView cannot go back
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [canGoBack]);

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: 'https://app.ledgerx.biz/' }}
      style={{ flex: 1 }}
      onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
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
