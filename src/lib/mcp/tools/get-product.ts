import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { PRODUCTS, SHOP, SIZE_GUIDE, categoryLabel, colorLabel, productById, sizesOf } from "../catalog";

export default defineTool({
  name: "get_product",
  title: "Détail d'un produit",
  description:
    "Retourne la fiche complète d'un produit Charming Lil Store : description, composition, couleurs, tailles disponibles, prix MAD, avis et guide des tailles associé.",
  annotations: { readOnlyHint: true, openWorldHint: false },
  inputSchema: {
    productId: z.number().int().positive().describe("Identifiant du produit (voir search_products)"),
  },
  handler: ({ productId }) => {
    const p = productById(productId);
    if (!p) {
      return {
        isError: true,
        content: [
          {
            type: "text" as const,
            text: `Produit ${productId} introuvable. Identifiants disponibles : ${PRODUCTS.map((x) => x.id).join(", ")}.`,
          },
        ],
      };
    }

    const lines = [
      `${p.name} (#${p.id})`,
      `Catégorie : ${categoryLabel(p.cat)} · ${p.sub}`,
      `Prix : ${p.price} ${SHOP.currency}${p.old > p.price ? ` au lieu de ${p.old} ${SHOP.currency}` : ""}`,
      `Couleurs : ${p.colors.map(colorLabel).join(", ")}`,
      `Tailles : ${sizesOf(p).join(", ")}`,
      `Note : ${p.rating}/5 (${p.reviews} avis)`,
      "",
      p.desc,
      "",
      `Composition et entretien : ${p.compo.join(" · ")}`,
      `Guide des tailles : ${SIZE_GUIDE[p.sizeKey]}`,
      `Paiement à la livraison · Livraison ${SHOP.shipping.base} ${SHOP.currency}, offerte dès ${SHOP.shipping.freeFrom} ${SHOP.currency}.`,
    ];

    return { content: [{ type: "text", text: lines.join("\n") }] };
  },
});
