import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import Alert from '../dialog';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';
import { Card, Title, Btn, Field, Toggle } from '../components/ui';

const ruleText = r =>
  r.type === 'light' ? ['Motion → Light', 'If motion detected AND it’s dark → turn ON light']
  : r.type === 'fan' ? ['Temp → Fan', `If temperature > ${r.val}°C → turn ON fan`]
  : ['No Motion → Turn OFF', 'If no motion for 15 sec (demo) → turn OFF light & fan'];

export default function Automation({ sh }) {
  const { s, C } = useTheme();
  const { rules, setRules } = sh;
  const [open, setOpen] = useState(false); const [type, setType] = useState('light'); const [val, setVal] = useState('28');
  const add = () => { setRules([...rules, { id: Date.now(), type, val: type === 'fan' ? Number(val) || 28 : 0, on: true }]); setOpen(false); };
  return <>
    <Title t="Automation Rules" sub="Set conditions for automatic control." />
    <Btn title="+ Add Rule" onPress={() => setOpen(true)} style={{ marginBottom: 10 }} />
    {rules.length === 0 && <Text style={s.mute}>No rules yet. Add one to automate your devices.</Text>}
    {rules.map(r => (
      <Card key={r.id} style={s.rowCard}>
        <View style={{ flex: 1 }}><Text style={s.h2}>{ruleText(r)[0]}</Text><Text style={s.tiny}>{ruleText(r)[1]}</Text></View>
        <Toggle value={r.on} color={C.good} onValueChange={v => setRules(rules.map(x => x.id === r.id ? { ...x, on: v } : x))} />
        <TouchableOpacity onPress={() => Alert.alert('Delete rule?', ruleText(r)[0], [{ text: 'Cancel', style: 'cancel' }, { text: 'Delete', style: 'destructive', onPress: () => setRules(rules.filter(x => x.id !== r.id)) }])} style={{ marginLeft: 10 }}>
          <Ionicons name="trash-outline" size={20} color={C.bad} />
        </TouchableOpacity>
      </Card>
    ))}
    <Modal visible={open} transparent animationType="slide" statusBarTranslucent>
      <View style={s.sheetBack}>
        <View style={s.sheet}>
          <Text style={s.h1}>New rule</Text>
          {[['light', 'Motion → Light'], ['fan', 'Temperature → Fan'], ['idle', 'No motion → Turn off']].map(([k, l]) => (
            <TouchableOpacity key={k} onPress={() => setType(k)} style={s.rowCard}>
              <Ionicons name={type === k ? 'radio-button-on' : 'radio-button-off'} size={20} color={C.navy} /><Text style={[s.h2, { marginLeft: 8 }]}>{l}</Text>
            </TouchableOpacity>
          ))}
          {type === 'fan' && <Field icon="thermometer-outline" placeholder="Temperature °C" keyboardType="numeric" value={val} onChangeText={setVal} />}
          <Btn title="Save rule" onPress={add} style={{ marginTop: 10 }} /><Btn title="Cancel" ghost onPress={() => setOpen(false)} style={{ marginTop: 8 }} />
        </View>
      </View>
    </Modal>
  </>;
}