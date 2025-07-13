import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Oops! ErrorBoundary caught the error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h3>Oops!!! ErrorBoundary caught the error</h3>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
