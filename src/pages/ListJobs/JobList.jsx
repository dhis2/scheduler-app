import React from 'react';
import { AddButton } from '../../components/Buttons';
import Header from './Header';
import Table from './Table';

const JobList = () => (
    <div>
        <Header />
        <Table />
        <AddButton />
    </div>
);

export default JobList;
