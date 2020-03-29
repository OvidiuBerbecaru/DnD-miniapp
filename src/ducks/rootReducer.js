import { update, assocPath } from 'ramda'

const initialLayouts = [
  {
    name: 'Layout 1',
    layout: [
      { i: '0-1', x: 0, y: 0, w: 12, h: 2 },
      { i: '0-2', x: 0, y: 0, w: 12, h: 1 },
      { i: '0-3', x: 0, y: 2, w: 6, h: 2 },
      { i: '0-4', x: 6, y: 0, w: 6, h: 2 },
      { i: '0-5', x: 0, y: 4, w: 12, h: 1 },
    ],
  },
  {
    name: 'Layout 2',
    layout: [
      { i: '1-1', x: 0, y: 0, w: 12, h: 2 },
      { i: '1-2', x: 0, y: 2, w: 6, h: 2 },
      { i: '1-3', x: 6, y: 0, w: 6, h: 2 },
      { i: '1-4', x: 0, y: 2, w: 6, h: 2 },
      { i: '1-5', x: 6, y: 0, w: 6, h: 2 }
    ],
  },
  {
    name: 'Layout 3',
    layout: [
      { i: '2-1', x: 0, y: 0, w: 12, h: 1 },
      { i: '2-2', x: 0, y: 2, w: 2, h: 2 },
      { i: '2-3', x: 2, y: 2, w: 10, h: 2 },
      { i: '2-4', x: 0, y: 4, w: 2, h: 2 },
      { i: '2-5', x: 2, y: 4, w: 10, h: 2 },
      { i: '2-6', x: 0, y: 6, w: 12, h: 1 },
    ],
  }
]

const rootReducer = (state = initialLayouts, action) => {
  switch (action.type) {
    case 'UPDATE_LAYOUT':
      return update(
        action.payload.index,
        assocPath(
          ['layout'],
          action.payload.layout,
          state[action.payload.index]
        ),
        state
      )
    default:
      return state
  }
}

export default rootReducer
