import { useState } from 'react';

// ============ TYPES ============
interface Agent { name: string; isResp?: boolean; }
interface FlightGroup { flights: string[]; agents: Agent[]; }
interface DispatchData {
  id: number;
  date: string;
  shift: string;
  permanenceNumber: string;
  manutentionnaires: FlightGroup[];
  sousSolSud: string[];
  sousSolNord: string[];
  zoneArrivee: string[];
  superviseurs: string[];
  conducteurs: { name: string; flights: string[] }[];
  tractistes: { name: string; flights: string[] }[];
}

// ============ DEFAULT DISPATCH DATA ============
const sampleDispatch: DispatchData = {
  id: 1,
  date: 'VENDREDI 22/05/26',
  shift: '15H-00H',
  permanenceNumber: '77 843 94 99',
  manutentionnaires: [
    { flights: ['L6 104','SIV','R2','KP50','HC1005','NO5420','HC306'], agents: [{ name:'BABACAR D. SECK', isResp:true },{ name:'EL HADJ MALCK SAMBA' },{ name:'ALGASSIMOU DIALLO' }] },
    { flights: ['SN204','HC405'], agents: [{ name:'DAOUDA GUEYE' },{ name:'MASSAER SARR' },{ name:'RENE PIERRE' },{ name:'MAMADOU M. FAYE' }] },
    { flights: ['TO8026','KP52','HF700','AT503','HC210','NO5720','L6105'], agents: [{ name:'CHEIKHOU NIANG', isResp:true },{ name:'MOUSSA SALL' },{ name:'ISSA BA' }] },
    { flights: ['IB919','HC405'], agents: [{ name:'MAMADOU DIAGNE' },{ name:'MOISE BABENE' },{ name:'ABA SONKO' }] },
    { flights: ['SN203','R2','TK503'], agents: [{ name:'AMADOU GAYE', isResp:true },{ name:'BABACAR DIOUF' },{ name:'MALICK NDIAYE' },{ name:'IBRAHIMA DALDE' }] },
    { flights: ['EK795'], agents: [{ name:'IBRAHIMA SECK', isResp:true },{ name:'ASSANE DIAGNE' },{ name:'MOUSTAPHA DIOP' },{ name:'MAMADOU FAYE' }] },
  ],
  sousSolSud: ['PADRE COULIIBALY','SAMBA KANDJI','HADY NDAO','SOULEYMANE SYLLA','OMAR GUEYE'],
  sousSolNord: ['MATAR FALL','SARAKH SECK','PASCAL OUMAR BA','AMADOU BA','PIPPO DIEYE'],
  zoneArrivee: ['IBRAHIMA DALDE','MBAYE THIAM','AMADOU DIENG NDIAYE','FALLOU FAYE','ABDOULAYRE FALL','ALDIOUMA NGOM'],
  superviseurs: ['AMADOU SARR NGOM','IRAME DIOUF / MAMADOU LOUM','IBRAHIMA NGOM / MBAGNICK M.','IRA DIOP / JEAN DIEDHIOU'],
  conducteurs: [
    { name:'KEBA SADIO // ASSANE SECK', flights:['SN203','AT503','IB919','SN204'] },
    { name:'A DOUCORE // MOCTAR SALL', flights:['EK795','AZ854','AF718'] },
    { name:'SEYDOU KONTE // ALIOUNE B. THIAM', flights:['SIV','TK503','IB921','AZ855'] },
    { name:'OUSSEYNOU MBAYE', flights:['EK795','ET909','HC403'] },
  ],
  tractistes: [
    { name:'ABDOULAYE N. // CH. O. TRAORE', flights:['EK795','AT503','HC1005','AF718','HC405'] },
    { name:'ANDRE DOUTA SECK', flights:['L6 104','R2','IB919','L6105','NO5420','HC403'] },
    { name:'LAMINE THIAM', flights:['SIV','ET909','AZ854','HC306','IB921','AZ855'] },
    { name:'CHEIKH NIASS // MOUSA S.', flights:['KP52','SN203','HF700','TK503','SN204','HC210','HC403'] },
  ],
};

