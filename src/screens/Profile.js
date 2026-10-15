import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../theme';
import { Card, Title, Stat, Btn, Field } from '../components/ui';

const AVATARS = ['#5B8DB8', '#2E9E5B', '#D2483D', '#8E5BB8', '#E0A020', '#1F3A4D'];

export default function Profile({ user, setUser, users, setUsers, sh, onLogout, onDelete }) {
  const { s, C } = useTheme();
  const [f, setF] = useState({ name: user.name, email: user.email, phone: user.phone || '' });
  const [pw, setPw] = useState({ cur: '', next: '', conf: '' });
  const initials = user.name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
  const apply = u => { setUsers(users.map(x => x.email === user.email ? u : x)); setUser(u); };

  const save = () => {
    const email = f.email.trim().toLowerCase();
    if (!f.name.trim()) return Alert.alert('Name required', 'Enter your full name.');
    if (email !== user.email) {
      if (!email.includes('@')) return Alert.alert('Invalid email', 'Enter a valid email address.');
      if (users.some(x => x.email === email)) return Alert.alert('Email taken', 'That email already has an account.');
    }
    apply({ ...user, name: f.name.trim(), email, phone: f.phone.trim() });
    Alert.alert('Saved', 'Your profile was updated.');
  };
  const changePw = () => {
    if (pw.cur !== user.pass) return Alert.alert('Wrong password', 'Your current password is incorrect.');
    if (pw.next.length < 6) return Alert.alert('Weak password', 'Use at least 6 characters.');
    if (pw.next !== pw.conf) return Alert.alert('Passwords differ', 'Confirm password must match.');
    apply({ ...user, pass: pw.next });
    setPw({ cur: '', next: '', conf: '' });
    Alert.alert('Password updated', 'Use your new password next time you log in.');
  };
  const confirmOut = () => Alert.alert('Log out?', 'You will need to log in again.', [{ text: 'Cancel' }, { text: 'Logout', onPress: onLogout }]);
  const confirmDel = () => Alert.alert('Delete account?', 'This removes your account from the app. It cannot be undone.', [{ text: 'Cancel' }, { text: 'Delete', style: 'destructive', onPress: onDelete }]);

  return <>
    <Title t="Profile" sub="Manage your account information." />
    <Card style={{ alignItems: 'center', paddingVertical: 20 }}>
      <View style={{ width: 84, height: 84, borderRadius: 42, backgroundColor: user.color || C.accent, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 30, fontWeight: '700' }}>{initials || '?'}</Text>
      </View>
      <Text style={[s.h1, { marginTop: 10 }]}>{user.name}</Text>
      <Text style={s.mute}>{user.email}</Text>
      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        {AVATARS.map(c => (
          <TouchableOpacity key={c} onPress={() => apply({ ...user, color: c })} style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: c, marginHorizontal: 5, borderWidth: (user.color || AVATARS[0]) === c ? 3 : 0, borderColor: C.text }} />
        ))}
      </View>
      <Text style={[s.tiny, { marginTop: 6 }]}>Tap a color to change your avatar</Text>
    </Card>
    <View style={s.row}>
      <Stat label="Member since" value={user.since || '—'} />
      <Stat label="Devices" value={String(sh.devices.length)} />
      <Stat label="Active rules" value={String(sh.rules.filter(r => r.on).length)} />
    </View>
    <Text style={[s.h2, { marginTop: 10, marginBottom: 6 }]}>Account details</Text>
    <Field icon="person-outline" placeholder="Full name" value={f.name} onChangeText={v => setF({ ...f, name: v })} />
    <Field icon="mail-outline" placeholder="Email" keyboardType="email-address" value={f.email} onChangeText={v => setF({ ...f, email: v })} />
    <Field icon="call-outline" placeholder="Phone (optional)" keyboardType="phone-pad" value={f.phone} onChangeText={v => setF({ ...f, phone: v })} />
    <Btn title="Save changes" onPress={save} />
    <Text style={[s.h2, { marginTop: 22, marginBottom: 6 }]}>Change password</Text>
    <Field icon="lock-closed-outline" placeholder="Current password" secureTextEntry value={pw.cur} onChangeText={v => setPw({ ...pw, cur: v })} />
    <Field icon="key-outline" placeholder="New password" secureTextEntry value={pw.next} onChangeText={v => setPw({ ...pw, next: v })} />
    <Field icon="key-outline" placeholder="Confirm new password" secureTextEntry value={pw.conf} onChangeText={v => setPw({ ...pw, conf: v })} />
    <Btn title="Update password" ghost onPress={changePw} />
    <Btn title="Logout" onPress={confirmOut} style={{ marginTop: 24 }} />
    <TouchableOpacity onPress={confirmDel} style={{ marginTop: 14, alignItems: 'center' }}><Text style={{ color: C.bad, fontWeight: '600' }}>Delete account</Text></TouchableOpacity>
  </>;
}
