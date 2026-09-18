import { createFileRoute } from "@tanstack/react-router";

const title = "Gestion produits — Charming Lil Store";
const description =
  "Espace de gestion : modifier les prix en MAD, les tailles disponibles et le stock des produits Charming Lil Store.";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Admin,
});

function Admin() {
  return (
    <iframe
      src="/admin.html"
      title="Gestion produits"
      className="h-screen w-full border-0"
    />
  );
}
