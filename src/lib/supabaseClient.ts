import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uglnyprwfmmkgaitcfhj.supabase.co';
const supabaseAnonKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnbG55cHJ3Zm1ta2dhaXRjZmhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxODc0OTYsImV4cCI6MjA3OTc2MzQ5Nn0.agj9nR-HJKril0DryQM7wz9xbEpEVZaRzsHpUZV2iVs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
