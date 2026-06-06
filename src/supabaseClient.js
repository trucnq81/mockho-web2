import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://abcxyz.supabase.co";
const supabaseAnonKey = "eyJhbGci...";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
