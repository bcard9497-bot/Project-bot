import '@testing-library/jest-dom'

// jsdom localStorage is available; ensure clean state between tests
beforeEach(() => {
  localStorage.clear()
})
