import React from 'react'
import Styled from 'styled-components'


const Project = Styled.div`
  background: white;
  border: solid 1px #e2e2e2;
  font-weight: 600;
  overflow: visible !important;
  padding: 0.5rem;
  transform-origin: center bottom;
  transition: all 200ms;
  z-index: 1;
  & p {
    color: #333;
  }
  & img {
    height: auto;
    width: 100%;
    transition: all 150ms;
  };
  &:hover {
    border: solid 1px deepskyblue;
    outline: solid 1px deepskyblue;
    box-shadow: 0 0px 50px rgba(0,200,200, 0.3);
    z-index: 100;
    & img {};
  };
`

export default Project