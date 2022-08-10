import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpenseAction, updateTotalAction } from '../redux/actions';

class Table extends Component {
  sumUpdate = (value) => {
    const { update } = this.props;
    update(value);
    return Number(value).toFixed(2);
  };

  btnDeleteExpense = (e) => {
    const { remove } = this.props;
    const current = Number(e.exchangeRates[e.currency].ask);
    this.sumUpdate(Number((current * e.value)).toFixed(2));
    remove(e.id);
  };

  render() {
    const { expenses } = this.props;
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
            {
              expenses.map((element) => (
                <tr key={ element.id } id={ element.id }>
                  <td>{ element.description }</td>
                  <td>{ element.tag }</td>
                  <td>{ element.method }</td>
                  {/* valor */}
                  <td>{ ((Number(element.value) * 100) / 100).toFixed(2) }</td>
                  {/* moeda */}
                  <td>{ element.exchangeRates[element.currency].name }</td>
                  {/* cambio utilizado */}
                  <td>
                    { (Number(element.exchangeRates[element.currency].ask))
                      .toFixed(2) }
                  </td>
                  {/* valor convertido */}
                  <td>
                    { (Math
                      .round(Number(element.value)
                      * Number(element.exchangeRates[element.currency].ask) * 100) / 100)
                      .toFixed(2) }
                  </td>
                  {/* moeda de conversão */}
                  <td>Real Brasileiro</td>
                  <td>
                    <button
                      className="btn-del"
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.btnDeleteExpense(element) }
                    >
                      {' '}
                      Excluir
                      {' '}
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.obj).isRequired,
  remove: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
  sum: store.wallet.totalSum,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (id) => dispatch(deleteExpenseAction(id)),
  update: (value) => dispatch(updateTotalAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
