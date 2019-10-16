import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as action from '../../store/Action/index';

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Mail address'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: '*********'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false
			}
		},
		isSignup: true
	};

	checkValidity = (value, rules) => {
		let isValid = false;
		if (!rules) {
			return true;
		}
		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		return isValid;
	};

	inputChangedHandler = (event, controlsName) => {
		// console.log(event.target.value);
		const updatedControls = {
			...this.state.controls,
			[controlsName]: {
				...this.state.controls[controlsName],
				value: event.target.value,
				valid: this.checkValidity(event.target.value, this.state.controls[controlsName].validation),
				touched: true
			}
		};
		this.setState({ controls: updatedControls });
	};

	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
	};

	switchToAuthModelHandler = () => {
		this.setState((prevState) => {
			return { isSignup: !prevState.isSignup };
		});
	};

	render() {
		let fromElementArray = [];

		for (let key in this.state.controls) {
			fromElementArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}
		const form = fromElementArray.map((fromElement) => (
			<Input
				key={fromElement.id}
				elementType={fromElement.config.elementType}
				elementConfig={fromElement.config.elementConfig}
				value={fromElement.config.value}
				changed={(event) => this.inputChangedHandler(event, fromElement.id)}
			/>
		));
		return (
			<div className={classes.Auth}>
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="Info">ADD USER</Button>
					<Button clicked={this.switchToAuthModelHandler} btnType="Success">
						AUTHENTICATE TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
					</Button>
				</form>
			</div>
		);
	}
}

const mapDispathToProps = (dispatch) => {
	return {
		onAuth: (email, password, isSignup) => dispatch(action.auth(email, password, isSignup))
	};
};

export default connect(null, mapDispathToProps)(Auth);
