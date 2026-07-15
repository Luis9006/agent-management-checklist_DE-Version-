import { useState } from "react";

// ── Daten ─────────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "kennzahlen",
    label: "Leistungskennzahlen",
    icon: "📊",
    color: "#FF7A59",
    description: "Lösungsrate und Kundenzufriedenheit gemeinsam betrachten.",
    items: [
      {
        id: "m1",
        text: "Haben Sie die Lösungsrate des Agenten im betreffenden Zeitraum überprüft?",
        detail: "Referenz: Führende Teams erreichen 80–90 % (Freshworks CX Benchmark 2025).",
      },
      {
        id: "m2",
        text: "Haben Sie den CSAT-Wert des Agenten im gleichen Zeitraum überprüft?",
        detail: "Branchendurchschnitt: 75–85 %. Die besten Teams nähern sich 90 % an.",
      },
      {
        id: "m3",
        text: "Entwickeln sich beide Kennzahlen in dieselbe Richtung?",
        detail: "Steigt die Lösungsrate, während der CSAT sinkt, schließt der Agent Gespräche, ohne sie wirklich zu lösen.",
      },
      {
        id: "m4",
        text: "Hat sich das vom Agenten bearbeitete Ticket-Volumen gegenüber dem Vorjeitraum verändert?",
        detail: "Eine deutliche Veränderung kann auf eine Ausweitung des Aufgabenbereichs des Agenten hinweisen.",
      },
      {
        id: "m5",
        text: "Gibt es eine dokumentierte Basislinie, mit der diese Kennzahlen verglichen werden können?",
        detail: "Ohne Ausgangswert fehlt der Kontext, um Verbesserungen einzuordnen.",
      },
    ],
  },
  {
    id: "wissenluecken",
    label: "Wissenslücken",
    icon: "🔍",
    color: "#00BDA5",
    description: "Erkennen, was der Agent wegen fehlender Informationen weiterleitet — nicht wegen Komplexität.",
    items: [
      {
        id: "v1",
        text: "Haben Sie die Gespräche analysiert, in denen der Agent an einen Menschen weitergeleitet hat?",
        detail: "Unterscheiden Sie: War die Weiterleitung wegen Komplexität nötig oder wegen fehlender Information?",
      },
      {
        id: "v2",
        text: "Haben Sie wiederkehrende Themen bei diesen Weiterleitungen identifiziert?",
        detail: "Lücken, die mehr als einmal auftreten, sind sofortige Kandidaten für eine Aktualisierung.",
      },
      {
        id: "v3",
        text: "Gibt es einen Prozess, um erkannte Wissenslücken in Trainingsaktualisierungen umzuwandeln?",
        detail: "Ungelöste Lücken häufen sich an und verschlechtern die Leistung des Agenten schrittweise.",
      },
      {
        id: "v4",
        text: "Spiegelt die Wissensbasis des Agenten aktuelle Änderungen bei Produkten, Preisen oder Richtlinien wider?",
        detail: "Veraltete Inhalte führen zu falschen Antworten, selbst wenn der Agent technisch einwandfrei funktioniert.",
      },
      {
        id: "v5",
        text: "Haben Sie geprüft, ob die Trainingsquellen für den Agenten lesbar sind?",
        detail: "Seiten mit viel JavaScript oder unstrukturierte PDFs werden möglicherweise nicht korrekt interpretiert.",
      },
    ],
  },
  {
    id: "autonomie",
    label: "Autonomiestufen",
    icon: "⚖️",
    color: "#516F90",
    description: "Autonomie wird nicht gewährt — sie wird durch Belege aufgebaut.",
    items: [
      {
        id: "a1",
        text: "Haben Sie festgelegt, welche Arten von Anfragen der Agent eigenständig bearbeiten darf?",
        detail: "Empfohlenes Kriterium: öffentliche Information + vorhersehbarer Ablauf = Autonomie zulässig.",
      },
      {
        id: "a2",
        text: "Haben Sie die Kriterien für die Weiterleitung an einen Menschen definiert?",
        detail: "Beispiele: sensible Informationen, Frustrationssignale, mehr als 3 Austausche ohne Lösung.",
      },
      {
        id: "a3",
        text: "Wurden die Autonomiegrenzen seit dem letzten Zeitraum überprüft?",
        detail: "Grenzen, die beim Launch funktionierten, können Monate später nicht mehr angemessen sein.",
      },
      {
        id: "a4",
        text: "Haben Nutzer einen Einblick in das, was der Agent tut?",
        detail: "Transparenz schafft Vertrauen. Je mehr Vertrauen aufgebaut wird, desto nachhaltiger ist die Autonomie.",
      },
      {
        id: "a5",
        text: "Sind Schlüsselwörter oder Themen konfiguriert, die eine sofortige Weiterleitung auslösen?",
        detail: "Beispiele: 'Ich möchte kündigen', 'Ich bin sehr unzufrieden', Themen außerhalb des Zuständigkeitsbereichs.",
      },
    ],
  },
  {
    id: "verbesserung",
    label: "Verbesserungszyklus",
    icon: "🔄",
    color: "#7C4DFF",
    description: "Beobachten ohne zu handeln ist keine Verwaltung — es ist passive Überwachung.",
    items: [
      {
        id: "c1",
        text: "Werden die Erkenntnisse dieses Audits in einem Dokument festgehalten?",
        detail: "Ohne schriftliche Aufzeichnung bleiben Muster unsichtbar. Der Verbesserungszyklus braucht institutionelles Gedächtnis.",
      },
      {
        id: "c2",
        text: "Wurden seit dem letzten Audit konkrete Änderungen umgesetzt?",
        detail: "Lautet die Antwort Nein, schließt der Auditprozess den Verbesserungskreislauf nicht.",
      },
      {
        id: "c3",
        text: "Ist eine Person oder ein Team klar dafür verantwortlich, auf die Erkenntnisse zu reagieren?",
        detail: "Ohne klare Verantwortlichkeit bleiben Erkenntnisse im Bericht und erzeugen keine Verbesserung.",
      },
      {
        id: "c4",
        text: "Ist die Audit-Häufigkeit dem Reifegrad des Agenten angepasst?",
        detail: "Neuer Agent: häufige Überwachung. Reifer Agent mit solidem Verlauf: regelmäßige Überprüfung.",
      },
      {
        id: "c5",
        text: "Haben Sie überprüft, ob die umgesetzten Änderungen die erwartete Verbesserung bewirkt haben?",
        detail: "Eine Anpassung ohne Überprüfung unterbricht den Zyklus. Verbesserung erfordert Bestätigung, nicht nur Aktion.",
      },
    ],
  },
];

