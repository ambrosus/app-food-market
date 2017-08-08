import React, {Component} from "react";
import PropTypes from "prop-types";
import styles from "./BuyProduct.scss";
import Label from "../../../../generic/Label/Label";
import AttributeValueFieldContainer from "../../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer";
import InputField from "../../../../generic/InputField/InputField";
import Button from "../../../../generic/Button/Button";
import { connect } from 'react-redux';
import { showModal } from "../../../../../../redux/actions/ModalAction.js";


const mapStateToProps = state => {
  return {
    offer: state.offer,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    onBuy: (offer) => {
      dispatch(showModal('ConfirmBuyModal'));
    }
  }
};


class BuyProduct extends Component {

    static propTypes = {
        offer: PropTypes.shape({
            pricePerUnit: PropTypes.number,
            pricePerPackage: PropTypes.number,
            packageWeight: PropTypes.number
        })
    };

    static defaultProps = {
        offer: {
            pricePerUnit: '1000',
            pricePerPackage: '50',
            packageWeight: '10'
        }
    };

    buy() {
        this.props.onBuy(this.props.offer);
    }

    render() {

        const summary = [
            {field: 'Price', value: `€ ${this.props.offer.pricePerUnit / 100.0} /kg`},
            {field: 'Price per package', value: `€${this.props.offer.pricePerPackage / 100.0}`},
            {field: 'Per package', value: `${this.props.offer.packageWeight / 100.0} kg`},
        ];

        return (<div>
            <Label className={styles.title} text="Buy product"/>
            <AttributeValueFieldContainer options={summary} className={styles.requirements}/>
            <div><InputField label="Packages"/><Button onClick={()=>this.buy()}>Buy product</Button></div>
        </div>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyProduct);

