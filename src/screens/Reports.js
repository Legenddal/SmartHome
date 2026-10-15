import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme';
import { Card, Title, Stat, Bars } from '../components/ui';

export default function Reports({ sh }) {
  const { s, C } = useTheme();
  const { cost, score, grade, kwh } = sh;
  const [p, setP] = useState('Daily');
  const data = {
    Daily: [[9, 12, 10, 14, 11, 16, kwh], ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']],
    Weekly: [[78, 85, 72, 90], ['W1', 'W2', 'W3', 'W4']],
    Monthly: [[310, 340, 295, 360, 330, 320], ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']],
  }[p];
  return <>
    <Title t="Reports" sub="View detailed insights and history." />
    <View style={[s.row, { marginBottom: 10 }]}>
      {['Daily', 'Weekly', 'Monthly'].map(x => (
        <TouchableOpacity key={x} onPress={() => setP(x)} style={[s.chip, p === x && { backgroundColor: C.navy }]}><Text style={{ color: p === x ? C.on : C.navy }}>{x}</Text></TouchableOpacity>
      ))}
    </View>
    <Card><Text style={s.h2}>Energy Consumption (kWh)</Text><Bars data={data[0]} labels={data[1]} /></Card>
    <View style={s.row}><Stat label="Cost Summary" value={`₱ ${cost.toFixed(2)}`} sub="Total estimated cost" /><Stat label="Waste Score" value={`${score} / 100`} sub={grade[0]} color={C[grade[1]]} /></View>
  </>;
}