const STATUS = {
  pending: { label: "Nicht bewertet", color: "#CBD6E2", bg: "#F5F8FA" },
  yes: { label: "Ja", color: "#00BDA5", bg: "#E5F8F6" },
  no: { label: "Nein", color: "#FF7A59", bg: "#FFF3F0" },
  na: { label: "N/A", color: "#7C98B6", bg: "#EAF0F6" },
};

// ── Komponenten ───────────────────────────────────────────────────────────────

function ScoreRing({ pct, color }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width="72" height="72" viewBox="0 0 72 72">
      <circle cx="36" cy="36" r={r} fill="none" stroke="#E5E5E5" strokeWidth="7" />
      <circle
        cx="36" cy="36" r={r}
        fill="none" stroke={color} strokeWidth="7"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 36 36)"
        style={{ transition: "stroke-dasharray 0.5s ease" }}
      />
      <text x="36" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2D3E50">
        {pct}%
      </text>
    </svg>
  );
}

function CheckItem({ item, status, onToggle }) {
  const [open, setOpen] = useState(false);
  const s = STATUS[status];

  return (
    <div style={{
      background: s.bg,
      border: `1.5px solid ${status === "pending" ? "#DDE3EC" : s.color}`,
      borderRadius: "10px",
      marginBottom: "10px",
      overflow: "hidden",
      transition: "border-color 0.2s",
    }}>
      <div
        style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", cursor: "pointer" }}
        onClick={() => setOpen((o) => !o)}
      >
        <div
          style={{ display: "flex", gap: "6px", flexShrink: 0, marginTop: "2px" }}
          onClick={(e) => e.stopPropagation()}
        >
          {["yes", "no", "na"].map((v) => (
            <button
              key={v}
              onClick={() => onToggle(v)}
              title={STATUS[v].label}
              style={{
                width: "28px", height: "28px", borderRadius: "6px",
                border: `2px solid ${status === v ? STATUS[v].color : "#CBD6E2"}`,
                background: status === v ? STATUS[v].color : "white",
                color: status === v ? "white" : "#7C98B6",
                fontWeight: "700", fontSize: "10px", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.15s",
              }}
            >
              {v === "yes" ? "J" : v === "no" ? "N" : "—"}
            </button>
          ))}
        </div>
        <p style={{
          margin: 0, fontSize: "14px", color: "#2D3E50", lineHeight: "1.5",
          flex: 1, fontWeight: status === "pending" ? "400" : "500",
        }}>
          {item.text}
        </p>
        <span style={{ fontSize: "12px", color: "#7C98B6", flexShrink: 0, marginTop: "4px" }}>
          {open ? "▲" : "▼"}
        </span>
      </div>

      {open && (
        <div style={{
          padding: "0 16px 14px 58px", fontSize: "13px", color: "#516F90",
          lineHeight: "1.6", borderTop: `1px solid ${s.color}22`,
        }}>
          💡 {item.detail}
        </div>
      )}
    </div>
  );
}

