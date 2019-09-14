import React from 'react';
import './RoundCheckbox.scss';

function RoundCheckbox(props) {
	const { isChecked = false, onChange = () => true, id } = props;

	return (
		<div className="RoundCheckbox-round">
			<input
				type="checkbox"
				id={`checkbox_${id}`}
				onChange={onChange}
				checked={isChecked}
			/>
			<label htmlFor={`checkbox_${id}`}></label>
		</div>
	);
}

export default RoundCheckbox;
