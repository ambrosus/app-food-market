import React, {Component} from "react";
import PropTypes from "prop-types";
import styles from "./SummaryApprovedProduct.scss";
import Label from "../../../../generic/Label/Label";
import AttributeValueFieldContainer from "../../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer";
import Button from "../../../../generic/Button/Button";

class SummaryApprovedProduct extends Component {

    static propTypes = {
        offer: PropTypes.shape({
            pricePerUnit: PropTypes.string,
            pricePerPackage: PropTypes.string,
            packageWeight: PropTypes.string
        })
    };

    static defaultProps = {
        offer: {
            pricePerUnit: '1000',
            pricePerPackage: '50',
            packageWeight: '10'
        }
    };

    render() {

        const summary = [
            {field: 'Price', value: `€ ${this.props.offer.pricePerUnit / 100.0} /kg`},
            {field: 'Price per package', value: `€${this.props.offer.pricePerPackage / 100.0}`},
            {field: 'Per package', value: `${this.props.offer.packageWeight / 100.0} kg`},
        ];

        return (<div>
            <Label className={styles.title} text="Summary approve"/>
            <AttributeValueFieldContainer options={summary} className={styles.requirements}/>
            <Button className={styles.approvePayment}>Reorder</Button>
        </div>)
    }
}

export default SummaryApprovedProduct;

