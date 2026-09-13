const opportunities = [
  { id: "op-1", title: "Solar-Powered Water Purification Prototype", needType: "Manufacturing Partner", estimatedCost: "₹4.8 lakh" },
];

export function listOpportunities(req, res) {
  res.json(opportunities);
}
