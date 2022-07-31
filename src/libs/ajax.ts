const commonOption: RequestInit = {
	credentials: 'include',
	headers: {
		'Content-Type': 'application/json'
	}
}

export function post(endpoint: string, data?: unknown) {
	return fetch(endpoint, {
		...commonOption,
		method: 'POST',
		body: JSON.stringify(data || {}),
	}).then((r) => r.json());
}

export function put(endpoint: string, data?: unknown) {
	return fetch(endpoint, {
		...commonOption,
		method: 'PUT',
		body: JSON.stringify(data || {}),
	}).then((r) => r.json());
}


export function del(endpoint: string) {
	return fetch(endpoint, {
		...commonOption,
		method: 'DELETE',
	}).then((r) => r.json());

}