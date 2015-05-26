var Lang = {
	languages: {},

	error: function (message) {
		console.error('Lang.js', message);
	},

	warn: function (message) {
		console.error('Lang.js', message);
	},

	log: function (message) {
		console.log('Lang.js', message);
	},

	helpers: {
		pregQuote: function preg_quote(str, delimiter) {
			//  discuss at: http://phpjs.org/functions/preg_quote/
			// original by: booeyOH
			// improved by: Ates Goral (http://magnetiq.com)
			// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// improved by: Brett Zamir (http://brett-zamir.me)
			// bugfixed by: Onno Marsman
			//   example 1: preg_quote("$40");
			//   returns 1: '\\$40'
			//   example 2: preg_quote("*RRRING* Hello?");
			//   returns 2: '\\*RRRING\\* Hello\\?'
			//   example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
			//   returns 3: '\\\\\\.\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:'

			return String(str)
				.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
		},

		objectSort: function (list, func) {
			if (!func) {
				func = function (a, b) {
					return a[1] > b[1]
				};
			}
			var sortable = [], newList = {};
			for (var item in list) {
				sortable.push([item, list[item]]);
			}
			sortable.sort(func);
			for (var item in sortable) {
				newList[sortable[item][0]] = sortable[item][1];
			}

			return newList;
		},

		treeToObject: function (obj, newObj, prefix) {
			if (!prefix) {
				prefix = '';
			}
			if (!newObj) {
				newObj = {};
			}
			for (var item in obj) {
				if (typeof obj[item] == 'object') {
					newObj = Lang.helpers.treeToObject(obj[item], newObj, prefix + item + '.');
				} else {
					newObj[prefix + item] = obj[item];
				}
			}
			return newObj;
		}
	},

	/**
	 * @param languages
	 *
	 * @return void
	 */
	addResource: function (languages, prefix) {
		if (!prefix) {
			prefix = 'lang.';
		}
		for (language in languages) {
			if (typeof languages[language] == 'string') {
				Lang.languages[prefix + language] = languages[language];
			}
			else if (typeof languages[language] == 'object') {
				Lang.addResource(languages[language], prefix + language + '.');
			} else {
				Lang.warn('`languages` param must be object/string')
			}
		}
	},

	/**
	 *
	 * @return void
	 */
	clear: function () {
		Lang.languages = {};
	},

	/**
	 * @param langCode
	 *
	 * @return boolean
	 */
	has: function (langCode) {
		return typeof Lang.languages['lang.' + langCode] != 'undefined';
	},

	/**
	 * @param message
	 * @param variables
	 *
	 * @return string
	 */
	trans: function (message, variables) {
		if (typeof variables != 'object') {
			variables = {};
		}

		variables = Lang.helpers.treeToObject(variables);

		variables = Lang.helpers.objectSort(variables, function (a, b) {
			return a[0] < b[0];
		});
		for (variable in variables) {
			var code = ':' + variable.toLowerCase(), regex;
			code = Lang.helpers.pregQuote(code);
			regex = new RegExp(code, 'gi');
			message = message.replace(regex, variables[variable]);
		}
		return message;
	},

	/**
	 * @param langCode
	 * @param variables
	 *
	 * @return string
	 */
	get: function (langCode, variables) {
		var message;
		if (!Lang.has(langCode)) {
			message = langCode;
		}
		else {
			message = Lang.languages['lang.' + langCode];
		}
		return Lang.trans(message, variables);
	},

	/**
	 * @param langCode
	 * @param count
	 * @param variables
	 *
	 * @return string
	 */
	choice: function (langCode, count, variables) {
		var message;
		if (!Lang.has(langCode)) {
			message = langCode;
		}
		else {
			message = Lang.languages['lang.' + langCode];
		}
		if (!variables) {
			variables = {};
		}
		if (!variables['count']) {
			variables.count = count;
		}

		choices = message.split('|');
		var i = 1;
		for (choice in choices) {
			var choiceMin, choiceMax, match;
			if (match = choices[choice].match(/^\[([\-0-9a-zA-Z]+),\s?([\-0-9a-zA-Z]+)\]\s?/i)) {
				choiceMin = match[1];
				choiceMax = match[2];
				choices[choice] = choices[choice].substr(match[0].length);
			}
			else if (match = choices[choice].match(/^\{([\-0-9a-zA-Z]+)}\s?/i)) {
				choiceMin = choiceMax = match[1];
				choices[choice] = choices[choice].substr(match[0].length);
			}
			else {
				choiceMin = choiceMax = i;
				if (choice == 0) {
					choiceMin = 'Inf';
				}
				else if (choice == choices.length - 1) {
					choiceMax = 'Inf';
				}
			}

			if ((choiceMin.toString().match('Inf') || choiceMin <= count) && (choiceMax.toString().match('Inf') || choiceMax >= count)) {
				return Lang.trans(choices[choice], variables);
			}
			i++;
		}
		return Lang.trans(langCode, variables);
	}
}