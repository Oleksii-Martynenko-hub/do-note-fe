import React from 'react';
import styled from 'styled-components';
import feather from 'feather-icons';
import icons from 'feather-icons/dist/icons.json';
import parse from 'html-react-parser';

import { CustomStyled } from '@/components/common/Button';

export type Icons = keyof typeof icons;

interface Props {
  icon: Icons;
  viewBox?: string;
  fill?: 'none' | 'currentColor';
  stroke?: 'none' | 'currentColor';
  strokeWidth?: number;
  customStyled?: CustomStyled;
}

const SvgIcon: React.FC<Props> = ({
  icon,
  viewBox = '0 0 24 24',
  fill = 'none',
  stroke = 'currentColor',
  strokeWidth = 2,
  customStyled,
}) => (
  <SvgIconStyled
    viewBox={viewBox}
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    customStyled={customStyled}
  >
    {parse(feather.icons[icon].contents)}
  </SvgIconStyled>
);

const SvgIconStyled = styled.svg<{ customStyled?: CustomStyled }>`
  display: block;  
  width: 100%;
  height: 100%;

  ${({ customStyled }) => customStyled};
`;

export default SvgIcon;
