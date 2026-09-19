import { defineTool } from "@lovable.dev/mcp-js";

import { SHOP } from "../catalog";

export default defineTool({
  name: "store_info",
  title: "Informations boutique",
  description:
    "Informations pratiques sur Charming Lil Store : moyen de paiement, frais et délais de livraison au Maroc, contact WhatsApp, devise.",
  annotations: { readOnlyHint: true, openWorldHint: false },
  inputSchema: {},
  handler: () => ({
    content: [
      {
        type: "text",
        text: [
          `Boutique : ${SHOP.brand} — lingerie féminine et pyjamas au Maroc.`,
          `Devise : ${SHOP.currency}.`,
          "Paiement : à la livraison (espèces), aucun paiement en ligne.",
          `Livraison : ${SHOP.shipping.base} ${SHOP.currency} partout au Maroc, offerte dès ${SHOP.shipping.freeFrom} ${SHOP.currency}. Délai 24 à 72 h.`,
          `Contact et commande : WhatsApp ${SHOP.phone} (${SHOP.waLink}).`,
          "Échange possible sous 7 jours, article non porté avec son emballage.",
        ].join("\n"),
      },
    ],
  }),
});
