import React, { useEffect, useState } from 'react';
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
	SHOW_PER_PAGE,
} from './consants';
import SearchInput from './components/search-input/SearchInput';
import PokemonList from './components/pokemon-list/PokemonList.js';
import useDebounce from './utils/debounce-hook.js';
import { exportAsCSVFile, exportAsJSONFile } from './utils/export-as';

import './App.scss';
import './components/Dropdown.scss';
import ExportButton from './components/export-button/ExportButton.js';

function App() {
	const [isReady, setReady] = useState(false);
	const [pokemonList, setPokemonList] = useState([]);
	const [selectedSet, setSelectedSet] = useState(new Set());
	const [language, setLanguage] = useState(LANGUAGES.US);
	const [sortMethod, setSortMethod] = useState(SORT_METHODS.ID);
	const [sortOrder, setSortOrder] = useState(SORT_ORDER.ASC);
	const [searchIds, setSearchIds] = useState(new Set());
	const [searchText, setSearchText] = useState('');
	const [showCount, setShowCount] = useState(SHOW_PER_PAGE);
	const [disableAllAnimations, setDisabledAllAnimations] = useState(false);

	const dSearchText = useDebounce(searchText, 100);

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
		setShowCount(pokemonList.length);
		setReady(true);
	}, [isReady, pokemonList]);

	useEffect(() => {
		if (dSearchText) {
			let newSet = new Set();
			pokemonList.forEach(({ id, name }) => {
				const currentName = name[language].toLowerCase();

				if (currentName.includes(dSearchText.toLowerCase().trim())) {
					newSet = newSet.add(id);
				}
			});

			setSearchIds(newSet);
			setShowCount(SHOW_PER_PAGE);
			setTimeout(() => setDisabledAllAnimations(true), 1000);
			setTimeout(() => setDisabledAllAnimations(false), 1100);
		} else {
			setSearchIds(new Set());
			setShowCount(pokemonList.length);
		}
	}, [dSearchText, pokemonList, language]);

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
			<div className="App-exports">
				<ExportButton
					title="CSV"
					exportFunction={() =>
						exportAsCSVFile(
							[...selectedSet].map(id => ({ id })),
							'favourite-poks'
						)
					}
				/>
				<ExportButton
					title="JSON"
					exportFunction={() =>
						exportAsJSONFile(
							[...selectedSet].map(id => ({ id })),
							'favourite-poks'
						)
					}
				/>
			</div>
			<main className="App-body">
				{isReady ? (
					<div className="App-controls">
						<SearchInput onSearch={setSearchText} />
					</div>
				) : null}
				<PokemonList
					list={pokemonList
						.filter(({ id }) => searchIds.size === 0 || searchIds.has(id))
						.sort(sortCompareFunction)
						.slice(0, showCount)}
					language={language}
					disableAllAnimations={disableAllAnimations}
					selectedSet={selectedSet}
					handlePokemonCheck={handlePokemonCheck}
				/>
			</main>
		</div>
	);
}

export default App;
