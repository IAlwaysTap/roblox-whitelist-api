let whitelist = new Set([
  "sample-hwid-1",
  "sample-hwid-2",
]);

export default function handler(req, res) {
  if (req.method === "POST") {
    const { hwid, action } = req.body;

    if (!hwid) {
      return res.status(400).json({ success: false, reason: "No HWID provided" });
    }

    if (action === "check") {
      if (whitelist.has(hwid)) {
        return res.json({ success: true });
      } else {
        return res.json({ success: false, reason: "Not whitelisted" });
      }
    } else if (action === "add") {
      whitelist.add(hwid);
      return res.json({ success: true });
    } else {
      return res.status(400).json({ success: false, reason: "Invalid action" });
    }
  } else {
    return res.status(405).json({ success: false, reason: "Method not allowed" });
  }
}
