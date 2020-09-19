module.exports = {
    'server': `${process.env.DB_SERVER}`,
    'database': `${process.env.DB_NAME}`,
    'authentication': {
        'type': 'default',
        'options': {
            'userName': `${process.env.DB_USER}`,
            'password': `${process.env.DB_PASSWORD}`,
            'port': `${process.env.DB_PORT}`,
            'enableArithAbort':true
        }
    },
    'connectionTimeout': 30000,
    'requestTimeout': 30000,
    'options': {

        'database': `${process.env.DB_NAME}`,
        'encrypt': true
    },
    pool: {
        max: 1,
        min: 1,
        idleTimeoutMillis: 30000,
        idle: 20000,
        acquire: 20000
    }
};