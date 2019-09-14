import React from 'react';

import './ExportButton.scss';

function ExportButton(props) {
	const { title, exportFunction } = props;

	return (
		<div className="ExportButton" onClick={exportFunction}>
			{title}
		</div>
	);
}

export default ExportButton;
