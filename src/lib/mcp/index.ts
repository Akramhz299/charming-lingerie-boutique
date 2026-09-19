import { defineMcp } from "@lovable.dev/mcp-js";

import getProduct from "./tools/get-product";
import listCategories from "./tools/list-categories";
import prepareOrder from "./tools/prepare-order";
import searchProducts from "./tools/search-products";
import sizeGuide from "./tools/size-guide";
import storeInfo from "./tools/store-info";

export default defineMcp({
  name: "charming-lil-store-mcp",
  title: "Charming Lil Store",
  version: "1.0.0",
  instructions: [
    "Outils de la boutique Charming Lil Store : lingerie féminine et pyjamas, marché marocain, prix en MAD.",
    "Utilisez `list_categories` pour découvrir l'offre, `search_products` pour filtrer, `get_product` pour une fiche détaillée,",
    "`size_guide` pour conseiller une taille (soutiens-gorge 70A–90D, autres XS–XXL), `store_info` pour la livraison et le paiement,",
    "et `prepare_order` pour chiffrer un panier et obtenir un lien WhatsApp de confirmation.",
    "Aucun paiement en ligne : la commande se règle en espèces à la livraison et se confirme sur WhatsApp.",
  ].join(" "),
  tools: [listCategories, searchProducts, getProduct, sizeGuide, storeInfo, prepareOrder],
});
