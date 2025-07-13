import { Component, type ReactNode } from 'react';

class ButtonError extends Component {
  state = { isError: false };
  handleError = () => {
    this.setState({ isError: true });
  };
  render(): ReactNode {
    if (this.state.isError) {
      throw new Error('Error from ButtonError');
    }
    return (
      <button
        onClick={this.handleError}
        className="border-2 rounded-sm px-3 bg-gray-700 cursor-pointer max-w-fit"
      >
        Error
      </button>
    );
  }
}
export default ButtonError;
