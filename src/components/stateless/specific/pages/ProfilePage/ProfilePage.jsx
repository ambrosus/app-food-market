import React, {Component} from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import NavigationBar from "../../navigation/NavigationBar/NavigationBar";
import Button from "../../../generic/Button/Button";
import Label from "../../../generic/Label/Label";
import { createToken, updateBalance } from "../../../../../redux/actions/TokenAction";

const mapStateToProps = state => {
  return {
    balance: state.token.balance,
    token: state.token.token
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    getBalance: (token) => {
      dispatch(updateBalance(token));
    },

    newToken: () => {
      dispatch(createToken(10000));
    }
  }
};


class ProfilePage extends Component {

  static propTypes = {
    getBalance: PropTypes.func,
    newToken: PropTypes.func,
    balance: PropTypes.number
  };

  static defaultProps = {
    getBalance: ()=>console.warn('getBalance is not defined'),
    newToken: ()=>console.warn('newToken is not defined'),
    balance: 0
  }

  componentDidMount() {
    if (this.props.token)
      this.props.getBalance(this.props.token);
  }

  render() {
    return (
      <div>
          <NavigationBar title="Profile"/>
          <Label text={`Your balance: ${this.props.balance}`}/>
          <Button onClick={this.props.newToken}>Get 10000€</Button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);