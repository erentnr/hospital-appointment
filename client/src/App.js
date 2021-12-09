import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Menu />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;
