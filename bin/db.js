"use strict";

const mysql = require("mysql2");
const util = require("util");

const CreateDB = (params, limit=2) => {

    const poolConfig = Object.assign({}, params, {
        connectTimeout: 8 * 1000
    })

    const connectionPool = mysql.createPool(poolConfig);

    connectionPool.on("connection", (connection) => {
        console.info(__line, 'new connection: ' + connection.threadId);
        connection.on('err', (error) => {
            console.error(Object.assign({line: __line}, err.toJSON()));
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
    
    /**
     * Perform a DB query but use a Promise instead of function callback
     * @param  {String}     query       The mysql query to run
     * @param  {Array}      params      The params you need to use in the above query. Don't pass if you're using pre-escaped values
     * @param  {Function}   callback    Optional. If one is not provided, a promise is returned. 
     * @return {Promise}                The promise will reject if a connection wasn't acquired or your query failed. It will resolve if the query was successful.
     */
    const dbConnection = {
        escape: (val) => connectionPool.escape(val),
        query: async (queryString, ...params) => { 

            if (typeof params[params.length-1] === 'function') {
                let callback = params.pop()
                
                connectionPool.getConnection((err, connection) => { 
              
                    if (err)
                        return callback(err)

                    connection.query(queryString, ...params, (err, retval) => {
                        if (err) {
                            connection.release()
                            return callback(err)
                        }

                        callback(undefined, retval)
                        connection.release()
                    })
                })
            }
            else if (typeof params[params.length - 1] === 'object') {
                return new Promise((resolve, reject) => {
                    connectionPool.getConnection((err, connection) => { 
              
                        if (err)
                            return reject(err)

                        connection.query(queryString, ...params || [], (err, retval) => {
                            if (err) {
                                connection.release()
                                return reject(err)
                            }

                            resolve([retval])
                            connection.release()
                        })
                    })
                })
            }
            else {
                return new Promise((resolve, reject) => {
                    connectionPool.getConnection((err, connection) => { 
              
                        if (err)
                            return reject(err)

                        connection.query(queryString, params || [], (err, retval) => {
                            if (err) {
                                connection.release()
                                return reject(err)
                            }

                            resolve([retval])
                            connection.release()
                        })
                    })
                })
            }
        },
        execute: async (queryString, ...params) => { 
            if (typeof params[params.length-1] === 'function') {
                let callback = params.pop()
                
                connectionPool.getConnection((err, connection) => { 
              
                    if (err)
                        return callback(err)

                    connection.query(queryString, ...params, (err, retval) => {
                        if (err) {
                            connection.release()
                            return callback(err)
                        }

                        callback(undefined, retval)
                        connection.release()
                    })
                })
            }
            else if (typeof params[params.length - 1] === 'object') {
                return new Promise((resolve, reject) => {
                    connectionPool.getConnection((err, connection) => { 
              
                        if (err)
                            return reject(err)

                        connection.query(queryString, ...params || [], (err, retval) => {
                            if (err) {
                                connection.release()
                                return reject(err)
                            }

                            resolve([retval])
                            connection.release()
                        })
                    })
                })
            }
            else {
                return new Promise((resolve, reject) => {
                    connectionPool.getConnection((err, connection) => { 
              
                        if (err)
                            return reject(err)

                        connection.query(queryString, params || [], (err, retval) => {
                            if (err) {
                                connection.release()
                                return reject(err)
                            }

                            resolve([retval])
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

module.exports = function(params, limit) {
    return CreateDB(params, limit)
}