import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { Screen, Btn } from '../components/ui';

export default function Splash({ onStart }) {
  const { s, C } = useTheme();
  return (
    <Screen>
      <View style={s.center}>
        <Ionicons name="home-outline" size={90} color={C.navy} />
        <Text style={[s.h1, { fontSize: 26, marginTop: 12 }]}>Smart Home Automation</Text>
        <Text style={s.mute}>Smarter Home. Better Energy.</Text>
        <Btn title="Get Started" onPress={onStart} style={{ marginTop: 40, width: 200 }} />
      </View>
    </Screen>
  );
}
