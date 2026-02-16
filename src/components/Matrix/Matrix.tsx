import React, { useState, useMemo } from 'react';
import citiesData from '../../data/cities.json';
import { SaveProfile } from '../Profiles/SaveProfile';
import { MyProfiles } from '../Profiles/MyProfiles';
import { Profile } from '../../hooks/useProfiles';

interface Weights {
  [key: string]: number;
}

const DEFAULT_WEIGHTS: Weights = {
  safety: 5,
  quality_of_life: 5,
  education: 3,
  climate: 3,
  tech_hub: 5,
  passport_strength: 3,
  citizenship_time: 2,
  cost_of_living: 5,
  healthcare: 4,
  tax_rate: 4,
  tech_salaries: 10,
  expat_community: 3,
  economic_future: 4,
  purchasing_power: 10,
  language_barrier: 10,
  career_opportunities: 10,
  visa_ease: 10,
};

const SUPER_WEIGHTED = ['purchasing_power', 'language_barrier', 'career_opportunities', 'visa_ease'];

// Nationality-specific multipliers for criteria
const NATIONALITY_MULTIPLIERS: Record<string, Record<string, number>> = {
  US: {
    language_barrier: 0.7, // English-speaking advantage
    passport_strength: 0.9, // Very strong passport, but less critical
    visa_ease: 0.85, // Strong US passport for visa-free travel
    tax_rate: 1.3, // FATCA makes taxes worse abroad
    expat_community: 0.8, // Large US expat communities everywhere
  },
  UA: {
    language_barrier: 1.1, // Ukrainian/Russian advantage in Eastern Europe only
    passport_strength: 1.2, // Weaker passport, more relevant
    visa_ease: 1.3, // Limited visa-free access
    tax_rate: 0.9, // Tax residency benefits if relocate
    expat_community: 1.1, // Smaller communities outside Ukraine
  },
  GB: {
    language_barrier: 0.6, // English speaker - big advantage
    passport_strength: 0.85, // Very strong passport
    visa_ease: 0.8, // Good visa access
    expat_community: 0.7, // Large British expat networks
  },
  DE: {
    language_barrier: 1.0, // German helps in Germany, not globally
    passport_strength: 0.85,
    visa_ease: 0.85,
  },
};

const DEFAULT_NATIONALITY = 'US';
const NATIONALITIES = ['US', 'UA', 'GB', 'DE', 'CA', 'AU', 'Other'];

interface City {
  rank: number;
  name: string;
  country: string;
  emoji: string;
  score: number;
  matchPercent: number;
  criteria: Weights;
}

interface MatrixProps {
  userId: string | null;
}

