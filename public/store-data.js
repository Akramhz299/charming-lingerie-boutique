/* ============================================================================
   CHARMING LIL STORE — COUCHE DE DONNÉES CENTRALE
   Source unique de vérité partagée par la boutique (store.html) et le tableau
   de bord (admin.html). Persistance : localStorage.
   ============================================================================ */
(function (global) {
  "use strict";

  var K = {
    products: "charming_store_products",
    categories: "charming_store_categories",
    media: "charming_store_media",
    settings: "charming_store_settings",
    homepage: "charming_store_homepage",
  };

  /* ---------------------------- VALEURS PAR DÉFAUT ------------------------ */

  var DEFAULT_MEDIA = [
    { id: "hero", name: "Bannière d'accueil", src: "images/hero.jpg" },
    { id: "pyjBanner", name: "Bandeau pyjamas", src: "images/pyjama-banner.jpg" },
    { id: "bra1", name: "Soutien-gorge 1", src: "images/bra-1.jpg" },
    { id: "bra2", name: "Soutien-gorge 2", src: "images/bra-2.jpg" },
    { id: "panty", name: "Culotte 1", src: "images/panty-1.jpg" },
    { id: "set", name: "Ensemble 1", src: "images/set-1.jpg" },
    { id: "pyj1", name: "Pyjama 1", src: "images/pyjama-1.jpg" },
    { id: "pyj2", name: "Pyjama 2", src: "images/pyjama-2.jpg" },
  ];

  var DEFAULT_SIZES = {
    bra: ["70A","70B","70C","70D","75A","75B","75C","75D","80A","80B","80C","80D","85B","85C","85D","90B","90C","90D"],
    panty: ["XS", "S", "M", "L", "XL", "XXL"],
    sleep: ["XS", "S", "M", "L", "XL", "XXL"],
  };

  var DEFAULT_COLORS = [
    { id: "rose", n: "Rose poudré", h: "#f0cdd3" },
    { id: "noir", n: "Noir", h: "#1b1717" },
    { id: "nude", n: "Nude", h: "#dcc3b2" },
    { id: "blanc", n: "Blanc", h: "#f7f4f1" },
    { id: "beige", n: "Beige", h: "#e5d6c9" },
    { id: "bordeaux", n: "Bordeaux", h: "#7e2b38" },
  ];

  var DEFAULT_CATEGORIES = [
    { id: "lingerie", n: "Lingerie", img: "set", visible: true, subs: ["Lingerie dentelle","Lingerie sans couture","Lingerie de nuit","Bodys & caracos"] },
    { id: "soutiens-gorge", n: "Soutiens-gorge", img: "bra1", visible: true, subs: ["Push-up","Corbeille","Sans armatures","Triangle","Bralette","Grande taille"] },
    { id: "culottes", n: "Culottes", img: "panty", visible: true, subs: ["Culotte classique","Tanga","String","Shorty","Taille haute","Invisible"] },
    { id: "pyjamas", n: "Pyjamas", img: "pyj1", visible: true, subs: ["Pyjama satin","Pyjama coton","Pyjama short","Chemise de nuit","Peignoir"] },
    { id: "ensembles", n: "Ensembles", img: "set", visible: true, subs: ["Ensemble dentelle","Ensemble satin","Ensemble sport","Coffret cadeau"] },
    { id: "nouveautes", n: "Nouveautés", img: "bra2", visible: true, subs: ["Derniers arrivages","Collection saison","Best-sellers"] },
    { id: "promotions", n: "Promotions", img: "pyj2", visible: true, hot: true, subs: ["Jusqu'à −40%","Lots & duos","Dernières tailles"] },
  ];

  var DEFAULT_PRODUCTS = [
  {id:1,name:"Soutien-gorge Amour Dentelle",cat:"soutiens-gorge",sub:"Corbeille",price:249,old:349,imgs:["bra1","set"],colors:["rose","nude","blanc"],sizeKey:"bra",tags:["promotions","lingerie"],new:true,rating:4.8,reviews:64,
   desc:"Un soutien-gorge corbeille en dentelle florale doublée, pensé pour un maintien souple et un décolleté naturel. Bretelles réglables et dos élastiqué pour un confort tout au long de la journée.",
   compo:["Dentelle 82% polyamide, 18% élasthanne","Doublure coton doux","Armatures fines gainées","Lavage à la main, 30°C"]},
  {id:2,name:"Soutien-gorge Nuit de Velours",cat:"soutiens-gorge",sub:"Push-up",price:279,old:0,imgs:["bra2","bra1"],colors:["noir","bordeaux"],sizeKey:"bra",tags:["lingerie","nouveautes"],new:true,rating:4.9,reviews:41,
   desc:"Push-up en dentelle noire à motif fleuri, effet galbant discret et finitions picot. La pièce signature pour les soirées.",
   compo:["Dentelle stretch premium","Coques légères amovibles","Fermeture 3 rangées","Séchage à l'air libre"]},
  {id:3,name:"Soutien-gorge Douceur Sans Armatures",cat:"soutiens-gorge",sub:"Sans armatures",price:199,old:259,imgs:["bra1","panty"],colors:["nude","blanc","rose"],sizeKey:"bra",tags:["promotions"],rating:4.7,reviews:88,
   desc:"Sans armatures, coupe corbeille et bande sous-poitrine large : le confort absolu sans renoncer à la jolie dentelle.",
   compo:["Microfibre respirante","Sans armatures","Bretelles extra-douces","Lavage 30°C"]},
  {id:4,name:"Bralette Aurore",cat:"soutiens-gorge",sub:"Bralette",price:169,old:0,imgs:["set","bra1"],colors:["beige","noir"],sizeKey:"panty",tags:["lingerie","nouveautes"],new:true,rating:4.6,reviews:29,
   desc:"Bralette triangle en dentelle transparente, à porter seule ou sous une chemise ouverte. Ultra légère.",
   compo:["Dentelle souple","Sans coques","Dos élastiqué","Lavage à la main"]},
  {id:5,name:"Culotte Seconde Peau",cat:"culottes",sub:"Invisible",price:89,old:129,imgs:["panty","set"],colors:["nude","noir","blanc"],sizeKey:"panty",tags:["promotions","lingerie"],rating:4.9,reviews:152,
   desc:"Culotte sans couture, invisible sous les vêtements les plus ajustés. Microfibre douce et taille confort.",
   compo:["92% polyamide, 8% élasthanne","Découpe laser sans couture","Gousset coton","Lavage 30°C"]},
  {id:6,name:"Culotte Taille Haute Sérénité",cat:"culottes",sub:"Taille haute",price:99,old:0,imgs:["panty","bra1"],colors:["nude","beige","noir"],sizeKey:"panty",tags:["lingerie"],rating:4.8,reviews:73,
   desc:"Taille haute gainante légère qui affine la silhouette et reste totalement invisible.",
   compo:["Microfibre gainante","Ceinture large plate","Gousset coton","Lavage 30°C"]},
  {id:7,name:"Tanga Fleur de Dentelle",cat:"culottes",sub:"Tanga",price:79,old:99,imgs:["set","panty"],colors:["rose","noir","beige"],sizeKey:"panty",tags:["promotions","lingerie"],rating:4.5,reviews:37,
   desc:"Tanga en dentelle festonnée, dos échancré et confort qui se fait oublier.",
   compo:["Dentelle élastique","Finitions sans élastique visible","Gousset coton","Lavage à la main"]},
  {id:8,name:"Ensemble Rose Poudré",cat:"ensembles",sub:"Ensemble dentelle",price:389,old:499,imgs:["set","bra1"],colors:["beige","rose","noir"],sizeKey:"bra",tags:["promotions","lingerie","nouveautes"],new:true,rating:5,reviews:58,
   desc:"Duo soutien-gorge + culotte en dentelle assortie, présenté dans une pochette satinée. Le cadeau idéal.",
   compo:["Dentelle florale doublée","Soutien-gorge à armatures fines","Culotte tanga assortie","Pochette offerte"]},
  {id:9,name:"Ensemble Satin Minuit",cat:"ensembles",sub:"Ensemble satin",price:429,old:0,imgs:["pyj1","set"],colors:["bordeaux","noir","rose"],sizeKey:"sleep",tags:["ensembles","nouveautes"],rating:4.7,reviews:22,
   desc:"Caraco et short en satin fluide au tombé impeccable, bordés d'un liseré contrastant.",
   compo:["Satin 100% polyester recyclé","Bretelles réglables","Short élastiqué","Lavage délicat 30°C"]},
  {id:10,name:"Pyjama Satin Rêverie",cat:"pyjamas",sub:"Pyjama satin",price:459,old:599,imgs:["pyj1","pyjBanner"],colors:["rose","bordeaux","noir"],sizeKey:"sleep",tags:["promotions","pyjamas","nouveautes"],new:true,rating:4.9,reviews:117,
   desc:"Chemise à revers et short assorti en satin doux, liseré ivoire et poche poitrine. Un incontournable des nuits élégantes.",
   compo:["Satin lourd 100% polyester","Liseré contrastant","Ceinture à nouer","Repassage doux"]},
  {id:11,name:"Pyjama Coton Matin Calme",cat:"pyjamas",sub:"Pyjama coton",price:399,old:0,imgs:["pyj2","pyjBanner"],colors:["blanc","beige"],sizeKey:"sleep",tags:["pyjamas"],rating:4.8,reviews:95,
   desc:"Pyjama long en coton tissé à fines rayures, respirant et durable. Chemise boutonnée, pantalon à cordon.",
   compo:["100% coton peigné","Rayures tissées","Pantalon à cordon","Lavage 40°C"]},
  {id:12,name:"Pyjama Short Brise du Soir",cat:"pyjamas",sub:"Pyjama short",price:329,old:389,imgs:["pyjBanner","pyj1"],colors:["rose","blanc"],sizeKey:"sleep",tags:["promotions","pyjamas"],rating:4.6,reviews:44,
   desc:"Ensemble short satiné léger, parfait pour les nuits douces. Coupe fluide et finitions soignées.",
   compo:["Satin léger","Manches courtes","Short taille élastiquée","Lavage délicat"]},
  {id:13,name:"Body Dentelle Élégance",cat:"lingerie",sub:"Bodys & caracos",price:349,old:0,imgs:["set","bra2"],colors:["noir","beige"],sizeKey:"panty",tags:["lingerie","nouveautes"],new:true,rating:4.7,reviews:31,
   desc:"Body en dentelle transparente, dos nageur et pressions discrètes. À porter en lingerie ou sous un blazer.",
   compo:["Dentelle extensible","Pressions au gousset","Doublure poitrine","Lavage à la main"]},
  {id:14,name:"Chemise de Nuit Lueur",cat:"pyjamas",sub:"Chemise de nuit",price:299,old:359,imgs:["pyj1","pyj2"],colors:["rose","blanc","noir"],sizeKey:"sleep",tags:["promotions","pyjamas","lingerie"],rating:4.5,reviews:26,
   desc:"Chemise de nuit satinée à bretelles fines et dentelle sur le décolleté. Longueur genou.",
   compo:["Satin fluide","Dentelle au décolleté","Bretelles réglables","Lavage délicat"]},
  {id:15,name:"Lot de 3 Culottes Essentielles",cat:"culottes",sub:"Culotte classique",price:199,old:279,imgs:["panty","set"],colors:["nude","noir","blanc"],sizeKey:"panty",tags:["promotions","culottes"],rating:4.8,reviews:184,
   desc:"Trois culottes coton stretch aux couleurs essentielles : nude, noir et blanc. Le basique à toujours avoir.",
   compo:["95% coton, 5% élasthanne","Lot de 3","Taille confort","Lavage 40°C"]},
  {id:16,name:"Coffret Cadeau Charming",cat:"ensembles",sub:"Coffret cadeau",price:549,old:699,imgs:["hero","set"],colors:["rose","beige"],sizeKey:"bra",tags:["promotions","ensembles","nouveautes"],new:true,rating:5,reviews:19,
   desc:"Un soutien-gorge dentelle, une culotte assortie et un ruban satiné dans un écrin ivoire : le coffret à offrir (ou à s'offrir).",
   compo:["Soutien-gorge + culotte","Écrin rigide ivoire","Ruban satiné","Carte message offerte"]}
];

  var DEFAULT_SETTINGS = {
    brand: "Charming Lil Store",
    tagline: "Lingerie & Pyjamas",
    logo: "",
    description: "La lingerie qui vous ressemble : des matières douces, des coupes justes et un service attentionné, partout au Maroc.",
    currency: "MAD",
    phone: "+212 658 344 379",
    whatsapp: "212658344379",
    instagram: "",
    email: "contact@charminglilstore.ma",
    footerText: "Paiement à la livraison partout au Maroc · Échange sous 14 jours.",
    copyright: "Charming Lil Store — Tous droits réservés.",
    shipping: { base: 35, freeFrom: 600 },
  };

  var DEFAULT_HOMEPAGE = {
    hero: {
      visible: true,
      img: "hero",
      eyebrow: "Nouvelle collection · Automne",
      title: "La lingerie qui vous ressemble",
      subtitle: "Dentelles délicates, satins fluides et pyjamas doux. Livrés partout au Maroc, avec paiement à la livraison.",
      btn1: { t: "Découvrir les nouveautés", cat: "nouveautes" },
      btn2: { t: "Voir les pyjamas", cat: "pyjamas" },
    },
    banner: {
      visible: true,
      img: "pyjBanner",
      eyebrow: "Offre limitée",
      title: "Jusqu'à −40% sur les pyjamas satin",
      text: "Le confort du satin, la douceur du coton. Profitez de la sélection nuit à prix doux, paiement à la livraison inclus.",
      btn: { t: "Profiter des promos", cat: "promotions" },
    },
    sections: {
      trust: { visible: true },
      categories: { visible: true, eyebrow: "Nos univers", title: "Explorer la boutique" },
      news: { visible: true, eyebrow: "Tout juste arrivé", title: "Nouveautés" },
      featured: { visible: true, eyebrow: "Les préférés de nos clientes", title: "Produits populaires" },
      pyjamas: { visible: true, eyebrow: "Nuits douces", title: "Collection Pyjamas" },
      guide: { visible: true },
    },
    featured: [],
  };

  /* ------------------------------- OUTILS -------------------------------- */

  function clone(v) { return JSON.parse(JSON.stringify(v)); }

  function read(key, fallback) {
    try {
      var raw = global.localStorage.getItem(key);
      if (!raw) return clone(fallback);
      var v = JSON.parse(raw);
      return v == null ? clone(fallback) : v;
    } catch (e) { return clone(fallback); }
  }

  function write(key, value) {
    try { global.localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (e) { return false; }
  }

  function deepMerge(base, over) {
    var out = clone(base);
    Object.keys(over || {}).forEach(function (k) {
      var v = over[k];
      if (v && typeof v === "object" && !Array.isArray(v) && out[k] && typeof out[k] === "object" && !Array.isArray(out[k])) {
        out[k] = deepMerge(out[k], v);
      } else if (v !== undefined) { out[k] = v; }
    });
    return out;
  }

  var slug = function (s) {
    return String(s || "").toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "cat-" + Date.now();
  };

  function normalizeProduct(p) {
    var o = Object.assign({}, p);
    o.id = +o.id;
    o.name = o.name || "Produit sans nom";
    o.cat = o.cat || "lingerie";
    o.sub = o.sub || "";
    o.price = +o.price || 0;
    o.old = +o.old || 0;
    o.imgs = Array.isArray(o.imgs) && o.imgs.length ? o.imgs.slice() : [];
    o.colors = Array.isArray(o.colors) ? o.colors.slice() : [];
    o.sizeKey = o.sizeKey || "panty";
    o.sizes = Array.isArray(o.sizes) && o.sizes.length ? o.sizes.slice() : (DEFAULT_SIZES[o.sizeKey] || []).slice();
    o.tags = Array.isArray(o.tags) ? o.tags.slice() : [];
    o.new = !!o.new;
    o.rating = o.rating == null ? 4.8 : +o.rating;
    o.reviews = o.reviews == null ? 0 : +o.reviews;
    o.desc = o.desc || "";
    o.compo = Array.isArray(o.compo) ? o.compo.slice() : [];
    o.sku = o.sku || "CLS-" + o.id;
    o.visible = o.visible === undefined ? true : !!o.visible;
    if (o.stock && typeof o.stock === "object") o.stock = Object.assign({}, o.stock);
    else if (typeof o.stock === "number") { var n = o.stock, m = {}; o.sizes.forEach(function (s) { m[s] = n; }); o.stock = m; }
    else o.stock = {};
    return o;
  }

  /* ------------------------------- API ---------------------------------- */

  var API = {
    KEYS: K,
    SIZE_SETS: DEFAULT_SIZES,
    defaults: {
      products: DEFAULT_PRODUCTS,
      categories: DEFAULT_CATEGORIES,
      media: DEFAULT_MEDIA,
      colors: DEFAULT_COLORS,
      settings: DEFAULT_SETTINGS,
      homepage: DEFAULT_HOMEPAGE,
    },

    /* --- produits --- */
    getProducts: function () {
      return read(K.products, DEFAULT_PRODUCTS).map(normalizeProduct);
    },
    saveProducts: function (list) { return write(K.products, list.map(normalizeProduct)); },
    getProduct: function (id) {
      return API.getProducts().filter(function (p) { return p.id === +id; })[0] || null;
    },
    nextProductId: function () {
      return API.getProducts().reduce(function (m, p) { return Math.max(m, p.id); }, 0) + 1;
    },
    addProduct: function (data) {
      var list = API.getProducts();
      var p = normalizeProduct(Object.assign({ id: API.nextProductId() }, data));
      list.push(p); API.saveProducts(list); return p;
    },
    updateProduct: function (id, data) {
      var list = API.getProducts(), found = null;
      list = list.map(function (p) {
        if (p.id !== +id) return p;
        found = normalizeProduct(Object.assign({}, p, data, { id: +id }));
        return found;
      });
      API.saveProducts(list); return found;
    },
    deleteProduct: function (id) {
      API.saveProducts(API.getProducts().filter(function (p) { return p.id !== +id; }));
      var hp = API.getHomepage();
      hp.featured = (hp.featured || []).filter(function (x) { return +x !== +id; });
      API.saveHomepage(hp);
    },
    duplicateProduct: function (id) {
      var src = API.getProduct(id);
      if (!src) return null;
      var copy = Object.assign({}, clone(src), {
        id: API.nextProductId(),
        name: src.name + " - Copie",
        sku: src.sku + "-COPIE",
        visible: false,
      });
      var list = API.getProducts(); list.push(normalizeProduct(copy)); API.saveProducts(list);
      return copy;
    },
    toggleProduct: function (id) {
      var p = API.getProduct(id); if (!p) return null;
      return API.updateProduct(id, { visible: !p.visible });
    },

    /* --- stock --- */
    sizesOf: function (p) { return p.sizes && p.sizes.length ? p.sizes : (DEFAULT_SIZES[p.sizeKey] || []); },
    stockTotal: function (p) {
      var st = p.stock || {}, keys = Object.keys(st);
      if (!keys.length) return null; // non suivi = disponible
      return keys.reduce(function (s, k) { return s + (+st[k] || 0); }, 0);
    },
    inStock: function (p) { var t = API.stockTotal(p); return t === null || t > 0; },
    stockLabel: function (p) {
      var t = API.stockTotal(p);
      if (t === null) return { k: "ok", t: "Disponible" };
      if (t <= 0) return { k: "out", t: "Rupture de stock" };
      if (t <= 3) return { k: "low", t: "Stock faible" };
      return { k: "ok", t: "Disponible" };
    },

    /* --- catégories --- */
    getCategories: function () { return read(K.categories, DEFAULT_CATEGORIES); },
    saveCategories: function (list) { return write(K.categories, list); },
    addCategory: function (data) {
      var list = API.getCategories();
      var c = Object.assign({ id: slug(data.n), visible: true, subs: [], img: "" }, data);
      c.id = c.id || slug(data.n);
      if (list.some(function (x) { return x.id === c.id; })) c.id = c.id + "-" + Date.now().toString(36).slice(-4);
      list.push(c); API.saveCategories(list); return c;
    },
    updateCategory: function (id, data) {
      var list = API.getCategories().map(function (c) { return c.id === id ? Object.assign({}, c, data) : c; });
      API.saveCategories(list);
      return list.filter(function (c) { return c.id === (data.id || id); })[0];
    },
    deleteCategory: function (id) {
      API.saveCategories(API.getCategories().filter(function (c) { return c.id !== id; }));
    },

    /* --- couleurs --- */
    getColors: function () {
      var s = API.getSettings();
      return Array.isArray(s.colors) && s.colors.length ? s.colors : clone(DEFAULT_COLORS);
    },
    saveColors: function (colors) {
      var s = API.getSettings(); s.colors = colors; return API.saveSettings(s);
    },
    colorMap: function () {
      var m = {};
      API.getColors().forEach(function (c) { m[c.id] = { n: c.n, h: c.h }; });
      return m;
    },

    /* --- médias --- */
    getMedia: function () { return read(K.media, DEFAULT_MEDIA); },
    saveMedia: function (list) { return write(K.media, list); },
    addMedia: function (name, src) {
      var list = API.getMedia();
      var item = { id: "m" + Date.now().toString(36) + Math.floor(Math.random() * 1e3).toString(36), name: name || "Image", src: src };
      list.unshift(item);
      if (!API.saveMedia(list)) throw new Error("Espace de stockage insuffisant — supprimez des images.");
      return item;
    },
    updateMedia: function (id, data) {
      var list = API.getMedia().map(function (m) { return m.id === id ? Object.assign({}, m, data) : m; });
      if (!API.saveMedia(list)) throw new Error("Espace de stockage insuffisant.");
      return list.filter(function (m) { return m.id === id; })[0];
    },
    deleteMedia: function (id) { API.saveMedia(API.getMedia().filter(function (m) { return m.id !== id; })); },
    mediaMap: function () {
      var m = {}; API.getMedia().forEach(function (x) { m[x.id] = x.src; }); return m;
    },
    /* Résout une référence image (id média, chemin ou data URL) */
    img: function (ref, map) {
      if (!ref) return "images/set-1.jpg";
      map = map || API.mediaMap();
      return map[ref] || ref;
    },

    /* --- réglages --- */
    getSettings: function () { return deepMerge(DEFAULT_SETTINGS, read(K.settings, {})); },
    saveSettings: function (s) { return write(K.settings, s); },
    loadSettings: function () { return API.getSettings(); },

    /* --- accueil --- */
    getHomepage: function () { return deepMerge(DEFAULT_HOMEPAGE, read(K.homepage, {})); },
    saveHomepage: function (h) { return write(K.homepage, h); },
    loadHomepage: function () { return API.getHomepage(); },

    /* --- divers --- */
    slug: slug,
    resetAll: function () {
      Object.keys(K).forEach(function (k) { try { global.localStorage.removeItem(K[k]); } catch (e) {} });
    },
    exportAll: function () {
      return {
        products: API.getProducts(), categories: API.getCategories(), media: API.getMedia(),
        settings: API.getSettings(), homepage: API.getHomepage(),
      };
    },
    importAll: function (data) {
      if (data.products) API.saveProducts(data.products);
      if (data.categories) API.saveCategories(data.categories);
      if (data.media) API.saveMedia(data.media);
      if (data.settings) API.saveSettings(data.settings);
      if (data.homepage) API.saveHomepage(data.homepage);
    },
    stats: function () {
      var ps = API.getProducts();
      return {
        total: ps.length,
        published: ps.filter(function (p) { return p.visible; }).length,
        hidden: ps.filter(function (p) { return !p.visible; }).length,
        categories: API.getCategories().length,
        low: ps.filter(function (p) { var t = API.stockTotal(p); return t !== null && t > 0 && t <= 3; }).length,
        out: ps.filter(function (p) { return API.stockTotal(p) === 0; }).length,
        sale: ps.filter(function (p) { return p.old > p.price; }).length,
      };
    },
  };

  global.CLS = API;
})(typeof window !== "undefined" ? window : globalThis);