function SectionCard({ section, statuses, onToggle }) {
  const answered = section.items.filter((i) => statuses[i.id] !== "pending").length;
  const yesCount = section.items.filter((i) => statuses[i.id] === "yes").length;
  const pct = Math.round((yesCount / section.items.length) * 100);
  const progress = Math.round((answered / section.items.length) * 100);
  const [open, setOpen] = useState(true);

  return (
    <div style={{
      background: "white", borderRadius: "14px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
      marginBottom: "20px", overflow: "hidden", border: "1px solid #EAF0F6",
    }}>
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex", alignItems: "center", gap: "14px",
          padding: "18px 20px", cursor: "pointer",
          borderLeft: `5px solid ${section.color}`,
          background: open ? "white" : "#FAFBFC",
        }}
      >
        <span style={{ fontSize: "22px" }}>{section.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: "700", fontSize: "16px", color: "#2D3E50" }}>{section.label}</div>
          <div style={{ fontSize: "12px", color: "#7C98B6", marginTop: "2px" }}>{section.description}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ textAlign: "center" }}>
            <ScoreRing pct={pct} color={section.color} />
            <div style={{ fontSize: "10px", color: "#7C98B6", marginTop: "2px" }}>Erfüllungsgrad</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "12px", color: "#7C98B6" }}>{answered}/{section.items.length} bewertet</div>
            <div style={{ width: "80px", height: "6px", background: "#EAF0F6", borderRadius: "3px", marginTop: "6px", overflow: "hidden" }}>
              <div style={{ width: `${progress}%`, height: "100%", background: section.color, borderRadius: "3px", transition: "width 0.3s ease" }} />
            </div>
          </div>
          <span style={{ color: "#CBD6E2", fontSize: "16px" }}>{open ? "▲" : "▼"}</span>
        </div>
      </div>

      {open && (
        <div style={{ padding: "16px 20px 20px" }}>
          {section.items.map((item) => (
            <CheckItem
              key={item.id}
              item={item}
              status={statuses[item.id] || "pending"}
              onToggle={(val) => onToggle(item.id, val)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Hauptanwendung ─────────────────────────────────────────────────────────────

export default function App() {
  const initialState = {};
  SECTIONS.forEach((s) => s.items.forEach((i) => (initialState[i.id] = "pending")));
  const [statuses, setStatuses] = useState(initialState);
  const [agentName, setAgentName] = useState("");
  const [period, setPeriod] = useState("");
  const [exported, setExported] = useState(false);

  const handleToggle = (id, val) => {
    setStatuses((prev) => ({ ...prev, [id]: prev[id] === val ? "pending" : val }));
  };

  const handleReset = () => {
    const fresh = {};
    SECTIONS.forEach((s) => s.items.forEach((i) => (fresh[i.id] = "pending")));
    setStatuses(fresh);
    setExported(false);
  };

  const allItems = SECTIONS.flatMap((s) => s.items);
  const totalAnswered = allItems.filter((i) => statuses[i.id] !== "pending").length;
  const totalYes = allItems.filter((i) => statuses[i.id] === "yes").length;
  const totalNo = allItems.filter((i) => statuses[i.id] === "no").length;
  const globalPct = Math.round((totalYes / allItems.length) * 100);
  const completionPct = Math.round((totalAnswered / allItems.length) * 100);

  const riskLevel =
    globalPct >= 80 ? { label: "Geringes Risiko", color: "#00BDA5", icon: "✅" }
    : globalPct >= 50 ? { label: "Moderates Risiko", color: "#F5C26B", icon: "⚠️" }
    : { label: "Hohes Risiko", color: "#FF7A59", icon: "🔴" };

  const handleExport = () => {
    const lines = [
      `LEISTUNGSAUDIT FÜR KI-AGENTEN`,
      `Agent: ${agentName || "(nicht angegeben)"}`,
      `Zeitraum: ${period || "(nicht angegeben)"}`,
      `Datum: ${new Date().toLocaleDateString("de-DE")}`,
      ``,
      `ZUSAMMENFASSUNG`,
      `Gesamterfüllungsgrad: ${globalPct}%`,
      `Risikoniveau: ${riskLevel.label}`,
      `Bewertete Elemente: ${totalAnswered}/${allItems.length}`,
      `Antworten Ja: ${totalYes} | Nein: ${totalNo}`,
      ``,
    ];

    SECTIONS.forEach((sec) => {
      lines.push(`── ${sec.label.toUpperCase()} ──`);
      sec.items.forEach((item) => {
        const s = statuses[item.id];
        const label = s === "yes" ? "JA" : s === "no" ? "NEIN" : s === "na" ? "N/A" : "NICHT BEWERTET";
        lines.push(`[${label}] ${item.text}`);
      });
      lines.push("");
    });

    lines.push(`Erstellt mit KI-Agenten-Audit · HubSpot Academy`);

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `agenten-audit-${agentName || "ohne-name"}-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F5F8FA", fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" }}>

      {/* Kopfzeile */}
      <div style={{ background: "linear-gradient(135deg, #2D3E50 0%, #1A252F 100%)", padding: "32px 24px 28px", color: "white" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "1.5px", color: "#FF7A59", textTransform: "uppercase" }}>
              HubSpot Academy
            </span>
            <span style={{ color: "#516F90", fontSize: "11px" }}>·</span>
            <span style={{ fontSize: "11px", color: "#7C98B6", letterSpacing: "0.5px" }}>
              KI-Agenten trainieren und verwalten
            </span>
          </div>
          <h1 style={{ margin: "0 0 6px", fontSize: "26px", fontWeight: "800", letterSpacing: "-0.3px" }}>
            Periodisches Leistungsaudit
          </h1>
          <p style={{ margin: 0, fontSize: "14px", color: "#B0C3D4", lineHeight: "1.6" }}>
            Überwachen Sie die Leistung Ihres Agenten mit konkreten Daten. Jedes nicht bewertete
            Element ist ein nicht verwaltetes Risiko.
          </p>

          <div style={{ display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap" }}>
            <input
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="Name des Agenten"
              style={{
                background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.2)",
                borderRadius: "8px", padding: "8px 14px", color: "white",
                fontSize: "13px", outline: "none", width: "200px",
              }}
            />
            <input
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder="Zeitraum (z. B. Jun–Jul 2026)"
              style={{
                background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.2)",
                borderRadius: "8px", padding: "8px 14px", color: "white",
                fontSize: "13px", outline: "none", width: "220px",
              }}
            />
          </div>
        </div>
      </div>

      {/* Zusammenfassungsleiste */}
      <div style={{
        background: "white", borderBottom: "1px solid #EAF0F6",
        padding: "16px 24px", position: "sticky", top: 0, zIndex: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <ScoreRing pct={globalPct} color={riskLevel.color} />
            <div>
              <div style={{ fontWeight: "700", fontSize: "14px", color: "#2D3E50" }}>
                {riskLevel.icon} {riskLevel.label}
              </div>
              <div style={{ fontSize: "12px", color: "#7C98B6" }}>
                {totalAnswered}/{allItems.length} Elemente bewertet
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px", flex: 1 }}>
            {[
              { label: "Ja", val: totalYes, color: "#00BDA5" },
              { label: "Nein", val: totalNo, color: "#FF7A59" },
              { label: "Ausstehend", val: allItems.length - totalAnswered, color: "#CBD6E2" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontWeight: "800", fontSize: "20px", color: s.color }}>{s.val}</div>
                <div style={{ fontSize: "11px", color: "#7C98B6" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handleReset}
              style={{
                padding: "8px 16px", borderRadius: "8px", border: "1.5px solid #CBD6E2",
                background: "white", color: "#516F90", fontSize: "12px", fontWeight: "600", cursor: "pointer",
              }}
            >
              Zurücksetzen
            </button>
            <button
              onClick={handleExport}
              style={{
                padding: "8px 16px", borderRadius: "8px", border: "none",
                background: "#FF7A59", color: "white", fontSize: "12px", fontWeight: "700",
                cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
              }}
            >
              {exported ? "✓ Heruntergeladen" : "↓ Bericht exportieren"}
            </button>
          </div>
        </div>

        <div style={{ maxWidth: "780px", margin: "12px auto 0" }}>
          <div style={{ height: "4px", background: "#EAF0F6", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{
              width: `${completionPct}%`, height: "100%",
              background: "linear-gradient(90deg, #FF7A59, #7C4DFF)",
              borderRadius: "2px", transition: "width 0.4s ease",
            }} />
          </div>
          <div style={{ fontSize: "11px", color: "#7C98B6", marginTop: "4px", textAlign: "right" }}>
            {completionPct}% abgeschlossen
          </div>
        </div>
      </div>

      {/* Legende */}
      <div style={{ maxWidth: "780px", margin: "16px auto 0", padding: "0 24px" }}>
        <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#7C98B6", flexWrap: "wrap" }}>
          <span>Anleitung: Wählen Sie für jedes Element</span>
          {[
            { key: "yes", label: "J = Ja", color: "#00BDA5" },
            { key: "no", label: "N = Nein", color: "#FF7A59" },
            { key: "na", label: "— = Nicht zutreffend", color: "#7C98B6" },
          ].map((b) => (
            <span key={b.key} style={{ color: b.color, fontWeight: "600" }}>{b.label}</span>
          ))}
          <span>· Klicken Sie auf ein Element, um Details anzuzeigen.</span>
        </div>
      </div>

      {/* Abschnitte */}
      <div style={{ maxWidth: "780px", margin: "16px auto 0", padding: "0 24px 48px" }}>
        {SECTIONS.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            statuses={statuses}
            onToggle={handleToggle}
          />
        ))}

        {/* Fußnote */}
        <div style={{
          background: "#2D3E50", borderRadius: "12px", padding: "18px 22px",
          color: "#B0C3D4", fontSize: "13px", lineHeight: "1.7",
        }}>
          <span style={{ color: "#FF7A59", fontWeight: "700" }}>Merken Sie sich: </span>
          Einen Agenten zu aktivieren ist kein Endziel — es ist der Beginn einer neuen Verantwortung.
          Dieses Audit misst nicht, ob der Agent gut ist. Es misst, ob das Team den Agenten gut verwaltet.
        </div>
      </div>
    </div>
  );
}
