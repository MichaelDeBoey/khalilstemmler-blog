import React from 'react'
import PropTypes from 'prop-types'
import addToMailchimp from "gatsby-plugin-mailchimp";
import { detectEnterPress } from '../../../utils/enterPress'
import { validateEmail } from '../../../utils/validateEmail'
import { SubmitButton } from '../../shared/buttons'
import { withToastManager } from 'react-toast-notifications';
import "../styles/SubscribeForm.sass"

const SUBSCRIPTION_FLAG = 'khalil-stemmler-newsletter-subscription'

class SubscribeForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isSubmitting: false,
      isSubmittingSuccess: false,
      isSubmittingFailure: false,
      email: '',
      alreadySubscribed: false
    }

    this.changeFormSubmissionStatus = this.changeFormSubmissionStatus.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.checkIfAlreadySubscribed = this.checkIfAlreadySubscribed.bind(this);
  }

  checkIfAlreadySubscribed = () => {
    if (typeof localStorage !== "undefined") {
      const sub = localStorage.getItem(SUBSCRIPTION_FLAG);
      if (sub) {
        this.setState({ ...this.state, alreadySubscribed: true })
      } else {
        this.setState({ ...this.state, alreadySubscribed: false })
      }
    }
  }

  componentDidMount = () => {
    this.checkIfAlreadySubscribed();
  }

  setLocalStorageSubscribed = () => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(SUBSCRIPTION_FLAG, JSON.stringify({ subscribed: true }));
      this.checkIfAlreadySubscribed();
    }
  }

  clearSubscriptionFromLocalStorage = () => {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(SUBSCRIPTION_FLAG)
      this.checkIfAlreadySubscribed();
    }
  }

  changeFormSubmissionStatus = (isSubmitting, isSubmittingSuccess, isSubmittingFailure) => {
    this.setState({
      ...this.state,
      isSubmitting,
      isSubmittingSuccess,
      isSubmittingFailure
    })
  }

  submitForm = async () => {
    const { toastManager } = this.props;
    if (this.isFormValid()) {
      const { email } = this.state;
      this.changeFormSubmissionStatus(true, false, false)
      try {
        await addToMailchimp(email);
        this.changeFormSubmissionStatus(false, true, false);
        this.setLocalStorageSubscribed();
        toastManager.add(`Good stuff! I'll let you know when I have something good for you. Cheers, pal.`, {
          appearance: 'success',
          autoDismiss: false,
        });
      } catch (err) {
        console.error(err);
        this.changeFormSubmissionStatus(false, false, true)
        toastManager.add(`Hmm, that didn't work...`, {
          appearance: 'failure',
          autoDismiss: true,
        });
      }
    }
  };

  onFormFieldChanged = (fieldName, newValue) => {
    this.setState({
      ...this.state,
      [fieldName]: newValue
    })
  }

  isFormValid = () => {
    const { toastManager } = this.props;
    const { email } = this.state;
    if (email !== "" && email !== undefined && validateEmail(email)) {
      return true;
    }
    toastManager.add(`Whoops. Want to try that again with a valid email? 🤠`, {
      appearance: 'error',
      autoDismiss: true,
    });
    return false;
  }

  onKeyUp = (e) => {
    if (detectEnterPress(e)) {
      this.submitForm();
    } 
  }
  

  render () {
    const { alreadySubscribed } = this.state;
    return (
      <div 
        className="subscribe-form-container">
        <p>
          We're just getting started 🔥 If you're serious about learning software architecture, 
          design patterns, and how to write better JavaScript code, join the newsletter to get free resources & notified of when 
          I post new useful content 🖖 unsubscribe anytime.
        </p>
        { alreadySubscribed ? (
          <>
          <p>✅ Subscribed</p>
          <div 
            onClick={(e) => this.clearSubscriptionFromLocalStorage()} 
            className="resend-link">Use a different email? Resend?
          </div>
          </>
        ) : (
          <div className="input-container">
            <input 
              onChange={(e) => this.onFormFieldChanged('email', e.target.value)}
              onKeyUp={(e) => this.onKeyUp(e)} 
              type="text" 
              placeholder="Email"
            />
            <SubmitButton 
              text="Get notified"
              onClick={() => this.submitForm()}
            />
          </div>
        )}
        
      </div>
    )
  }
}

export default withToastManager(SubscribeForm);

SubscribeForm.propTypes = {

}