import React from 'react';

interface LandingProps {
  onGetStarted: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">🌍 Find Your Next Home</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-95">
            40 global cities. 17 criteria. Data-driven decisions.
          </p>
          <p className="text-lg mb-10 opacity-90 max-w-2xl mx-auto">
            Overwhelmed by relocation options? Relocation Matrix analyzes your preferences across 40 cities to find YOUR perfect home.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:bg-blue-50 transition shadow-lg"
          >
            Start Exploring
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-900">Why Relocation Matrix?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Data-Driven</h3>
              <p className="text-slate-600">
                Compare cities across 17 criteria: safety, cost, career opportunities, visa ease, and more.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Personalized</h3>
              <p className="text-slate-600">
                Adjust weights to match YOUR priorities. What matters to you? Safety? Career? Cost of living?
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Private</h3>
              <p className="text-slate-600">
                No ads. No tracking. No data collection. Your preferences stay with you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-900">How It Works</h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="text-3xl font-bold text-blue-600">1</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Choose Your Weights</h3>
                <p className="text-slate-600">Adjust 17 criteria to reflect your priorities: career, cost, climate, visa ease, and more.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="text-3xl font-bold text-blue-600">2</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Get Rankings</h3>
                <p className="text-slate-600">Instantly see 40 cities ranked by your preferences. Match percentage shows fit.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="text-3xl font-bold text-blue-600">3</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Compare & Share</h3>
                <p className="text-slate-600">Compare top cities side-by-side. Save profiles. Share with friends.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900">40 Global Cities</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            From Singapore to Tirana. Tech hubs, cost-of-living paradises, and quality-of-life champions.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['🇸🇬 Singapore', '🇺🇸 Austin', '🇺🇸 Seattle', '🇦🇺 Sydney', '🇨🇦 Toronto',
              '🇮🇪 Dublin', '🇬🇧 London', '🇳🇱 Amsterdam', '🇸🇪 Stockholm', '🇩🇪 Berlin',
              '🇪🇸 Barcelona', '🇸🇪 Stockholm', '🇩🇰 Copenhagen', '🇨🇭 Zurich', '🇲🇽 Mexico City',
              '🇵🇹 Lisbon', '🇨🇿 Prague', '🇦🇷 Buenos Aires', '🇨🇱 Santiago', '+ 20 more'].map((city, idx) => (
              <div key={idx} className="bg-white p-3 rounded-lg text-center shadow-sm text-sm font-medium text-slate-900">
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Next Home?</h2>
          <p className="text-lg mb-8 opacity-95">
            It takes 2 minutes to compare 40 cities. Start exploring now.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:bg-blue-50 transition shadow-lg"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="mb-2">Made with 🌍 by makers who dream of relocating</p>
          <p className="text-sm">
            <a href="#" className="hover:text-white">Privacy</a> • 
            <a href="#" className="hover:text-white"> Terms</a> • 
            <a href="#" className="hover:text-white"> GitHub</a>
          </p>
        </div>
      </footer>
    </div>
  );
};
