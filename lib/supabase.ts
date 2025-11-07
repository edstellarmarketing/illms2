import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://npgmkbmebansnxltkkzk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wZ21rYm1lYmFuc254bHRra3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNjQxMjIsImV4cCI6MjA3Nzc0MDEyMn0.3OLCr7oasdosfgffKPblw_vea6NDclS4DnnktKrOAq8';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types
export type Student = {
  id: string;
  email: string;
  name: string;
  created_at: string;
};

export type Resource = {
  id: string;
  title: string;
  description: string;
  file_url: string;
  created_at: string;
  updated_at: string;
};
