/* =====================================================================
   MY MEASUREMENT TOOLS + RESEARCH DOCUMENTS
   ---------------------------------------------------------------------
   HOW TO ADD A TOOL:
   1. Copy one block { ... }, including the comma after the closing brace.
   2. Paste it inside the TOOLS list below.
   3. Change the text. Save the file and refresh your website.

   HOW TO CHANGE A TOOL: edit the text inside its block.
   HOW TO REMOVE A TOOL: delete its whole { ... }, block.

   TOOL FIELDS
   name        : tool name (required)
   category    : used for the filter buttons, e.g. "Can Seam", "Food Quality"
   description : short explanation of what it does
   useCase     : (optional) the real factory-floor situation it is used in
   impact      : (optional) what it improves for the quality team
   icon        : an emoji shown when you have no image
   image       : optional picture, e.g. "images/seam-gauge.jpg" (leave "" for none)
   specs       : optional list of "Label: value" details
   link        : optional link (a page, PDF, Excel file, video...) (leave "" for none)
   linkText    : text on the button, e.g. "Open calculator", "Download"

   RESEARCH FIELDS (second list, further down)
   type, title, org, description, tags, link, linkText
   If link is "" the card shows a "Request a copy" email button instead.
   ===================================================================== */

const TOOLS = [
  {
    name: "Overlap % Calculator",
    category: "Can Seam",
    description: "Calculates seam overlap percentage from seam width, body hook and cover hook. Includes can presets, result history and a PDF report download.",
    useCase: "After a double-seam teardown, raw measurements need to become a clear overlap value quickly, at the line, for every check.",
    impact: "Reduces manual calculation errors, keeps results in one traceable PDF report and speeds up line-side seam decisions.",
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
    useCase: "A refractometer gives a Brix percentage, but quality checks often need the actual solids and water mass in a given sample.",
    impact: "Gives instant, consistent numbers for in-process checks without opening a spreadsheet or redoing the arithmetic by hand.",
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
  },
  {
    name: "Brix Sugar Water Ratio Calculator",
    category: "Food Quality",
    description: "Estimate fruit solids, syrup solids, required syrup Brix and sugar quantity for pineapple canning batches.",
    useCase: "Hitting a target Brix in the can depends on fruit solids, juice and syrup working together, and the sums are easy to get wrong during a busy batch.",
    impact: "Standardises the syrup and sugar calculation across batches, helping reduce over- or under-sugaring and rework.",
    icon: "🍍",
    image: "",
    specs: [
      "Inputs: Fruit, juice and target Brix",
      "Checks: Slice, net and liquid weight",
      "Output: Syrup and sugar requirements",
      "Action: Print the calculation"
    ],
    link: "tools/Pineapple%20bricks%20claculator.html",
    linkText: "Open calculator"
  }
];

/* ---------------------------------------------------------------------
   RESEARCH & DOCUMENTATION
   All documents shown here must be sanitized: no company names on
   internal records, no confidential specifications or batch data.
   TODO: add your exact thesis title to the first block when ready.
   --------------------------------------------------------------------- */
const RESEARCH = [
  {
    type: "Thesis",
    title: "B.Sc. Undergraduate Research Thesis",
    org: "Daffodil International University · Nutrition & Food Engineering",
    description: "Final-year research thesis submitted for my B.Sc. in Nutrition and Food Engineering. Full text is available on request.",
    tags: ["Research", "Food engineering"],
    link: "",
    linkText: ""
  },
  {
    type: "Internship report",
    title: "Industrial QA/QC Internship Report",
    org: "Euro Foods Group · Ashulia, Savar · Sep – Nov 2025",
    description: "Sanitized summary of my industrial training: food manufacturing operations, quality checks and GMP practice. Contains no confidential company data.",
    tags: ["Industrial training", "GMP"],
    link: "",
    linkText: ""
  },
  {
    type: "QC template",
    title: "Double-Seam & Retort Verification QC Log",
    org: "Sanitized template · Canned food quality control",
    description: "A sanitized template showing how double-seam teardown measurements and retort verification checks can be recorded clearly and traceably.",
    tags: ["Can seam", "Retort", "Records"],
    link: "docs/can-seam-qc-template.pdf",
    linkText: "View PDF"
  }
];
