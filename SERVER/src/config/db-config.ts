import mssql from 'mssql';

/* SQL SERVER CONFIGURATION */
export const SQL_SERVER_CONFIG = {
    /* REPLACE WITH DUMMY CREDENTIALS */
    user: 'sa',
    password: 'sqlpwd',
    database: 'StackNewbie',
    server: 'DESKTOP-UCEVIKS',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: false
    }
}

/* TEST CONNECTION */
export const establishConnection = async () => {
    const pool = await mssql.connect(SQL_SERVER_CONFIG);
    if (pool) {
        console.log('Connected to database...');
    }
}
