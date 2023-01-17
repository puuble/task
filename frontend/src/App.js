import logo from "./logo.svg";
import "./App.css";
import { Container } from "react-bootstrap";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import MarketPriceScreen from "./screens/MarketPriceScreen";
import MarketPriceAddScreen from "./screens/MarketPriceAddScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" exact element={<MarketPriceScreen />} />
            <Route path="/add" exact element={<MarketPriceAddScreen />} />
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;
