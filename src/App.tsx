import { Component } from 'react';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import MainPage from './pages/MainPage';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    );
  }
}

export default App;
