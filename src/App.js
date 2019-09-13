import React, { useEffect, useState } from 'react';

import './App.css';
import PokemonCard from './components/pokemon-card/PokemonCard';
import pokemonListRaw from './resources/pokemon/pokedex.json';

const images = require.context('./resources/pokemon/thumbnails', true);

function App() {
	const [isReady, setReady] = useState(false);
	const [pokemonList, setPokemonList] = useState([]);
	const [selectedSet, setSelectedSet] = useState(new Set());

	useEffect(() => {
		if (isReady) {
			return;
		}
		const list = [];

		pokemonListRaw.forEach(pokemon => {
			const { id: rawId, name = {} } = pokemon;
			const { english: engName = 'unknown' } = name;

			let id = `${rawId}`;

			if (id.length < 3) {
				id = `000${id}`.substr(-3);
			}

			list.push({ id, name: engName });
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

	return (
		<div className="App">
			<header className="App-header">Create you favourite Pokemons!</header>
			<main className="App-body">
				<div className="App-controls"></div>
				<div className="App-container">
					{pokemonList.map(({ id, name }, key) => (
						<PokemonCard
							id={id}
							key={id}
							isFirst={key === 0}
							name={name}
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
