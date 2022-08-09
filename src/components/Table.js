import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  expensesRender = () => {
    const { expenses } = this.props;
    return expenses
      .map(({ id, value, currency, exchangeRates, method, tag, description }) => (
        <tr key={ id }>
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          {/* valor */}
          <td>{ ((Number(value) * 100) / 100).toFixed(2) }</td>
          {/* moeda */}
          <td>{ exchangeRates[currency].name }</td>
          {/* cambio utilizado */}
          <td>{ (Number(exchangeRates[currency].ask)).toFixed(2) }</td>
          {/* valor convertido */}
          <td>
            { (Math
              .round(Number(value) * Number(exchangeRates[currency].ask) * 100) / 100)
              .toFixed(2) }
          </td>
          {/* moeda de conversão */}
          <td>Real Brasileiro</td>
        </tr>
      ));
  };

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { this.expensesRender() }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
