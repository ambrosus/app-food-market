import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './SummaryProduct.scss';
import Label from '../../../../generic/Label/Label';
import AttributeValueFieldContainer
  from '../../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer';
import Button from '../../../../generic/Button/Button';
import TextField from '../../../../generic/TextField/TextField';

class SummaryProduct extends PureComponent {

  static propTypes = {
    offer: PropTypes.shape({
      pricePerUnit: PropTypes.number,
      pricePerPackage: PropTypes.number,
      packageWeight: PropTypes.number,
    }),
    onApprove: PropTypes.func,
    onFinish: PropTypes.func,
    onReimburse: PropTypes.func,
    onLinkTrade: PropTypes.func,
    decimals: PropTypes.number.isRequired,
  };

  static defaultProps = {
    offer: {
      pricePerUnit: 1000,
      pricePerPackage: 50,
      packageWeight: 10,
    },
  };

  state = {
    linkedTradeId: ''
  };

  componentDidMount() {
    if (this.props.offer.status) this.props.history.replace('approved');
  }

  finishTrade = async () => {
    const { onFinish, offer, history } = this.props;
    await onFinish(offer.id, offer.origin);
    history.push('/orders');
  };

  onReimburse = () => {
    const { offer, onReimburse } = this.props;
    onReimburse(offer.address);
  };

  onApprove = () => {
    const { offer, onApprove } = this.props;
    onApprove(offer.address);
  };

  onLinkTrade = () => {
    const { linkedTradeId } = this.state;
    this.setState({ linkedTradeId: '' }, () => {
      const { onLinkTrade, offer } = this.props;
      onLinkTrade(offer.id, linkedTradeId);
    });
  };

  onTradeIdChange = (name, input) => this.setState({ linkedTradeId: input.value });

  openLinkedTrade = linkedTradeId => {
    const { setActiveTrade } = this.props;
    setActiveTrade(linkedTradeId);
  };

  getSummaryOptions = () => {
    const { decimals, offer : { quantity, packageWeight, pricePerPackage } } = this.props;
    return [
      { field: 'Price per package', value: `€ ${(pricePerPackage).toFixed(decimals)}` },
      { field: 'Packages', value: quantity },
      { field: 'Total weight', value: (packageWeight) * quantity },
      { field: 'Total', value: `€ ${((pricePerPackage) * quantity).toFixed(decimals)}` },
    ];
  };

  renderLinkedTradeField = () => {
    return <div className={styles.linkTradeField}>
      <TextField onChange={this.onTradeIdChange}
                 label='linkedTradeId'
                 placeholder='Trade id'
                 value={this.state.tradeId}
                 className={styles.tradeIdField}/>
      <Button className={styles.linkTradeBtn} onClick={this.onLinkTrade}>Link trade</Button>
     </div>
  };

  renderFinishTradeBtn = () => {
    return <Button onClick={this.finishTrade}>Finish</Button>;
  };

  renderApproveBtn = () => {
    return <Button onClick={this.onApprove}>Approve payment</Button>;
  };

  renderLinkedTrades = () => {
    const { linkedTrades } = this.props.offer;
    return linkedTrades.length ? <div className={styles.linkedTrades}>
                                   <div className={styles.linkTradesTitle}>Linked Trades</div>
                                   {linkedTrades.map((trade, index) => <div className={styles.tradeLink} key={index}>
                                                                         {index+1})&ensp;
                                                                         <Link to='product-info'
                                                                               onClick={this.openLinkedTrade.bind(null, trade)}>
                                                                           Trade id: {trade}
                                                                         </Link>
                                                                        </div>)}
                                 </div>
                               : null
  };

  render() {
    const { offer : { status, seller, customer } } = this.props;
    const [ user ] = web3.eth.accounts;
    return (<div>
      <Label className={styles.title} text='Summary'/>
      <AttributeValueFieldContainer options={this.getSummaryOptions()} className={styles.requirements}/>
      {this.renderLinkedTrades()}
      <div className={styles.buttonsContainer}>
        {!status && customer === user ? this.renderLinkedTradeField() : null}
        {!status && customer === user ? this.renderFinishTradeBtn() : null}
        {seller === user ? this.renderApproveBtn() : null}
        <Button className={styles.reimburse} onClick={this.onReimburse}>Reimbursed</Button>
      </div>
    </div>);
  }
}

export default SummaryProduct;
