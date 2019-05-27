'use strict'
const path = require('path')

const useView = (app) => {
    app.set('views', path.join(__dirname, '../pages'))
    app.set('view engine', 'pug')
}

export {
    useView
}
