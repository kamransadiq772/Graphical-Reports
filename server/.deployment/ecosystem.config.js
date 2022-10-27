module.exports = {
    apps: [
        {
            name: 'backend',
            script: './app.js',
            env_development: {
                NODE_ENV: 'development',
                PORT: 5003,
            },
            env_production: {
                NODE_ENV: 'production',
                PORT: 5003,
            },
        }
    ]
}