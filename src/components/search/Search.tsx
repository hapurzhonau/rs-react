import {
  Component,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react';

interface Props {
  handleGetSearchValue: (value: string) => void;
}

class Search extends Component<Props, { inputText: string }> {
  state = { inputText: localStorage.getItem('search') || '' };
  handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputText: e.target.value });
  };
  handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget).get('search');
    if (formData) this.props.handleGetSearchValue(formData.toString());
    else this.props.handleGetSearchValue('');
  };
  render(): ReactNode {
    return (
      <form
        onSubmit={this.handleFormSubmit}
        style={{ display: 'flex' }}
        className="gap-3"
      >
        <input
          name="search"
          type="text"
          placeholder=" Search"
          className="border-2 rounded-sm w-sm"
          value={this.state.inputText}
          onChange={this.handleOnchange}
        />
        <button className="border-2 cursor-pointer rounded-sm px-3 py-1 bg-gray-700">
          Search
        </button>
      </form>
    );
  }
}
export default Search;
