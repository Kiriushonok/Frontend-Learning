import Header from "./components/Header/Header.jsx";
import SongsSection from "./components/SongsSection.jsx";
import ButtonsSection from "./components/ButtonsSection.jsx";
import StartSection from "./components/StartSection.jsx";
import TabsSection from "./components/TabsSection.jsx";
import FeedbackSection from "./components/FeedbackSection/FeedbackSection.jsx"
import EffectsSection from "./components/EffectsSection.jsx"
import { useState } from "react";

function App() {
  const [tab, setTab] = useState("effects");
  return (
    <>
      <Header />
      <main style={{marginLeft: "20px"}}>
        <StartSection />

        <TabsSection active={tab} onChange={(current) => setTab(current)} />

        {tab === "main" && (
          <>
            <SongsSection />
            <ButtonsSection />
          </>
        )}

        {tab === "feedback" && <FeedbackSection/>}

        {tab === "effects" && <EffectsSection/>}
      </main>
    </>
  );
}

export default App;
