import React from "react";
import cx from 'classnames';
import styles from "./Label.scss";

let Label  = ({ text, className }) => (<span className={cx(styles.label, className)}>{ text }</span>);

export default Label;