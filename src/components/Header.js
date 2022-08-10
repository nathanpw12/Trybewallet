import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
//
class Header extends Component {
  render() {
    const { email, sum } = this.props;
    return (
      <div className="header-conteiner">
        <fieldset className="emailField" data-testid="email-field">
          Email:
          {email}
        </fieldset>
        <fieldset className="emailField" data-testid="total-field">
          { Math.abs(sum).toFixed(2) }
        </fieldset>
        <fieldset data-testid="header-currency-field">
          BRL
        </fieldset>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  sum: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currency: state.wallet.currency,
  sum: state.wallet.totalSum,
});

export default connect(mapStateToProps)(Header);
