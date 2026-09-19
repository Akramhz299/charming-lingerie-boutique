import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { PRODUCTS, SHOP, categoryLabel, colorLabel, sizesOf, type Product } from "../catalog";

const SORTS = ["popularite", "nouveautes", "prix-croissant", "prix-decroissant"] as const;

function score(p: Product, q: string): number {
  const hay = `${p.name} ${p.sub} ${p.cat} ${p.desc} ${p.tags.join(" ")}`.toLowerCase();
  return hay.includes(q) ? (p.name.toLowerCase().includes(q) ? 2 : 1) : 0;
}

export default defineTool({
  name: "search_products",
  title: "Rechercher des produits",
  description:
    "Recherche dans le catalogue Charming Lil Store (lingerie, soutiens-gorge, culottes, pyjamas, ensembles). Filtres par catégorie, taille, couleur, prix et promotions. Prix en MAD.",
  annotations: { readOnlyHint: true, openWorldHint: false },
  inputSchema: {
    query: z.string().optional().describe("Mots-clés libres, ex. « pyjama satin »"),
    category: z
      .enum(["lingerie", "soutiens-gorge", "culottes", "pyjamas", "ensembles", "nouveautes", "promotions"])
      .optional(),
    size: z.string().optional().describe("Taille exacte, ex. « 80B » ou « M »"),
    color: z
      .enum(["rose", "noir", "nude", "blanc", "beige", "bordeaux"])
      .optional()
      .describe("Clé couleur"),
    maxPrice: z.number().positive().optional().describe("Prix maximum en MAD"),
    onSale: z.boolean().optional().describe("Uniquement les produits en promotion"),
    sort: z.enum(SORTS).default("popularite"),
    limit: z.number().int().min(1).max(50).default(10),
  },
  outputSchema: {
    count: z.number(),
    currency: z.string(),
    products: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        category: z.string(),
        subcategory: z.string(),
        price: z.number(),
        oldPrice: z.number().nullable(),
        discountPercent: z.number().nullable(),
        colors: z.array(z.string()),
        sizes: z.array(z.string()),
        rating: z.number(),
        reviews: z.number(),
        isNew: z.boolean(),
      }),
    ),
  },
  handler: (args) => {
    const q = (args.query ?? "").trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      if (args.category) {
        const match = p.cat === args.category || p.tags.includes(args.category) || (args.category === "nouveautes" && p.new);
        if (!match) return false;
      }
      if (args.color && !p.colors.includes(args.color)) return false;
      if (args.size && !sizesOf(p).includes(args.size.toUpperCase())) return false;
      if (args.maxPrice && p.price > args.maxPrice) return false;
      if (args.onSale && !(p.old > p.price)) return false;
      if (q && score(p, q) === 0) return false;
      return true;
    });

    if (q) list = [...list].sort((a, b) => score(b, q) - score(a, q));
    if (args.sort === "prix-croissant") list = [...list].sort((a, b) => a.price - b.price);
    if (args.sort === "prix-decroissant") list = [...list].sort((a, b) => b.price - a.price);
    if (args.sort === "nouveautes") list = [...list].sort((a, b) => Number(!!b.new) - Number(!!a.new));
    if (args.sort === "popularite") list = [...list].sort((a, b) => b.reviews - a.reviews);

    const products = list.slice(0, args.limit).map((p) => ({
      id: p.id,
      name: p.name,
      category: categoryLabel(p.cat),
      subcategory: p.sub,
      price: p.price,
      oldPrice: p.old > p.price ? p.old : null,
      discountPercent: p.old > p.price ? Math.round((1 - p.price / p.old) * 100) : null,
      colors: p.colors.map(colorLabel),
      sizes: sizesOf(p),
      rating: p.rating,
      reviews: p.reviews,
      isNew: !!p.new,
    }));

    const text = products.length
      ? products
          .map(
            (p) =>
              `#${p.id} — ${p.name} (${p.category}) : ${p.price} ${SHOP.currency}` +
              (p.oldPrice ? ` au lieu de ${p.oldPrice} ${SHOP.currency} (−${p.discountPercent}%)` : "") +
              ` · couleurs : ${p.colors.join(", ")}`,
          )
          .join("\n")
      : "Aucun produit ne correspond à ces critères.";

    return { content: [{ type: "text", text }], structuredContent: { count: products.length, currency: SHOP.currency, products } };
  },
});
