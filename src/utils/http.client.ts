import type { TResponse } from "@/types/response";

type RequestOptions = RequestInit & {
    headers?: Record<string, string>;
};

type RequestConfig = RequestInit & {
    headers: Record<string, string>;
};

type RequestInterceptor = (
    config: RequestConfig
) => RequestConfig | Promise<RequestConfig>;
type ResponseInterceptor = (response: Response) => Response | Promise<Response>;

export type HTTPError = {
    response?: {
        status: number;
        data: TResponse<unknown>;
    };
    message: string;
};

export class HTTP {
    private baseURL: string;
    private defaultHeaders: Record<string, string>;
    private interceptors: {
        request: RequestInterceptor[];
        response: ResponseInterceptor[];
    };

    constructor(baseURL = "", defaultHeaders: Record<string, string> = {}) {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            "Content-Type": "application/json",
            ...defaultHeaders,
        };
        this.interceptors = {
            request: [],
            response: [],
        };
    }

    addRequestInterceptor(fn: RequestInterceptor): void {
        this.interceptors.request.push(fn);
    }

    addResponseInterceptor(fn: ResponseInterceptor): void {
        this.interceptors.response.push(fn);
    }

    async request<T = unknown>(
        endpoint: string,
        options: RequestOptions = {}
    ): Promise<TResponse<T>> {
        const url = `${this.baseURL}${endpoint}`;
        let config: RequestConfig = {
            ...options,
            headers: {
                ...this.defaultHeaders,
                ...options.headers,
            },
        };

        // Run request interceptors
        for (const interceptor of this.interceptors.request) {
            config = await interceptor(config);
        }

        try {
            let response = await fetch(url, config);

            // Run response interceptors
            for (const interceptor of this.interceptors.response) {
                response = await interceptor(response);
            }

            // Parse JSON if response has content
            const contentType = response.headers.get("content-type");
            let data: TResponse<T>;

            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const text = await response.text();
                data = {
                    content: text as unknown as T,
                    message: "Success",
                    errors: null,
                };
            }

            // Handle non-2xx responses
            if (!response.ok) {
                const error: HTTPError = {
                    response: {
                        status: response.status,
                        data: data as TResponse<unknown>,
                    },
                    message: data.message || `HTTP Error: ${response.status}`,
                };
                throw error;
            }

            return data;
        } catch (error) {
            // Re-throw if it's already an HTTPError
            if (error && typeof error === "object" && "response" in error) {
                throw error;
            }

            // Handle network errors or parsing errors
            console.error("Request failed:", error);
            const httpError: HTTPError = {
                message:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong",
            };
            throw httpError;
        }
    }

    get<T = unknown>(
        endpoint: string,
        options: RequestOptions = {}
    ): Promise<TResponse<T>> {
        return this.request<T>(endpoint, { ...options, method: "GET" });
    }

    post<T = unknown>(
        endpoint: string,
        data?: unknown,
        options: RequestOptions = {}
    ): Promise<TResponse<T>> {
        return this.request<T>(endpoint, {
            ...options,
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    put<T = unknown>(
        endpoint: string,
        data?: unknown,
        options: RequestOptions = {}
    ): Promise<TResponse<T>> {
        return this.request<T>(endpoint, {
            ...options,
            method: "PUT",
            body: JSON.stringify(data),
        });
    }

    delete<T = unknown>(
        endpoint: string,
        options: RequestOptions = {}
    ): Promise<TResponse<T>> {
        return this.request<T>(endpoint, { ...options, method: "DELETE" });
    }
}

export const getError = (error: HTTPError | unknown): TResponse<unknown> => {
    const httpError = error as HTTPError;
    if (
        httpError &&
        typeof httpError === "object" &&
        "response" in httpError &&
        httpError.response?.data
    ) {
        return {
            content: httpError.response.data.content || null,
            message: httpError.response.data.message || "Something went wrong",
            errors: httpError.response.data.errors || null,
        };
    }

    return {
        content: null,
        message:
            error instanceof Error ? error.message : "Something went wrong",
        errors: null,
    };
};
