import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { Card, Title, Toggle } from '../components/ui';

const ROOMS = ['All', 'Living Room', 'Bedroom', 'Kitchen'];

export default function Devices({ sh }) {
  const { s, C } = useTheme();
  const [room, setRoom] = useState('All');
  const { devices, setDevices } = sh;
  return <>
    <Title t="Device Control" sub="Control your appliances and set automation rules." />
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
      {ROOMS.map(r => (
        <TouchableOpacity key={r} onPress={() => setRoom(r)} style={[s.chip, room === r && { backgroundColor: C.navy }]}>
          <Text style={{ color: room === r ? C.on : C.navy }}>{r}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
    {devices.filter(d => room === 'All' || d.room === room).map(d => (
      <Card key={d.id} style={s.rowCard}>
        <Ionicons name={d.icon} size={26} color={d.on ? C.accent : C.mute} />
        <View style={{ flex: 1, marginLeft: 12 }}><Text style={s.h2}>{d.name}</Text><Text style={s.tiny}>{d.w} W · {d.room}</Text></View>
        <Text style={[s.tiny, { marginRight: 8, color: d.on ? C.good : C.mute }]}>{d.on ? 'ON' : 'OFF'}</Text>
        <Toggle value={d.on} onValueChange={v => setDevices(p => p.map(x => x.id === d.id ? { ...x, on: v } : x))} />
      </Card>
    ))}
  </>;
}
