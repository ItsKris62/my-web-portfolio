import { render, screen } from '@testing-library/react'
import Card from './Card'

describe('Card', () => {
  it('renders children content', () => {
    render(<Card>Content</Card>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
