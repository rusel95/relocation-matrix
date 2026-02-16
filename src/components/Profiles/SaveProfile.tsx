import React, { useState } from 'react';
import { useProfiles } from '../../hooks/useProfiles';

interface SaveProfileProps {
  userId: string | null;
  weights: Record<string, number>;
  cities: string[];
  salary: number;
  nationality: string;
  onSaved: () => void;
}

export const SaveProfile: React.FC<SaveProfileProps> = ({
  userId,
  weights,
  cities,
  salary,
  nationality,
  onSaved,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { createProfile } = useProfiles(userId);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !name.trim()) return;

    setIsLoading(true);
    try {
      await createProfile(name, weights, cities, salary, nationality);
      setName('');
      setDescription('');
      setShowModal(false);
      onSaved();
    } finally {
      setIsLoading(false);
    }
  };

  if (!userId) {
    return (
      <button
        disabled
        className="px-4 py-2 bg-slate-300 text-slate-500 rounded-lg cursor-not-allowed text-sm font-semibold"
        title="Sign in to save profiles"
      >
        Sign in to save
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold"
      >
        💾 Save Profile
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Save This Profile</h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Profile Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Tech Startup Life"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Description (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add notes about this profile..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={isLoading}
                  rows={3}
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-lg text-sm">
                <p className="text-slate-700">
                  <strong>Nationality:</strong> {nationality}
                </p>
                <p className="text-slate-700">
                  <strong>Salary:</strong> ${salary.toLocaleString()}/year
                </p>
                <p className="text-slate-700">
                  <strong>Cities:</strong> {cities.length} selected
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition font-medium"
                  disabled={isLoading || !name.trim()}
                >
                  {isLoading ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
