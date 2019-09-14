import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import FlipMove from 'react-flip-move';

import 'react-dropdown/style.css';
import 'react-flags-select/css/react-flags-select.css';

import PokemonCard from './components/pokemon-card/PokemonCard';
import pokemonListRaw from './resources/pokemon/pokedex.json';

import './App.scss';
import './components/Dropdown.scss';

const images = require.context('./resources/pokemon/thumbnails', true);

const SORT_ORDER = {
	ASC: '1',
	DESC: '-1',
};

const SORT_ORDER_OPTIONS = [
	{ value: SORT_ORDER.ASC, label: 'ASC' },
	{ value: SORT_ORDER.DESC, label: 'DESC' },
];

const LANGUAGES = {
	US: 'US',
	JP: 'JP',
	CN: 'CN',
};
const LANGUAGE_OPTIONS = [
	{ value: LANGUAGES.US, label: '🇺🇸 USA' },
	{ value: LANGUAGES.JP, label: '🇯🇵 Japan' },
	{ value: LANGUAGES.CN, label: '🇨🇳 China' },
];

const SORT_METHODS = {
	ID: 'ID',
	NAME: 'Name',
};

const SORT_OPTIONS = [
	{ value: SORT_METHODS.ID, label: 'Sort by ID' },
	{ value: SORT_METHODS.NAME, label: 'Sort by Name' },
];

function App() {
	const [isReady, setReady] = useState(false);
	const [pokemonList, setPokemonList] = useState([]);
	const [selectedSet, setSelectedSet] = useState(new Set());
	const [language, setLanguage] = useState(LANGUAGES.US);
	const [sortMethod, setSortMethod] = useState(SORT_METHODS.ID);
	const [sortOrder, setSortOrder] = useState(SORT_ORDER.ASC);

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
			<div className="App-selected-size">Selected: {selectedSet.size}</div>
			<main className="App-body">
				<div className="App-controls"></div>
				<FlipMove className="App-container" duration={1500}>
					{pokemonList.sort(sortCompareFunction).map(({ id, name }, key) => (
						<div key={id}>
							<PokemonCard
								id={id}
								key={id}
								isFirst={key === 0}
								name={name[language]}
								images={images}
								isSelected={selectedSet.has(id)}
								onChange={checked => handlePokemonCheck(id, checked)}
							/>
						</div>
					))}
				</FlipMove>
			</main>
		</div>
	);
}

export default App;
