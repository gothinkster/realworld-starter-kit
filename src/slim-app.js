import {Slim} from 'slim-js'

Slim.tag('slim-app', class extends Slim {


    get template() {
        return `<div>Hello, world</div>`
    }

})