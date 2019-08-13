import React from 'react'
import Styled from 'styled-components'

const ProjectGrid = Styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  @media screen and (min-width: 700px) {
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  };
  gap: 0.1rem;
  overflow: visible !important;
`

export default ProjectGrid
