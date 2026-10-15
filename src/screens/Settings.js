import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Alert from '../dialog';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { Card, Title, Toggle, Btn } from '../components/ui';

export default function Settings({ sh, notif, setNotif, onLogout }) {
  const { s, C, dark, setDark } = useTheme();
  const { rate, setRate } = sh;
  const [r, setR] = useState(String(rate));
  const Row = ({ icon, label, onPress, right }) => (
    <TouchableOpacity onPress={onPress} style={s.rowCard}><Ionicons name={icon} size={20} color={C.navy} /><Text style={[s.h2, { flex: 1, marginLeft: 12 }]}>{label}</Text>{right}</TouchableOpacity>
  );
  return <>
    <Title t="Settings" sub="Customize your system preferences." />
    <Card>
      <Row icon={dark ? 'moon' : 'sunny-outline'} label="Dark Mode" onPress={() => setDark(!dark)} right={<Toggle value={dark} onValueChange={setDark} />} />
      <Row icon="wifi-outline" label="Wi-Fi Connection" onPress={() => Alert.alert('Wi-Fi', 'Connected to HomeNet')} right={<Text style={s.tiny}>Connected</Text>} />
      <Row icon="notifications-outline" label="Notifications" onPress={() => setNotif(!notif)} right={<Toggle value={notif} onValueChange={setNotif} />} />
      <View style={s.rowCard}><Ionicons name="pricetag-outline" size={20} color={C.navy} /><Text style={[s.h2, { flex: 1, marginLeft: 12 }]}>Energy Rate (₱/kWh)</Text>
        <TextInput keyboardAppearance={dark ? 'dark' : 'light'} value={r} keyboardType="numeric" onChangeText={setR} onEndEditing={() => { const n = parseFloat(r); n > 0 ? setRate(n) : setR(String(rate)); }} style={s.rateInput} /></View>
      <Row icon="construct-outline" label="System Config" onPress={() => Alert.alert('System Config', 'Hub firmware v1.0.3 is up to date.')} />
      <Row icon="information-circle-outline" label="About" onPress={() => Alert.alert('Smart Home Automation', 'Version 1.0.0')} />
    </Card>
    <Btn title="Logout" onPress={onLogout} style={{ marginTop: 16, backgroundColor: C.bad }} />
  </>;
}