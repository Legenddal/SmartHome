import React, { useState } from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import Alert from '../dialog';
import { useTheme } from '../theme';
import { Screen, Btn, Field } from '../components/ui';

export default function Signup({ users, onOk, go }) {
  const { s, C } = useTheme();
  const [f, setF] = useState({ name: '', email: '', pass: '', conf: '' });
  const set = k => v => setF({ ...f, [k]: v });
  const submit = () => {
    const email = f.email.trim().toLowerCase();
    if (!f.name.trim() || !email.includes('@')) return Alert.alert('Check your details', 'Enter your name and a valid email.');
    if (f.pass.length < 6) return Alert.alert('Weak password', 'Use at least 6 characters.');
    if (f.pass !== f.conf) return Alert.alert('Passwords differ', 'Confirm password must match.');
    if (users.some(u => u.email === email)) return Alert.alert('Email taken', 'That email already has an account.');
    onOk({ name: f.name.trim(), email, pass: f.pass, phone: '', color: '#5B8DB8', since: new Date().toLocaleDateString() });
  };
  return (
    <Screen><ScrollView contentContainerStyle={s.authScroll}>
      <Text style={[s.h1, { fontSize: 26 }]}>Create Account</Text>
      <Text style={[s.mute, { marginBottom: 20 }]}>Join us and start managing your smart home.</Text>
      <Field icon="person-outline" placeholder="Full Name" value={f.name} onChangeText={set('name')} />
      <Field icon="mail-outline" placeholder="Email" keyboardType="email-address" value={f.email} onChangeText={set('email')} />
      <Field icon="lock-closed-outline" placeholder="Password" secureTextEntry value={f.pass} onChangeText={set('pass')} />
      <Field icon="lock-closed-outline" placeholder="Confirm Password" secureTextEntry value={f.conf} onChangeText={set('conf')} />
      <Btn title="Sign Up" onPress={submit} style={{ marginTop: 8 }} />
      <TouchableOpacity onPress={go}><Text style={[s.mute, { textAlign: 'center', marginTop: 14 }]}>Already have an account? <Text style={{ color: C.accent }}>Login</Text></Text></TouchableOpacity>
    </ScrollView></Screen>
  );
}