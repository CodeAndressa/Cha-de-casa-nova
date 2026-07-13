import { r as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-D3nCsqFF.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as Label, n as Card, r as Input, t as Button } from "./card-C7yB23SN.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-B-z3u5mY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) navigate({ to: "/admin" });
		});
	}, [navigate]);
	const translateError = (msg) => {
		if (/Invalid login credentials/i.test(msg)) return "E-mail ou senha incorretos.";
		if (/Email not confirmed/i.test(msg)) return "E-mail ainda não confirmado. Verifique sua caixa de entrada.";
		if (/User already registered/i.test(msg)) return "Este e-mail já está cadastrado. Faça login.";
		if (/Password should be at least/i.test(msg)) return "A senha deve ter no mínimo 6 caracteres.";
		if (/rate limit/i.test(msg)) return "Muitas tentativas. Aguarde alguns instantes.";
		return msg;
	};
	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (mode === "signin") {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
				toast.success("Bem-vindo!");
				navigate({ to: "/admin" });
			} else if (mode === "signup") {
				const { data, error } = await supabase.auth.signUp({
					email,
					password,
					options: { emailRedirectTo: `${window.location.origin}/admin` }
				});
				if (error) throw error;
				if (data.session) {
					toast.success("Conta criada! Redirecionando…");
					navigate({ to: "/admin" });
				} else {
					toast.success("Conta criada! Você já pode entrar.");
					setMode("signin");
				}
			} else {
				const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
				if (error) throw error;
				toast.success("Enviamos um link de redefinição para o seu e-mail.");
				setMode("signin");
			}
		} catch (err) {
			toast.error(translateError(err.message));
		} finally {
			setLoading(false);
		}
	};
	const title = mode === "signin" ? "Entrar" : mode === "signup" ? "Criar conta" : "Recuperar senha";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "w-full max-w-sm rounded-3xl p-8 shadow-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground",
					children: "← Voltar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-3xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: mode === "signin" ? "Entre com sua conta de administrador" : mode === "signup" ? "A primeira conta criada se torna administradora" : "Enviaremos um link para redefinir sua senha"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "mt-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							children: "E-mail"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "email",
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							required: true
						})] }),
						mode !== "forgot" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "pwd",
								children: "Senha"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "pwd",
								type: "password",
								minLength: 6,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								required: true
							}),
							mode === "signin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "mt-2 text-xs text-muted-foreground hover:text-foreground",
								onClick: () => setMode("forgot"),
								children: "Esqueci minha senha"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full rounded-full",
							disabled: loading,
							children: loading ? "Aguarde…" : title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1 text-center",
							children: [mode !== "signin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-sm text-muted-foreground hover:text-foreground",
								onClick: () => setMode("signin"),
								children: "Já tenho conta — entrar"
							}), mode !== "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-sm text-muted-foreground hover:text-foreground",
								onClick: () => setMode("signup"),
								children: "Criar conta de administrador"
							})]
						})
					]
				})
			]
		})
	});
}
//#endregion
export { AuthPage as component };
