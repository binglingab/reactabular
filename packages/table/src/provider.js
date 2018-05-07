import React from 'react';
import PropTypes from 'prop-types';
import { tableTypes, tableDefaults, tableContextTypes } from './types';

const componentDefaults = tableDefaults.renderers;

export default class Provider extends React.Component {
  constructor() {
    super();

    this.references = {}; // { type: ref }. Example: { stickyHeader: 1 }
  }
  getChildContext() {
    const { columns, renderers } = this.props;
    const { references } = this;

    return {
      columns,
      renderers: {
        table: renderers.table || componentDefaults.table,
        header: { ...componentDefaults.header, ...renderers.header },
        body: { ...componentDefaults.body, ...renderers.body }
      },
      getRef(name) {
        return references[name];
      },
      setRef(name, ref) {
        // TODO: how to handle multiple references that have the same name? -> array?
        references[name] = ref;
      }
    };
  }
  render() {
    const {
      columns, // eslint-disable-line no-unused-vars
      renderers,
      children,
      ...props // XXXXX: test props
    } = this.props;
    const defaultRenderer = tableDefaults.renderers.table;

    return React.createElement(
      renderers.table || defaultRenderer,
      {
        props,
        columns,
        renderer: defaultRenderer
      },
      children
    );
  }
}
Provider.propTypes = {
  ...tableTypes,
  children: PropTypes.any
};
Provider.defaultProps = {
  ...tableDefaults
};
Provider.childContextTypes = tableContextTypes;