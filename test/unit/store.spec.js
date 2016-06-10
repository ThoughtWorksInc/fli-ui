import { mutations } from 'src/vuex/store'

describe('mutations', () => {
  it('updates the active story', () => {
    const state = { activeStory: '' }
    mutations.SET_ACTIVE_STORY(state, 'new story')
    expect(state.activeStory).toBe('new story')
  })
})
