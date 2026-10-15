import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../theme';
import { Card, Title, Stat, Btn } from '../components/ui';

export default function Energy({ sh }) {
  const { s, C } = useTheme();
  const { sn, setSn, devices, kwh, cost, score, grade, totalW, rate } = sh;
  const share = devices.filter(d => d.on).map(d => ({ n: d.name, p: totalW ? Math.round((d.w / totalW) * 100) : 0 }));
  return <>
    <Title t="Live Sensor Data" sub="Real-time readings from your home (simulated)." />
    <View style={s.row}><Stat label="Temperature" value={`${sn.temp} °C`} /><Stat label="Humidity" value={`${sn.hum} %`} /></View>
    <View style={s.row}><Stat label="Light Level" value={`${sn.lux} lux`} /><Stat label="Motion" value={sn.motion ? 'Detected' : 'No Motion'} color={sn.motion ? C.good : C.mute} /></View>
    <Text style={[s.mute, { marginVertical: 6 }]}>Test your rules:</Text>
    <View style={s.row}>
      <Btn ghost title="Hot room" style={s.mini} onPress={() => setSn({ ...sn, temp: 31 })} />
      <Btn ghost title="Dark room" style={s.mini} onPress={() => setSn({ ...sn, lux: 80 })} />
      <Btn ghost title="Empty 15s" style={s.mini} onPress={() => setSn({ ...sn, motion: false, idle: 6 })} />
    </View>
    <Card style={{ marginTop: 12 }}><Text style={s.h2}>Device Status</Text>
      {devices.map(d => <View key={d.id} style={[s.row, { justifyContent: 'space-between', marginTop: 6 }]}><Text style={{ color: C.text }}>{d.name}</Text><Text style={{ color: d.on ? C.good : C.mute }}>{d.on ? 'ON' : 'OFF'}</Text></View>)}
    </Card>
    <View style={{ marginTop: 16 }}><Title t="Energy Usage & Cost" sub={`Rate: ₱${rate.toFixed(2)} / kWh · load now ${totalW} W`} /></View>
    <View style={s.row}><Stat label="Consumption" value={`${kwh.toFixed(1)} kWh`} /><Stat label="Est. Cost" value={`₱ ${cost.toFixed(2)}`} /><Stat label="Waste" value={`${score}`} sub={grade[0]} color={C[grade[1]]} /></View>
    <Card><Text style={s.h2}>Cost Breakdown (live load)</Text>
      {share.length === 0 && <Text style={s.mute}>All devices are off.</Text>}
      {share.map(x => (
        <View key={x.n} style={{ marginTop: 8 }}>
          <View style={[s.row, { justifyContent: 'space-between' }]}><Text style={s.tiny}>{x.n}</Text><Text style={s.tiny}>{x.p}%</Text></View>
          <View style={{ height: 8, backgroundColor: C.line, borderRadius: 4 }}><View style={{ width: `${x.p}%`, height: 8, backgroundColor: C.accent, borderRadius: 4 }} /></View>
        </View>
      ))}
    </Card>
  </>;
}
