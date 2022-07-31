const base = 'https://api.realworld.io/api';

async function send({ method, path, data, token }: {
  method: 'GET' | 'DELETE' | 'POST' | 'PUT'
  path: string
  data?: unknown
  token?: string
}) {
	const opts = { method, headers: {}} as any;

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = `Token ${token}`;
	}

	return fetch(`${base}/${path}`, opts)
		.then((r) => r.text())
		.then((json) => {
			try {
				var resParsed = JSON.parse(json);

				if (resParsed?.status === 'error') {
					console.log(`API response error from ${base}/${path}: ${json}`);
				}

				return resParsed;
			} catch (err) {
				return json;
			}
		});
}

export function get(path: string, token?: string) {
	return send({ method: 'GET', path, token });
}

export function del(path: string, token?: string) {
	return send({ method: 'DELETE', path, token });
}

export function post(path: string, data: unknown, token?: string) {
	return send({ method: 'POST', path, data, token });
}

export function put(path: string, data: unknown, token?: string) {
	return send({ method: 'PUT', path, data, token });
}
