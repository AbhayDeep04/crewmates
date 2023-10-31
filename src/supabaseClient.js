import { createClient } from '@supabase/supabase-js';

// To be more secure: .env file. 
const supabaseURL = "https://mdmcubhwpiyplgifvpzq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kbWN1Ymh3cGl5cGxnaWZ2cHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3MzIwNDQsImV4cCI6MjAxNDMwODA0NH0.6IiAFUyakrxsdwN4lslvRWSizeWvVDOzzXyq07Z-OCk";

export const supabase = createClient(supabaseURL, supabaseAnonKey);
