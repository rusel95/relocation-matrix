import { useCallback, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface Profile {
  id: string;
  name: string;
  description?: string;
  weights: Record<string, number>;
  cities: string[];
  salary_usd: number;
  nationality?: string;
  created_at: string;
  updated_at: string;
}

interface UseProfilesState {
  profiles: Profile[];
  isLoading: boolean;
  error: string | null;
}

export const useProfiles = (userId: string | null) => {
  const [state, setState] = useState<UseProfilesState>({
    profiles: [],
    isLoading: false,
    error: null,
  });

  // Fetch all profiles for user
  const fetchProfiles = useCallback(async () => {
    if (!userId) return;
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setState(prev => ({
        ...prev,
        profiles: data || [],
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch profiles',
        isLoading: false,
      }));
    }
  }, [userId]);

  // Create new profile
  const createProfile = useCallback(
    async (name: string, weights: Record<string, number>, cities: string[], salary_usd: number, nationality?: string) => {
      if (!userId) return;
      try {
        const { data, error } = await supabase
          .from('profiles')
          .insert([
            {
              user_id: userId,
              name,
              weights,
              cities,
              salary_usd,
              nationality,
            },
          ])
          .select()
          .single();

        if (error) throw error;
        setState(prev => ({
          ...prev,
          profiles: [data, ...prev.profiles],
        }));
        return data;
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : 'Failed to create profile',
        }));
      }
    },
    [userId]
  );

  // Update profile
  const updateProfile = useCallback(
    async (id: string, updates: Partial<Profile>) => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        setState(prev => ({
          ...prev,
          profiles: prev.profiles.map(p => (p.id === id ? data : p)),
        }));
        return data;
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : 'Failed to update profile',
        }));
      }
    },
    []
  );

  // Delete profile
  const deleteProfile = useCallback(async (id: string) => {
    try {
      const { error } = await supabase.from('profiles').delete().eq('id', id);

      if (error) throw error;
      setState(prev => ({
        ...prev,
        profiles: prev.profiles.filter(p => p.id !== id),
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to delete profile',
      }));
    }
  }, []);

  // Create share link
  const createShareLink = useCallback(async (profileId: string) => {
    try {
      const shareToken = `share_${Math.random().toString(36).substring(2, 9)}`;
      const { data, error } = await supabase
        .from('shared_profiles')
        .insert([
          {
            profile_id: profileId,
            share_token: shareToken,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return `${window.location.origin}/shared/${shareToken}`;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to create share link',
      }));
    }
  }, []);

  // Fetch shared profile (no auth needed)
  const fetchSharedProfile = useCallback(async (shareToken: string) => {
    try {
      const { data, error } = await supabase
        .from('shared_profiles')
        .select('profile_id, profiles(*)')
        .eq('share_token', shareToken)
        .single();

      if (error) throw error;
      return data.profiles;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch shared profile',
      }));
    }
  }, []);

  return {
    ...state,
    fetchProfiles,
    createProfile,
    updateProfile,
    deleteProfile,
    createShareLink,
    fetchSharedProfile,
  };
};
