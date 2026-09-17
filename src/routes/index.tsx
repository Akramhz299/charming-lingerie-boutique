import { createFileRoute } from "@tanstack/react-router";

const title = "Charming Lil Store — Lingerie & Pyjamas au Maroc";
const description =
  "Lingerie féminine, soutiens-gorge, culottes et pyjamas élégants. Prix en MAD, paiement à la livraison partout au Maroc.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/store.html"
      title="Charming Lil Store"
      className="h-screen w-full border-0"
    />
  );
}
