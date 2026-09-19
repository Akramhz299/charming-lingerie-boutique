// Catalogue de référence exposé aux agents IA (MCP).
// Source de vérité produit : public/store.html (bloc "1. DONNÉES").
// Si vous modifiez les produits dans store.html, mettez ce fichier à jour.

export interface Product {
  id: number;
  name: string;
  cat: string;
  sub: string;
  price: number;
  old: number;
  imgs: string[];
  colors: string[];
  sizeKey: "bra" | "panty" | "sleep";
  tags: string[];
  new?: boolean;
  rating: number;
  reviews: number;
  desc: string;
  compo: string[];
}

export interface Category { id: string; n: string; subs: string[]; hot?: boolean }

export const SHOP = {
  "brand": "Charming Lil Store",
  "phone": "+212658344379",
  "waLink": "https://wa.me/212658344379",
  "currency": "MAD",
  "shipping": {
    "base": 35,
    "freeFrom": 600
  }
} as const;

export const SIZES: Record<"bra" | "panty" | "sleep", string[]> = {
  "bra": [
    "70A",
    "70B",
    "70C",
    "70D",
    "75A",
    "75B",
    "75C",
    "75D",
    "80A",
    "80B",
    "80C",
    "80D",
    "85B",
    "85C",
    "85D",
    "90B",
    "90C",
    "90D"
  ],
  "panty": [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL"
  ],
  "sleep": [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL"
  ]
};

export const COLORS: Record<string, { n: string; h: string }> = {
  "rose": {
    "n": "Rose poudré",
    "h": "#f0cdd3"
  },
  "noir": {
    "n": "Noir",
    "h": "#1b1717"
  },
  "nude": {
    "n": "Nude",
    "h": "#dcc3b2"
  },
  "blanc": {
    "n": "Blanc",
    "h": "#f7f4f1"
  },
  "beige": {
    "n": "Beige",
    "h": "#e5d6c9"
  },
  "bordeaux": {
    "n": "Bordeaux",
    "h": "#7e2b38"
  }
};

export const CATEGORIES: Category[] = [
  {
    "id": "lingerie",
    "n": "Lingerie",
    "subs": [
      "Lingerie dentelle",
      "Lingerie sans couture",
      "Lingerie de nuit",
      "Bodys & caracos"
    ]
  },
  {
    "id": "soutiens-gorge",
    "n": "Soutiens-gorge",
    "subs": [
      "Push-up",
      "Corbeille",
      "Sans armatures",
      "Triangle",
      "Bralette",
      "Grande taille"
    ]
  },
  {
    "id": "culottes",
    "n": "Culottes",
    "subs": [
      "Culotte classique",
      "Tanga",
      "String",
      "Shorty",
      "Taille haute",
      "Invisible"
    ]
  },
  {
    "id": "pyjamas",
    "n": "Pyjamas",
    "subs": [
      "Pyjama satin",
      "Pyjama coton",
      "Pyjama short",
      "Chemise de nuit",
      "Peignoir"
    ]
  },
  {
    "id": "ensembles",
    "n": "Ensembles",
    "subs": [
      "Ensemble dentelle",
      "Ensemble satin",
      "Ensemble sport",
      "Coffret cadeau"
    ]
  },
  {
    "id": "nouveautes",
    "n": "Nouveautés",
    "subs": [
      "Derniers arrivages",
      "Collection saison",
      "Best-sellers"
    ]
  },
  {
    "id": "promotions",
    "n": "Promotions",
    "subs": [
      "Jusqu'à −40%",
      "Lots & duos",
      "Dernières tailles"
    ],
    "hot": true
  }
];

