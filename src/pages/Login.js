import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick = () => {
    const { history, stateClick } = this.props;
    const { email } = this.state;
    stateClick(email);
    history.push('/carteira');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  // Teste
  render() {
    const { email, password } = this.state;
    const validateRegexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/;
    const minLength = 6;
    const validatePassword = password.length >= minLength;
    return (
      <div>
        <form>
          <fieldset>
            <label htmlFor="email-input">
              Email:
              <input
                type="email"
                id="emailInput"
                name="email"
                data-testid="email-input"
                onChange={ this.handleChange }
                value={ email }
                placeholder="email@email.com"
              />
            </label>
            <label htmlFor="password-input">
              Senha:
              <input
                type="password"
                id="passwordInput"
                name="password"
                data-testid="password-input"
                onChange={ this.handleChange }
                value={ password }
                placeholder="123456"
              />
            </label>
            <label htmlFor="submitBtn">
              <button
                name="submitBtn"
                type="button"
                onClick={ this.handleClick }
                disabled={ !(validateRegexEmail
                  .test(email)
                && validatePassword
                ) }
              >
                {' '}
                Entrar
                {' '}
              </button>
            </label>
          </fieldset>
        </form>
      </div>);
  }
}

Login.propTypes = {
  stateClick: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  stateClick: (state) => dispatch(loginAction(state)),
});

export default connect(null, mapDispatchToProps)(Login);
