import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StatusBar, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';

export const Screen = ({ children }) => {
  const { s, dark } = useTheme();
  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      {children}
    </SafeAreaView>
  );
};
export const Card = ({ children, style }) => { const { s } = useTheme(); return <View style={[s.card, style]}>{children}</View>; };
export const Btn = ({ title, onPress, ghost, style }) => {
  const { s, C } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={[s.btn, ghost && s.btnGhost, style]}>
      <Text style={[s.btnTxt, ghost && { color: C.navy }]}>{title}</Text>
    </TouchableOpacity>
  );
};
export const Field = ({ icon, ...p }) => {
  const { s, C, dark } = useTheme();
  return (
    <View style={s.field}>
      <Ionicons name={icon} size={18} color={C.mute} />
      <TextInput keyboardAppearance={dark ? 'dark' : 'light'} placeholderTextColor={C.mute} autoCapitalize="none" style={s.fieldInput} {...p} />
    </View>
  );
};
export const Title = ({ t, sub }) => {
  const { s } = useTheme();
  return <View style={{ marginBottom: 12 }}><Text style={s.h1}>{t}</Text>{sub ? <Text style={s.mute}>{sub}</Text> : null}</View>;
};
export const Stat = ({ label, value, sub, color }) => {
  const { s, C } = useTheme();
  return (
    <Card style={{ flex: 1, margin: 4 }}>
      <Text style={s.tiny}>{label}</Text>
      <Text style={[s.big, color && { color }]}>{value}</Text>
      {sub ? <Text style={[s.tiny, { color: C.good }]}>{sub}</Text> : null}
    </Card>
  );
};
export const Bars = ({ data, labels }) => {
  const { s, C } = useTheme();
  const m = Math.max(...data, 1);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 130, justifyContent: 'space-between' }}>
      {data.map((v, i) => (
        <View key={i} style={{ flex: 1, alignItems: 'center' }}>
          <View style={{ width: 14, height: Math.max(4, (v / m) * 100), backgroundColor: C.accent, borderRadius: 3 }} />
          <Text style={s.tiny}>{labels[i]}</Text>
        </View>
      ))}
    </View>
  );
};

export const Toggle = ({ value, onValueChange, color }) => {
  const { C } = useTheme();
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: C.line, true: color || C.accent }}
      ios_backgroundColor={C.line}
      thumbColor="#FFFFFF"
    />
  );
};
