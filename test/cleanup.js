import reactDOM from 'react-dom'

/**
 * Adapted from here https://github.com/cgood92/enzyme-cleanup, the npm library
 * uses es6. Which doesn't work for our setup since we don't transpile node_modules.
 * So for simplicity I've moved it into the repo.
 */

const attachments = []

export const makeAdapter = Adapter => {
    class ReactAdapterWithMountTracking extends Adapter {
        constructor(...args) {
            super(...args)
        }
        createRenderer(options) {
            const attachTo =
                options.attachTo || global.document.createElement('div')

            attachments.push(attachTo)

            // Provide a default option on each render for attachTo, being a global div that we can unmount later
            const newOptions = Object.assign({}, options, { attachTo })

            return Adapter.prototype.createRenderer.call(this, newOptions)
        }
    }

    return new ReactAdapterWithMountTracking()
}

export const cleanup = () => {
    attachments.forEach(node => {
        // Unmount react component after each test
        reactDOM.unmountComponentAtNode(node)
    })
}
