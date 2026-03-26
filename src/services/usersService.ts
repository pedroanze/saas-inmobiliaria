import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/supabase';

export type UserProfile = Database['public']['Tables']['users']['Row'];
export type CompanyProfile = Database['public']['Tables']['companies']['Row'];

export type FullUserProfile = UserProfile & {
  companies: CompanyProfile | null;
};

export const usersService = {
  /**
   * Obtiene el perfil combinado del usuario actual y su compañía asociada
   */
  async getCurrentUserProfile(): Promise<FullUserProfile | null> {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user.id;
    
    if (!userId) return null;

    const { data, error } = await supabase
      .from('users')
      .select('*, companies(*)')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data as unknown as FullUserProfile;
  }
};
