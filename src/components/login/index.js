import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import ThemeContext from '../../Context/ThemeContext'
import {
  LoginContainer,
  LoginCardContainer,
  WebsiteLogo,
  Label,
  LoginInput,
  Form,
  ShowPasswordLabel,
  LoginButton,
  ErrorMsg,
} from './styledComponent'

class login extends Component {
  state = {
    username: '',
    password: '',
    passwordType: '',
    errorMsg: '',
    isError: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
    this.setState({isError: false})
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, isError: true})
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onCheckBox = event => {
    this.setState({passwordType: event.target.checked ? 'text' : 'password'})
  }

  updateUserName = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, passwordType, errorMsg, isError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const websiteLogo = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          const theme = isDarkTheme ? 'dark' : 'light'

          return (
            <LoginContainer theme={theme}>
              <LoginCardContainer theme={theme}>
                <WebsiteLogo src={websiteLogo} alt="website logo" />
                <Form onSubmit={this.onSubmit}>
                  <Label htmlFor="username" theme={theme}>
                    USERNAME
                  </Label>
                  <LoginInput
                    type="text"
                    id={username}
                    placeholder="Username"
                    value={username}
                    onChange={this.updateUserName}
                    theme={theme}
                  />
                  <Label htmlFor="password" theme={theme}>
                    PASSWORD
                  </Label>
                  <LoginInput
                    type={passwordType}
                    id={password}
                    placeholder="Password"
                    value={password}
                    onChange={this.updatePassword}
                    theme={theme}
                  />
                  <input
                    type="checkbox"
                    id="showPassword"
                    onClick={this.onCheckBox}
                  />
                  <ShowPasswordLabel htmlFor="password" theme={theme}>
                    Show Password
                  </ShowPasswordLabel>
                  <div>
                    <LoginButton type="submit">Login</LoginButton>
                  </div>
                  <ErrorMsg>{isError && `* ${errorMsg}`}</ErrorMsg>
                </Form>
              </LoginCardContainer>
            </LoginContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default login
