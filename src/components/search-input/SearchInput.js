import React from 'react';
import SearchIcon from '../../assets/magnifier.svg';
import './SearchInput.scss';

function SearchInput(props) {
	const { value, onChange } = props;

	const handleSearchTextChange = (e = {}) => {
		const { target = {} } = e;
		const { value } = target;

		onChange(value);
	};

	return (
		<div className="SearchInput">
			<input
				type="text"
				className="SearchInput-input"
				value={value}
				onChange={handleSearchTextChange}
			/>
			<div className="SearchInput-icon">
				<img src={SearchIcon} alt="Search icon" />
			</div>
		</div>
	);
}

export default SearchInput;
