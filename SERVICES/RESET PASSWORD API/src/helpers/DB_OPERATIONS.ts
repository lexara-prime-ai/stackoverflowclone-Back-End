import mssql from 'mssql';
import { ConnectionPool, Request } from 'mssql';
import { SQL_SERVER_CONFIG } from '../config/db-config';
/* EXPORT HELPER CLASS : DB_OPERATIONS */
export class DB_OPERATIONS {
    private static pool: Promise<ConnectionPool> = mssql.connect(SQL_SERVER_CONFIG);

    /* APPEND REQUESTS TO INPUT */
    static appendRequests(request: Request, data: { [x: string]: string | number } = {}) {
        const keys = Object.keys(data);
        keys.forEach(key => {
            request.input(key, data[key]);
        });
        return request;
    }

    /* EXECUTE STORED PROCEDURES */
    static async EXECUTE(storedProcedure: string, data: { [x: string]: string | number } = {}) {
        let request: Request = await (await this.pool).request();
        request = DB_OPERATIONS.appendRequests(request, data);
        return await request.execute(storedProcedure);
    }

    /* EXECUTE QUERIES */
    static async QUERY(queryString: string) {
        return (await (await DB_OPERATIONS).pool).request().query(queryString);
    }
}

