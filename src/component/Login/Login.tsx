import { useContext, useEffect, useReducer, useRef, useState } from 'react'
import AuthContext from '../../store/auth-context';

import classes from "./Login.module.css";

const emailReducer = (state: any, action: any) => {
    if (action.type === "EMAIL_INPUT") {
        return { value: action.val, isValid: action.val.includes("@") };
    }
    if (action.type === "EMAIL_BLUR") {
        return { value: state.value, isValid: state.value.includes("@") };
    }
    return { value: "", isValid: false };
};

const passwordReducer = (state: any, action: any) => {
    if (action.type === "PASSWORD_INPUT") {
        return { value: action.val, isValid: action.val.trim().length > 6 };
    }
    if (action.type === "PASSWORD_BLUR") {
        return { value: state.value, isValid: state.value.trim().length > 6 };
    }
    return { value: "", isValid: false };
};

const Login = () => {
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: null
    });

    // const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    //     value: '',
    //     isValid: null
    // });

    const authCtx = useContext(AuthContext);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();


    const { isValid: emailIsValid } = emailState;
    // const { isValid: passwordIsValid } = passwordState;

    useEffect(() => {
        const identifirt = setTimeout(() => {
            setFormIsValid(emailIsValid); // && passwordIsValid
        }, 500);

        return () => {
            clearTimeout(identifirt);
        }
    }, [emailIsValid]); //, passwordIsValid

    const emailChangeHandler = (event: any) => {
        dispatchEmail({ type: "EMAIL_INPUT", val: event.target.value });
    };

    // const passwordChangeHandler = (event: any) => {
    //     dispatchPassword({ type: "PASSWORD_INPUT", val: event.target.value });
    // };

    const validateEmailHandler = () => {
        dispatchEmail({ type: "EMAIL_BLUR" });
    };

    // const validatePasswordHandler = () => {
    //     dispatchPassword({ type: "PASSWORD_BLUR" });
    // };

    // const submitHandler = (event) => {
    //     event.preventDefault();
    //     if (formIsValid) {
    //         authCtx.onLogin(emailState.value, passwordState.value);
    //     } else if (!emailIsValid) {
    //         emailInputRef.current.focus();
    //     } else {
    //         passwordInputRef.current.focus();
    //     }
    // }

    return (
        <form>
            {/* <Input
                ref={emailInputRef}
                id="email"
                label="E-Mail"
                type="email"
                isValid={emailIsValid}
                value={emailState.value}
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler} /> */}
            {/* <Input
                ref={passwordInputRef}
                id="password"
                label="Password"
                type="password"
                isValid={passwordIsValid}
                value={passwordState.value}
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
            /> */}
            <div className={classes.actions}>
                <button type="submit" className={classes.btn} disabled={!formIsValid}>
                    Login
                </button>
            </div>
        </form>
    )
}

export default Login
