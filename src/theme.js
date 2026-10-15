import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Appearance } from 'react-native';

export const LIGHT = { navy: '#1F3A4D', bg: '#F2F5F8', card: '#FFFFFF', line: '#DCE3EA', text: '#16222C', mute: '#6B7C8A', accent: '#5B8DB8', good: '#2E9E5B', warn: '#E0A020', bad: '#D2483D', on: '#FFFFFF' };
export const DARK = { navy: '#8CC0EC', bg: '#0F161C', card: '#18222B', line: '#2A3844', text: '#E6EDF3', mute: '#8FA1B0', accent: '#6FA6D6', good: '#4CC27F', warn: '#F0B440', bad: '#F0645A', on: '#0F161C' };

const makeStyles = C => StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  authScroll: { padding: 24, justifyContent: 'center', flexGrow: 1 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: C.card, borderBottomWidth: 1, borderColor: C.line },
  h1: { fontSize: 20, fontWeight: '700', color: C.navy },
  h2: { fontSize: 15, fontWeight: '600', color: C.text },
  big: { fontSize: 20, fontWeight: '700', color: C.text, marginVertical: 2 },
  mute: { color: C.mute, fontSize: 13 },
  tiny: { color: C.mute, fontSize: 11 },
  card: { backgroundColor: C.card, borderRadius: 10, padding: 14, marginVertical: 5, borderWidth: 1, borderColor: C.line },
  row: { flexDirection: 'row' },
  rowCard: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  btn: { backgroundColor: C.navy, borderRadius: 8, paddingVertical: 13, alignItems: 'center' },
  btnGhost: { backgroundColor: C.card, borderWidth: 1, borderColor: C.line },
  btnTxt: { color: C.on, fontWeight: '600' },
  mini: { flex: 1, marginRight: 6, paddingVertical: 9 },
  field: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.card, borderWidth: 1, borderColor: C.line, borderRadius: 8, paddingHorizontal: 12, height: 48, marginBottom: 10 },
  fieldInput: { flex: 1, marginLeft: 10, color: C.text },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 18, borderWidth: 1, borderColor: C.line, backgroundColor: C.card, marginRight: 8 },
  tabbar: { flexDirection: 'row', backgroundColor: C.card, borderTopWidth: 1, borderColor: C.line, paddingVertical: 6 },
  tabItem: { flex: 1, alignItems: 'center' },
  rateInput: { borderWidth: 1, borderColor: C.line, borderRadius: 6, width: 70, textAlign: 'center', paddingVertical: 4, color: C.text, backgroundColor: C.card },
  sheetBack: { flex: 1, backgroundColor: '#0008', justifyContent: 'flex-end' },
  sheet: { backgroundColor: C.card, padding: 20, borderTopLeftRadius: 18, borderTopRightRadius: 18 },
});

const ThemeCtx = createContext(null);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);
  const value = useMemo(() => {
    const C = dark ? DARK : LIGHT;
    return { C, s: makeStyles(C), dark, setDark };
  }, [dark]);
  // make native pieces (alerts, keyboard, switches, status bar) follow the app theme too
  useEffect(() => {
    try { Appearance.setColorScheme(dark ? 'dark' : 'light'); } catch (e) {}
  }, [dark]);
  return (
    <ThemeCtx.Provider value={value}>
      <View style={{ flex: 1, backgroundColor: value.C.bg }}>{children}</View>
    </ThemeCtx.Provider>
  );
}
export const useTheme = () => useContext(ThemeCtx);
