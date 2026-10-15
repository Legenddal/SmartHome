import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from './theme';

// Works on phone AND web (React Native's built-in Alert does nothing in the browser).
let show = null;
const Alert = {
  alert(title, message, buttons) {
    if (show) show({ title, message, buttons: buttons && buttons.length ? buttons : [{ text: 'OK' }] });
  },
};
export default Alert;

export function DialogHost() {
  const { s, C } = useTheme();
  const [d, setD] = useState(null);
  useEffect(() => { show = setD; return () => { show = null; }; }, []);
  const press = b => { setD(null); if (b.onPress) b.onPress(); };
  if (!d) return null;
  return (
    <Modal transparent animationType="fade" visible onRequestClose={() => setD(null)}>
      <View style={{ flex: 1, backgroundColor: '#0009', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
        <View style={{ width: '100%', maxWidth: 380, backgroundColor: C.card, borderRadius: 14, padding: 20, borderWidth: 1, borderColor: C.line }}>
          <Text style={s.h1}>{d.title}</Text>
          {d.message ? <Text style={[s.mute, { marginTop: 8, fontSize: 14 }]}>{d.message}</Text> : null}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flexWrap: 'wrap', marginTop: 18 }}>
            {d.buttons.map((b, i) => (
              <TouchableOpacity key={i} onPress={() => press(b)} style={{ paddingVertical: 8, paddingHorizontal: 14 }}>
                <Text style={{ fontWeight: '700', color: b.style === 'destructive' ? C.bad : b.style === 'cancel' ? C.mute : C.navy }}>{b.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}