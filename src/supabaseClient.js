import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "DÁN_PROJECT_URL_SUPABASE_VÀO_ĐÂY";
const supabaseAnonKey = "DÁN_ANON_PUBLIC_KEY_VÀO_ĐÂY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
