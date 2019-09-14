/**
 * Export data as JSON file
 * @param {Object} jsonData Json object to export
 * @param {string} name filename
 */
export const exportAsJSONFile = (jsonData, name) => {
	let dataStr = JSON.stringify(jsonData);
	let dataUri =
		'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

	let exportFileDefaultName = `${name}.json`;

	let linkElement = document.createElement('a');
	linkElement.setAttribute('href', dataUri);
	linkElement.setAttribute('download', exportFileDefaultName);
	linkElement.click();
};

const parseJSONToCSVStr = (listData, name) => {
	if (listData.length === 0) {
		return '';
	}

	let keys = Object.keys(listData[0]);

	let columnDelimiter = ',';
	let lineDelimiter = '\n';

	let csvColumnHeader = keys.join(columnDelimiter);
	let csvStr = csvColumnHeader + lineDelimiter;

	listData.forEach(item => {
		keys.forEach((key, index) => {
			if (index > 0 && index < keys.length - 1) {
				csvStr += columnDelimiter;
			}
			csvStr += item[key];
		});
		csvStr += lineDelimiter;
	});

	return encodeURIComponent(csvStr);
};

/**
 * Export data as CSV file
 * @param {Array<Object>} listData Array for export in CSV
 * @param {string} name filename
 */
export const exportAsCSVFile = (listData, name) => {
	let csvStr = parseJSONToCSVStr(listData);
	let dataUri = 'data:text/csv;charset=utf-8,' + csvStr;

	let exportFileDefaultName = `${name}.csv`;

	let linkElement = document.createElement('a');
	linkElement.setAttribute('href', dataUri);
	linkElement.setAttribute('download', exportFileDefaultName);
	linkElement.click();
};
