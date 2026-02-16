import React, { useEffect } from 'react';
import { useProfiles, Profile } from '../../hooks/useProfiles';

interface MyProfilesProps {
  userId: string | null;
  onSelectProfile: (profile: Profile) => void;
  onLoadProfile: (weights: Record<string, number>, cities: string[], salary: number, nationality?: string) => void;
}

export const MyProfiles: React.FC<MyProfilesProps> = ({ userId, onSelectProfile, onLoadProfile }) => {
  const { profiles, fetchProfiles, deleteProfile, createShareLink } = useProfiles(userId);
  const [shareLinks, setShareLinks] = React.useState<Record<string, string>>({});
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchProfiles();
    }
  }, [userId, fetchProfiles]);

  const handleShareClick = async (profileId: string) => {
    const link = await createShareLink(profileId);
    if (link) {
      setShareLinks(prev => ({ ...prev, [profileId]: link }));
      navigator.clipboard.writeText(link);
      setCopiedId(profileId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  if (!userId) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <p className="text-slate-700">Sign in to save and manage your profiles</p>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="bg-slate-50 border border-dashed border-slate-300 rounded-lg p-12 text-center">
        <p className="text-slate-600 mb-4">No saved profiles yet</p>
        <p className="text-sm text-slate-500">Adjust your weights and click "Save Profile" to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-900">💾 My Profiles ({profiles.length})</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profiles.map(profile => (
          <div
            key={profile.id}
            className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-slate-900">{profile.name}</h4>
                {profile.description && (
                  <p className="text-sm text-slate-600">{profile.description}</p>
                )}
              </div>
              <span className="text-xs text-slate-500">
                {new Date(profile.created_at).toLocaleDateString()}
              </span>
            </div>

            <div className="mb-3 space-y-1">
              <p className="text-xs text-slate-600">
                🌐 Nationality: {profile.nationality || 'US'}
              </p>
              <p className="text-xs text-slate-600">
                💰 Salary: ${profile.salary_usd.toLocaleString()}
              </p>
              <p className="text-xs text-slate-600">
                🏙️ Cities: {profile.cities.length} selected
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  onSelectProfile(profile);
                  onLoadProfile(profile.weights, profile.cities, profile.salary_usd, profile.nationality);
                }}
                className="flex-1 px-3 py-2 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Load
              </button>
              <button
                onClick={() => handleShareClick(profile.id)}
                className="flex-1 px-3 py-2 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition"
                title="Share profile link"
              >
                {copiedId === profile.id ? '✓ Copied' : 'Share'}
              </button>
              <button
                onClick={() => deleteProfile(profile.id)}
                className="px-3 py-2 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                title="Delete profile"
              >
                ✕
              </button>
            </div>

            {shareLinks[profile.id] && (
              <div className="mt-3 p-2 bg-green-50 rounded text-xs text-green-700">
                Share: {shareLinks[profile.id]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
