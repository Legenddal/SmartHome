import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { Card, Title, Stat, Bars } from '../components/ui';

export default function Dashboard({ user, sh }) {
  const { s, C } = useTheme();
  const { kwh, cost, score, grade, devices, hourly, alerts } = sh;
  return <>
    <Title t={`Good evening, ${user.name.split(' ')[0]}!`} sub="Here’s what’s happening in your home." />
    <View style={s.row}><Stat label="Total Energy Today" value={`${kwh.toFixed(1)} kWh`} sub="▼ 8% vs. yesterday" /><Stat label="Estimated Cost" value={`₱ ${cost.toFixed(2)}`} sub="▼ 8% vs. yesterday" /></View>
    <View style={s.row}><Stat label="Energy Waste Score" value={`${score} / 100`} sub={grade[0]} color={C[grade[1]]} /><Stat label="Active Devices" value={`${devices.filter(d => d.on).length} / ${devices.length}`} /></View>
    <Card><Text style={s.h2}>Power Usage (kWh)</Text><Bars data={hourly} labels={['6AM', '9AM', '12PM', '3PM', '6PM', '9PM', 'Now']} /></Card>
    <Card style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name={alerts.length ? 'warning-outline' : 'checkmark-circle-outline'} size={36} color={alerts.length ? C.warn : C.good} />
      <View style={{ marginLeft: 12, flex: 1 }}><Text style={s.h2}>House Status</Text><Text style={s.mute}>{alerts.length ? alerts[0] : 'All systems normal'}</Text></View>
    </Card>
  </>;
}
