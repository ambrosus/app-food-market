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
    getAttributes: PropTypes.func.isRequired,
    getStatements: PropTypes.func,
    statements: PropTypes.array,
  };

  componentDidMount() {
    const { getStatements, getAttributes, offer, match } = this.props;
    loadImage(this.refs.image, offer.imageHash);
    getAttributes(this.props.offer);
    if (match.path === '/approved') getStatements(this.props.offer.id);
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
    if (pathname !== '/approved') return null;
    return (<div className={styles.statements}>
      <Label className={styles.subtitle} text='Statements'/>
      <StatementsList options={[{
        "dt": "2018-01-11T18:35:54.008Z",
        "data": "Hello world!",
        "tradeId": 0,
        "statementId": "0x16876d429d9c9d038e16a2b2104c7e771a7ed2e22a69b66fac2d192af95ab39e"
      }, {
        "dt": "2018-01-11T18:48:18.975Z",
        "data": "Hello world2!",
        "tradeId": 0,
        "statementId": "0x39543f828e4e52fd00ba389742c66ce94b5cdbac11c63887de3aa4b89ad4df7b"
      }]}
                      className={styles.requirements}/>

      <Link className={styles.link} to="create-statements">
        Create statements
      </Link>
    </div>)
  };

  render() {
    const {offer, approve, reject, history, match, decimals, reorder, onBuy, sidebar} = this.props;
    const parameters = [
      { field: 'Category', value: offer.category },
      { field: 'Seller', value: offer.seller },
    ];
    return (<div className={styles.container}>
        <div className={styles.requirementsColumn}>
          <img className={styles.image} src='./static/images/placeholder.png'
               srcSet='./static/images/placeholder.png 2x' ref='image'/>
          <Label className={styles.subtitle} text='Requirements'/>
          <Label text={this.props.offer.quality}/>
          <AttributeValueFieldContainer options={this.attributesToValueField()}
                                        className={styles.requirements}/>
          {this.renderStatements(match.path)}
        </div>
        <div className={styles.typeColumn}>
          <Label className={styles.title} text={offer.name}/>
          <AttributeValueFieldContainer options={parameters} className={styles.info}/>
          <Label className={styles.subtitle} text='Measurements'/>
          <MeasurementList measurements={offer.measurements}/>
          <Link className={styles.link} to="create-measurements">
            Create measurements
          </Link>
        </div>
        <div className={cx(styles.column, styles.summaryColumn)}>
          {sidebar === 'summary' && <SummaryProduct offer={offer}
                                                    onApprove={approve}
                                                    onReimburse={reject}
                                                    history={history}
                                                    decimals={decimals}/>}
          {sidebar === 'progress' && <SummaryApprovedProduct offer={this.props.offer}
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

