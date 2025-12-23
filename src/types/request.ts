export type TPaginationRequest = {
    page?: number;
    rows?: number;
    searchFilters?: {
        [key: string]: string | number | boolean;
    };
    filters?: {
        [key: string]: string | number | boolean;
    };
    rangedFilters?: {
        key: string;
        start: string;
        end: string;
    }[];
    orderKey?: string;
    orderRule?: "asc" | "desc";
};
