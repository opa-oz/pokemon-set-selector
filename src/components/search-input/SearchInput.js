import React, { useState } from 'react';

import useKeyPress from '../../utils/key-press-hook';
import SearchIcon from '../../assets/magnifier.svg';
import './SearchInput.scss';

function SearchInput(props) {
	const { onSearch } = props;
	const [searchText, setSearchText] = useState('');
	const isEnterKeyPressed = useKeyPress('Enter');

	const handleSearchTextChange = (e = {}) => {
		const { target = {} } = e;
		const { value } = target;

		e.persist();
		setSearchText(value);
	};

	const handleSearch = () => {
		onSearch(searchText);
	};

	if (isEnterKeyPressed) {
		handleSearch(searchText);
	}

	return (
		<div className="SearchInput">
			<input
				type="text"
				className="SearchInput-input"
				value={searchText}
				onChange={handleSearchTextChange}
			/>
			<div className="SearchInput-icon" onClick={handleSearch}>
				<img src={SearchIcon} alt="Search icon" />
			</div>
		</div>
	);
}

export default SearchInput;
