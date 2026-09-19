import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

import { SIZES, SIZE_GUIDE } from "../catalog";

export default defineTool({
  name: "size_guide",
  title: "Guide des tailles",
  description:
    "Guide des tailles Charming Lil Store : soutiens-gorge de 70A à 90D, culottes et pyjamas/ensembles de XS à XXL, avec la méthode de mesure.",
  annotations: { readOnlyHint: true, openWorldHint: false },
  inputSchema: {
    type: z
      .enum(["bra", "panty", "sleep"])
      .describe("bra = soutiens-gorge, panty = culottes, sleep = pyjamas et ensembles"),
  },
  handler: ({ type }) => ({
    content: [
      {
        type: "text",
        text: `Tailles disponibles : ${SIZES[type].join(", ")}\n\n${SIZE_GUIDE[type]}`,
      },
    ],
  }),
});
