import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://gtdxrdexifmdfoiwmkte.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0ZHhyZGV4aWZtZGZvaXdta3RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEyMzgwMjYsImV4cCI6MjAxNjgxNDAyNn0.frDH11JaFhsM33EVYDlQZnJhsQ9p9IJISaoDpP_PDfQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    }
});

export { supabase };