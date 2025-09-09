import { render, screen } from '@testing-library/react'
import App from './App'
import { expect, test } from 'vitest'

test('renders Pomodoro App title', () => {
  render(<App />)
  expect(screen.getByText(/Pomodoro App/i)).toBeInTheDocument()
})
