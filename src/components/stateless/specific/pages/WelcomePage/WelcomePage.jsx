import React, { Component } from 'react';
import styles from './WelcomePage.scss';
import Label from '../../../generic/Label/Label';
import TextField from '../../../generic/TextField/TextField';
import Button from '../../../generic/Button/Button';
import Link from 'react-router-dom/es/Link';

class WelcomePage extends Component {

  render() {
    return (
      <div className={styles.page}>
        <img className={styles.logo} src="./static/images/ambrosus.png"/>
        <div className={styles.container}>
          <Label className={styles.header} text='Welcome'/>
          <div>
            <Label className={styles.label} text='Go to existing market:'/>
            <div className={styles.row}>
              <TextField placeholder={'contact address'} className={styles.field}/>
              <Button className={styles.button}><Link className={styles.link} to="/">Go</Link></Button>
            </div>
          </div>
          <span className={styles.text}>or</span>
          <Button className={styles.newAccount}>
            <Link className={styles.link} to="/create-market">Create new market</Link>
          </Button>
        </div>
        <img className={styles.smallLogo} src="./static/images/ambrosus-small.png" />
      </div>);
  }
}

export default WelcomePage;
