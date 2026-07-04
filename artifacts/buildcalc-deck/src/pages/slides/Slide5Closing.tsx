export default function Slide5Closing() {
  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{
        backgroundColor: "#1A1B26",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        color: "#C0CAF5",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at center, rgba(122,162,247,0.08) 0%, #1A1B26 65%)",
      }}
    >
      {/* Logo mark */}
      <div
        style={{
          width: "4.5vw",
          height: "4.5vw",
          backgroundColor: "#7AA2F7",
          borderRadius: "1.2vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "4vh",
        }}
      >
        <div style={{ width: "2.2vw", height: "2.2vw", backgroundColor: "#1A1B26", borderRadius: "0.6vw" }} />
      </div>

      <div style={{ fontSize: "1vw", color: "#7AA2F7", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginBottom: "2vh" }}>
        BuildCalc
      </div>

      <h1
        style={{
          fontSize: "5vw",
          fontWeight: 800,
          color: "#FFFFFF",
          margin: "0 0 3vh 0",
          letterSpacing: "-0.03em",
          textAlign: "center",
        }}
      >
        Zacznij wyceniać szybciej
      </h1>

      <p
        style={{
          fontSize: "1.4vw",
          color: "#9AA5CE",
          lineHeight: 1.6,
          maxWidth: "38vw",
          margin: "0 0 5vh 0",
          textAlign: "center",
          fontWeight: 400,
        }}
      >
        BuildCalc eliminuje papierową robotę i daje wykonawcom przewagę na rynku. Dostępny na Android — wersja iOS w przygotowaniu.
      </p>

      {/* Contact badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "1.8vh 3vw",
          backgroundColor: "rgba(122,162,247,0.1)",
          border: "1px solid rgba(122,162,247,0.25)",
          borderRadius: "0.5vw",
          marginBottom: "5vh",
          fontFamily: "'DM Mono', monospace",
          fontSize: "1.1vw",
          color: "#7AA2F7",
        }}
      >
        wojtus13579@gmail.com
      </div>

      {/* Stats bar */}
      <div
        style={{
          display: "flex",
          gap: "4vw",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "4vh",
          width: "50vw",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
          <div style={{ width: "0.7vw", height: "0.7vw", backgroundColor: "#7AA2F7", borderRadius: "50%" }} />
          <div style={{ fontSize: "1.1vw", color: "#C0CAF5" }}>13 krajów</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
          <div style={{ width: "0.7vw", height: "0.7vw", backgroundColor: "#9ECE6A", borderRadius: "50%" }} />
          <div style={{ fontSize: "1.1vw", color: "#C0CAF5" }}>7 języków</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
          <div style={{ width: "0.7vw", height: "0.7vw", backgroundColor: "#E0AF68", borderRadius: "50%" }} />
          <div style={{ fontSize: "1.1vw", color: "#C0CAF5" }}>49 typów robót</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
          <div style={{ width: "0.7vw", height: "0.7vw", backgroundColor: "#9ECE6A", borderRadius: "50%" }} />
          <div style={{ fontSize: "1.1vw", color: "#C0CAF5" }}>100% offline</div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: "5vh",
          left: "8vw",
          right: "8vw",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "1vw", color: "#565F89", fontFamily: "'DM Mono', monospace" }}>05</div>
        <div style={{ fontSize: "0.9vw", color: "#565F89" }}>BuildCalc, 2026</div>
      </div>
    </div>
  );
}
