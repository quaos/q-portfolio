// import { base64 } from "../../../common/src/deps/std.ts";

import { AuthorizationType, ContentType, HttpHeader, HttpMethod } from "../../../common/src/models/HttpConstants.ts";

export class RestClient {
    baseUrl: string;
    authHeader?: string;
    queryParamConvertersMap: Map<string, (value: any) => string>;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.queryParamConvertersMap = new Map();
    }

    public withBasicAuth(username: string, password: string): RestClient {
        const credentials = btoa(`${username}:${password}`);
        this.authHeader = `${AuthorizationType.BASIC} ${credentials}`;

        return this
    }

    public withBearerAuth(token: string): RestClient {
        this.authHeader = `${AuthorizationType.BEARER} ${token}`;

        return this
    }

    public withQueryParamConverter(key: string, converter: (value: any) => string) {
        this.queryParamConvertersMap.set(key, converter);
    }

    public async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        const url = new URL(endpoint, this.baseUrl);
        const urlQueryParams = new URLSearchParams();
        (params) && Object.keys(params).forEach((key) => {
            const value = params[key];
            const converter = this.queryParamConvertersMap.get(key);
            const valueStr = ((value !== undefined) && (value !== null))
                ? ((converter) ? converter(value) : value.toString())
                : undefined;

            (valueStr !== undefined) && (valueStr !== null)
                && urlQueryParams.set(key, valueStr);
        });

        const resp = await fetch(url.toString(), {
            method: HttpMethod.GET,
            headers: this.createHeaders(undefined, ContentType.APPLICATION_JSON),
            body: urlQueryParams,
        });

        return await resp.json() as T
    }

    public async post<TIn, TOut>(endpoint: string, body: TIn): Promise<TOut> {
        const url = new URL(endpoint, this.baseUrl);

        const resp = await fetch(url.toString(), {
            method: HttpMethod.POST,
            headers: this.createHeaders(ContentType.APPLICATION_JSON, ContentType.APPLICATION_JSON),
            body: JSON.stringify(body),
        });

        return await resp.json() as TOut
    }

    public async put<TIn, TOut>(endpoint: string, body: TIn): Promise<TOut> {
        const url = new URL(endpoint, this.baseUrl);

        const resp = await fetch(url.toString(), {
            method: HttpMethod.PUT,
            headers: this.createHeaders(ContentType.APPLICATION_JSON, ContentType.APPLICATION_JSON),
            body: JSON.stringify(body),
        });

        return await resp.json() as TOut
    }

    public async delete<T>(endpoint: string): Promise<T> {
        const url = new URL(endpoint, this.baseUrl);

        const resp = await fetch(url.toString(), {
            method: HttpMethod.DELETE,
            headers: this.createHeaders(),
        });

        return await resp.json() as T
    }

    createHeaders(contentType?: string, accept?: string): Record<string, string> {
        const headers = <Record<string, string>>{};

        (this.authHeader) && (headers[HttpHeader.AUTHORIZATION] = this.authHeader);
        (contentType) && (headers[HttpHeader.CONTENT_TYPE] = contentType);
        (accept) && (headers[HttpHeader.ACCEPT] = accept);

        return headers
    }
}