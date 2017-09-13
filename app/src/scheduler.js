import React from "react";
import { render } from "react-dom";
import Scheduler from "./components/Scheduler.jsx";
import "whatwg-fetch";

render(<Scheduler />, document.getElementById("scheduler"));