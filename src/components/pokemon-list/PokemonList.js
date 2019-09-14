import React from 'react';
import FlipMove from 'react-flip-move';

import PokemonCard from './../pokemon-card/PokemonCard';

const images = require.context('../../resources/pokemon/thumbnails', true);

const PokemonList = React.memo(props => {
	const {
		list = [],
		language,
		handlePokemonCheck,
		selectedSet = new Set(),
	} = props;

	return (
		<FlipMove className="App-container" duration={1500}>
			{list.map(({ id, name }, key) => (
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
	);
});

export default PokemonList;