export const Matrix: React.FC<MatrixProps> = ({ userId }) => {
  const [weights, setWeights] = useState<Weights>(DEFAULT_WEIGHTS);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [salary, setSalary] = useState(100000);
  const [nationality, setNationality] = useState<string>(DEFAULT_NATIONALITY);
  const [showProfiles, setShowProfiles] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Get nationality-specific multiplier
  const getNationalityMultiplier = (criterion: string): number => {
    return NATIONALITY_MULTIPLIERS[nationality]?.[criterion] ?? 1.0;
  };

  // Calculate dynamic scores
  const rankedCities = useMemo(() => {
    return (citiesData as City[])
      .map(city => {
        let score = 0;
        const details: { criteria: string; score: number; weight: number; nationalityMultiplier: number }[] = [];

        Object.entries(weights).forEach(([key, weight]) => {
          const cityCriteriaScore = city.criteria[key as keyof typeof city.criteria] || 5;
          const isSuper = SUPER_WEIGHTED.includes(key);
          const superMultiplier = isSuper ? 10 : 1;
          const nationalityMult = getNationalityMultiplier(key);
          const finalScore = cityCriteriaScore * nationalityMult;
          const contributedScore = (finalScore * weight * superMultiplier) / 10;
          
          score += contributedScore;
          details.push({
            criteria: key,
            score: finalScore,
            weight,
            nationalityMultiplier: nationalityMult,
          });
        });

        const maxScore = 100 * 10; // Rough estimate
        const matchPercent = Math.round((score / maxScore) * 100);

        return {
          ...city,
          score: Math.round(score),
          matchPercent: Math.max(0, Math.min(100, matchPercent)),
          details,
        };
      })
      .sort((a, b) => b.score - a.score);
  }, [weights, nationality]);

  const handleWeightChange = (key: string, value: number) => {
    setWeights(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCityToggle = (cityName: string) => {
    setSelectedCities(prev =>
      prev.includes(cityName) ? prev.filter(c => c !== cityName) : [...prev, cityName]
    );
  };

  const isSuperWeighted = (key: string) => SUPER_WEIGHTED.includes(key);

  const handleLoadProfile = (newWeights: Record<string, number>, newCities: string[], newSalary: number, newNationality?: string) => {
    setWeights(newWeights);
    setSelectedCities(newCities);
    setSalary(newSalary);
    if (newNationality) setNationality(newNationality);
    setShowProfiles(false);
  };

  const handleProfileSaved = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">🌍 Relocation Matrix</h1>
            <p className="text-lg text-slate-600 mt-2">40 locations • 17 criteria • Data-driven relocation</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowProfiles(!showProfiles)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                showProfiles
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
              }`}
            >
              📂 My Profiles
            </button>
            <SaveProfile
              userId={userId}
              weights={weights}
              cities={selectedCities}
              salary={salary}
              nationality={nationality}
              onSaved={handleProfileSaved}
            />
          </div>
        </div>

        {/* My Profiles Section */}
        {showProfiles && userId && (
          <div key={refreshKey} className="mb-8 bg-white rounded-lg shadow-lg p-6">
            <MyProfiles
              userId={userId}
              onSelectProfile={() => {}}
              onLoadProfile={handleLoadProfile}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar: Weights */}
          <div className="lg:col-span-1 space-y-6">
            {/* Nationality Selector */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-3">🌐 Your Nationality</h2>
              <select
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {NATIONALITIES.map(nat => (
                  <option key={nat} value={nat}>{nat}</option>
                ))}
              </select>
              <p className="text-xs text-slate-500 mt-2">
                Criteria are adjusted based on your nationality (passport strength, visa ease, language, taxes, etc.)
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">⭐ Super-Weighted (×10)</h2>
              <div className="space-y-4">
                {Object.entries(weights)
                  .filter(([key]) => isSuperWeighted(key))
                  .map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-slate-700 capitalize mb-2">
                        {key.replace(/_/g, ' ')}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={value}
                        onChange={(e) => handleWeightChange(key, parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-xs text-slate-500 mt-1">{value}/10</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">⚖️ Standard Criteria</h2>
              <div className="space-y-3">
                {Object.entries(weights)
                  .filter(([key]) => !isSuperWeighted(key))
                  .map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-slate-700 capitalize mb-1">
                        {key.replace(/_/g, ' ')}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={value}
                        onChange={(e) => handleWeightChange(key, parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-xs text-slate-500">{value}/5</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Salary Input */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">💰 Salary (USD)</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Main: Rankings */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                      <th className="px-6 py-4 text-left text-sm font-semibold">Rank</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">City</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold">Score</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold">Match</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">Compare</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {rankedCities.map((city) => (
                      <tr
                        key={city.name}
                        className={`transition-colors ${
                          selectedCities.includes(city.name) ? 'bg-blue-50' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">#{city.rank}</td>
                        <td className="px-6 py-4 text-sm font-medium">
                          <span className="text-2xl mr-2">{city.emoji}</span>
                          <span className="text-slate-900">{city.name}</span>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-right text-slate-900">
                          {city.score}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${city.matchPercent}%` }}
                              />
                            </div>
                            <span className="text-slate-900">{city.matchPercent}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="checkbox"
                            checked={selectedCities.includes(city.name)}
                            onChange={() => handleCityToggle(city.name)}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Comparison View */}
            {selectedCities.length > 0 && (
              <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Comparing {selectedCities.length} cities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rankedCities
                    .filter(city => selectedCities.includes(city.name))
                    .map(city => (
                      <div key={city.name} className="border border-slate-300 rounded-lg p-4">
                        <h4 className="text-lg font-semibold mb-3">
                          {city.emoji} {city.name}
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-600">Overall Score:</span>
                            <span className="text-sm font-semibold text-slate-900">{city.score}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-600">Match:</span>
                            <span className="text-sm font-semibold text-green-600">{city.matchPercent}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
