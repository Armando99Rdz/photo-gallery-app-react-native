/** photos reducer file. Our reducer will support 3 actions, 
 * LOADING, SUCCESS, and ERROR, which correspond to UI states. */

const types = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

export const actionCreators = {
  loading: () => ({ type: types.LOADING }),
  failure: () => ({ type: types.FAILURE }),
  success: (photos, page) => ({ 
    type: types.SUCCESS, 
    payload: { photos, page } 
  })
}

/** las nuevas fotos se concatenaran con array 'photos' creando una lista infinita */
export const initialState = {
  loading: false, 
  error: false,
  photos: [],
  nextPage: 1
}

export function reducer (state, action) {
  switch (action.type) {
    case types.LOADING: 
      return { ...state, loading: true, error: false }
    case types.FAILURE:
      return { ...state, loading: false, error: true }
    case types.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        photos: [...state.photos, ...action.payload.photos], // concatena
        nextPage: state.nextPage + 1, // siguiente página
      }
  }
}