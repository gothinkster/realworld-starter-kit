import {Slim} from 'slim-js'

const matcher = attr => attr.nodeName === 'key.enter'

Slim.customDirective(
    matcher, (source, target, attribute) => {
        const delegate = attribute.value
        const handlers = Slim._$(target).eventHandlers
        const execution = e => {
            e.which === 13 
                ? source[delegate].call(source, e)
                : null
        }
        handlers['keydown'] = handlers['keydown'] || []
        handlers['keydown'].push(execution)
        target.addEventListener('keydown', execution)
    }
)