import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ProductPage.scss';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import AttributeValueFieldContainer from '../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer';
import Label from '../../../generic/Label/Label';
import MeasurementList from '../../data/MeasurementList/MeasurementList';
import StatementsList from '../../data/StatementsList/StatementsList';
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
    loadImage: PropTypes.func,
    getAttributes: PropTypes.func.isRequired,
    getStatements: PropTypes.func,
    getTradeInfo: PropTypes.func,
  };

  componentDidMount() {
    const { getStatements, getTradeInfo, getAttributes, offer, match } = this.props;
    getAttributes(offer);
    if (['/product-info', '/approved'].includes(match.path)) {
      getStatements(offer.id);
      getTradeInfo();
      this.interval = setInterval(() => getTradeInfo(), 1000);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { offer, match } = this.props;
    const { offer: newOffer } = nextProps;
    if (newOffer.id !== offer.id) {
      this.props.getAttributes(newOffer);
      if (['/product-info', '/approved'].includes(match.path)) {
        nextProps.getStatements(newOffer.id);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.interval);
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
    const isApprovePage = pathname === '/approved';
    return (<div className={styles.statements}>
      <Label className={styles.subtitle} text='Statements'/>
      <StatementsList options={this.props.offer.statements}
                      className={styles.requirements}/>
      {!isApprovePage ? (<Link className={styles.link} to="create-statements">
                                    Create statements
                         </Link>) : null}
      {!isApprovePage ? (<Link className={styles.link} to="add-participants">
                           Add statements participant
                         </Link>) : null}
    </div>)
  };

  render() {
    const { offer, approve, finishTrade, linkTrade, reject, history, match,
      setActiveTrade, decimals, reorder, onBuy, sidebar } = this.props;
    const { customer, seller, category, participants } = offer;
    const pathname = match.path;
    const parameters = [
      { field: 'Category', value: category },
      { field: 'Seller', value: seller },
    ];
    const isTradePage = ['/product-info', '/approved'].includes(pathname);
    if (isTradePage) {
      parameters.push({ field: 'Customer', value: customer });
      if (participants.length > 1) {
        participants
          .filter(participant => ![seller, customer].includes(participant))
          .forEach((participant, index) => {
            parameters.push({ field: `${index + 3} participant`, value: participant })
          })
      }
    }
    return (<div className={styles.container}>
        <div className={styles.requirementsColumn}>
          <img className={styles.image} src={offer.origin
            ? `https://amb.482.solutions/files/asset/${offer.origin}`
            : './static/images/placeholder.png'}/>
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
          </Link>) : null}
          {isTradePage ? this.renderStatements(pathname) : null}
        </div>
        <div className={cx(styles.column, styles.summaryColumn)}>
          {sidebar === 'summary' && <SummaryProduct offer={offer}
                                                    onApprove={approve}
                                                    onFinish={finishTrade}
                                                    onLinkTrade={linkTrade}
                                                    onReimburse={reject}
                                                    setActiveTrade={setActiveTrade}
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
