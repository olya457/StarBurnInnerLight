import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackgroundWrapper from '../components/BackgroundWrapper';
import { RootStackParamList } from '../types/navigation';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Loader'>;

const loaderHtml = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: 100%;
    height: 100%;
    background: transparent;
    overflow: hidden;
  }
  body {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .stage {
    position: relative;
    width: 260px;
    height: 260px;
    overflow: hidden;
  }
  .cross {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    transform: translate(-50%, -50%);
  }
  .strich {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 180px;
    height: 44px;
    background: #000;
    border-radius: 22px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
    margin-left: -90px;
    margin-top: -22px;
  }
  .strich1 { transform: rotate(45deg); }
  .strich2 { transform: rotate(-45deg); }

  .bubble {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-left: -12px;
    margin-top: -12px;
    z-index: 5;
  }

  .b1 {
    background: radial-gradient(circle at 30% 30%, #ffb3c1, #e64980, #ff8787);
    animation: diag1 4s ease-in-out infinite;
  }
  .b2 {
    background: radial-gradient(circle at 30% 30%, #edb3ff, #ac49e6, #fb87ff);
    animation: diag1Reverse 5s ease-in-out infinite;
  }
  .b3 {
    background: radial-gradient(circle at 30% 30%, #b3d8ff, #4963e6, #87a7ff);
    animation: diag2 4.5s ease-in-out infinite;
  }
  .b4 {
    background: radial-gradient(circle at 30% 30%, #b3ffbc, #35a32f, #75ba61);
    animation: diag2Reverse 6s ease-in-out infinite;
  }

  @keyframes diag1 {
    0%   { transform: translate(-60px, -60px); }
    50%  { transform: translate(60px, 60px); }
    100% { transform: translate(-60px, -60px); }
  }
  @keyframes diag1Reverse {
    0%   { transform: translate(60px, 60px); }
    50%  { transform: translate(-60px, -60px); }
    100% { transform: translate(60px, 60px); }
  }
  @keyframes diag2 {
    0%   { transform: translate(-60px, 60px); }
    50%  { transform: translate(60px, -60px); }
    100% { transform: translate(-60px, 60px); }
  }
  @keyframes diag2Reverse {
    0%   { transform: translate(60px, -60px); }
    50%  { transform: translate(-60px, 60px); }
    100% { transform: translate(60px, -60px); }
  }
</style>
</head>
<body>
  <div class="stage">
    <div class="cross">
      <div class="strich strich1"></div>
      <div class="strich strich2"></div>
    </div>
    <div class="bubble b1"></div>
    <div class="bubble b2"></div>
    <div class="bubble b3"></div>
    <div class="bubble b4"></div>
  </div>
</body>
</html>
`;

const LoaderScreen = () => {
  const navigation = useNavigation<Nav>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Onboarding' }],
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <View style={styles.webviewBox}>
          <WebView
            originWhitelist={['*']}
            source={{ html: loaderHtml }}
            style={styles.webview}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            androidLayerType="hardware"
            javaScriptEnabled
            domStorageEnabled
          />
        </View>
      </View>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webviewBox: {
    width: 280,
    height: 280,
    backgroundColor: 'transparent',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default LoaderScreen;