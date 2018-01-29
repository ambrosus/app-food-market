import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ProductPage.scss';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import AttributeValueFieldContainer from '../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer';
import Label from '../../../generic/Label/Label';
import MeasurementList from '../../data/MeasurementList/MeasurementList';
import StatementsList from '../../data/StatementsList/StatementsList';
import { loadImage } from '../../../../../utils/loadFromIPFS';
import BuyProduct from './BuyProduct/BuyProduct';
import SummaryApprovedProduct from './SummaryApprovedProduct/SummaryApprovedProduct';
import SummaryProduct from './SummaryProduct/SummaryProduct';

class ProductPage extends Component {

  static defaultProps = {
    sidebar: 'summary',
  };

  static propTypes = {
    offer: PropTypes.object.isRequired,
    sidebar: PropTypes.string.isRequired,
    requirements: PropTypes.array.isRequired,
    finishTrade: PropTypes.func,
    getAttributes: PropTypes.func.isRequired,
    getStatements: PropTypes.func,
    clearStatements: PropTypes.func,
    statements: PropTypes.array,
  };

  componentDidMount() {
    const { getStatements, getAttributes, offer, match } = this.props;
    loadImage(this.refs.image, offer.imageHash);
    getAttributes(offer);
    if (['/product-info', '/approved'].includes(match.path)) getStatements(offer.id);
  }

  componentWillUnmount() {
    const { clearStatements, match } = this.props;
    if (['/product-info', '/approved'].includes(match.path)) clearStatements();
  }

  attributesToValueField() {
    return this.props.requirements.map(attribute => {
      const min = attribute.min.toFixed(attribute.decimals);
      const max = attribute.max.toFixed(attribute.decimals);
      return {
        field: attribute.id,
        value: `${min} – ${max}`,
      };
    });
  }

  renderStatements = pathname => {
    return (<div className={styles.statements}>
      <Label className={styles.subtitle} text='Statements'/>
      <StatementsList options={this.props.statements}
                      className={styles.requirements}/>
      {pathname !== '/approved' ? (<Link className={styles.link} to="create-statements">
                                    Create statements
                                  </Link>) : null
      }
    </div>)
  };

  render() {
    const { offer, approve, finishTrade, reject, history, match, decimals, reorder, onBuy, sidebar } = this.props;
    const pathname = match.path;
    const parameters = [
      { field: 'Category', value: offer.category },
      { field: 'Seller', value: offer.seller },
    ];
    const isTradePage = ['/product-info', '/approved'].includes(pathname);
    if (isTradePage) parameters.push({ field: 'Customer', value: offer.customer });
    return (<div className={styles.container}>
        <div className={styles.requirementsColumn}>
          <img className={styles.image} src='./static/images/placeholder.png'
               srcSet='./static/images/placeholder.png 2x' ref='image'/>
          <Label className={styles.subtitle} text='Requirements'/>
          <Label text={offer.quality}/>
          <AttributeValueFieldContainer options={this.attributesToValueField()}
                                        className={styles.requirements}/>
        </div>
        <div className={styles.typeColumn}>
          <Label className={styles.title} text={offer.name}/>
          <AttributeValueFieldContainer options={parameters} className={styles.info}/>
          <Label className={styles.subtitle} text='Measurements'/>
          <MeasurementList measurements={offer.measurements}/>
          {pathname !== '/approved' ? (<Link className={styles.link} to="create-measurements">
            Create measurements
          </Link>) : null
          }
          {isTradePage ? this.renderStatements(pathname) : null}
        </div>
        <div className={cx(styles.column, styles.summaryColumn)}>
          {sidebar === 'summary' && <SummaryProduct offer={offer}
                                                    onApprove={approve}
                                                    onFinish={finishTrade}
                                                    onReimburse={reject}
                                                    history={history}
                                                    decimals={decimals}/>}
          {sidebar === 'progress' && <SummaryApprovedProduct offer={offer}
                                                             onReorder={reorder}
                                                             decimals={decimals}/>}
          {sidebar === 'buy' && <BuyProduct offer={offer}
                                            onBuy={onBuy}
                                            decimals={decimals}/>}
          <Link className={cx(styles.link, styles.batch)} to="product-batch">See batch info</Link>
        </div>
      </div>
    );
  }
}

export default ProductPage;

