function pseudo_constructor(target, {sources, methods}){
    sources.forEach( source =>
        Object.defineProperties(
            target,
            Object.getOwnPropertyDescriptors(source)
            )
    )
    Object.entries(methods).forEach(([key, val]) => Object.getPrototypeOf(target)[key] = val)
}

module.exports = pseudo_constructor