const emptyDispatch: Omit<DispatchData,'id'> = {
  date:'', shift:'', permanenceNumber:'77 843 94 99',
  manutentionnaires:[{ flights:[], agents:[{ name:'' }] }],
  sousSolSud:[''], sousSolNord:[''], zoneArrivee:[''],
  superviseurs:[''], conducteurs:[{ name:'', flights:[] }], tractistes:[{ name:'', flights:[] }],
};

// ============ DISPATCH SHEET (vue imprimable) ============
function DispatchSheet({ d, onBack }: { d: DispatchData; onBack: () => void }) {
  const handlePrint = () => window.print();
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 pt-6 flex justify-between items-center mb-4 print:hidden">
        <button onClick={onBack} className="text-slate-400 hover:text-white transition text-sm">← Retour</button>
        <button onClick={handlePrint} className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-xl text-sm font-semibold transition">
          🖨️ Imprimer
        </button>
      </div>
      <div className="max-w-6xl mx-auto px-4 pb-10">
        {/* Header */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden mb-4 print:border-black print:bg-white print:text-black">
          <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700 print:bg-white print:border-black">
            <div className="text-2xl font-black text-blue-400 print:text-black">2AS</div>
            <div className="text-center">
              <h1 className="text-lg font-black text-white print:text-black">DISPATCH DU PERSONNEL DE VACATION</h1>
              <p className="font-bold text-slate-300 print:text-black">{d.date} {d.shift}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 print:text-black">NUMERO PERMANENCE RAMP</p>
              <p className="font-bold text-blue-400 print:text-black">{d.permanenceNumber}</p>
            </div>
          </div>
          <div className="p-4">
            {/* Manutentionnaires */}
            <h2 className="text-center font-black text-lg mb-3 text-white print:text-black">MANUTENTIONNAIRES</h2>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {d.manutentionnaires.map((g, i) => (
                <div key={i} className="border border-slate-700 bg-slate-800 rounded-xl p-3 print:border-black print:bg-white">
                  <p className="text-xs font-bold mb-2 text-blue-300 print:text-black">{g.flights.join(' // ')}</p>
                  {g.agents.map((a, j) => (
                    <p key={j} className={`text-sm text-slate-200 print:text-black ${a.isResp ? 'font-black' : ''}`}>
                      {a.isResp ? 'RESP  ' : ''}{a.name}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            {/* Sous-sol */}
            <div className="border border-slate-700 bg-slate-800 rounded-xl p-3 mb-3 print:border-black print:bg-white">
              <p className="text-sm font-black text-red-400 mb-2 print:text-red-700">RAPPELE EPI OBLIGATOIRE LORS DES TRAITEMENTS</p>
              <p className="text-sm text-slate-200 mb-1 print:text-black"><span className="font-black">SOUS-SOL SUD (1) : </span>{d.sousSolSud.join(' // ')}</p>
              <p className="text-sm text-slate-200 print:text-black"><span className="font-black">SOUS-SOL NORD (2) : </span>{d.sousSolNord.join(' // ')}</p>
            </div>
            {/* Zone Arrivée */}
            <div className="border border-slate-700 bg-slate-800 rounded-xl p-3 mb-3 print:border-black print:bg-white">
              <h3 className="text-center font-black mb-2 text-white print:text-black">ZONE ARRIVEE</h3>
              <p className="text-center text-sm text-slate-200 print:text-black">{d.zoneArrivee.join(' // ')}</p>
            </div>
            {/* Superviseurs / Conducteurs / Tractistes */}
            <div className="grid grid-cols-3 gap-2">
              <div className="border border-slate-700 bg-slate-800 rounded-xl p-3 print:border-black print:bg-white">
                <h3 className="text-center font-black mb-3 text-sm text-white print:text-black">SUPERVISEURS</h3>
                {d.superviseurs.map((s, i) => <p key={i} className="text-sm mb-1 text-slate-200 print:text-black">{s}</p>)}
              </div>
              <div className="border border-slate-700 bg-slate-800 rounded-xl p-3 print:border-black print:bg-white">
                <h3 className="text-center font-black mb-3 text-sm text-white print:text-black">CONDUCTEURS</h3>
                {d.conducteurs.map((c, i) => (
                  <div key={i} className="mb-2">
                    <p className="text-sm font-bold text-slate-200 print:text-black">{c.name}</p>
                    <p className="text-xs text-slate-400 print:text-gray-600">{c.flights.join(' // ')}</p>
                  </div>
                ))}
              </div>
              <div className="border border-slate-700 bg-slate-800 rounded-xl p-3 print:border-black print:bg-white">
                <h3 className="text-center font-black mb-3 text-sm text-white print:text-black">TRACTISTES</h3>
                {d.tractistes.map((t, i) => (
                  <div key={i} className="mb-2">
                    <p className="text-sm font-bold text-slate-200 print:text-black">{t.name}</p>
                    <p className="text-xs text-slate-400 print:text-gray-600">{t.flights.join(' // ')}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-red-400 font-semibold print:text-red-700">
              Le dispatching peut être modifié à tout instant par le superviseur.<br />
              Merci de respecter les mises en place du matériel et du personnel à H-15mn
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ DISPATCH FORM ============
function DispatchForm({ onSave, onCancel }: { onSave: (d: DispatchData) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Omit<DispatchData,'id'>>({ ...emptyDispatch });
  const shifts = ['06H-14H','14H-22H','15H-00H','22H-06H','00H-08H'];

  const save = () => {
    if (!form.date || !form.shift) return alert('Veuillez remplir la date et le shift');
    onSave({ ...form, id: Date.now() });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onCancel} className="text-slate-400 hover:text-white transition">← Retour</button>
          <h1 className="text-2xl font-black">Nouveau Dispatch</h1>
        </div>
        <div className="space-y-5">
          {/* Infos générales */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="font-bold text-blue-400 mb-4">Informations générales</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Date</label>
                <input className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500" placeholder="ex: LUNDI 25/05/26" value={form.date} onChange={e => setForm({...form, date:e.target.value})} />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Shift</label>
                <select className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500" value={form.shift} onChange={e => setForm({...form, shift:e.target.value})}>
                  <option value="">Sélectionner</option>
                  {shifts.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">N° Permanence Ramp</label>
                <input className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500" value={form.permanenceNumber} onChange={e => setForm({...form, permanenceNumber:e.target.value})} />
              </div>
            </div>
          </div>

          {/* Sous-sol */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="font-bold text-blue-400 mb-4">Sous-sol Sud (1)</h2>
            <textarea className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 h-20 resize-none" placeholder="Noms séparés par des virgules" value={form.sousSolSud.join(', ')} onChange={e => setForm({...form, sousSolSud: e.target.value.split(',').map(s=>s.trim())})} />
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="font-bold text-blue-400 mb-4">Sous-sol Nord (2)</h2>
            <textarea className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 h-20 resize-none" placeholder="Noms séparés par des virgules" value={form.sousSolNord.join(', ')} onChange={e => setForm({...form, sousSolNord: e.target.value.split(',').map(s=>s.trim())})} />
          </div>

          {/* Zone arrivée */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="font-bold text-blue-400 mb-4">Zone Arrivée</h2>
            <textarea className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 h-20 resize-none" placeholder="Noms séparés par des virgules" value={form.zoneArrivee.join(', ')} onChange={e => setForm({...form, zoneArrivee: e.target.value.split(',').map(s=>s.trim())})} />
          </div>

          {/* Superviseurs */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="font-bold text-blue-400 mb-4">Superviseurs</h2>
            <textarea className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 h-24 resize-none" placeholder="Un superviseur par ligne" value={form.superviseurs.join('\n')} onChange={e => setForm({...form, superviseurs: e.target.value.split('\n').map(s=>s.trim())})} />
          </div>

          {/* Manutentionnaires - groupe 1 simplifié */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="font-bold text-blue-400 mb-4">Manutentionnaires (groupe principal)</h2>
            <div className="space-y-3">
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Vols (séparés par des virgules)</label>
                <input className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500" placeholder="ex: HC1005, TK501, SN203" value={form.manutentionnaires[0]?.flights.join(', ')||''} onChange={e => { const m=[...form.manutentionnaires]; m[0]={...m[0], flights:e.target.value.split(',').map(s=>s.trim())}; setForm({...form, manutentionnaires:m}); }} />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Agents (un par ligne, ajouter RESP: devant le responsable)</label>
                <textarea className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 h-28 resize-none" placeholder={"RESP: BABACAR D. SECK\nEL HADJ MALCK SAMBA\nALGASSIMOU DIALLO"} value={form.manutentionnaires[0]?.agents.map(a=>(a.isResp?'RESP: ':'')+a.name).join('\n')||''} onChange={e => { const lines=e.target.value.split('\n'); const agents=lines.map(l=>({ name:l.replace(/^RESP:\s*/,'').trim(), isResp:l.trim().startsWith('RESP:') })); const m=[...form.manutentionnaires]; m[0]={...m[0],agents}; setForm({...form,manutentionnaires:m}); }} />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button onClick={onCancel} className="flex-1 border border-slate-700 hover:border-slate-500 px-5 py-3 rounded-xl font-bold transition">Annuler</button>
            <button onClick={save} className="flex-1 bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl font-bold transition">✓ Créer le Dispatch</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ DISPATCH LIST ============
function DispatchCenter() {
  const [dispatches, setDispatches] = useState<DispatchData[]>([sampleDispatch]);
  const [view, setView] = useState<'list'|'create'|'view'>('list');
  const [selected, setSelected] = useState<DispatchData|null>(null);

  if (view === 'create') return <DispatchForm onSave={d => { setDispatches([...dispatches, d]); setSelected(d); setView('view'); }} onCancel={() => setView('list')} />;
  if (view === 'view' && selected) return <DispatchSheet d={selected} onBack={() => setView('list')} />;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black">Dispatch Center</h1>
            <p className="text-slate-400 mt-1">Gestion du personnel de vacation — AIBD</p>
          </div>
          <button onClick={() => setView('create')} className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl font-bold transition">
            + Nouveau Dispatch
          </button>
        </div>
        <div className="grid gap-4">
          {dispatches.map((d) => (
            <div key={d.id} onClick={() => { setSelected(d); setView('view'); }} className="bg-slate-900 border border-slate-800 hover:border-blue-500 rounded-2xl p-5 cursor-pointer transition">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Dispatch #{d.id}</p>
                  <h3 className="text-xl font-bold">{d.date} — {d.shift}</h3>
                  <p className="text-slate-400 mt-1 text-sm">
                    {d.manutentionnaires.reduce((acc,g)=>acc+g.agents.length,0)} manutentionnaires • {d.superviseurs.length} superviseurs • {d.conducteurs.length} conducteurs
                  </p>
                </div>
                <div className="text-blue-400 text-2xl">→</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ MAIN WEBSITE ============
const flights = [
  { code: 'HC1005', status: 'On Time', gate: 'A12', time: '08:45' },
  { code: 'TK501', status: 'Delayed', gate: 'B03', time: '09:20' },
  { code: 'KP55', status: 'Boarding', gate: 'C07', time: '10:05' },
];
const agents = [
  { name: 'Mamadou Tine', role: 'Ramp Agent', shift: '08H-16H' },
  { name: 'Cheikhou Niang', role: 'Loader', shift: '15H-00H' },
  { name: 'Abdoulaye Fall', role: 'Dispatcher', shift: '23H-09H' },
];

export default function RampLinkWebsite() {
  const [activePage, setActivePage] = useState<'home'|'dispatch'>('home');

  if (activePage === 'dispatch') return <DispatchCenter />;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">RampLink</h1>
            <p className="text-xs text-slate-400">Airport Ramp Operations Platform</p>
          </div>
          <div className="hidden md:flex gap-6 text-sm text-slate-300">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#operations" className="hover:text-white">Operations</a>
            <a href="#team" className="hover:text-white">Team</a>
          </div>
          <button onClick={() => setActivePage('dispatch')} className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl font-bold transition text-sm">
            📋 Dispatch
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/20 to-cyan-500/10 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-blue-400 text-sm mb-4">Smart Aviation Technology</p>
            <h1 className="text-6xl font-black leading-tight">Modern Airport Dispatch & Ramp Management</h1>
            <p className="text-slate-300 text-lg mt-6 max-w-2xl">RampLink helps airport ramp teams manage flights, dispatch agents, coordinate operations and monitor airport activities in real time.</p>
            <div className="flex gap-4 mt-8">
              <button onClick={() => setActivePage('dispatch')} className="bg-blue-600 hover:bg-blue-500 px-6 py-4 rounded-2xl font-bold transition shadow-2xl">
                Launch Platform
              </button>
              <button className="border border-slate-700 hover:border-slate-500 px-6 py-4 rounded-2xl font-semibold transition">
                Watch Demo
              </button>
            </div>
          </div>
          {/* Stats card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-[2rem] p-6 shadow-2xl backdrop-blur">
            <div className="grid grid-cols-2 gap-4">
              {[['Flights Managed','120+'],['Ramp Agents','80'],['Dispatch Accuracy','98%'],['Airports','5']].map(([label,val])=>(
                <div key={label} className="bg-slate-800 rounded-2xl p-5">
                  <p className="text-slate-400">{label}</p>
                  <h2 className="text-4xl font-bold mt-2">{val}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Features */}
          <section id="features" className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[['Active Flights','28'],['Agents On Duty','42'],['Delayed Flights','3'],['Current Shift','15H - 00H']].map(([label,val])=>(
              <div key={label} className="bg-slate-900 rounded-3xl p-5 shadow-xl border border-slate-800">
                <p className="text-slate-400">{label}</p>
                <h2 className="text-4xl font-bold mt-2">{val}</h2>
              </div>
            ))}
          </section>

          {/* Operations - Live Flights + Team */}
          <section id="operations" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Live Flights</h2>
                <input type="text" placeholder="Search flight" className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-500" />
              </div>
              <div className="space-y-4">
                {flights.map((flight, index) => (
                  <div key={index} className="bg-slate-800 rounded-2xl p-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">{flight.code}</h3>
                      <p className="text-slate-400">Gate {flight.gate}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${flight.status==='Delayed'?'text-red-400':flight.status==='Boarding'?'text-green-400':'text-blue-400'}`}>{flight.status}</p>
                      <p className="text-slate-400">{flight.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id="team" className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Ramp Team</h2>
              <div className="space-y-4">
                {agents.map((agent, index) => (
                  <div key={index} className="bg-slate-800 rounded-2xl p-4">
                    <h3 className="font-semibold text-lg">{agent.name}</h3>
                    <p className="text-slate-400">{agent.role}</p>
                    <p className="mt-2 text-sm bg-blue-600 inline-block px-3 py-1 rounded-full">{agent.shift}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Dispatch */}
          <section className="bg-gradient-to-r from-blue-700 to-slate-900 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col items-start gap-4">
              <div>
                <h2 className="text-3xl font-bold">Airport Operations in Real Time</h2>
                <p className="text-slate-200 mt-2 max-w-2xl">Manage dispatch teams, track flights, monitor delays, and coordinate airport ramp operations from a single platform.</p>
              </div>
              <button onClick={() => setActivePage('dispatch')} className="bg-white text-slate-900 px-6 py-4 rounded-2xl font-bold hover:scale-105 transition">
                📋 Launch Dispatch Center
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
