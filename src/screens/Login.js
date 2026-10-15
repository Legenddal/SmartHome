import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Alert from '../dialog';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { Screen, Btn, Field } from '../components/ui';

export default function Login({ users, onOk, go }) {
  const { s, C } = useTheme();
  const [id, setId] = useState(''); const [pw, setPw] = useState(''); const [rem, setRem] = useState(true);
  const submit = () => {
    const u = users.find(x => (x.email === id.trim().toLowerCase() || x.name === id) && x.pass === pw);
    u ? onOk(u) : Alert.alert('Login failed', 'Check your email and password. Demo: demo / demo123');
  };
  return (
    <Screen><ScrollView contentContainerStyle={s.authScroll}>
      <Ionicons name="home-outline" size={44} color={C.navy} />
      <Text style={[s.h1, { fontSize: 28 }]}>Login</Text>
      <Text style={[s.mute, { marginBottom: 20 }]}>Access your smart home system</Text>
      <Field icon="person-outline" placeholder="Email or Username" value={id} onChangeText={setId} />
      <Field icon="lock-closed-outline" placeholder="Password" secureTextEntry value={pw} onChangeText={setPw} />
      <View style={[s.row, { justifyContent: 'space-between', alignItems: 'center', marginVertical: 8 }]}>
        <TouchableOpacity onPress={() => setRem(!rem)} style={s.row}><Ionicons name={rem ? 'checkbox' : 'square-outline'} size={20} color={C.navy} /><Text style={s.mute}> Remember me</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Forgot password', 'A reset link would be sent to your email.')}><Text style={s.mute}>Forgot password?</Text></TouchableOpacity>
      </View>
      <Btn title="Login" onPress={submit} />
      <Text style={[s.mute, { textAlign: 'center', marginVertical: 8 }]}>or</Text>
      <Btn title="Sign Up" ghost onPress={go} />
    </ScrollView></Screen>
  );
}