"use strict";

const mysql = require("mysql");
const util = require("util");

const CreateDB = (params, limit = 2) => {

    const poolConfig = Object.assign({}, params, {
        connectionLimit: limit,
        connectTimeout: 8 * 1000,
        acquireTimeout: 8 * 1000 // 8 seconds, assuming 2s to process request
    })

    const connectionPool = mysql.createPool(poolConfig);

    connectionPool.on("connection", (connection) => {
        console.info(__line, 'new connection: ' + connection.threadId);
        connection.on('err', (error) => {
            console.error(Object.assign({ line: __line }, err.toJSON()));
        })
    });


    connectionPool.on("error", () => {
        console.error(__line, ...arguments);
    });

    connectionPool.on("uncaughtException", () => {
        console.error(__line, ...arguments);
    });

    
    connectionPool.on("disconnect", () => {
        console.error(__line, ...arguments);
    });

    const promisedConnectionQuery = util.promisify(connectionPool.query).bind(connectionPool);
 
    const dbConnection = {
        escape: (val) => connectionPool.escape(val),
        query: (query, ...params) => {
            if (typeof params[params.length - 1] === 'function') {
                let callback = params.pop()

                connectionPool.getConnection((err, connection) => {

                    if (err)
                        return callback(err)

                    connection.query(query, ...params, (err, retval) => {
                        if (err) {
                            connection.release()
                            return callback(err)
                        }

                        callback(undefined, retval)
                        connection.release()
                    })
                })
            }
            else {
                return new Promise((resolve, reject) => {
                    connectionPool.getConnection((err, connection) => {

                        if (err)
                            return reject(err)

                        connection.query(query, params || [], (err, retval) => {
                            if (err) {
                                connection.release()
                                return reject(err)
                            }

                            resolve(retval)
                            connection.release()
                        })
                    })
                })
            }
        },
        connection: async () => new Promise((resolve, reject) => {
            connectionPool.getConnection((err, connection) => {

                if (err)
                    return reject(err);

                resolve(connection);
            })
        })

    }

    return dbConnection
}

module.exports = function (params, limit) {
    return CreateDB(params, limit)
}
