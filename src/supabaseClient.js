import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mlicaoqvisolsryjskbz.supabase.co";
const supabaseAnonKey = "sb_publishable_03MVIr6SWCu8Tro52Xzucw_wxc3TtjW";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
