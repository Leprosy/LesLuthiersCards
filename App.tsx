/**
 * Circle12 App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Button,
  Linking,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Card} from './src/components/Card';
import {colors, styles} from './src/const/styles';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useColorScheme() || 'light';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[{flex: 1}, colors[theme].app]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <Card
        style={{flex: 1}}
        title="Circle-12"
        text={
          'Implementation of the Circle of 12 Tones proposed by Ron Jarzombek.'
        }>
        <Text
          style={{color: '#66f'}}
          onPress={() =>
            Linking.openURL('https://www.ronjarzombek.com/rj12tone.html')
          }>
          {'>>'} https://www.ronjarzombek.com/rj12tone.html
        </Text>
      </Card>

      <Card
        style={{flex: 1}}
        title="Credits"
        text={'Code by @leprosy\nOriginal idea by Ron Jarzombek'}
      />
    </SafeAreaView>
  );
}

export default App;
