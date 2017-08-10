import React, { Component } from 'react';
import Section from './Section';

export default class MeasurementList extends Component {

  render() {

    const inspection = [
      {
        field: 'Origin',
        value: 'Norway',
      },
      {
        field: 'Type',
        value: 'Free',
      },
      {
        field: 'Method of fishing',
        value: 'Line',
      },
    ];

    const loading = [
      { field: 'Weight', value: '20kg' },
    ];

    const transport = [
      { field: 'Temperature', value: '3.1 C (11:12)' },
    ];

    const unloading = [
      { field: 'Weight', value: '20kg' },
    ];

    return (<div>
      <Section options={inspection} label='Inspection' date='18 Feb 2017'/>
      <Section options={loading} label='Loading' date='18 Feb 2017'/>
      <Section options={transport} label='Transport' date='18 Feb 2017'/>
      <Section options={unloading} label='Unloading' date='18 Feb 2017'/>
    </div>);
  }
};
