import React, { useState } from 'react';
import styled, {
  keyframes,
  Keyframes,
  FlattenSimpleInterpolation,
  FlattenInterpolation,
  ThemeProps,
} from 'styled-components';

export type CustomStyled =
  | FlattenSimpleInterpolation
  | FlattenInterpolation<ThemeProps<any>>
  | undefined;

interface Props {
  disabled?: boolean;
  customStyled?: CustomStyled;
  onclick?: () => void;
}

const Button: React.FC<Props> = ({
  disabled,
  onclick,
  children,
  customStyled,
}) => {
  const [animation, setAnimation] = useState(none);

  const handleClick = () => {
    setAnimation(pulse);

    if (onclick) onclick();
  };

  const handleAnimationEnd = () => setAnimation(none);

  return (
    <ButtonStyled
      onClick={handleClick}
      customStyled={customStyled}
      onAnimationEnd={handleAnimationEnd}
      animation={animation}
      disabled={disabled}
    >
      {children}
    </ButtonStyled>
  );
};

const none = keyframes``;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.5);
  }

  20% {
    transform: scale(.99);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.5);
  }

  45% {
    transform: scale(1);
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.25);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 6px rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
`;

const ButtonStyled = styled.button<{ animation: Keyframes, customStyled: CustomStyled }>`
  width: auto;
  height: 40px;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 0 12px;
  border: none;
  background: ${({ theme }) => (theme.palette.primary)};
  border-radius: 4px;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  color: #fff;
  opacity: 0.9;
  order: 1;
  animation:  1s linear ${({ animation }) => (animation)};

  &>a {
    text-decoration: inherit;
    color: inherit;
    width: 100%;
    height: 100%;
    display: contents;
  }

  &:active, &:hover {
    opacity: 1;
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  
  ${({ customStyled }) => customStyled};
`;

export default Button;
