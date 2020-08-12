
export const generateUrlCode = ( type ) => {
    let code = 'op?' + type + '='
    let hash = [
        '!', '@', '#', '$', '%', '^', '&', '*',
        'Q', 'W', 'X', 'S', 'q', 'w', 'x', 's'
    ]
    code += hash[ randomInt(7, 14) ] 
          + hash[ randomInt(7, 14) ] 
          + hash[ randomInt(7, 14) ] 
          + hash[ randomInt(0, 7) ] 
          + hash[ randomInt(0, 7) ]
          + hash[ randomInt(0, 7) ]
          + randomInt(0, 9)
          + randomInt(0, 9) 
          + randomInt(0, 9)
    return code
}

const randomInt = (min, max) => {
    return min + Math.floor((max - min) * Math.random())
}