import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import LightMap from './scenes/lightmap/LightMap';
import History from "./scenes/history";
import Team from "./scenes/team";
import Form from "./scenes/form";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    // Create a WebSocket connection
    const ws = new WebSocket('ws://localhost:8080'); // Replace with your server address
    
    // Store the socket connection in state
    setSocket(ws);

    // Define the onmessage event handler
    ws.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      setData(receivedData);
    };

    // Clean up the WebSocket connection on unmount
    return () => {
      ws.close();
    };
  }, []);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        <Sidebar isSidebar={isSidebar} />
          <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<LightMap data={data}/>} />
              <Route path="/team" element={<Team />} />
              <Route path="/history" element={<History />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/form" element={<Form />} />
              <Route path="/faq" element={<FAQ />} /> 
            </Routes>
          </main>
        </div>
        </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

