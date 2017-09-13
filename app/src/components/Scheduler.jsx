import React, { Component } from "react";
import theme from "../styles/theme";
import "../styles/override.css";
import store from "../store";
import injectTapEventPlugin from "react-tap-event-plugin";
import { Provider } from "react-redux";

import JobList from './JobList';
import D2UIApp from 'd2-ui/lib/app/D2UIApp';
import HeaderBarComponent from 'd2-ui/lib/app-header/HeaderBar';
import headerBarStore$ from 'd2-ui/lib/app-header/headerBar.store';
import withStateFrom from 'd2-ui/lib/component-helpers/withStateFrom';

const HeaderBar = withStateFrom(headerBarStore$, HeaderBarComponent);
const baseUrl = 'http://localhost:8080/api'; // TODO: Outsource config

injectTapEventPlugin();

const Scheduler = () => 
    <Provider store={store}>
        <D2UIApp initConfig={{ baseUrl }} muiTheme={theme}>
            <div>
                <HeaderBar />
                <JobList />
            </div>
        </D2UIApp>
    </Provider>;

export default Scheduler;