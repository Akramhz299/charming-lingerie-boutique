import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { SHOP, colorLabel, productById, sizesOf } from "../catalog";

export default defineTool({
  name: "prepare_order",
  title: "Préparer une commande",
  description:
    "Calcule le récapitulatif d'une commande (sous-total, livraison, total en MAD) et retourne un lien WhatsApp prérempli pour la confirmer. N'enregistre aucune commande : la cliente valide elle-même sur WhatsApp. Paiement à la livraison.",
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  inputSchema: {
    items: z
      .array(
        z.object({
          productId: z.number().int().positive(),
          size: z.string().describe("Taille choisie, ex. « 80B » ou « M »"),
          color: z.string().optional().describe("Clé couleur, ex. « rose »"),
          quantity: z.number().int().min(1).max(20).default(1),
        }),
      )
      .min(1),
    city: z.string().optional().describe("Ville de livraison au Maroc"),
    customerName: z.string().optional(),
  },
  handler: ({ items, city, customerName }) => {
    const lines: string[] = [];
    let subtotal = 0;

    for (const it of items) {
      const p = productById(it.productId);
      if (!p) {
        return {
          isError: true,
          content: [{ type: "text" as const, text: `Produit ${it.productId} introuvable.` }],
        };
      }
      const size = it.size.toUpperCase();
      const available = sizesOf(p);
      if (!available.includes(size)) {
        return {
          isError: true,
          content: [
            {
              type: "text" as const,
              text: `Taille « ${it.size} » indisponible pour ${p.name}. Tailles : ${available.join(", ")}.`,
            },
          ],
        };
      }
      if (it.color && !p.colors.includes(it.color)) {
        return {
          isError: true,
          content: [
            {
              type: "text" as const,
              text: `Couleur « ${it.color} » indisponible pour ${p.name}. Couleurs : ${p.colors.map(colorLabel).join(", ")}.`,
            },
          ],
        };
      }
      const line = p.price * it.quantity;
      subtotal += line;
      lines.push(
        `${it.quantity} × ${p.name} — taille ${size}${it.color ? `, ${colorLabel(it.color)}` : ""} : ${line} ${SHOP.currency}`,
      );
    }

    const shipping = subtotal >= SHOP.shipping.freeFrom ? 0 : SHOP.shipping.base;
    const total = subtotal + shipping;

    const message = [
      `Bonjour ${SHOP.brand}, je souhaite commander :`,
      ...lines,
      `Sous-total : ${subtotal} ${SHOP.currency}`,
      `Livraison : ${shipping === 0 ? "offerte" : `${shipping} ${SHOP.currency}`}`,
      `Total : ${total} ${SHOP.currency} (paiement à la livraison)`,
      customerName ? `Nom : ${customerName}` : "",
      city ? `Ville : ${city}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const waUrl = `${SHOP.waLink}?text=${encodeURIComponent(message)}`;

    return {
      content: [
        {
          type: "text",
          text: `${message}\n\nLien de confirmation WhatsApp : ${waUrl}`,
        },
      ],
      structuredContent: { subtotal, shipping, total, currency: SHOP.currency, whatsappUrl: waUrl },
    };
  },
  outputSchema: {
    subtotal: z.number(),
    shipping: z.number(),
    total: z.number(),
    currency: z.string(),
    whatsappUrl: z.string(),
  },
});
