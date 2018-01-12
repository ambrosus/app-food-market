import React, { Component } from 'react';
import Section from './Section';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class MeasurementList extends Component {

  static propTypes = {
    measurements: PropTypes.array,
  };

  static defaultProps = {
    measurements: [],
  };

  formatMeasurements() {
    return _(this.props.measurements)
      .groupBy('event_id')
      .map((measurements, eventId) => ({ eventId, measurements, date: _.minBy(measurements, 'timestamp').timestamp }))
      .sort((a, b) => b.date > a.date)
      .map(
        event => <Section key={event.eventId}
                          options={event.measurements.map(group => ({ field: group.attribute_id, value: group.value }))}
                          label={event.eventId}
                          date={new Date(event.date).toLocaleString()}/>)
      .value();
  }

  render() {
    return (<div>
      {this.formatMeasurements()}
    </div>);
  }
};
