import { r as __toESM } from "../_runtime.mjs";
import { n as supabase, t as isSupabaseConfigured } from "./client-D3nCsqFF.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as Label, n as Card, r as Input, t as Button } from "./card-C7yB23SN.mjs";
import { C as ArrowLeft, S as Calendar, _ as Copy, c as MessageCircle, d as Leaf, g as Flame, i as Ruler, l as MapPin, m as Heart, r as ShoppingCart, s as MessageSquare, v as Clock, x as Check } from "../_libs/lucide-react.mjs";
import { a as DialogFooter, d as formatBRL, i as DialogDescription, l as Textarea, n as Dialog, o as DialogHeader, r as DialogContent, s as DialogTitle } from "./categories-BtOHNY4l.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BGc4OByx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var _12FD544F_BE1F_4C6D_8AEC_BD34C9294A53_default = "/assets/12FD544F-BE1F-4C6D-8AEC-BD34C9294A53-C0tIgMSi.jpg";
var _14CA1994_21E3_40CF_956A_51232C075EC2_default = "/assets/14CA1994-21E3-40CF-956A-51232C075EC2-DNWU__ct.jpg";
var _1A1EB732_310C_415C_8D01_8105D4F02AE5_default = "/assets/1A1EB732-310C-415C-8D01-8105D4F02AE5-GprFMWDz.jpg";
var _20240809_090154_default = "/assets/20240809_090154-BiULeYmn.jpg";
var _20240811_110012_default = "/assets/20240811_110012-CYTL5RAF.jpg";
var _20241005_175020_default = "/assets/20241005_175020-B30zOPuU.jpg";
var _20241201_173708_default = "/assets/20241201_173708-BmtpdVgF.webp";
var _733E53A6_D393_4D14_9F0E_143A276B5CE4_default = "/assets/733E53A6-D393-4D14-9F0E-143A276B5CE4-jKmkQ5z1.jpg";
var B59A4D0F_6986_4B96_AEFC_EDCBB26A6B60_default = "/assets/B59A4D0F-6986-4B96-AEFC-EDCBB26A6B60-DEROOhoG.jpg";
var IMG_1286_default = "/assets/IMG_1286-CHjuENVq.webp";
var IMG_2450_default = "/assets/IMG_2450-CF42fuo5.webp";
var IMG_2453_default = "/assets/IMG_2453-ClVygalW.jpeg";
var IMG_6871_default = "/assets/IMG_6871-DjXkyvf6.jpg";
var IMG_9895_default = "/assets/IMG_9895-BkTgkm1a.jpg";
var f47e0bb9_5c82_4f06_89c3_ab766e246c15_default = "/assets/f47e0bb9-5c82-4f06-89c3-ab766e246c15-Bsj-xFlQ.jpg";
function useCountdown(target) {
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		const i = setInterval(() => setNow(Date.now()), 1e3);
		return () => clearInterval(i);
	}, []);
	if (!target) return null;
	const diff = Math.max(0, target.getTime() - now);
	return {
		days: Math.floor(diff / 864e5),
		hours: Math.floor(diff % 864e5 / 36e5),
		minutes: Math.floor(diff % 36e5 / 6e4),
		seconds: Math.floor(diff % 6e4 / 1e3),
		finished: diff === 0
	};
}
var PIX_TIERS = [
	{
		id: "sofazinho",
		icon: ShoppingCart,
		value: 100,
		label: "Pé do sofá",
		description: "Contribua com parte do sofá que queremos"
	},
	{
		id: "sofamedio",
		icon: Ruler,
		value: 300,
		label: "Encosto sofá",
		description: "Uma boa contribuição pro nosso sofá"
	},
	{
		id: "sofagande",
		icon: Leaf,
		value: 500,
		label: "Sofá completo",
		description: "Você vai estar na gente todos os dias!"
	},
	{
		id: "sofaplus",
		icon: Flame,
		value: 800,
		label: "Sofá + mesa",
		description: "Sofá E mesa de centro pra completar"
	},
	{
		id: "sofa360",
		icon: Heart,
		value: 1200,
		label: "Décor completa",
		description: "Sofá, mesa, luminária — o set COMPLETO"
	}
];
var TIER_GRADIENTS = [
	"from-[oklch(0.38_0.13_152)] to-[oklch(0.24_0.09_158)]",
	"from-[oklch(0.34_0.11_145)] to-[oklch(0.22_0.08_152)]",
	"from-[oklch(0.43_0.14_148)] to-[oklch(0.28_0.10_155)]",
	"from-[oklch(0.31_0.10_138)] to-[oklch(0.20_0.08_150)]",
	"from-[oklch(0.26_0.13_157)] to-[oklch(0.17_0.11_163)]"
];
var OPEN_HOUSE_DATE = "2026-08-08";
var OPEN_HOUSE_TIME = "15:00";
var OPEN_HOUSE_FALLBACK_TEXT = "Casa aberta para celebrar o novo lar, receber pessoas queridas e brindar essa fase com carinho.";
var localBackgroundPhotoUrls = Object.values([
	_12FD544F_BE1F_4C6D_8AEC_BD34C9294A53_default,
	_14CA1994_21E3_40CF_956A_51232C075EC2_default,
	_1A1EB732_310C_415C_8D01_8105D4F02AE5_default,
	_20240809_090154_default,
	_20240811_110012_default,
	_20241005_175020_default,
	_20241201_173708_default,
	_733E53A6_D393_4D14_9F0E_143A276B5CE4_default,
	B59A4D0F_6986_4B96_AEFC_EDCBB26A6B60_default,
	IMG_1286_default,
	IMG_2450_default,
	IMG_2453_default,
	IMG_6871_default,
	IMG_9895_default,
	f47e0bb9_5c82_4f06_89c3_ab766e246c15_default
]);
function PublicPage() {
	useQueryClient();
	const { data: event } = useQuery({
		queryKey: ["event-settings"],
		queryFn: async () => {
			const { data, error } = await supabase.from("event_settings").select("*").limit(1).maybeSingle();
			if (error) {
				console.warn("[public-page] event_settings query failed", error);
				return null;
			}
			return data;
		},
		enabled: isSupabaseConfigured
	});
	const { data: gifts = [] } = useQuery({
		queryKey: ["gifts"],
		queryFn: async () => {
			const { data, error } = await supabase.from("gifts").select("*").order("sort_order").order("created_at");
			if (error) {
				console.warn("[public-page] gifts query failed", error);
				return [];
			}
			return data ?? [];
		},
		enabled: isSupabaseConfigured
	});
	const { data: photos = [] } = useQuery({
		queryKey: ["couple-photos"],
		queryFn: async () => {
			const { data, error } = await supabase.from("couple_photos").select("*").order("sort_order").order("created_at");
			if (error) {
				console.warn("[public-page] couple_photos query failed", error);
				return [];
			}
			return data ?? [];
		},
		enabled: isSupabaseConfigured
	});
	const [view, setView] = (0, import_react.useState)("hero");
	const cd = useCountdown((0, import_react.useMemo)(() => {
		const date = event?.event_date ?? OPEN_HOUSE_DATE;
		const time = event?.event_time ?? OPEN_HOUSE_TIME;
		return /* @__PURE__ */ new Date(date + "T" + time);
	}, [event]));
	const fullAddress = [
		event?.address,
		event?.complement,
		event?.city && event?.state ? `${event.city} - ${event.state}` : event?.city ?? event?.state
	].filter(Boolean).join(", ");
	const [rsvpOpen, setRsvpOpen] = (0, import_react.useState)(false);
	const [addressOpen, setAddressOpen] = (0, import_react.useState)(false);
	const [selectedTier, setSelectedTier] = (0, import_react.useState)(null);
	const pixSectionRef = (0, import_react.useRef)(null);
	const copyPix = async () => {
		if (!event?.pix_key) return;
		await navigator.clipboard.writeText(event.pix_key);
		if ("vibrate" in navigator) navigator.vibrate(50);
		toast.success("Chave Pix copiada!");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-screen overflow-hidden bg-[oklch(0.20_0.08_155)] text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingPhotoBackground, {
				photos,
				localPhotos: localBackgroundPhotoUrls,
				fallback: event?.cover_image_url || "/assets/cover-DELHT72B.jpg"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_top,oklch(0.30_0.10_148_/_0.45),transparent_50%),linear-gradient(to_bottom,transparent_55%,oklch(0.14_0.07_158_/_0.65))]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `relative z-10 flex h-full flex-col ${view !== "hero" ? "hidden" : ""}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-full w-full max-w-7xl flex-col px-4 py-3 sm:px-6 lg:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden shrink-0 items-center gap-0.5 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 shadow-soft backdrop-blur-xl md:flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mr-auto font-display text-xl tracking-wide text-white",
									children: "Chá de Casa Nova"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
									onClick: () => setView("contribuicoes"),
									icon: Heart,
									label: "Contribuições"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
									onClick: () => setView("recado"),
									icon: MessageSquare,
									label: "Recados"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
									onClick: () => setAddressOpen(true),
									icon: MapPin,
									label: "Endereço",
									disabled: !fullAddress
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
									href: event?.whatsapp_phone ? `https://wa.me/${event.whatsapp_phone.replace(/\D/g, "")}` : void 0,
									icon: MessageCircle,
									label: "WhatsApp",
									external: true,
									disabled: !event?.whatsapp_phone
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									className: "ml-2 rounded-xl px-4",
									onClick: () => setRsvpOpen(true),
									children: "Confirmar"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex md:hidden shrink-0 items-center justify-between gap-1 rounded-2xl border border-white/15 bg-white/10 px-2 py-3 shadow-soft backdrop-blur-xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1 font-display text-xs tracking-wide text-white/40",
									children: "♡"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									onClick: () => setView("contribuicoes"),
									className: "h-10 w-10 text-white hover:bg-white/20 rounded-lg transition-all",
									title: "Contribuições",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									onClick: () => setView("recado"),
									className: "h-10 w-10 text-white hover:bg-white/20 rounded-lg transition-all",
									title: "Recados",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									onClick: () => setAddressOpen(true),
									disabled: !fullAddress,
									className: "h-10 w-10 text-white hover:bg-white/20 rounded-lg transition-all disabled:opacity-50",
									title: "Endereço",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5" })
								}),
								event?.whatsapp_phone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `https://wa.me/${event.whatsapp_phone.replace(/\D/g, "")}`,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex items-center justify-center h-10 w-10 text-white hover:bg-white/20 rounded-lg transition-all",
									title: "WhatsApp",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-5 w-5" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
							className: "flex flex-1 items-center justify-center px-1 py-6 sm:py-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-full max-w-md rounded-2xl border border-white/80 bg-white/92 px-6 py-7 shadow-premium backdrop-blur-xl sm:px-8 sm:py-8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-semibold uppercase tracking-[0.38em] text-terracotta",
										children: "Open house"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "mt-2 font-display text-5xl leading-tight text-forest sm:text-6xl",
										children: "Dani e Andressa"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm leading-6 text-foreground/68",
										children: event?.welcome_text ?? OPEN_HOUSE_FALLBACK_TEXT
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-foreground/70",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5 text-terracotta" }), "08 ago 2026"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5 text-terracotta" }), event?.event_time?.slice(0, 5) ?? OPEN_HOUSE_TIME]
											}),
											event?.city && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5 text-terracotta" }),
													event.city,
													event.state ? " - " + event.state : ""
												]
											})
										]
									}),
									cd && !cd.finished && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-5 grid grid-cols-4 gap-2",
										children: [
											{
												label: "dias",
												v: cd.days
											},
											{
												label: "horas",
												v: cd.hours
											},
											{
												label: "min",
												v: cd.minutes
											},
											{
												label: "seg",
												v: cd.seconds
											}
										].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-forest/20 bg-gradient-to-b from-white/90 to-secondary/60 px-2 py-3 text-center shadow-soft will-change-transform",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-display text-2xl sm:text-3xl font-semibold leading-none text-forest",
												children: String(x.v).padStart(2, "0")
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1.5 text-[9px] font-medium uppercase tracking-widest text-muted-foreground",
												children: x.label
											})]
										}, x.label))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-6",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											className: "h-12 w-full rounded-xl text-base sm:h-11 sm:text-sm",
											onClick: () => setRsvpOpen(true),
											children: "Confirmar presença"
										})
									})
								]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `relative z-10 flex h-full flex-col ${view !== "contribuicoes" ? "hidden" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubNav, {
					title: "Contribuições via PIX",
					onBack: () => setView("hero")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
							ref: pixSectionRef,
							className: "px-4 pt-8 pb-8 sm:px-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mx-auto max-w-5xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-white/45",
										children: "Contribuições PIX"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-2 text-center font-display text-4xl text-white sm:text-5xl",
										children: "Já temos tudo em casa"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-center text-sm text-white/55",
										children: "O que mais precisamos é de dinheiro para comprar o sofá dos nossos sonhos! Escolha uma categoria ou envie o valor que quiser"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
										children: PIX_TIERS.map((tier, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PixTierCard, {
											tier,
											index: i,
											onClick: () => setSelectedTier(tier)
										}, tier.id))
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
							className: "px-4 pb-16 sm:px-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/6 px-4 py-5 backdrop-blur-sm sm:px-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-4 text-xs font-medium uppercase tracking-[0.3em] text-white/40",
									children: "Ou contribua com qualquer valor"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-start gap-6 sm:flex-row sm:items-center",
									children: [event?.pix_qr_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: event.pix_qr_url,
										alt: "QR Code Pix",
										className: "h-32 w-32 rounded-xl border border-white/20 bg-white p-2 shrink-0"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "w-full space-y-4",
										children: [event?.pix_owner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] uppercase tracking-widest text-white/40",
											children: "Titular"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm font-medium text-white/80",
											children: event.pix_owner
										})] }), event?.pix_key && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] uppercase tracking-widest text-white/40",
											children: "Chave Pix"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
												className: "flex-1 truncate rounded-lg border border-white/15 bg-white/8 px-3 py-2.5 text-sm font-mono text-white/80",
												children: event.pix_key
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "icon",
												variant: "secondary",
												onClick: copyPix,
												"aria-label": "Copiar chave Pix",
												className: "rounded-lg h-11 w-11 shrink-0",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" })
											})]
										})] })]
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniFooter, { whatsappPhone: event?.whatsapp_phone })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `relative z-10 flex h-full flex-col ${view !== "recado" ? "hidden" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubNav, {
					title: "Deixe um recado",
					onBack: () => setView("hero")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecadoForm, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniFooter, { whatsappPhone: event?.whatsapp_phone })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PixTierDialog, {
				tier: selectedTier,
				pixKey: event?.pix_key ?? null,
				pixOwner: event?.pix_owner ?? null,
				onClose: () => setSelectedTier(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RsvpDialog, {
				open: rsvpOpen,
				onOpenChange: setRsvpOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressDialog, {
				open: addressOpen,
				onOpenChange: setAddressOpen,
				fullAddress
			})
		]
	});
}
function FloatingPhotoBackground({ photos, localPhotos, fallback }) {
	const remotePhotoUrls = photos.map((photo) => photo.image_url).filter(Boolean);
	const photoUrls = [...localPhotos, ...remotePhotoUrls];
	const sourceUrls = photoUrls.length > 0 ? photoUrls : Array.from({ length: 9 }, () => fallback);
	const itemCount = Math.min(9, Math.max(6, sourceUrls.length));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": "true",
		className: "pointer-events-none fixed inset-0 z-0 overflow-hidden",
		children: Array.from({ length: itemCount }, (_, index) => sourceUrls[index % sourceUrls.length]).map((url, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `floating-photo floating-photo-${index + 1}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: url,
				alt: "",
				className: "h-full w-full object-cover"
			})
		}, `${url}-${index}`))
	});
}
function SubNav({ title, onBack }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex shrink-0 items-center justify-between border-b border-white/10 bg-[oklch(0.20_0.08_155)]/95 px-4 py-3 sm:px-6 backdrop-blur-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: onBack,
				className: "flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "Voltar"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-xl text-white",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-16" })
		]
	});
}
function MiniFooter({ whatsappPhone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "px-4 pb-8 pt-4 text-center sm:px-6",
		children: [
			whatsappPhone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: `https://wa.me/${whatsappPhone.replace(/\D/g, "")}`,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-2.5 text-sm font-medium text-white/65 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/14 hover:text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), " Falar no WhatsApp"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-5 flex items-center justify-center gap-1.5 text-xs text-white/30",
				children: [
					"Feito com ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3 w-3 fill-white/30 text-white/30" }),
					" para o nosso novo lar"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 border-t border-white/8 pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium text-white/40",
					children: "Desenvolvido por Andressa Soares"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-1 max-w-xs text-[11px] leading-5 text-white/22",
					children: "Não achei nenhum site legal para lista de presentes do meu chá de casa nova — então desenvolvi o meu próprio."
				})]
			})
		]
	});
}
function NavButton({ href, onClick, icon: Icon, label, external, disabled }) {
	const cls = `flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/62 transition-all hover:bg-white/12 hover:text-white ${disabled ? "pointer-events-none opacity-35" : ""}`;
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "hidden md:inline",
		children: label
	})] });
	if (href) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		target: external ? "_blank" : void 0,
		rel: external ? "noopener noreferrer" : void 0,
		className: cls,
		children: inner
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		disabled,
		className: cls,
		children: inner
	});
}
function AddressDialog({ open, onOpenChange, fullAddress }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "w-11/12 rounded-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-display text-2xl",
					children: "Endereço"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Como chegar no nosso novo lar" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-2 text-sm leading-6 text-foreground/80",
					children: fullAddress
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "w-full rounded-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
						target: "_blank",
						rel: "noopener noreferrer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mr-2 h-4 w-4" }), " Abrir no Maps"]
					})
				}) })
			]
		})
	});
}
function PixTierCard({ tier, index, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "group relative overflow-hidden rounded-2xl border border-white/15 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-white/35 hover:shadow-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute inset-0 bg-gradient-to-br ${TIER_GRADIENTS[index]}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex h-full flex-col p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(tier.icon, { className: "h-9 w-9 text-white/75" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-4 inline-block w-fit rounded-full bg-white/18 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-white",
					children: formatBRL(tier.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-2 font-display text-xl leading-tight text-white",
					children: tier.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-[11px] leading-5 text-white/60",
					children: tier.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-white/50 transition-colors group-hover:text-white/90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3 w-3" }), "Contribuir"]
				})
			]
		})]
	});
}
function PixTierDialog({ tier, pixKey, pixOwner, onClose }) {
	const [name, setName] = (0, import_react.useState)("");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const copyKey = async () => {
		if (!pixKey) return;
		await navigator.clipboard.writeText(pixKey);
		setCopied(true);
		toast.success("Chave Pix copiada!");
		setTimeout(() => setCopied(false), 2500);
	};
	const mutation = useMutation({
		mutationFn: async () => {
			if (!isSupabaseConfigured) throw new Error("Supabase não configurado.");
			if (!tier) return;
			const { error } = await supabase.from("guest_messages").insert({
				name: name.trim(),
				message: `Contribuição Pix – ${tier.label} (${formatBRL(tier.value)})`
			});
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Que mimo! Obrigada de coração 💚");
			setName("");
			onClose();
		},
		onError: (e) => toast.error(e.message || "Não foi possível registrar")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: !!tier,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "w-11/12 rounded-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
					tier && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(tier.icon, { className: "h-10 w-10 text-forest" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "mt-3 font-display text-3xl",
						children: tier?.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-sm leading-6",
						children: tier?.description
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-forest/20 bg-gradient-to-br from-secondary to-sand px-5 py-4 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground",
						children: "Valor sugerido"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-4xl text-forest",
						children: formatBRL(tier?.value ?? null)
					})]
				}),
				pixKey && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-1.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground",
						children: "Chave Pix"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "flex-1 truncate rounded-xl border bg-secondary px-3 py-3 text-sm font-mono text-white/80",
							children: pixKey
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "outline",
							onClick: copyKey,
							className: "shrink-0 rounded-xl h-11 w-11",
							children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-moss" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" })
						})]
					}),
					pixOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: ["Titular: ", pixOwner]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "pix-name",
					children: "Seu nome"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "pix-name",
					value: name,
					onChange: (e) => setName(e.target.value),
					placeholder: "Para sabermos quem mandou o carinho",
					maxLength: 100,
					className: "text-base"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "flex-col gap-2 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: onClose,
						className: "order-2 sm:order-1",
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => mutation.mutate(),
						disabled: !name.trim() || mutation.isPending,
						className: "order-1 sm:order-2 h-12 sm:h-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "mr-2 h-4 w-4" }), "Vou presentear assim!"]
					})]
				})
			]
		})
	});
}
function RsvpDialog({ open, onOpenChange }) {
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [guests, setGuests] = (0, import_react.useState)(1);
	const [message, setMessage] = (0, import_react.useState)("");
	const mutation = useMutation({
		mutationFn: async () => {
			if (!isSupabaseConfigured) throw new Error("Configure as variaveis do Supabase para confirmar presenca.");
			const { error } = await supabase.from("rsvps").insert({
				name: name.trim(),
				phone: phone.trim() || null,
				guests_count: guests,
				message: message.trim() || null
			});
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Presença confirmada! Te esperamos.");
			setName("");
			setPhone("");
			setGuests(1);
			setMessage("");
			onOpenChange(false);
		},
		onError: (e) => toast.error(e.message || "Erro ao confirmar")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "w-11/12 rounded-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-display text-2xl",
					children: "Confirmar presença"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Mal podemos esperar para receber você." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "v-name",
							children: "Nome"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "v-name",
							value: name,
							onChange: (e) => setName(e.target.value),
							maxLength: 100,
							className: "text-base"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 gap-3 sm:grid-cols-[1fr_100px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "v-phone",
								children: "Telefone"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "v-phone",
								value: phone,
								onChange: (e) => setPhone(e.target.value),
								maxLength: 30,
								className: "text-base"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "v-g",
								children: "Pessoas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "v-g",
								type: "number",
								min: 1,
								max: 20,
								value: guests,
								onChange: (e) => setGuests(Math.max(1, Number(e.target.value))),
								className: "text-base"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "v-msg",
							children: "Mensagem (opcional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "v-msg",
							value: message,
							onChange: (e) => setMessage(e.target.value),
							maxLength: 500,
							rows: 4,
							className: "text-base"
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => mutation.mutate(),
					disabled: !name.trim() || mutation.isPending,
					children: "Confirmar"
				})] })
			]
		})
	});
}
function RecadoForm() {
	const [name, setName] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const mutation = useMutation({
		mutationFn: async () => {
			if (!isSupabaseConfigured) throw new Error("Configure as variaveis do Supabase para enviar mensagens.");
			const { error } = await supabase.from("guest_messages").insert({
				name: name.trim(),
				message: message.trim()
			});
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Mensagem enviada com carinho!");
			setName("");
			setMessage("");
		},
		onError: (e) => toast.error(e.message || "Erro ao enviar")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "rounded-2xl border-white/75 bg-white/90 p-5 shadow-premium backdrop-blur-xl sm:p-7",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "m-name",
					children: "Seu nome"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "m-name",
					value: name,
					onChange: (e) => setName(e.target.value),
					maxLength: 100,
					className: "text-base"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "m-msg",
					children: "Mensagem"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "m-msg",
					value: message,
					onChange: (e) => setMessage(e.target.value),
					maxLength: 1e3,
					rows: 6,
					className: "text-base"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "h-12 w-full rounded-xl text-base sm:h-11 sm:text-sm",
					onClick: () => mutation.mutate(),
					disabled: !name.trim() || !message.trim() || mutation.isPending,
					children: "Enviar mensagem"
				})
			]
		})
	});
}
//#endregion
export { PublicPage as component };
