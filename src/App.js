import React, { useEffect, useState, useCallback } from 'react';
import Dropdown from 'react-dropdown';

import 'react-dropdown/style.css';
import 'react-flags-select/css/react-flags-select.css';

import pokemonListRaw from './resources/pokemon/pokedex.json';
import {
	LANGUAGES,
	SORT_METHODS,
	SORT_OPTIONS,
	SORT_ORDER,
	SORT_ORDER_OPTIONS,
	LANGUAGE_OPTIONS,
} from './consants';
import SearchInput from './components/search-input/SearchInput';
import PokemonList from './components/pokemon-list/PokemonList.js';
import useDebounce from './utils/debounce-hook.js';

import './App.scss';
import './components/Dropdown.scss';

function App() {
	const [isReady, setReady] = useState(false);
	const [pokemonList, setPokemonList] = useState([]);
	const [selectedSet, setSelectedSet] = useState(new Set());
	const [language, setLanguage] = useState(LANGUAGES.US);
	const [sortMethod, setSortMethod] = useState(SORT_METHODS.ID);
	const [sortOrder, setSortOrder] = useState(SORT_ORDER.ASC);
	const [searchText, setSearchText] = useState('');
	const [searchIds, setSearchIds] = useState(new Set());
	const debouncedSearchText = useDebounce(searchText, 200);

	useEffect(() => {
		if (isReady) {
			return;
		}
		const list = [];

		pokemonListRaw.forEach(pokemon => {
			const { id: rawId, name = {} } = pokemon;
			const {
				english = 'unknown',
				japanese = 'unknown',
				chinese = 'unknown',
			} = name;

			let id = `${rawId}`;

			if (id.length < 3) {
				id = `000${id}`.substr(-3);
			}

			list.push({
				id,
				name: {
					[LANGUAGES.US]: english,
					[LANGUAGES.JP]: japanese,
					[LANGUAGES.CN]: chinese,
				},
			});
		});

		setPokemonList(list);
		setReady(true);
	}, [isReady]);

	useEffect(() => {
		console.log(debouncedSearchText);
		if (debouncedSearchText) {
			let newSet = new Set();
			pokemonList.forEach(({ id, name }) => {
				const currentName = name[language].toLowerCase();

				if (currentName.includes(debouncedSearchText.toLowerCase().trim())) {
					newSet = newSet.add(id);
				}
			});

			setSearchIds(newSet);
		} else {
			setSearchIds(new Set());
		}
	}, [debouncedSearchText, language, pokemonList]);

	const handlePokemonCheck = (id, checked) => {
		if (checked) {
			setSelectedSet(new Set(selectedSet.add(id).values()));
		} else {
			selectedSet.delete(id);
			setSelectedSet(new Set(selectedSet.values()));
		}
	};

	const handleSelectLanguage = ({ value }) => {
		setLanguage(value);
	};

	const handleSelectSortMethod = ({ value }) => {
		setSortMethod(value);
	};

	const handleSelectSortOrder = ({ value }) => {
		setSortOrder(parseInt(value, 10));
	};

	const sortCompareFunction = (pokemonA, pokemonB) => {
		if (sortMethod === SORT_METHODS.ID) {
			return (
				(parseInt(pokemonA.id, 10) - parseInt(pokemonB.id, 10)) * sortOrder
			);
		} else if (sortMethod === SORT_METHODS.NAME) {
			if (pokemonA.name[language] > pokemonB.name[language]) {
				return 1 * sortOrder;
			}
			if (pokemonA.name[language] < pokemonB.name[language]) {
				return -1 * sortOrder;
			}

			return 0;
		}

		return 0;
	};

	return (
		<div className="App">
			<div className="App-langpicker">
				<Dropdown
					onChange={handleSelectLanguage}
					value={language}
					options={LANGUAGE_OPTIONS}
					className="Dropdown"
					controlClassName="Dropdown-control"
					menuClassName="Dropdown-menu"
				/>
			</div>
			<div className="App-sortpicker">
				<Dropdown
					onChange={handleSelectSortMethod}
					value={sortMethod}
					options={SORT_OPTIONS}
				/>
				<Dropdown
					onChange={handleSelectSortOrder}
					value={`${sortOrder}`}
					options={SORT_ORDER_OPTIONS}
				/>
			</div>
			<div className="App-selected-size">
				<div>Total: {pokemonList.length}</div>
				<div>Selected: {selectedSet.size}</div>
			</div>
			<main className="App-body">
				{isReady ? (
					<div className="App-controls">
						<SearchInput initialValue={searchText} onChange={setSearchText} />
					</div>
				) : null}
				<PokemonList
					list={pokemonList
						.filter(
							({ id }) => debouncedSearchText.length === 0 || searchIds.has(id)
						)
						.sort(sortCompareFunction)
						.slice(0, 30)}
					language={language}
					selectedSet={selectedSet}
					handlePokemonCheck={handlePokemonCheck}
				/>
			</main>
		</div>
	);
}

export default App;
