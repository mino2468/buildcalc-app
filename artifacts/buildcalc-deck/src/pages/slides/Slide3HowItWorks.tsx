export default function Slide3HowItWorks() {
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
          <div style={{ fontSize: "1vw", color: "#7AA2F7", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.5vw" }}>
            <span style={{ width: "4px", height: "1.2vw", backgroundColor: "#7AA2F7", borderRadius: "2px", flexShrink: 0, marginLeft: "-3vw" }} />
            Jak działa
          </div>
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
          Funkcje
        </div>

        <h1 style={{ fontSize: "4.5vw", fontWeight: 700, color: "#FFFFFF", margin: "0 0 1.5vh 0", letterSpacing: "-0.02em" }}>
          Jak działa BuildCalc
        </h1>

        <p style={{ fontSize: "1.3vw", color: "#9AA5CE", lineHeight: 1.6, maxWidth: "44vw", margin: "0 0 3.5vh 0" }}>
          Od wyboru robót do gotowego kosztorysu PDF — w kilka dotknięć ekranu.
        </p>

        <div style={{ display: "flex", gap: "4vw" }}>
          {/* Left column: steps 1-3 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2.2vh" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
              <div style={{ width: "2.5vw", height: "2.5vw", borderRadius: "50%", backgroundColor: "rgba(122,162,247,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#7AA2F7", fontSize: "1vw", fontWeight: "bold", flexShrink: 0, fontFamily: "'DM Mono', monospace" }}>1</div>
              <div>
                <div style={{ fontSize: "1.2vw", color: "#FFFFFF", fontWeight: 600, marginBottom: "0.3vh" }}>Wybierz rodzaj pracy</div>
                <div style={{ fontSize: "1vw", color: "#9AA5CE", lineHeight: 1.4 }}>Katalog 49 robót w 13 kategoriach — od tynków po instalacje.</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
              <div style={{ width: "2.5vw", height: "2.5vw", borderRadius: "50%", backgroundColor: "rgba(122,162,247,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#7AA2F7", fontSize: "1vw", fontWeight: "bold", flexShrink: 0, fontFamily: "'DM Mono', monospace" }}>2</div>
              <div>
                <div style={{ fontSize: "1.2vw", color: "#FFFFFF", fontWeight: 600, marginBottom: "0.3vh" }}>Podaj wymiary</div>
                <div style={{ fontSize: "1vw", color: "#9AA5CE", lineHeight: 1.4 }}>Aplikacja oblicza powierzchnię automatycznie z długości i szerokości.</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
              <div style={{ width: "2.5vw", height: "2.5vw", borderRadius: "50%", backgroundColor: "rgba(158,206,106,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ECE6A", fontSize: "1vw", fontWeight: "bold", flexShrink: 0, fontFamily: "'DM Mono', monospace" }}>3</div>
              <div>
                <div style={{ fontSize: "1.2vw", color: "#FFFFFF", fontWeight: 600, marginBottom: "0.3vh" }}>Stawki rynkowe online</div>
                <div style={{ fontSize: "1vw", color: "#9AA5CE", lineHeight: 1.4 }}>13 krajów, 8 walut — ceny wczytują się automatycznie przy starcie.</div>
              </div>
            </div>
          </div>

          {/* Right column: steps 4-5 + code */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2.2vh" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
              <div style={{ width: "2.5vw", height: "2.5vw", borderRadius: "50%", backgroundColor: "rgba(224,175,104,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#E0AF68", fontSize: "1vw", fontWeight: "bold", flexShrink: 0, fontFamily: "'DM Mono', monospace" }}>4</div>
              <div>
                <div style={{ fontSize: "1.2vw", color: "#FFFFFF", fontWeight: 600, marginBottom: "0.3vh" }}>Gotowy kosztorys PDF</div>
                <div style={{ fontSize: "1vw", color: "#9AA5CE", lineHeight: 1.4 }}>Z logo firmy i danymi klienta — jedno kliknięcie, gotowe do wysłania.</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
              <div style={{ width: "2.5vw", height: "2.5vw", borderRadius: "50%", backgroundColor: "rgba(158,206,106,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ECE6A", fontSize: "1vw", fontWeight: "bold", flexShrink: 0, fontFamily: "'DM Mono', monospace" }}>5</div>
              <div>
                <div style={{ fontSize: "1.2vw", color: "#FFFFFF", fontWeight: 600, marginBottom: "0.3vh" }}>Działa offline</div>
                <div style={{ fontSize: "1vw", color: "#9AA5CE", lineHeight: 1.4 }}>Idealne na placu budowy — brak internetu nie przeszkadza.</div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#16161E",
                borderRadius: "0.5vw",
                padding: "2vh 2vw",
                border: "1px solid rgba(255,255,255,0.05)",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.95vw",
                lineHeight: 1.7,
                marginTop: "0.5vh",
              }}
            >
              <div style={{ color: "#565F89", marginBottom: "0.5vh" }}>// wynik wyceny</div>
              <div><span style={{ color: "#7AA2F7" }}>pow</span>: <span style={{ color: "#E0AF68" }}>24.5</span> <span style={{ color: "#565F89" }}>m²</span></div>
              <div><span style={{ color: "#7AA2F7" }}>stawka</span>: <span style={{ color: "#E0AF68" }}>45.00</span> <span style={{ color: "#565F89" }}>PLN/m²</span></div>
              <div><span style={{ color: "#7AA2F7" }}>razem</span>: <span style={{ color: "#9ECE6A" }}>1 102.50</span> <span style={{ color: "#565F89" }}>PLN</span></div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "1vw", color: "#565F89", fontFamily: "'DM Mono', monospace" }}>03</div>
          <div style={{ fontSize: "0.9vw", color: "#565F89" }}>BuildCalc, 2026</div>
        </div>
      </div>
    </div>
  );
}
