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
		disableAllAnimations,
	} = props;

	return (
		<FlipMove
			className="App-container"
			duration={1500}
			disableAllAnimations={disableAllAnimations}
		>
			{list.map(({ id, name }, key) => (
				<div key={id}>
					<PokemonCard
						id={id}
						key={id}
						isFirst={key === list.length - 1}
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
