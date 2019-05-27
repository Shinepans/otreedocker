import * as ShellJs from 'shelljs'

const checkDocker = (app) => {
    // checking if docker is exsit
    app.use((req, res, next) => {
        if (!ShellJs.which('docker')) {
            ShellJs.echo('Docker is required')
            ShellJs.exit(1)
            return res.send('No Docker Found')
        }
        next()
    })
}

export {
    checkDocker
}
