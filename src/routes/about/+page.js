import { goto } from '$app/navigation';

const send = async ({
    method,
    path,
    data,
    headers,
    base
}) => {
    const opts = { method };

    if (headers && Object.keys(headers).length > 0) {
        opts.headers = new Headers();
        for (const [key, value] of Object.entries(headers)) {
            opts.headers.append(key, value);
        }
    }

    if (data) {
        if (!(opts.headers instanceof Headers)) opts.headers = new Headers();
        if (opts.headers.get('content-type') === 'multipart/form-data') {
            opts.headers.delete('content-type');
            opts.body = data;
        } else {
            opts.headers.append('content-type', 'application/json');
            opts.body = JSON.stringify(data);
        }
    }

    const fullPath = `${base}${path}`;
    const response = await fetch(fullPath, opts);

    if (response.status === 204) {
        return { response };
    }

    if (response.headers.get('content-type')?.includes('application/json')) {
        const json = await response.json();
        return { response, json };
    }

    return { response };
};

const get = (base, path, headers) => {
    return send({ method: 'GET', path, headers, base });
};

export const load = async () => {
    const {response,json} = await get('https://swapi.dev','/api/films/1/');
    if (response.ok && json) {
        return {
            items: json,
        };
    }
};