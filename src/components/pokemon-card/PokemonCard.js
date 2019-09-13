import React from 'react';
import ReactTooltip from 'react-tooltip';

import RoundCheckbox from '../round-checkbox/RoundCheckox';
import './PokemonCard.css';

function PokemonCard(props) {
	const {
		id,
		name,
		images,
		isFirst = false,
		isSelected = false,
		onChange,
	} = props;

	return (
		<div
			onClick={() => onChange(!isSelected)}
			data-tip={name}
			id={id}
			className="PokemonCard"
		>
			<div className="PokemonCard-image_container">
				<img src={images(`./${id}.png`)} alt="name" />
			</div>
			<div className="PokemonCard-checkbox_container">
				<RoundCheckbox isChecked={isSelected} id={id} />
			</div>
			{isFirst ? (
				<ReactTooltip className="ProfileCard-tooltip" effect="solid" />
			) : null}
		</div>
	);
}

export default PokemonCard;
