export default function Slide2Problem() {
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
          <div style={{ fontSize: "1vw", color: "#7AA2F7", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.5vw" }}>
            <span style={{ width: "4px", height: "1.2vw", backgroundColor: "#7AA2F7", borderRadius: "2px", flexShrink: 0, marginLeft: "-3vw" }} />
            Problem
          </div>
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
        <div style={{ fontSize: "1vw", color: "#FF9E64", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: "1.5vh" }}>
          Kontekst rynkowy
        </div>

        <h1 style={{ fontSize: "4.5vw", fontWeight: 700, color: "#FFFFFF", margin: "0 0 1.5vh 0", letterSpacing: "-0.02em" }}>
          Problem
        </h1>

        <p style={{ fontSize: "1.3vw", color: "#9AA5CE", lineHeight: 1.6, maxWidth: "44vw", margin: "0 0 4vh 0" }}>
          Wykonawcy tracą czas i zlecenia przez przestarzałe narzędzia do wyceny.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5vh", maxWidth: "50vw" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "2vw" }}>
            <div
              style={{
                width: "3vw",
                height: "3vw",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 158, 100, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FF9E64",
                fontSize: "1.1vw",
                fontWeight: "bold",
                flexShrink: 0,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              01
            </div>
            <div>
              <div style={{ fontSize: "1.3vw", color: "#FFFFFF", fontWeight: 600, marginBottom: "0.5vh" }}>Ręczna wycena zajmuje godziny</div>
              <div style={{ fontSize: "1.1vw", color: "#9AA5CE", lineHeight: 1.5 }}>
                i jest podatna na błędy rachunkowe — wykonawca traci czas, który mógłby poświęcić na pracę.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "2vw" }}>
            <div
              style={{
                width: "3vw",
                height: "3vw",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 158, 100, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FF9E64",
                fontSize: "1.1vw",
                fontWeight: "bold",
                flexShrink: 0,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              02
            </div>
            <div>
              <div style={{ fontSize: "1.3vw", color: "#FFFFFF", fontWeight: 600, marginBottom: "0.5vh" }}>Brak gotowych stawek rynkowych</div>
              <div style={{ fontSize: "1.1vw", color: "#9AA5CE", lineHeight: 1.5 }}>
                dla różnych krajów — ekipy pracujące za granicą nie mają punktu odniesienia dla lokalnych cen.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "2vw" }}>
            <div
              style={{
                width: "3vw",
                height: "3vw",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 158, 100, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FF9E64",
                fontSize: "1.1vw",
                fontWeight: "bold",
                flexShrink: 0,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              03
            </div>
            <div>
              <div style={{ fontSize: "1.3vw", color: "#FFFFFF", fontWeight: 600, marginBottom: "0.5vh" }}>Kosztorysy w Excelu trudne do udostępnienia</div>
              <div style={{ fontSize: "1.1vw", color: "#9AA5CE", lineHeight: 1.5 }}>
                klientowi — brak profesjonalnego PDF z logo firmy obniża wiarygodność.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "2vw" }}>
            <div
              style={{
                width: "3vw",
                height: "3vw",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 158, 100, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FF9E64",
                fontSize: "1.1vw",
                fontWeight: "bold",
                flexShrink: 0,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              04
            </div>
            <div>
              <div style={{ fontSize: "1.3vw", color: "#FFFFFF", fontWeight: 600, marginBottom: "0.5vh" }}>Zbyt wolna odpowiedź na zapytania</div>
              <div style={{ fontSize: "1.1vw", color: "#9AA5CE", lineHeight: 1.5 }}>
                oznacza utratę zleceń — klient wybiera wykonawcę, który wyceną odpowiada jako pierwszy.
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "1vw", color: "#565F89", fontFamily: "'DM Mono', monospace" }}>02</div>
          <div style={{ fontSize: "0.9vw", color: "#565F89" }}>BuildCalc, 2026</div>
        </div>
      </div>
    </div>
  );
}
