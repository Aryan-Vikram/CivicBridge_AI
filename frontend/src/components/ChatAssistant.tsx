import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { getChallengeById } from "../data/challenges";
import { getUniversityById } from "../data/universities";

interface Msg {
  role: "user" | "assistant";
  text: string;
}

const SUGGESTIONS = [
  "How do I report a problem?",
  "Track CB-JH-2026-10452",
  "Why was BIT Mesra selected?",
  "Show water problems near Ranchi",
];

function respond(input: string, lang: "en" | "hi"): string {
  const lower = input.toLowerCase();

  const idMatch = input.match(/CB-JH-\d{4}-\d+/i);
  if (idMatch) {
    const challenge = getChallengeById(idMatch[0].toUpperCase());
    if (challenge) {
      const uni = challenge.assignedUniversityId ? getUniversityById(challenge.assignedUniversityId) : undefined;
      return lang === "hi"
        ? `${challenge.displayId}: "${challenge.title}" वर्तमान में "${challenge.status}" चरण में है (${challenge.progress}% पूर्ण)।${uni ? ` इसे ${uni.shortName} को सौंपा गया है।` : ""}`
        : `${challenge.displayId} — "${challenge.title}" is currently in the "${challenge.status}" stage (${challenge.progress}% complete).${uni ? ` It's assigned to ${uni.shortName}.` : ""} You can see the full timeline on its tracking page.`;
    }
    return lang === "hi" ? "मुझे यह चैलेंज आईडी नहीं मिली।" : "I couldn't find that challenge ID in the demo data.";
  }

  if (lower.includes("report") && lower.includes("problem")) {
    return lang === "hi"
      ? 'समस्या दर्ज करने के लिए ऊपर "Report a Problem" पर क्लिक करें। यह एक 5-चरण विज़ार्ड है: विवरण, प्रमाण, AI विश्लेषण, परिणाम और स्मार्ट मैचिंग।'
      : 'Tap "Report a Problem" in the navigation. It\'s a 5-step wizard: problem details, evidence, AI analysis, results, then smart university matching.';
  }

  if (lower.includes("bit mesra") || lower.includes("why") && lower.includes("select")) {
    return lang === "hi"
      ? "BIT Mesra को इसकी पर्यावरण इंजीनियरिंग विशेषज्ञता, 48 पूर्ण परियोजनाओं, आवश्यक प्रयोगशाला अवसंरचना और 89% सफलता दर के आधार पर 94% मैच स्कोर मिला।"
      : "BIT Mesra scored a 94% match based on its Environmental Engineering expertise, 48 completed similar projects, required lab infrastructure, and an 89% historical success rate. You can see the full breakdown on any challenge's tracking page.";
  }

  if (lower.includes("water") && lower.includes("ranchi")) {
    return lang === "hi"
      ? "रांची में कई सक्रिय जल-प्रबंधन चुनौतियाँ हैं, जिनमें बरवाडीह में कुआं संदूषण भी शामिल है। पूरी सूची के लिए Explore पेज देखें और District = Ranchi फ़िल्टर करें।"
      : "There are several active Water Management challenges in Ranchi, including the Barwadih well contamination case. Open Explore and filter by District = Ranchi, Category = Water Management to see them all.";
  }

  if (lower.includes("priority")) {
    return lang === "hi"
      ? "प्राथमिकता स्कोर गंभीरता, प्रभावित नागरिकों की संख्या और साक्ष्य की स्पष्टता के आधार पर 1-10 के पैमाने पर परिकलित होता है।"
      : "Priority score is calculated on a 1–10 scale from severity, number of affected citizens, and clarity/completeness of submitted evidence. Higher scores route faster through matching.";
  }

  if (lower.includes("who") && lower.includes("work")) {
    return lang === "hi"
      ? "अपनी समस्या पर काम कर रही टीम देखने के लिए ट्रैकिंग पेज पर जाएं — वहां संकाय सलाहकार और छात्र शोधकर्ता सूचीबद्ध होते हैं।"
      : "Open your challenge's tracking page — the research team section lists the faculty mentor, student lead, and researchers currently assigned.";
  }

  return lang === "hi"
    ? "मैं आपकी समस्या रिपोर्ट करने, चैलेंज ट्रैक करने, या यह समझने में मदद कर सकता हूं कि AI ने कोई विश्वविद्यालय क्यों चुना। कृपया अधिक विवरण दें।"
    : "I can help you report a problem, track a challenge by its ID, or explain why a university was matched. Try one of the suggestions below, or ask me something specific.";
}

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Hi, I'm the CivicBridge Assistant. Ask me to track a challenge, explain a match, or find nearby problems." },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }, { role: "assistant", text: respond(text, lang) }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 flex h-[480px] w-[340px] flex-col overflow-hidden rounded-xl2 border border-slate-200 bg-white shadow-card dark:border-white/10 dark:bg-navy-800">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-white/10">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-royal-600 p-1.5 text-white"><Sparkles size={14} /></div>
              <span className="font-display text-sm font-semibold text-slate-900 dark:text-white">CivicBridge Assistant</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang((l) => (l === "en" ? "hi" : "en"))}
                className="rounded-md border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-500 dark:border-white/10 dark:text-slate-400"
              >
                {lang === "en" ? "EN" : "हिं"}
              </button>
              <button onClick={() => setOpen(false)} aria-label="Close assistant" className="text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((m, i) => (
              <div key={i} className={"flex " + (m.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={
                    "max-w-[85%] rounded-xl px-3 py-2 text-sm " +
                    (m.role === "user"
                      ? "bg-royal-600 text-white"
                      : "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200")
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 px-3 py-2 dark:border-white/10">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-500 hover:border-royal-300 hover:text-royal-600 dark:border-white/10 dark:text-slate-400"
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder={lang === "hi" ? "कुछ पूछें..." : "Ask something..."}
                className="focus-ring flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-white/10 dark:bg-navy-900"
              />
              <button
                onClick={() => send(input)}
                aria-label="Send"
                className="rounded-lg bg-royal-600 p-2 text-white hover:bg-royal-700"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open CivicBridge Assistant"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-royal-600 text-white shadow-card transition hover:bg-royal-700"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
