export default function Slide1Title() {
  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{
        backgroundColor: "#1A1B26",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        color: "#C0CAF5",
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          width: "22vw",
          height: "100vh",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          padding: "5vh 3vw",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1vw", marginBottom: "6vh" }}>
          <div
            style={{
              width: "1.5vw",
              height: "1.5vw",
              backgroundColor: "#7AA2F7",
              borderRadius: "0.3vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "0.7vw", height: "0.7vw", backgroundColor: "#1A1B26", borderRadius: "0.1vw" }} />
          </div>
          <div style={{ fontSize: "1.2vw", fontWeight: 600, color: "#FFFFFF" }}>BuildCalc</div>
        </div>

        <div style={{ fontSize: "0.9vw", fontWeight: 600, color: "#565F89", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2vh" }}>
          Nawigacja
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5vh", marginBottom: "4vh" }}>
          <div style={{ fontSize: "1vw", color: "#7AA2F7", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.5vw" }}>
            <span style={{ width: "4px", height: "1.2vw", backgroundColor: "#7AA2F7", borderRadius: "2px", flexShrink: 0, marginLeft: "-3vw" }} />
            Przegląd
          </div>
          <div style={{ fontSize: "1vw", color: "#C0CAF5", opacity: 0.6 }}>Problem</div>
          <div style={{ fontSize: "1vw", color: "#C0CAF5", opacity: 0.6 }}>Jak działa</div>
          <div style={{ fontSize: "1vw", color: "#C0CAF5", opacity: 0.6 }}>Zasięg i skala</div>
        </div>

        <div style={{ fontSize: "0.9vw", fontWeight: 600, color: "#565F89", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2vh" }}>
          Zasoby
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5vh" }}>
          <div style={{ fontSize: "1vw", color: "#C0CAF5", opacity: 0.6 }}>Kontakt</div>
          <div style={{ fontSize: "1vw", color: "#C0CAF5", opacity: 0.6 }}>Android APK</div>
        </div>

        <div style={{ marginTop: "auto", fontSize: "0.8vw", color: "#565F89" }}>
          v1.0.0 • 2026
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "7vh 6vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontSize: "1vw", color: "#7AA2F7", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "1.5vh" }}>
          Aplikacja Mobilna
        </div>

        <h1 style={{ fontSize: "4.5vw", fontWeight: 800, color: "#FFFFFF", margin: "0 0 0.5vh 0", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          BuildCalc
        </h1>
        <h2 style={{ fontSize: "2.8vw", fontWeight: 400, color: "#7AA2F7", margin: "0 0 2vh 0", letterSpacing: "-0.01em" }}>
          Wycena Robót
        </h2>

        <p style={{ fontSize: "1.3vw", color: "#9AA5CE", lineHeight: 1.6, maxWidth: "42vw", margin: "0 0 3.5vh 0", fontWeight: 400 }}>
          Profesjonalna wycena robót budowlanych w kilka sekund. Aplikacja mobilna dla wykonawców i ekip remontowych działająca w 13 krajach Europy.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "1.5vh 2vw",
            backgroundColor: "rgba(158, 206, 106, 0.1)",
            border: "1px solid rgba(158, 206, 106, 0.25)",
            borderRadius: "0.5vw",
            marginBottom: "3.5vh",
            width: "fit-content",
          }}
        >
          <div style={{ fontSize: "1.1vw", fontWeight: 700, color: "#9ECE6A", marginRight: "1.5vw", fontFamily: "'DM Mono', monospace" }}>
            Android
          </div>
          <div style={{ fontSize: "1.1vw", color: "#FFFFFF", fontFamily: "'DM Mono', monospace" }}>
            /wycena/nowa — Eksport PDF — Offline
          </div>
        </div>

        <div style={{ display: "flex", gap: "3vw" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2vh" }}>
            <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#FFFFFF", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "1vh" }}>
              Zasięg
            </div>
            <div
              style={{
                backgroundColor: "#16161E",
                borderRadius: "0.5vw",
                padding: "2vh 2vw",
                border: "1px solid rgba(255,255,255,0.05)",
                fontFamily: "'DM Mono', monospace",
                fontSize: "1vw",
                lineHeight: 1.8,
              }}
            >
              <div><span style={{ color: "#7AA2F7" }}>kraje</span><span style={{ color: "#565F89" }}>:</span> <span style={{ color: "#E0AF68" }}>13</span></div>
              <div><span style={{ color: "#7AA2F7" }}>języki</span><span style={{ color: "#565F89" }}>:</span> <span style={{ color: "#E0AF68" }}>7</span></div>
              <div><span style={{ color: "#7AA2F7" }}>waluty</span><span style={{ color: "#565F89" }}>:</span> <span style={{ color: "#E0AF68" }}>8</span></div>
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2vh" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "1vh" }}>
              <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#FFFFFF" }}>Funkcje</div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5vw" }}>
                <div style={{ width: "0.6vw", height: "0.6vw", backgroundColor: "#9ECE6A", borderRadius: "50%" }} />
                <div style={{ fontSize: "0.85vw", fontFamily: "'DM Mono', monospace", color: "#9ECE6A" }}>offline-ready</div>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#16161E",
                borderRadius: "0.5vw",
                padding: "2vh 2vw",
                border: "1px solid rgba(255,255,255,0.05)",
                fontFamily: "'DM Mono', monospace",
                fontSize: "1vw",
                lineHeight: 1.8,
              }}
            >
              <div><span style={{ color: "#7AA2F7" }}>typy_robót</span><span style={{ color: "#565F89" }}>:</span> <span style={{ color: "#E0AF68" }}>49</span></div>
              <div><span style={{ color: "#7AA2F7" }}>kategorie</span><span style={{ color: "#565F89" }}>:</span> <span style={{ color: "#E0AF68" }}>13</span></div>
              <div><span style={{ color: "#7AA2F7" }}>eksport</span><span style={{ color: "#565F89" }}>:</span> <span style={{ color: "#9ECE6A" }}>"PDF"</span></div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end" }}>
          <div style={{ fontSize: "0.9vw", color: "#565F89" }}>BuildCalc, 2026</div>
        </div>
      </div>
    </div>
  );
}
