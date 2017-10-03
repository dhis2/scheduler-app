import React, { Component } from "react";
import theme from "../styles/theme";
import "../styles/override.css";
import store from "../store";
import injectTapEventPlugin from "react-tap-event-plugin";
import { Provider } from "react-redux";
import D2UIApp from 'd2-ui/lib/app/D2UIApp';
import HeaderBarComponent from 'd2-ui/lib/app-header/HeaderBar';
import headerBarStore$ from 'd2-ui/lib/app-header/headerBar.store';
import withStateFrom from 'd2-ui/lib/component-helpers/withStateFrom';
import Heading from 'd2-ui/lib/headings/Heading.component';

import JobList from './JobList';
import JobDetails from './JobDetails';

const HeaderBar = withStateFrom(headerBarStore$, HeaderBarComponent);
const baseUrl = 'http://localhost:8080/api'; // TODO: Outsource config

injectTapEventPlugin();

const contentStyle = {
    paddingTop: '100px',
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
};

const Scheduler = () => 
    <Provider store={store}>
        <D2UIApp initConfig={{ baseUrl }} muiTheme={theme}>
            <div style={contentStyle}>
                <HeaderBar />
                <div>
                    <Heading style={{ paddingBottom: 16, paddingLeft: 24 }}>
                        Scheduled Jobs
                    </Heading>
                    <JobList />
                    <JobDetails />
                </div>
            </div>
        </D2UIApp>
    </Provider>;

export default Scheduler;