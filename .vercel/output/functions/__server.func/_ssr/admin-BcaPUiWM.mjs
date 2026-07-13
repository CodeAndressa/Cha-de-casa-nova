import { r as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-D3nCsqFF.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as closestCenter, h as CSS, i as PointerSensor, m as useSensors, p as useSensor, r as KeyboardSensor, t as DndContext } from "../_libs/@dnd-kit/core+[...].mjs";
import { a as cn, i as Label, n as Card, r as Input, t as Button } from "./card-C7yB23SN.mjs";
import { a as Plus, b as ChevronDown, f as Image, h as GripVertical, n as Trash2, o as Pencil, p as House, u as LogOut, x as Check, y as ChevronUp } from "../_libs/lucide-react.mjs";
import { a as DialogFooter, c as STATUSES, d as formatBRL, f as statusLabel, l as Textarea, n as Dialog, o as DialogHeader, r as DialogContent, s as DialogTitle, t as CATEGORIES, u as categoryLabel } from "./categories-BtOHNY4l.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as verticalListSortingStrategy, i as useSortable, n as arrayMove, r as sortableKeyboardCoordinates, t as SortableContext } from "../_libs/dnd-kit__sortable.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BcaPUiWM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function parseGiftLinks(external_link) {
	if (!external_link) return [];
	if (external_link.trim().startsWith("[")) try {
		return JSON.parse(external_link);
	} catch {}
	return [{
		label: "Ver produto",
		url: external_link
	}];
}
function AdminPage() {
	const navigate = useNavigate();
	const signOut = async () => {
		await supabase.auth.signOut();
		navigate({ to: "/auth" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-secondary/40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6 sm:py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-[0.3em] text-terracotta",
						children: "Painel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-xl sm:text-2xl",
						children: "Administração"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						size: "sm",
						className: "rounded-full gap-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Ver site"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: signOut,
						variant: "outline",
						size: "sm",
						className: "rounded-full gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Sair"
						})]
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "dashboard",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "grid w-full grid-cols-2 gap-1 bg-transparent sm:grid-cols-3 lg:grid-cols-6 lg:gap-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "dashboard",
								className: "rounded-lg sm:rounded-none",
								children: "Dashboard"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "gifts",
								className: "rounded-lg sm:rounded-none",
								children: "Presentes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "photos",
								className: "rounded-lg sm:rounded-none",
								children: "Fotos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "event",
								className: "rounded-lg sm:rounded-none",
								children: "Evento"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "rsvps",
								className: "rounded-lg sm:rounded-none",
								children: "Confirmados"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "messages",
								className: "rounded-lg sm:rounded-none",
								children: "Mensagens"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "dashboard",
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "gifts",
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiftsTab, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "photos",
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotosTab, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "event",
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventTab, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "rsvps",
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RsvpsTab, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "messages",
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessagesTab, {})
					})
				]
			})
		})]
	});
}
function Dashboard() {
	const { data: gifts = [] } = useQuery({
		queryKey: ["admin-gifts"],
		queryFn: async () => {
			const { data } = await supabase.from("gifts").select("status");
			return data ?? [];
		}
	});
	const { data: rsvpCount = 0 } = useQuery({
		queryKey: ["admin-rsvp-count"],
		queryFn: async () => {
			const { count } = await supabase.from("rsvps").select("*", {
				count: "exact",
				head: true
			});
			return count ?? 0;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
		children: [
			{
				label: "Itens cadastrados",
				value: gifts.length
			},
			{
				label: "Disponíveis",
				value: gifts.filter((g) => g.status === "disponivel").length
			},
			{
				label: "Reservados",
				value: gifts.filter((g) => g.status === "reservado").length
			},
			{
				label: "Presenteados",
				value: gifts.filter((g) => g.status === "presenteado").length
			},
			{
				label: "Confirmações",
				value: rsvpCount
			}
		].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "rounded-2xl p-4 sm:p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-muted-foreground",
				children: s.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-3xl sm:text-4xl",
				children: s.value
			})]
		}, s.label))
	});
}
function GiftsTab() {
	const qc = useQueryClient();
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [localOrder, setLocalOrder] = (0, import_react.useState)(null);
	const { data: gifts = [] } = useQuery({
		queryKey: ["admin-gifts-full"],
		queryFn: async () => {
			const { data, error } = await supabase.from("gifts").select("*").order("sort_order").order("created_at");
			if (error) throw error;
			return data ?? [];
		}
	});
	const items = localOrder ?? gifts;
	const del = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("gifts").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Presente removido");
			qc.invalidateQueries({ queryKey: ["admin-gifts-full"] });
		}
	});
	const reorder = useMutation({
		mutationFn: async (ordered) => {
			await Promise.all(ordered.map((g, i) => supabase.from("gifts").update({ sort_order: i }).eq("id", g.id)));
		},
		onSuccess: () => {
			toast.success("Ordem salva");
			qc.invalidateQueries({ queryKey: ["admin-gifts-full"] });
			qc.invalidateQueries({ queryKey: ["gifts"] });
			setLocalOrder(null);
		},
		onError: (e) => {
			toast.error(e.message);
			setLocalOrder(null);
		}
	});
	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
	const handleDragEnd = (e) => {
		const { active, over } = e;
		if (!over || active.id === over.id) return;
		const next = arrayMove(items, items.findIndex((g) => g.id === active.id), items.findIndex((g) => g.id === over.id));
		setLocalOrder(next);
		reorder.mutate(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [
					"Arraste pelo ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "inline h-3 w-3" }),
					" para reordenar."
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setEditing({
					name: "",
					category: "outros",
					quantity: 1,
					status: "disponivel"
				}),
				className: "rounded-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Novo presente"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DndContext, {
			sensors,
			collisionDetection: closestCenter,
			onDragEnd: handleDragEnd,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableContext, {
				items: items.map((g) => g.id),
				strategy: verticalListSortingStrategy,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [items.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableGiftRow, {
						gift: g,
						onEdit: () => setEditing(g),
						onDelete: () => {
							if (confirm("Excluir?")) del.mutate(g.id);
						}
					}, g.id)), items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-sm text-muted-foreground",
						children: "Nenhum presente cadastrado."
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiftFormDialog, {
			gift: editing,
			onClose: () => setEditing(null),
			onSaved: () => {
				setEditing(null);
				qc.invalidateQueries({ queryKey: ["admin-gifts-full"] });
				qc.invalidateQueries({ queryKey: ["gifts"] });
			}
		})
	] });
}
function SortableGiftRow({ gift: g, onEdit, onDelete }) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: g.id });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		ref: setNodeRef,
		style: {
			transform: CSS.Transform.toString(transform),
			transition,
			opacity: isDragging ? .6 : 1
		},
		className: "flex items-center gap-3 rounded-2xl p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "cursor-grab touch-none rounded-md p-1 text-muted-foreground hover:bg-secondary active:cursor-grabbing",
				...attributes,
				...listeners,
				"aria-label": "Arrastar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "h-5 w-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-secondary",
				children: g.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: g.image_url,
					alt: "",
					className: "h-full w-full object-cover"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "truncate font-medium text-sm",
							children: g.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "text-xs",
							children: categoryLabel(g.category)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: `text-xs ${g.status === "disponivel" ? "bg-olive text-olive-foreground" : g.status === "reservado" ? "bg-accent text-accent-foreground" : "bg-terracotta text-terracotta-foreground"}`,
							children: statusLabel(g.status)
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						formatBRL(g.estimated_value),
						" · qtd ",
						g.quantity
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					onClick: onEdit,
					className: "h-9 w-9 p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					onClick: onDelete,
					className: "h-9 w-9 p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
				})]
			})
		]
	});
}
function GiftFormDialog({ gift, onClose, onSaved }) {
	const isOpen = !!gift;
	const [form, setForm] = (0, import_react.useState)({});
	const [links, setLinks] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (gift) {
			setForm(gift);
			setLinks(parseGiftLinks(gift.external_link ?? null));
		}
	}, [gift]);
	const addLink = () => setLinks((l) => [...l, {
		label: "",
		url: ""
	}]);
	const updateLink = (i, field, value) => setLinks((l) => l.map((item, j) => j === i ? {
		...item,
		[field]: value
	} : item));
	const removeLink = (i) => setLinks((l) => l.filter((_, j) => j !== i));
	const save = useMutation({
		mutationFn: async () => {
			const validLinks = links.filter((l) => l.url.trim());
			const payload = {
				name: form.name,
				category: form.category,
				description: form.description ?? null,
				estimated_value: form.estimated_value ?? null,
				image_url: form.image_url ?? null,
				external_link: validLinks.length > 0 ? JSON.stringify(validLinks) : null,
				quantity: form.quantity ?? 1,
				status: form.status ?? "disponivel"
			};
			if (form.id) {
				const { error } = await supabase.from("gifts").update(payload).eq("id", form.id);
				if (error) throw error;
			} else {
				const { error } = await supabase.from("gifts").insert(payload);
				if (error) throw error;
			}
		},
		onSuccess: () => {
			toast.success("Salvo!");
			onSaved();
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: isOpen,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "w-full max-w-lg sm:max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "font-display text-2xl",
					children: [form.id ? "Editar" : "Novo", " presente"]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid max-h-[60vh] gap-3 overflow-y-auto pr-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.name ?? "",
							onChange: (e) => setForm({
								...form,
								name: e.target.value
							}),
							className: "text-base"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Categoria" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.category,
								onValueChange: (v) => setForm({
									...form,
									category: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: c.value,
									children: c.label
								}, c.value)) })]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.status,
								onValueChange: (v) => setForm({
									...form,
									status: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: s.value,
									children: s.label
								}, s.value)) })]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Descrição" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: form.description ?? "",
							onChange: (e) => setForm({
								...form,
								description: e.target.value
							}),
							rows: 3,
							className: "text-base"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Valor estimado (R$)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								step: "0.01",
								value: form.estimated_value ?? "",
								onChange: (e) => setForm({
									...form,
									estimated_value: e.target.value ? Number(e.target.value) : null
								}),
								className: "text-base"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Quantidade" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 1,
								value: form.quantity ?? 1,
								onChange: (e) => setForm({
									...form,
									quantity: Number(e.target.value)
								}),
								className: "text-base"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "URL da imagem" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.image_url ?? "",
							onChange: (e) => setForm({
								...form,
								image_url: e.target.value
							}),
							placeholder: "https://...",
							className: "text-base"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Links de compra" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									size: "sm",
									variant: "outline",
									onClick: addLink,
									className: "h-7 gap-1 rounded-lg px-2.5 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" }), " Adicionar"]
								})]
							}),
							links.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Nenhum link ainda. Adicione links de lojas."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: links.map((link, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2 sm:flex-row sm:gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Amazon",
											value: link.label,
											onChange: (e) => updateLink(i, "label", e.target.value),
											className: "w-full sm:w-24 shrink-0 text-base"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "https://...",
											value: link.url,
											onChange: (e) => updateLink(i, "url", e.target.value),
											className: "flex-1 text-base"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											size: "icon",
											variant: "outline",
											onClick: () => removeLink(i),
											className: "shrink-0 sm:h-10 sm:w-10",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
										})
									]
								}, i))
							})
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "flex-col gap-2 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: onClose,
						className: "order-2 sm:order-1",
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => save.mutate(),
						disabled: !form.name || save.isPending,
						className: "order-1 sm:order-2",
						children: "Salvar"
					})]
				})
			]
		})
	});
}
function PhotosTab() {
	const qc = useQueryClient();
	const FRAME_COUNT = 6;
	const { data: photos = [] } = useQuery({
		queryKey: ["admin-photos"],
		queryFn: async () => {
			const { data, error } = await supabase.from("couple_photos").select("*").order("sort_order").order("created_at");
			if (error) throw error;
			return data ?? [];
		}
	});
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({});
	const [uploading, setUploading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (editing) setForm(editing);
	}, [editing]);
	const save = useMutation({
		mutationFn: async () => {
			if (!form.image_url?.trim()) throw new Error("Informe a URL da imagem");
			if (form.id) {
				const { error } = await supabase.from("couple_photos").update({
					image_url: form.image_url,
					caption: form.caption ?? null
				}).eq("id", form.id);
				if (error) throw error;
			} else {
				const nextOrder = photos.length;
				const { error } = await supabase.from("couple_photos").insert({
					image_url: form.image_url,
					caption: form.caption ?? null,
					sort_order: nextOrder
				});
				if (error) throw error;
			}
		},
		onSuccess: () => {
			toast.success("Foto salva!");
			qc.invalidateQueries({ queryKey: ["admin-photos"] });
			qc.invalidateQueries({ queryKey: ["couple-photos"] });
			setEditing(null);
		},
		onError: (e) => toast.error(e.message)
	});
	const del = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("couple_photos").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Foto removida");
			qc.invalidateQueries({ queryKey: ["admin-photos"] });
			qc.invalidateQueries({ queryKey: ["couple-photos"] });
		}
	});
	const slots = Math.max(FRAME_COUNT, photos.length + 1);
	const tilts = [
		"-rotate-2",
		"rotate-1",
		"rotate-2",
		"-rotate-1",
		"rotate-0",
		"-rotate-2"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Galeria do casal"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Clique em uma moldura vazia para adicionar uma foto. As fotos aparecem no site público."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
			children: Array.from({ length: slots }).map((_, i) => {
				const p = photos[i];
				const tilt = tilts[i % tilts.length];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `group relative ${tilt} transition-transform hover:rotate-0 hover:scale-[1.02]`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[2px] bg-card p-3 pb-10 shadow-card ring-1 ring-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-[4/5] overflow-hidden rounded-[2px] bg-secondary",
							children: p?.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: p.image_url,
								alt: p.caption ?? "",
								className: "h-full w-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setEditing({
									image_url: "",
									caption: ""
								}),
								className: "flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground/60 transition-colors hover:bg-accent/40 hover:text-forest",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-10 w-10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-widest",
									children: "Adicionar foto"
								})]
							})
						}), p?.caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-center font-display text-sm italic text-foreground/80",
							children: p.caption
						})]
					}), p && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "secondary",
							className: "h-7 w-7",
							onClick: () => setEditing(p),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "secondary",
							className: "h-7 w-7",
							onClick: () => {
								if (confirm("Remover esta foto?")) del.mutate(p.id);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
						})]
					})]
				}, p?.id ?? `empty-${i}`);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!editing,
			onOpenChange: (o) => !o && setEditing(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "w-full max-w-lg sm:max-w-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "font-display text-2xl",
						children: [form.id ? "Editar" : "Nova", " foto"]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Enviar arquivo" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "file",
									accept: "image/*",
									disabled: uploading,
									onChange: async (e) => {
										const file = e.target.files?.[0];
										if (!file) return;
										try {
											setUploading(true);
											const ext = file.name.split(".").pop() || "jpg";
											const path = `${crypto.randomUUID()}.${ext}`;
											const up = await supabase.storage.from("couple-photos").upload(path, file, {
												contentType: file.type,
												upsert: false
											});
											if (up.error) throw up.error;
											const signed = await supabase.storage.from("couple-photos").createSignedUrl(path, 3600 * 24 * 365 * 10);
											if (signed.error) throw signed.error;
											setForm((f) => ({
												...f,
												image_url: signed.data.signedUrl
											}));
											toast.success("Foto enviada");
										} catch (err) {
											toast.error(err.message);
										} finally {
											setUploading(false);
											e.target.value = "";
										}
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "JPG, PNG ou WebP, até 5MB. Google Photos e Drive não funcionam por link direto — faça upload do arquivo."
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Ou cole uma URL pública" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.image_url ?? "",
								onChange: (e) => setForm({
									...form,
									image_url: e.target.value
								}),
								placeholder: "https://..."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Legenda (opcional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.caption ?? "",
								onChange: (e) => setForm({
									...form,
									caption: e.target.value
								}),
								placeholder: "Nossa viagem..."
							})] }),
							form.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto w-40",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-[2px] bg-card p-2 pb-6 shadow-card ring-1 ring-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "aspect-[4/5] overflow-hidden bg-secondary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: form.image_url,
											alt: "",
											className: "h-full w-full object-cover",
											onError: () => toast.error("Esta URL não pôde ser carregada — tente fazer upload do arquivo")
										})
									})
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setEditing(null),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => save.mutate(),
						disabled: save.isPending,
						children: "Salvar"
					})] })
				]
			})
		})
	] });
}
function EventTab() {
	const qc = useQueryClient();
	const { data } = useQuery({
		queryKey: ["admin-event"],
		queryFn: async () => {
			const { data } = await supabase.from("event_settings").select("*").limit(1).maybeSingle();
			return data;
		}
	});
	const [form, setForm] = (0, import_react.useState)(null);
	const current = form ?? data;
	const save = useMutation({
		mutationFn: async () => {
			const id = current?.id;
			if (!id) return;
			const { id: _omit, created_at: _c, updated_at: _u, ...payload } = current;
			const { error } = await supabase.from("event_settings").update(payload).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Evento atualizado!");
			qc.invalidateQueries({ queryKey: ["admin-event"] });
			qc.invalidateQueries({ queryKey: ["event-settings"] });
		},
		onError: (e) => toast.error(e.message)
	});
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Carregando..."
	});
	const c = current;
	const upd = (k, v) => setForm({
		...current,
		[k]: v
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "rounded-2xl p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Nome do evento",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: c?.name ?? "",
						onChange: (e) => upd("name", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Data",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: c?.event_date ?? "",
						onChange: (e) => upd("event_date", e.target.value || null)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Horário",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "time",
						value: c?.event_time?.slice(0, 5) ?? "",
						onChange: (e) => upd("event_time", e.target.value || null)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Endereço",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: c?.address ?? "",
						onChange: (e) => upd("address", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Complemento",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: c?.complement ?? "",
						onChange: (e) => upd("complement", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Cidade",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: c?.city ?? "",
						onChange: (e) => upd("city", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Estado",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: c?.state ?? "",
						onChange: (e) => upd("state", e.target.value),
						maxLength: 2
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "WhatsApp (com DDD)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: c?.whatsapp_phone ?? "",
						onChange: (e) => upd("whatsapp_phone", e.target.value),
						placeholder: "11999999999"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					className: "sm:col-span-2",
					label: "Texto de convite / boas-vindas",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 3,
						value: c?.welcome_text ?? "",
						onChange: (e) => upd("welcome_text", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					className: "sm:col-span-2",
					label: "URL imagem de capa",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: c?.cover_image_url ?? "",
						onChange: (e) => upd("cover_image_url", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Chave Pix",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: c?.pix_key ?? "",
						onChange: (e) => upd("pix_key", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Titular do Pix",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: c?.pix_owner ?? "",
						onChange: (e) => upd("pix_owner", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					className: "sm:col-span-2",
					label: "URL do QR Code Pix",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: c?.pix_qr_url ?? "",
						onChange: (e) => upd("pix_qr_url", e.target.value)
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => save.mutate(),
				disabled: save.isPending,
				className: "rounded-full",
				children: "Salvar alterações"
			})
		})]
	});
}
function Field({ label, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "mb-1.5 block",
			children: label
		}), children]
	});
}
function RsvpsTab() {
	const { data: rsvps = [] } = useQuery({
		queryKey: ["admin-rsvps"],
		queryFn: async () => {
			const { data } = await supabase.from("rsvps").select("*").order("created_at", { ascending: false });
			return data ?? [];
		}
	});
	const { data: reservations = [] } = useQuery({
		queryKey: ["admin-reservations"],
		queryFn: async () => {
			const { data } = await supabase.from("gift_reservations").select("*, gifts(name)").order("created_at", { ascending: false });
			return data ?? [];
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "rounded-2xl p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl",
				children: "Confirmações de presença"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-2",
				children: [rsvps.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: r.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: [r.guests_count, " pessoa(s)"]
							})]
						}),
						r.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: r.phone
						}),
						r.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm",
							children: r.message
						})
					]
				}, r.id)), rsvps.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Sem confirmações ainda."
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "rounded-2xl p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl",
				children: "Reservas de presentes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-2",
				children: [reservations.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: r.guest_name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: r.status === "presenteado" ? "bg-terracotta text-terracotta-foreground" : "bg-accent text-accent-foreground",
								children: statusLabel(r.status)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: r.gifts?.name
						}),
						r.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: r.phone
						}),
						r.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm",
							children: r.message
						})
					]
				}, r.id)), reservations.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Sem reservas ainda."
				})]
			})]
		})]
	});
}
function MessagesTab() {
	const { data: messages = [] } = useQuery({
		queryKey: ["admin-messages"],
		queryFn: async () => {
			const { data } = await supabase.from("guest_messages").select("*").order("created_at", { ascending: false });
			return data ?? [];
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3 sm:grid-cols-2",
		children: [messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "rounded-2xl p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg",
					children: m.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: m.message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-[10px] uppercase tracking-widest text-muted-foreground",
					children: new Date(m.created_at).toLocaleString("pt-BR")
				})
			]
		}, m.id)), messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Sem mensagens."
		})]
	});
}
//#endregion
export { AdminPage as component };
