import React from 'react'
import SRLContextComponent from './SRL/SRLContext'
import SRLWrapper from './SRL/SRLWrapper'
import SRLLightbox from './SRL/SRLLightbox'
import { withSRLContext } from './SRL/SRLHoc'
import { Global, css } from '@emotion/core'

type Props = {
  children: object
}

const SimpleReactLightbox: React.FC<Props> = props => {
  const { children } = props
  return (
    <>
      <Global
        styles={css`
          body {
            #lightbox {
              width: 0;
              height: 0;
            }
            &.SRLOpened {
              overflow: hidden;
              /* Compensate for the scrollbar when overflow is hidden */
              margin-right: 15px;
              #SRLLightbox {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
              }
            }
          }
        `}
      />
      <SRLContextComponent>
        {children}
        <SRLLightbox />
      </SRLContextComponent>
    </>
  )
}

export { withSRLContext }
export { SRLWrapper }
export default SimpleReactLightbox
