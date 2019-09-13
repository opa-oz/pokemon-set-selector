import React, { useEffect, useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';

import PokemonCard from './components/pokemon-card/PokemonCard';
import pokemonListRaw from './resources/pokemon/pokedex.json';

import './App.css';
import 'react-flags-select/css/react-flags-select.css';

const images = require.context('./resources/pokemon/thumbnails', true);

function App() {
	const [isReady, setReady] = useState(false);
	const [pokemonList, setPokemonList] = useState([]);
	const [selectedSet, setSelectedSet] = useState(new Set());
	const [language, setLanguage] = useState('US');

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
					US: english,
					JP: japanese,
					CN: chinese,
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

	const handleSelect = lg => {
		setLanguage(lg);
	};

	return (
		<div className="App">
			<div className="App-langpicker">
				<ReactFlagsSelect
					onSelect={handleSelect}
					defaultCountry="US"
					countries={['US', 'JP', 'CN']}
				/>
			</div>
			<header className="App-header">Create you favourite Pokemons!</header>
			<main className="App-body">
				<div className="App-controls"></div>
				<div className="App-container">
					{pokemonList.map(({ id, name }, key) => (
						<PokemonCard
							id={id}
							key={id}
							isFirst={key === 0}
							name={name[language]}
							images={images}
							isSelected={selectedSet.has(id)}
							onChange={checked => handlePokemonCheck(id, checked)}
						/>
					))}
				</div>
			</main>
		</div>
	);
}

export default App;
