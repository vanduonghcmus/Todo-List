import React from "react";
import { Route, Switch } from "react-router-dom";

import TaskBuilder from "./container/TaskBuilder/TaskBuilder";
import Auth from "./container/Auth/Auth";
import Logout from "./container/Auth/Logout/Logout";

function App() {
  return (
    <Switch>
      <Route path="/taskList" component={TaskBuilder} />
      <Route path="/" exact component={Auth} />
      <Route path="/logout" component={Logout} />
    </Switch>
  );
}

export default App;
