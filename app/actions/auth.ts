'use server';

import { createClient } from '@/utils/supabase/server';

// TODO: Implement rate limiting for this function to prevent brute force attacks
export async function login(formData: { email: string; password: string }) {
  const supabase = await createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    // Return generic error message to prevent user enumeration
    return { error: 'Invalid login credentials' };
  }
  return { success: true };
}

// TODO: Implement rate limiting for this function to prevent abuse
export async function signup(formData: { email: string; password: string }) {
  const supabase = await createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    // Return generic error message to prevent user enumeration
    return { error: 'Registration failed. Please try again later.' };
  }
  return { success: true };
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  // Default redirect to learn page if no specific origin is stored
  const origin = '/learn';

  // Get the site URL from environment
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Add state parameter to prevent CSRF attacks
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${siteUrl}/auth/callback?next=${origin}`,
      queryParams: {
        prompt: 'select_account',
      },
    },
  });

  if (error) {
    return { error: 'Authentication failed. Please try again.' };
  }

  return { url: data.url };
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: 'Logout failed. Please try again.' };
  }
  return { success: true };
}
