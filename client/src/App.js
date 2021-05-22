import { Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/routes/Home";
import KeywordSelect from "./components/routes/KeywordSelect";
import RankingList from "./components/routes/RankingList";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/keyword" component={KeywordSelect} />
      <Route exact path="/ranking" component={RankingList} />
    </Switch>
  );
}

export default App;
