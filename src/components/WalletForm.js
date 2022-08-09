import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpenses, fetchApi, sumAction } from '../redux/actions';

const initialTag = 'Alimentação';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: initialTag,
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { getCurrentApi } = this.props;
    getCurrentApi();
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  getCurrencys = async () => {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await request.json();
    this.setState({
      exchangeRates: response,
    });
  };

  cleanState = () => {
    this.setState((state) => ({
      id: state.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: initialTag,
      exchangeRates: {},
    }));
  };

  handleSum = () => {
    const { values } = this.props;
    const { value, currency, exchangeRates } = this.state;
    const current = exchangeRates[currency].ask;
    const total = (current * value);
    const roundTotal = parseFloat(total.toFixed(2));
    values(roundTotal);
  };

  addExpense = async () => {
    const { getExpenses } = this.props;
    await this.getCurrencys();
    getExpenses(this.state);
    this.handleSum();
    this.cleanState();
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <fieldset>
          <label htmlFor="value">
            Valor:
            <input
              name="value"
              type="number"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
        </fieldset>

        <fieldset>
          <label htmlFor="description">
            Descrição:
            <input
              name="description"
              data-testid="description-input"
              type="text"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
        </fieldset>

        <fieldset>
          <label htmlFor="currency">
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {
                currencies.map((currenciesMap) => (
                  <option
                    value={ currenciesMap }
                    key={ currenciesMap }
                  >
                    { currenciesMap }
                  </option>
                ))
              }
            </select>
          </label>
        </fieldset>

        <fieldset>
          <label htmlFor="method">
            Método de pagamento:
            <select
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
        </fieldset>

        <fieldset>
          <label htmlFor="tag">
            Categoria:
            <select
              name="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value={ initialTag }>{ initialTag }</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </fieldset>

        <fieldset>
          <button
            type="button"
            onClick={ this.addExpense }
          >
            Adicionar despesa
          </button>
        </fieldset>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.shape,
  getExpenses: PropTypes.func.isRequired,
  values: PropTypes.func.isRequired,
}.isRequired;

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentApi: () => dispatch(fetchApi()),
  getExpenses: (expense) => dispatch(addExpenses(expense)),
  values: (value) => dispatch(sumAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
