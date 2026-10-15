import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider, useTheme } from '../theme';
import useSmartHome from '../hooks/useSmartHome';
import { Screen } from '../components/ui';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Dashboard from '../screens/Dashboard';
import Devices from '../screens/Devices';
import Automation from '../screens/Automation';
import Energy from '../screens/Energy';
import Reports from '../screens/Reports';
import Settings from '../screens/Settings';
import Profile from '../screens/Profile';

const TABS = [
  ['home', 'Home', 'home-outline'], ['devices', 'Devices', 'toggle-outline'], ['auto', 'Rules', 'git-branch-outline'],
  ['energy', 'Energy', 'flash-outline'], ['reports', 'Reports', 'bar-chart-outline'],
];

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function Root() {
  const { s, C } = useTheme();
  const [screen, setScreen] = useState('splash'); // splash | login | signup | app
  const [tab, setTab] = useState('home');
  const [overlay, setOverlay] = useState(null); // null | settings | profile
  const [notif, setNotif] = useState(true);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([{ name: 'Demo User', email: 'demo', pass: 'demo123', phone: '', color: '#5B8DB8', since: 'Oct 15, 2026' }]);
  const sh = useSmartHome(screen === 'app');

  const logout = () => { setOverlay(null); setUser(null); setScreen('login'); };
  const deleteAccount = () => { setUsers(users.filter(u => u.email !== user.email)); logout(); };

  if (screen === 'splash') return <Splash onStart={() => setScreen('login')} />;
  if (screen === 'login') return <Login users={users} onOk={u => { setUser(u); setScreen('app'); }} go={() => setScreen('signup')} />;
  if (screen === 'signup') return <Signup users={users} onOk={u => { setUsers([...users, u]); setUser(u); setScreen('app'); }} go={() => setScreen('login')} />;

  const title = overlay ? (overlay === 'profile' ? 'Profile' : 'Settings') : TABS.find(t => t[0] === tab)[1];
  const showAlerts = () => Alert.alert('Notifications', notif ? (sh.alerts.join('\n') || 'No alerts. All systems normal.') : 'Notifications are turned off.');
  const hasAlert = notif && sh.alerts.length > 0;

  return (
    <Screen>
      <View style={s.top}>
        <Text style={s.h1}>{title}</Text>
        <View style={{ flexDirection: 'row' }}>
          {overlay ? (
            <TouchableOpacity onPress={() => setOverlay(null)}><Ionicons name="close" size={26} color={C.navy} /></TouchableOpacity>
          ) : <>
            <TouchableOpacity onPress={showAlerts}><Ionicons name={hasAlert ? 'notifications' : 'notifications-outline'} size={24} color={hasAlert ? C.bad : C.navy} /></TouchableOpacity>
            <TouchableOpacity onPress={() => setOverlay('settings')} style={{ marginLeft: 16 }}><Ionicons name="settings-outline" size={24} color={C.navy} /></TouchableOpacity>
            <TouchableOpacity onPress={() => setOverlay('profile')} style={{ marginLeft: 16 }}><Ionicons name="person-circle-outline" size={26} color={C.navy} /></TouchableOpacity>
          </>}
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 30 }} keyboardShouldPersistTaps="handled">
        {overlay === 'settings' && <Settings sh={sh} notif={notif} setNotif={setNotif} />}
        {overlay === 'profile' && <Profile {...{ user, setUser, users, setUsers, sh }} onLogout={logout} onDelete={deleteAccount} />}
        {!overlay && tab === 'home' && <Dashboard user={user} sh={sh} />}
        {!overlay && tab === 'devices' && <Devices sh={sh} />}
        {!overlay && tab === 'auto' && <Automation sh={sh} />}
        {!overlay && tab === 'energy' && <Energy sh={sh} />}
        {!overlay && tab === 'reports' && <Reports sh={sh} />}
      </ScrollView>

      <View style={s.tabbar}>
        {TABS.map(([k, label, icon]) => {
          const on = !overlay && tab === k;
          return (
            <TouchableOpacity key={k} style={s.tabItem} onPress={() => { setOverlay(null); setTab(k); }}>
              <Ionicons name={icon} size={22} color={on ? C.navy : C.mute} />
              <Text style={[s.tiny, on && { color: C.navy, fontWeight: '700' }]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Screen>
  );
}
