export type TNavigation = {
    name: string;
    href: string;
    icon?: string;
    children?: TNavigation[];
};

export type TOption = {
    label: string;
    value: string;
};
