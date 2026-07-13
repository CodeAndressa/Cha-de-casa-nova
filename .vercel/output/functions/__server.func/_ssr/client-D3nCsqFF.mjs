import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-D3nCsqFF.js
typeof process !== "undefined" && process.env;
var SUPABASE_URL = "https://gzvscpxosenqbdeggxwt.supabase.co";
var SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6dnNjcHhvc2VucWJkZWdneHd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MDExNDEsImV4cCI6MjA5NzM3NzE0MX0.0iHxiKeCAUd5cWQfW2Xqn7thHNgAQLwGrpA34jeBUV0";
var isSupabaseConfigured = Boolean(SUPABASE_PUBLISHABLE_KEY);
var supabaseConfigErrorMessage = (() => {
	const missing = [...[], ...[]];
	return missing.length > 0 ? `Missing Supabase environment variable(s): ${missing.join(", ")}. Configure them in your hosting provider.` : null;
})();
function createSupabaseClient() {
	if (!isSupabaseConfigured) {
		console.error(`[Supabase] ${supabaseConfigErrorMessage}`);
		throw new Error(supabaseConfigErrorMessage ?? "Missing Supabase environment variables.");
	}
	return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, { auth: {
		storage: typeof window !== "undefined" ? localStorage : void 0,
		persistSession: true,
		autoRefreshToken: true
	} });
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as n, isSupabaseConfigured as t };
