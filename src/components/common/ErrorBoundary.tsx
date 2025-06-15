import React, { ErrorInfo } from 'react'
export class ErrorBoundary extends React.Component<{ children:any }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error(error, info) }
  render() {
    if (this.state.hasError) return <h1>Something went wrong.</h1>
    return this.props.children
  }
}