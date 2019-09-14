/**
 * Available sort orders
 */
export const SORT_ORDER = {
	ASC: '1',
	DESC: '-1',
};

/**
 * Sort options for dropdown
 */
export const SORT_ORDER_OPTIONS = [
	{ value: SORT_ORDER.ASC, label: 'ASC' },
	{ value: SORT_ORDER.DESC, label: 'DESC' },
];

/**
 * Available languages of Pokemon's names
 */
export const LANGUAGES = {
	US: 'US',
	JP: 'JP',
	CN: 'CN',
};

/**
 * Language options for dropdown
 */
export const LANGUAGE_OPTIONS = [
	{ value: LANGUAGES.US, label: '🇺🇸 USA' },
	{ value: LANGUAGES.JP, label: '🇯🇵 Japan' },
	{ value: LANGUAGES.CN, label: '🇨🇳 China' },
];

/**
 * Available sort methods
 */
export const SORT_METHODS = {
	ID: 'ID',
	NAME: 'Name',
};

/**
 * Sort options for dropdown
 */
export const SORT_OPTIONS = [
	{ value: SORT_METHODS.ID, label: 'Sort by ID' },
	{ value: SORT_METHODS.NAME, label: 'Sort by Name' },
];
