
export const mapAllRowsToString = (objects, type, fields) => {
    let list = '.' + type + '\n'
    for (let i = 0; i < objects.length; i++) {
        if (i !== objects.length - 1) {
            for (let j = 0; j < fields.length; j++) {
                if ( j === 0 ) {
                    list += '├── ' + objects[i][ fields[j] ] + '\n'
                } else if (j !== fields.length - 1) {
                    list += '│       ├── ' + fields[j] + ': ' + objects[i][ fields[j] ] + '\n'
                } else {
                    list += '│       └── ' + fields[j] + ': ' + objects[i][ fields[j] ] + '\n'
                }
            }
        } else {
            for (let j = 0; j < fields.length; j++) {
                if ( j === 0 ) {
                    list += '└── ' + objects[i][ fields[j] ] + '\n'
                } else if (j !== fields.length - 1) {
                    list += '          ├── ' + fields[j] + ': ' + objects[i][ fields[j] ] + '\n'
                } else {
                    list += '          └── ' + fields[j] + ': ' + objects[i][ fields[j] ] + '\n'
                }
            }
        }
    }
    return list
}

export const mapRowToString = ( object, fields ) => {
    let row = ''
    for (let i = 0; i < fields.length; i++) {
        if ( i === 0 ) {
            row += object[ fields[i] ] + '\n'
        } else if ( i !== fields.length - 1 ) {
            row += '├── ' + fields[i] + ': ' + object[ fields[i] ] + '\n'
        } else {
            row += '└── ' + fields[i] + ': ' + object[ fields[i] ] + '\n'
        }
    }
    return row
}