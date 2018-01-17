import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './PaginationMenu.scss';

export default class PaginationMenu extends PureComponent {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    pagesAmount: PropTypes.number.isRequired,
    paginationPage: PropTypes.number.isRequired,
    paginationAction: PropTypes.func.isRequired,
  };

  handleTabClick = newPage => {
    const { pagesAmount, paginationPage, paginationAction } = this.props;
    if (paginationPage === newPage) return;
    if (newPage < pagesAmount && newPage >= 0) paginationAction(newPage);
  };

  render() {
    const { pagesAmount, paginationPage } = this.props;
    const tabsList = new Array(pagesAmount).fill(null);

    return (pagesAmount > 1
      ? <div className={styles.PaginationMenu}>
        <div className={styles.tab} onClick={this.handleTabClick.bind(null, paginationPage - 1)}>&lt;&lt;</div>
        {tabsList.map((tab, index) => <div className={`${styles.tab} ${index === paginationPage ? 'active' : ''}`}
                                           key={index}
                                           onClick={this.handleTabClick.bind(null, index)}>
                                            {index + 1}
                                          </div>)}
        <div className={styles.tab} onClick={this.handleTabClick.bind(null, paginationPage + 1)}>&gt;&gt;</div>
      </div>
      : null);
  }
}
