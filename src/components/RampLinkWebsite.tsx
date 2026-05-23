
export default function RampLinkWebsite() {
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

  return (
    <div className="min-h-screen bg-slate-950 text-white">
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
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-2xl font-semibold transition">
            Get Started
          </button>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/20 to-cyan-500/10 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-blue-400 text-sm mb-4">Smart Aviation Technology</p>
            <h1 className="text-6xl font-black leading-tight">Modern Airport Dispatch & Ramp Management</h1>
            <p className="text-slate-300 text-lg mt-6 max-w-2xl">
              RampLink helps airport ramp teams manage flights, dispatch agents, coordinate operations and monitor airport activities in real time.
            </p>
            <div className="flex gap-4 mt-8">
              <button className="bg-blue-600 hover:bg-blue-500 px-6 py-4 rounded-2xl font-bold transition shadow-2xl">
                Launch Platform
              </button>
              <button className="border border-slate-700 hover:border-slate-500 px-6 py-4 rounded-2xl font-semibold transition">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-[2rem] p-6 shadow-2xl backdrop-blur">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800 rounded-2xl p-5">
                <p className="text-slate-400">Flights Managed</p>
                <h2 className="text-4xl font-bold mt-2">120+</h2>
              </div>
              <div className="bg-slate-800 rounded-2xl p-5">
                <p className="text-slate-400">Ramp Agents</p>
                <h2 className="text-4xl font-bold mt-2">80</h2>
              </div>
              <div className="bg-slate-800 rounded-2xl p-5">
                <p className="text-slate-400">Dispatch Accuracy</p>
                <h2 className="text-4xl font-bold mt-2">98%</h2>
              </div>
              <div className="bg-slate-800 rounded-2xl p-5">
                <p className="text-slate-400">Airports</p>
                <h2 className="text-4xl font-bold mt-2">5</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <section id="features" className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 rounded-3xl p-5 shadow-xl border border-slate-800">
              <p className="text-slate-400">Active Flights</p>
              <h2 className="text-4xl font-bold mt-2">28</h2>
            </div>
            <div className="bg-slate-900 rounded-3xl p-5 shadow-xl border border-slate-800">
              <p className="text-slate-400">Agents On Duty</p>
              <h2 className="text-4xl font-bold mt-2">42</h2>
            </div>
            <div className="bg-slate-900 rounded-3xl p-5 shadow-xl border border-slate-800">
              <p className="text-slate-400">Delayed Flights</p>
              <h2 className="text-4xl font-bold mt-2">3</h2>
            </div>
            <div className="bg-slate-900 rounded-3xl p-5 shadow-xl border border-slate-800">
              <p className="text-slate-400">Current Shift</p>
              <h2 className="text-2xl font-bold mt-2">15H - 00H</h2>
            </div>
          </section>

          <section id="operations" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Live Flights</h2>
                <input type="text" placeholder="Search flight" className="bg-slate-800 rounded-xl px-4 py-2 outline-none" />
              </div>
              <div className="space-y-4">
                {flights.map((flight, index) => (
                  <div key={index} className="bg-slate-800 rounded-2xl p-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">{flight.code}</h3>
                      <p className="text-slate-400">Gate {flight.gate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{flight.status}</p>
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

          <section className="bg-gradient-to-r from-blue-700 to-slate-900 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h2 className="text-3xl font-bold">Airport Operations in Real Time</h2>
                <p className="text-slate-200 mt-2 max-w-2xl">
                  Manage dispatch teams, track flights, monitor delays, and coordinate airport ramp operations from a single platform.
                </p>
              </div>
              <button className="bg-white text-slate-900 px-6 py-4 rounded-2xl font-bold hover:scale-105 transition">
                Launch Operations
              </button>
            </div>
          </section>

          <footer id="contact" className="mt-12 border-t border-slate-800 pt-8 pb-4 text-center text-slate-400">
            <h3 className="text-2xl font-bold text-white">RampLink</h3>
            <p className="mt-2">Airport Dispatch & Ground Handling Platform</p>
            <p className="mt-4 text-sm">Designed for modern airport ramp operations in Africa.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
