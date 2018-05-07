import React from 'react';

import { tableDefaults, tableHeaderRowTypes, tableHeaderRowDefaults } from './types';
import renderCell from './render-cell';

// eslint-disable-next-line react/prefer-stateless-function
class HeaderRow extends React.Component {
  render() {
    const { rowData, rowIndex, renderers, props } = this.props;

    return React.createElement(
      renderers.row,
      {
        rowIndex,
        rowData,
        renderer: tableDefaults.renderers.header.row,
        props // XXXXX: test props
      },
      rowData.map((column, columnIndex) =>
        React.cloneElement(renderCell({
          columnIndex, renderer: renderers.cell, column, cell: column.headerCell, children: column.headerCell,
          props: column.props, rowData, rowIndex
        }), {
          key: `${columnIndex}-header-cell`
        })
    )
    );
  }
}
HeaderRow.defaultProps = tableHeaderRowDefaults;
HeaderRow.propTypes = tableHeaderRowTypes;

export default HeaderRow;