'use server';

import { createClient } from '@/utils/supabase/server';

export async function login(formData: { email: string; password: string }) {
  const supabase = await createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    // Return the error instead of throwing it.
    return { error: error.message };
  }
  return { success: true };
}

export async function signup(formData: { email: string; password: string }) {
  const supabase = await createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error.message };
  }
  return { success: true };
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  // Default redirect to learn page if no specific origin is stored
  const origin = '/learn';

  // Get the site URL from environment
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${siteUrl}/auth/callback?next=${origin}`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { url: data.url };
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }
  return { success: true };
}
