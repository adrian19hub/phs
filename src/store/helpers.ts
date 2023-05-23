const getAsArray = <T>(set: Iterable<T>) => new Array(set)

const getAsSet = <T>(arr: Iterable<T>) => new Set(arr)

export const setHelpers = {
    getAsArray,
    getAsSet
}