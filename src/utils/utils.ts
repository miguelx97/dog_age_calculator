const short: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
};

const long: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

export const localeDateOptions: {
    lang: Intl.LocalesArgument;
    short: Intl.DateTimeFormatOptions;
    long: Intl.DateTimeFormatOptions;
} = {
    lang: 'en',
    short,
    long,
}