export const PRODUCTS: Product[] = [
  {
    "id": 1,
    "name": "Soutien-gorge Amour Dentelle",
    "cat": "soutiens-gorge",
    "sub": "Corbeille",
    "price": 249,
    "old": 349,
    "imgs": [
      "images/bra-1.jpg",
      "images/set-1.jpg"
    ],
    "colors": [
      "rose",
      "nude",
      "blanc"
    ],
    "sizeKey": "bra",
    "tags": [
      "promotions",
      "lingerie"
    ],
    "new": true,
    "rating": 4.8,
    "reviews": 64,
    "desc": "Un soutien-gorge corbeille en dentelle florale doublée, pensé pour un maintien souple et un décolleté naturel. Bretelles réglables et dos élastiqué pour un confort tout au long de la journée.",
    "compo": [
      "Dentelle 82% polyamide, 18% élasthanne",
      "Doublure coton doux",
      "Armatures fines gainées",
      "Lavage à la main, 30°C"
    ]
  },
  {
    "id": 2,
    "name": "Soutien-gorge Nuit de Velours",
    "cat": "soutiens-gorge",
    "sub": "Push-up",
    "price": 279,
    "old": 0,
    "imgs": [
      "images/bra-2.jpg",
      "images/bra-1.jpg"
    ],
    "colors": [
      "noir",
      "bordeaux"
    ],
    "sizeKey": "bra",
    "tags": [
      "lingerie",
      "nouveautes"
    ],
    "new": true,
    "rating": 4.9,
    "reviews": 41,
    "desc": "Push-up en dentelle noire à motif fleuri, effet galbant discret et finitions picot. La pièce signature pour les soirées.",
    "compo": [
      "Dentelle stretch premium",
      "Coques légères amovibles",
      "Fermeture 3 rangées",
      "Séchage à l'air libre"
    ]
  },
  {
    "id": 3,
    "name": "Soutien-gorge Douceur Sans Armatures",
    "cat": "soutiens-gorge",
    "sub": "Sans armatures",
    "price": 199,
    "old": 259,
    "imgs": [
      "images/bra-1.jpg",
      "images/panty-1.jpg"
    ],
    "colors": [
      "nude",
      "blanc",
      "rose"
    ],
    "sizeKey": "bra",
    "tags": [
      "promotions"
    ],
    "rating": 4.7,
    "reviews": 88,
    "desc": "Sans armatures, coupe corbeille et bande sous-poitrine large : le confort absolu sans renoncer à la jolie dentelle.",
    "compo": [
      "Microfibre respirante",
      "Sans armatures",
      "Bretelles extra-douces",
      "Lavage 30°C"
    ]
  },
  {
    "id": 4,
    "name": "Bralette Aurore",
    "cat": "soutiens-gorge",
    "sub": "Bralette",
    "price": 169,
    "old": 0,
    "imgs": [
      "images/set-1.jpg",
      "images/bra-1.jpg"
    ],
    "colors": [
      "beige",
      "noir"
    ],
    "sizeKey": "panty",
    "tags": [
      "lingerie",
      "nouveautes"
    ],
    "new": true,
    "rating": 4.6,
    "reviews": 29,
    "desc": "Bralette triangle en dentelle transparente, à porter seule ou sous une chemise ouverte. Ultra légère.",
    "compo": [
      "Dentelle souple",
      "Sans coques",
      "Dos élastiqué",
      "Lavage à la main"
    ]
  },
  {
    "id": 5,
    "name": "Culotte Seconde Peau",
    "cat": "culottes",
    "sub": "Invisible",
    "price": 89,
    "old": 129,
    "imgs": [
      "images/panty-1.jpg",
      "images/set-1.jpg"
    ],
    "colors": [
      "nude",
      "noir",
      "blanc"
    ],
    "sizeKey": "panty",
    "tags": [
      "promotions",
      "lingerie"
    ],
    "rating": 4.9,
    "reviews": 152,
    "desc": "Culotte sans couture, invisible sous les vêtements les plus ajustés. Microfibre douce et taille confort.",
    "compo": [
      "92% polyamide, 8% élasthanne",
      "Découpe laser sans couture",
      "Gousset coton",
      "Lavage 30°C"
    ]
  },
  {
    "id": 6,
    "name": "Culotte Taille Haute Sérénité",
    "cat": "culottes",
    "sub": "Taille haute",
    "price": 99,
    "old": 0,
    "imgs": [
      "images/panty-1.jpg",
      "images/bra-1.jpg"
    ],
    "colors": [
      "nude",
      "beige",
      "noir"
    ],
    "sizeKey": "panty",
    "tags": [
      "lingerie"
    ],
    "rating": 4.8,
    "reviews": 73,
    "desc": "Taille haute gainante légère qui affine la silhouette et reste totalement invisible.",
    "compo": [
      "Microfibre gainante",
      "Ceinture large plate",
      "Gousset coton",
      "Lavage 30°C"
    ]
  },
  {
    "id": 7,
    "name": "Tanga Fleur de Dentelle",
    "cat": "culottes",
    "sub": "Tanga",
    "price": 79,
    "old": 99,
    "imgs": [
      "images/set-1.jpg",
      "images/panty-1.jpg"
    ],
    "colors": [
      "rose",
      "noir",
      "beige"
    ],
    "sizeKey": "panty",
    "tags": [
      "promotions",
      "lingerie"
    ],
    "rating": 4.5,
    "reviews": 37,
    "desc": "Tanga en dentelle festonnée, dos échancré et confort qui se fait oublier.",
    "compo": [
      "Dentelle élastique",
      "Finitions sans élastique visible",
      "Gousset coton",
      "Lavage à la main"
    ]
  },
  {
    "id": 8,
    "name": "Ensemble Rose Poudré",
    "cat": "ensembles",
    "sub": "Ensemble dentelle",
    "price": 389,
    "old": 499,
    "imgs": [
      "images/set-1.jpg",
      "images/bra-1.jpg"
    ],
    "colors": [
      "beige",
      "rose",
      "noir"
    ],
    "sizeKey": "bra",
    "tags": [
      "promotions",
      "lingerie",
      "nouveautes"
    ],
    "new": true,
    "rating": 5,
    "reviews": 58,
    "desc": "Duo soutien-gorge + culotte en dentelle assortie, présenté dans une pochette satinée. Le cadeau idéal.",
    "compo": [
      "Dentelle florale doublée",
      "Soutien-gorge à armatures fines",
      "Culotte tanga assortie",
      "Pochette offerte"
    ]
  },
  {
    "id": 9,
    "name": "Ensemble Satin Minuit",
    "cat": "ensembles",
    "sub": "Ensemble satin",
    "price": 429,
    "old": 0,
    "imgs": [
      "images/pyjama-1.jpg",
      "images/set-1.jpg"
    ],
    "colors": [
      "bordeaux",
      "noir",
      "rose"
    ],
    "sizeKey": "sleep",
    "tags": [
      "ensembles",
      "nouveautes"
    ],
    "rating": 4.7,
    "reviews": 22,
    "desc": "Caraco et short en satin fluide au tombé impeccable, bordés d'un liseré contrastant.",
    "compo": [
      "Satin 100% polyester recyclé",
      "Bretelles réglables",
      "Short élastiqué",
      "Lavage délicat 30°C"
    ]
  },
  {
    "id": 10,
    "name": "Pyjama Satin Rêverie",
    "cat": "pyjamas",
    "sub": "Pyjama satin",
    "price": 459,
    "old": 599,
    "imgs": [
      "images/pyjama-1.jpg",
      "images/pyjama-banner.jpg"
    ],
    "colors": [
      "rose",
      "bordeaux",
      "noir"
    ],
    "sizeKey": "sleep",
    "tags": [
      "promotions",
      "pyjamas",
      "nouveautes"
    ],
    "new": true,
    "rating": 4.9,
    "reviews": 117,
    "desc": "Chemise à revers et short assorti en satin doux, liseré ivoire et poche poitrine. Un incontournable des nuits élégantes.",
    "compo": [
      "Satin lourd 100% polyester",
      "Liseré contrastant",
      "Ceinture à nouer",
      "Repassage doux"
    ]
  },
  {
    "id": 11,
    "name": "Pyjama Coton Matin Calme",
    "cat": "pyjamas",
    "sub": "Pyjama coton",
    "price": 399,
    "old": 0,
    "imgs": [
      "images/pyjama-2.jpg",
      "images/pyjama-banner.jpg"
    ],
    "colors": [
      "blanc",
      "beige"
    ],
    "sizeKey": "sleep",
    "tags": [
      "pyjamas"
    ],
    "rating": 4.8,
    "reviews": 95,
    "desc": "Pyjama long en coton tissé à fines rayures, respirant et durable. Chemise boutonnée, pantalon à cordon.",
    "compo": [
      "100% coton peigné",
      "Rayures tissées",
      "Pantalon à cordon",
      "Lavage 40°C"
    ]
  },
  {
    "id": 12,
    "name": "Pyjama Short Brise du Soir",
    "cat": "pyjamas",
    "sub": "Pyjama short",
    "price": 329,
    "old": 389,
    "imgs": [
      "images/pyjama-banner.jpg",
      "images/pyjama-1.jpg"
    ],
    "colors": [
      "rose",
      "blanc"
    ],
    "sizeKey": "sleep",
    "tags": [
      "promotions",
      "pyjamas"
    ],
    "rating": 4.6,
    "reviews": 44,
    "desc": "Ensemble short satiné léger, parfait pour les nuits douces. Coupe fluide et finitions soignées.",
    "compo": [
      "Satin léger",
      "Manches courtes",
      "Short taille élastiquée",
      "Lavage délicat"
    ]
  },
  {
    "id": 13,
    "name": "Body Dentelle Élégance",
    "cat": "lingerie",
    "sub": "Bodys & caracos",
    "price": 349,
    "old": 0,
    "imgs": [
      "images/set-1.jpg",
      "images/bra-2.jpg"
    ],
    "colors": [
      "noir",
      "beige"
    ],
    "sizeKey": "panty",
    "tags": [
      "lingerie",
      "nouveautes"
    ],
    "new": true,
    "rating": 4.7,
    "reviews": 31,
    "desc": "Body en dentelle transparente, dos nageur et pressions discrètes. À porter en lingerie ou sous un blazer.",
    "compo": [
      "Dentelle extensible",
      "Pressions au gousset",
      "Doublure poitrine",
      "Lavage à la main"
    ]
  },
  {
    "id": 14,
    "name": "Chemise de Nuit Lueur",
    "cat": "pyjamas",
    "sub": "Chemise de nuit",
    "price": 299,
    "old": 359,
    "imgs": [
      "images/pyjama-1.jpg",
      "images/pyjama-2.jpg"
    ],
    "colors": [
      "rose",
      "blanc",
      "noir"
    ],
    "sizeKey": "sleep",
    "tags": [
      "promotions",
      "pyjamas",
      "lingerie"
    ],
    "rating": 4.5,
    "reviews": 26,
    "desc": "Chemise de nuit satinée à bretelles fines et dentelle sur le décolleté. Longueur genou.",
    "compo": [
      "Satin fluide",
      "Dentelle au décolleté",
      "Bretelles réglables",
      "Lavage délicat"
    ]
  },
  {
    "id": 15,
    "name": "Lot de 3 Culottes Essentielles",
    "cat": "culottes",
    "sub": "Culotte classique",
    "price": 199,
    "old": 279,
    "imgs": [
      "images/panty-1.jpg",
      "images/set-1.jpg"
    ],
    "colors": [
      "nude",
      "noir",
      "blanc"
    ],
    "sizeKey": "panty",
    "tags": [
      "promotions",
      "culottes"
    ],
    "rating": 4.8,
    "reviews": 184,
    "desc": "Trois culottes coton stretch aux couleurs essentielles : nude, noir et blanc. Le basique à toujours avoir.",
    "compo": [
      "95% coton, 5% élasthanne",
      "Lot de 3",
      "Taille confort",
      "Lavage 40°C"
    ]
  },
  {
    "id": 16,
    "name": "Coffret Cadeau Charming",
    "cat": "ensembles",
    "sub": "Coffret cadeau",
    "price": 549,
    "old": 699,
    "imgs": [
      "images/hero.jpg",
      "images/set-1.jpg"
    ],
    "colors": [
      "rose",
      "beige"
    ],
    "sizeKey": "bra",
    "tags": [
      "promotions",
      "ensembles",
      "nouveautes"
    ],
    "new": true,
    "rating": 5,
    "reviews": 19,
    "desc": "Un soutien-gorge dentelle, une culotte assortie et un ruban satiné dans un écrin ivoire : le coffret à offrir (ou à s'offrir).",
    "compo": [
      "Soutien-gorge + culotte",
      "Écrin rigide ivoire",
      "Ruban satiné",
      "Carte message offerte"
    ]
  }
];

export const SIZE_GUIDE: Record<string, string> = {
  bra: "Tour de dos (70 à 90) + bonnet (A à D). Mesurez sous la poitrine bien à plat pour le tour de dos, puis au point le plus fort de la poitrine : écart de ~13 cm = A, ~15 cm = B, ~17 cm = C, ~19 cm = D.",
  panty: "XS = 34/36, S = 36/38, M = 38/40, L = 40/42, XL = 42/44, XXL = 44/46 (tailles françaises). Mesurez le tour de hanches.",
  sleep: "XS = 34/36, S = 36/38, M = 38/40, L = 40/42, XL = 42/44, XXL = 44/46. Coupe confort : prenez la taille en dessous si vous aimez près du corps.",
};

export function productById(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function sizesOf(p: Product): string[] {
  return SIZES[p.sizeKey] ?? [];
}

export function colorLabel(key: string): string {
  return COLORS[key]?.n ?? key;
}

export function categoryLabel(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.n ?? id;
}
