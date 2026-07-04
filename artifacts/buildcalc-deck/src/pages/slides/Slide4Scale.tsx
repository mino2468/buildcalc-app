export default function Slide4Scale() {
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
          <div style={{ fontSize: "1vw", color: "#C0CAF5", opacity: 0.6 }}>Przegląd</div>
          <div style={{ fontSize: "1vw", color: "#C0CAF5", opacity: 0.6 }}>Problem</div>
          <div style={{ fontSize: "1vw", color: "#C0CAF5", opacity: 0.6 }}>Jak działa</div>
          <div style={{ fontSize: "1vw", color: "#7AA2F7", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.5vw" }}>
            <span style={{ width: "4px", height: "1.2vw", backgroundColor: "#7AA2F7", borderRadius: "2px", flexShrink: 0, marginLeft: "-3vw" }} />
            Zasięg i skala
          </div>
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
          Rynki i zasięg
        </div>

        <h1 style={{ fontSize: "4.5vw", fontWeight: 700, color: "#FFFFFF", margin: "0 0 1.5vh 0", letterSpacing: "-0.02em" }}>
          Zasięg i skala
        </h1>

        {/* Big stats row */}
        <div style={{ display: "flex", gap: "3vw", marginBottom: "3vh" }}>
          <div style={{ flex: 1, backgroundColor: "rgba(122,162,247,0.07)", borderRadius: "0.5vw", padding: "2vh 2vw", border: "1px solid rgba(122,162,247,0.15)", textAlign: "center" }}>
            <div style={{ fontSize: "4vw", fontWeight: 800, color: "#7AA2F7", letterSpacing: "-0.03em", lineHeight: 1 }}>13</div>
            <div style={{ fontSize: "1vw", color: "#9AA5CE", marginTop: "0.8vh", fontWeight: 500 }}>krajów</div>
          </div>
          <div style={{ flex: 1, backgroundColor: "rgba(158,206,106,0.07)", borderRadius: "0.5vw", padding: "2vh 2vw", border: "1px solid rgba(158,206,106,0.15)", textAlign: "center" }}>
            <div style={{ fontSize: "4vw", fontWeight: 800, color: "#9ECE6A", letterSpacing: "-0.03em", lineHeight: 1 }}>7</div>
            <div style={{ fontSize: "1vw", color: "#9AA5CE", marginTop: "0.8vh", fontWeight: 500 }}>języków</div>
          </div>
          <div style={{ flex: 1, backgroundColor: "rgba(224,175,104,0.07)", borderRadius: "0.5vw", padding: "2vh 2vw", border: "1px solid rgba(224,175,104,0.15)", textAlign: "center" }}>
            <div style={{ fontSize: "4vw", fontWeight: 800, color: "#E0AF68", letterSpacing: "-0.03em", lineHeight: 1 }}>49</div>
            <div style={{ fontSize: "1vw", color: "#9AA5CE", marginTop: "0.8vh", fontWeight: 500 }}>typów robót</div>
          </div>
        </div>

        {/* Two code blocks */}
        <div style={{ display: "flex", gap: "3vw" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.5vh" }}>
            <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#FFFFFF", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "1vh" }}>
              Kraje i waluty
            </div>
            <div
              style={{
                backgroundColor: "#16161E",
                borderRadius: "0.5vw",
                padding: "2vh 2vw",
                border: "1px solid rgba(255,255,255,0.05)",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.9vw",
                lineHeight: 1.7,
              }}
            >
              <div><span style={{ color: "#7AA2F7" }}>PL</span> <span style={{ color: "#565F89" }}>PLN</span>  <span style={{ color: "#7AA2F7" }}>DE</span> <span style={{ color: "#565F89" }}>EUR</span>  <span style={{ color: "#7AA2F7" }}>UK</span> <span style={{ color: "#565F89" }}>GBP</span></div>
              <div><span style={{ color: "#7AA2F7" }}>FR</span> <span style={{ color: "#565F89" }}>EUR</span>  <span style={{ color: "#7AA2F7" }}>NL</span> <span style={{ color: "#565F89" }}>EUR</span>  <span style={{ color: "#7AA2F7" }}>BE</span> <span style={{ color: "#565F89" }}>EUR</span></div>
              <div><span style={{ color: "#7AA2F7" }}>AT</span> <span style={{ color: "#565F89" }}>EUR</span>  <span style={{ color: "#7AA2F7" }}>CH</span> <span style={{ color: "#565F89" }}>CHF</span>  <span style={{ color: "#7AA2F7" }}>CZ</span> <span style={{ color: "#565F89" }}>CZK</span></div>
              <div><span style={{ color: "#7AA2F7" }}>SE</span> <span style={{ color: "#565F89" }}>SEK</span>  <span style={{ color: "#7AA2F7" }}>NO</span> <span style={{ color: "#565F89" }}>NOK</span>  <span style={{ color: "#7AA2F7" }}>UA</span> <span style={{ color: "#565F89" }}>UAH</span></div>
              <div><span style={{ color: "#7AA2F7" }}>ES</span> <span style={{ color: "#565F89" }}>EUR</span></div>
            </div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.5vh" }}>
            <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#FFFFFF", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "1vh" }}>
              Możliwości techniczne
            </div>
            <div
              style={{
                backgroundColor: "#16161E",
                borderRadius: "0.5vw",
                padding: "2vh 2vw",
                border: "1px solid rgba(255,255,255,0.05)",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.9vw",
                lineHeight: 1.7,
              }}
            >
              <div><span style={{ color: "#9ECE6A" }}>offline</span>: <span style={{ color: "#C0CAF5" }}>AsyncStorage, zero chmury</span></div>
              <div><span style={{ color: "#9ECE6A" }}>eksport</span>: <span style={{ color: "#C0CAF5" }}>"PDF z logo firmy"</span></div>
              <div><span style={{ color: "#9ECE6A" }}>kategorie</span>: <span style={{ color: "#E0AF68" }}>13</span> <span style={{ color: "#565F89" }}>{/* tynki — instalacje */}</span></div>
              <div><span style={{ color: "#9ECE6A" }}>języki</span>: <span style={{ color: "#C0CAF5" }}>pl, en, de, fr, uk, es, cs</span></div>
              <div><span style={{ color: "#9ECE6A" }}>platforma</span>: <span style={{ color: "#C0CAF5" }}>Android (iOS wkrótce)</span></div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "1vw", color: "#565F89", fontFamily: "'DM Mono', monospace" }}>04</div>
          <div style={{ fontSize: "0.9vw", color: "#565F89" }}>BuildCalc, 2026</div>
        </div>
      </div>
    </div>
  );
}
