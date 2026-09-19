import { defineTool } from "@lovable.dev/mcp-js";

import { CATEGORIES, COLORS, PRODUCTS } from "../catalog";

export default defineTool({
  name: "list_categories",
  title: "Catégories et couleurs",
  description:
    "Liste les catégories et sous-catégories de la boutique Charming Lil Store, le nombre de produits par catégorie et les couleurs disponibles.",
  annotations: { readOnlyHint: true, openWorldHint: false },
  inputSchema: {},
  handler: () => {
    const cats = CATEGORIES.map((c) => {
      const count = PRODUCTS.filter((p) => p.cat === c.id || p.tags.includes(c.id)).length;
      return `${c.n} (${c.id}) — ${count} produit(s) · ${c.subs.join(", ")}`;
    });
    const colors = Object.entries(COLORS).map(([k, v]) => `${v.n} (${k})`);
    return {
      content: [
        {
          type: "text",
          text: `Catégories :\n${cats.join("\n")}\n\nCouleurs : ${colors.join(", ")}`,
        },
      ],
    };
  },
});
