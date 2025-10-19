import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // could log errorInfo to a logging service
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-2">Something went wrong.</h2>
          <pre className="text-xs bg-gray-100 p-3 rounded border overflow-auto">{String(this.state.error)}</pre>
        </div>
      )
    }

    return this.props.children
  }
}
