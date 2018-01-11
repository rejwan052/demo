export function urlencode(a: any) {
	const s = [], rbracket = /\[\]$/;

	const add = function (k: any, v: any) {
		v = typeof v === 'function' ? v() : v === null ? '' : v === undefined ? '' : v;
		s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
	};

	const buildParams = function (prefix: any, obj: any) {
		let i, len, key;

		if (prefix) {
			if (Array.isArray(obj)) {
				for (i = 0, len = obj.length; i < len; i++) {
					if (rbracket.test(prefix)) {
						add(prefix, obj[i]);
					} else {
						buildParams(prefix + '[' + (typeof obj[i] === 'object' ? i : '') + ']', obj[i]);
					}
				}
			} else if (obj && String(obj) === '[object Object]') {
				for (key in obj) {
					if (obj.hasOwnProperty(key)) {
						buildParams(prefix + '[' + key + ']', obj[key]);
					}
				}
			} else {
				add(prefix, obj);
			}
		} else if (Array.isArray(obj)) {
			for (i = 0, len = obj.length; i < len; i++) {
				add(obj[i].name, obj[i].value);
			}
		} else {
			for (key in obj) {
				if (obj.hasOwnProperty(key)) {
					buildParams(key, obj[key]);
				}
			}
		}
		return s;
	};

	return buildParams('', a).join('&').replace(/%20/g, '+');
}
