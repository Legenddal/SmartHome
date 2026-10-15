import { useState, useEffect } from 'react';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// Holds devices, rules, simulated sensors, energy numbers and the automation engine.
export default function useSmartHome(active) {
  const [rate, setRate] = useState(12);
  const [kwh, setKwh] = useState(12.4);
  const [hourly] = useState([0.3, 0.2, 0.9, 1.6, 1.2, 2.1, 1.8]);
  const [devices, setDevices] = useState([
    { id: 1, name: 'Living Room Light', room: 'Living Room', icon: 'bulb-outline', w: 12, on: true },
    { id: 2, name: 'Bedroom Fan', room: 'Bedroom', icon: 'sync-outline', w: 60, on: false },
    { id: 3, name: 'Kitchen Outlet', room: 'Kitchen', icon: 'flash-outline', w: 150, on: true },
    { id: 4, name: 'Water Heater', room: 'Kitchen', icon: 'water-outline', w: 1500, on: false },
  ]);
  const [rules, setRules] = useState([
    { id: 1, type: 'light', val: 0, on: true },
    { id: 2, type: 'fan', val: 28, on: true },
    { id: 3, type: 'idle', val: 0, on: true },
  ]);
  const [sn, setSn] = useState({ temp: 26.5, hum: 68, lux: 320, motion: false, idle: 0 });

  const setDev = (id, on) => setDevices(d => d.map(x => (x.id === id && x.on !== on ? { ...x, on } : x)));
  const totalW = devices.filter(d => d.on).reduce((a, d) => a + d.w, 0);
  const wasteW = sn.idle >= 3 ? totalW : 0;
  const score = clamp(100 - Math.round(totalW / 40) - Math.round(wasteW / 30), 0, 100);
  const grade = score >= 70 ? ['Good', 'good'] : score >= 40 ? ['Fair', 'warn'] : ['Poor', 'bad'];
  const cost = kwh * rate;

  const alerts = [];
  if (sn.temp > 30) alerts.push('High temperature detected');
  if (wasteW > 0) alerts.push('Devices running while nobody is home');
  if (score < 40) alerts.push('Energy waste score is poor');

  // sensor + energy simulation every 3 seconds
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => {
      setSn(p => {
        const motion = Math.random() < 0.35;
        return {
          temp: +clamp(p.temp + (Math.random() - 0.5) * 0.6, 20, 38).toFixed(1),
          hum: Math.round(clamp(p.hum + (Math.random() - 0.5) * 3, 30, 95)),
          lux: Math.round(clamp(p.lux + (Math.random() - 0.5) * 40, 0, 900)),
          motion, idle: motion ? 0 : p.idle + 1,
        };
      });
      setKwh(k => +(k + (totalW / 1000) * 0.02).toFixed(3));
    }, 3000);
    return () => clearInterval(t);
  }, [active, totalW]);

  // automation engine
  useEffect(() => {
    rules.filter(r => r.on).forEach(r => {
      if (r.type === 'light' && sn.motion && sn.lux < 200) setDev(1, true);
      if (r.type === 'fan' && sn.temp > r.val) setDev(2, true);
      if (r.type === 'idle' && sn.idle >= 5) { setDev(1, false); setDev(2, false); }
    });
  }, [sn.motion, sn.lux, sn.temp, sn.idle, rules]);

  return { rate, setRate, kwh, hourly, devices, setDevices, rules, setRules, sn, setSn, totalW, score, grade, cost, alerts };
}
