import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://elpjovjxuelypkhyevet.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVscGpvdmp4dWVseXBraHlldmV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3Mjk3MzAsImV4cCI6MjA3MjMwNTczMH0.gtwdHXJAu_ZtOiEE096Hh9-xKjGRCh1SFZqK4voSl-E';

console.log('Supabase Environment Check:');
console.log('VITE_SUPABASE_URL:', supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'MISSING');
console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'MISSING');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set' : 'Missing');
  console.warn('Using fallback Supabase configuration');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Test connection
supabase.from('schools').select('count', { count: 'exact', head: true })
  .then(({ error, count }) => {
    if (error) {
      console.error('Supabase connection test failed:', error);
    } else {
      console.log('✅ Supabase connection successful. Schools table accessible.');
    }
  })
  .catch(err => {
    console.error('❌ Supabase connection failed:', err);
  });