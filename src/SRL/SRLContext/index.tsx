import React, { useReducer } from 'react'

type Props = {
  children: object
}

interface IState {
  elements: object
  isOpened: boolean
  options: {
    autoplaySpeed: number
    buttonsIconPadding: string
    buttonsBackgroundColor: string
    buttonsIconColor: string
    buttonsSize: string
    captionColor: string
    captionFontFamily: string
    captionFontSize: string
    captionFontStyle: string
    captionFontWeight: string
    enablePanzoom: boolean
    hideControlsAfter: number
    overlayColor: string
    showCaption: boolean
    showThumbnails: boolean
    slideTransitionSpeed: number
    thumbnailsOpacity: number
    transitionSpeed: number
    transitionTimingFunction: string
  }
  selectedElement: {
    caption: void
    height: void
    id: void
    source: void
    width: void
  }
}

const initialState: IState = {
  elements: [],
  isOpened: false,
  options: {
    autoplaySpeed: 3000,
    buttonsIconPadding: '0px',
    buttonsBackgroundColor: 'rgba(30,30,36,0.8)',
    buttonsIconColor: 'rgba(255, 255, 255, 0.8)',
    buttonsSize: '40px',
    captionColor: '#FFFFFF',
    captionFontFamily: 'inherit',
    captionFontSize: 'inherit',
    captionFontStyle: 'inherit',
    captionFontWeight: 'inherit',
    enablePanzoom: true,
    hideControlsAfter: 3000,
    overlayColor: 'rgba(0, 0, 0, 0.9)',
    showCaption: true,
    showThumbnails: true,
    slideTransitionSpeed: 600,
    thumbnailsOpacity: 0.4,
    transitionSpeed: 600,
    transitionTimingFunction: 'ease'
  },
  selectedElement: {
    caption: undefined,
    height: undefined,
    id: undefined,
    source: undefined,
    width: undefined
  }
}

enum ActionType {
  GrabOptions = 'GRAB_OPTIONS',
  GrabElements = 'GRAB_ELEMENTS',
  HandleElement = 'HANDLE_ELEMENT',
  CloseLightbox = 'CLOSE_LIGHTBOX'
}

type IAction =
  | { type: 'GRAB_OPTIONS'; mergedOptions: object }
  | { type: 'GRAB_ELEMENTS'; elements: object }
  | { type: 'HANDLE_ELEMENT'; element: object }
  | { type: 'CLOSE_LIGHTBOX' }

const SRLCtx = React.createContext(initialState)

const SRLContextComponent: React.FC<Props> = props => {
  // Reducer
  const reducer: React.Reducer<IState, IAction> = (state, action) => {
    switch (action.type) {
      case ActionType.GrabOptions:
        return {
          ...state,
          options: {
            ...action.mergedOptions
          }
        }
      case ActionType.GrabElements:
        return {
          ...state,
          elements: action.elements
        }
      case ActionType.HandleElement:
        return {
          ...state,
          isOpened: true,
          selectedElement: {
            ...action.element
          }
        }
      case ActionType.CloseLightbox:
        return {
          ...state,
          isOpened: false
        }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer<React.Reducer<IState, IAction>>(
    reducer,
    initialState
  )

  return (
    <SRLCtx.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {props.children}
    </SRLCtx.Provider>
  )
}

export { SRLCtx }
export default SRLContextComponent
