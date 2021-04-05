import React, { ChangeEventHandler, FormEvent, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { signInAsync, signUpAsync, uploadAvatarAsync, getUsersAsync, postUserAsync } from '@/store/actions/login';
import { selectIsLoginPending, selectIsLoginRejected, selectLoginErrorMsg } from '@/store/selectors/login';
import { selectIsLoggedIn, selectUserAvatar } from '@/store/selectors/user';
import { selectIsRestoreAuthPending } from '@/store/selectors/restore-auth';
import useInput from '@/components/common/hooks/useInput';
import Form from '@/components/common/Form';
import Input from '@/components/common/Input';
import Btn from '@/components/common/Btn';
import FormInfo from '@/components/common/FormInfo';
import { Routes } from '@/containers/App';
import Loader from '@/components/common/ProtectedRouter/Loader';
import useToggle from '@/components/common/hooks/useToggle';
import Toggle from '@/components/common/Toggle';

const Login: React.FC = () => {
  const [email, setEmail] = useInput();
  const [username, setUsername] = useInput();
  const [avatar_url, setAvatar_url] = useState();
  const [password, setPassword] = useInput();

  const [isNewUser, setIsNewUser] = useToggle();

  const isLoginPending = useSelector(selectIsLoginPending);
  const isLoginRejected = useSelector(selectIsLoginRejected);
  const loginErrorMsg = useSelector(selectLoginErrorMsg);

  const isRestoreAuthPending = useSelector(selectIsRestoreAuthPending);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userAvatar = useSelector(selectUserAvatar);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userAvatar) console.log(userAvatar);
  }, [userAvatar]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isNewUser) {
      dispatch(signUpAsync(email, password, username, avatar_url));
      return;
    }
    dispatch(signInAsync(email, password));
  };

  const get = () => {
    dispatch(getUsersAsync());
  };

  const post = () => {
    dispatch(postUserAsync());
  };

  const setAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { files } } = e;

    if (files) {
      dispatch(uploadAvatarAsync(files[0]));
    }
  };

  if (isLoggedIn) return <Redirect to={Routes.NOTES} />;

  const isDisabled = isLoginPending || isRestoreAuthPending;

  if (isDisabled) return <Loader />;

  return (
    <LoginStyled>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              placeholder="Email"
              value={email}
              onChange={setEmail}
              disabled={isDisabled}
              type="email"
              required
              autoFocus
            />
          </InputWrapper>

          {isNewUser && (
            <>
              <InputWrapper>
                <Input
                  placeholder="Username"
                  value={username}
                  onChange={setUsername}
                  disabled={isDisabled}
                  type="name"
                  required
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  placeholder="Avatar"
                  value={avatar_url}
                  onChange={setAvatar}
                  disabled={isDisabled}
                  type="file"
                  accept="image/*"
                  required
                />
              </InputWrapper>
            </>
          )}

          <InputWrapper>
            <Input
              placeholder="Password"
              value={password}
              onChange={setPassword}
              disabled={isDisabled}
              type="password"
              required
            />
          </InputWrapper>

          <Btn isLoading={isDisabled} type="submit">
            {isNewUser ? 'Sign up' : 'Log in'}
          </Btn>
          <h3>
            <Toggle isOn={isNewUser} toggle={setIsNewUser} />
            new account
          </h3>

          <Btn onClick={get} isLoading={isDisabled}>
            Log in with Google
          </Btn>
          <Btn onClick={post} isLoading={isDisabled}>
            Guest
          </Btn>

          <FormInfo isError={isLoginRejected}>{loginErrorMsg}</FormInfo>
        </Form>
      </FormWrapper>
    </LoginStyled>
  );
};

const LoginStyled = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
`;

const InputWrapper = styled.div`
  margin-bottom: 15px;
`;

export default Login;
