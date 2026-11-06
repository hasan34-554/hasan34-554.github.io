/* =====================================================================
   MY MEASUREMENT TOOLS
   ---------------------------------------------------------------------
   HOW TO ADD A TOOL:
   1. Copy one block { ... }, including the comma after the closing brace.
   2. Paste it inside the list below.
   3. Change the text. Save the file and refresh your website.

   HOW TO CHANGE A TOOL: edit the text inside its block.
   HOW TO REMOVE A TOOL: delete its whole { ... }, block.

   FIELDS
   name        : tool name (required)
   category    : used for the filter buttons, e.g. "Can Seam", "Brix", "Weight"
   description : short explanation of what it does
   icon        : an emoji shown when you have no image
   image       : optional picture, e.g. "images/seam-gauge.jpg" (leave "" for none)
   specs       : optional list of "Label: value" details
   link        : optional link (a page, PDF, Excel file, video...) (leave "" for none)
   linkText    : text on the button, e.g. "Download", "Open tool", "Watch video"
   ===================================================================== */

const TOOLS = [
  {
    name: "Overlap % Calculator",
    category: "Can Seam",
    description: "Calculates seam overlap percentage from seam width, body hook and cover hook. Includes can presets, result history and a PDF report download.",
    icon: "📏",
    image: "",
    specs: [
      "Measures: Seam overlap (%OL)",
      "Inputs: W, BH, CH, tb, tc",
      "Presets: Can codes 15173 and 9118",
      "Export: PDF report"
    ],
    link: "tools/overlap-calculator.html",
    linkText: "Open calculator"
  },
  {
    name: "Brix / Soluble Solids Calculator",
    category: "Food Quality",
    description: "Convert a sample's mass and refractometer reading into soluble-solids and water mass for quick quality checks.",
    icon: "🍎",
    image: "",
    specs: [
      "Measures: Soluble solids mass",
      "Inputs: Sample mass and Brix",
      "Output: Solids and water mass",
      "Units: g, kg or any consistent mass unit"
    ],
    link: "tools/brix-calculator.html",
    linkText: "Open calculator"
  }
];
