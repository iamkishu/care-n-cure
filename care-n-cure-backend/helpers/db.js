const sql = require('mssql')

const config = require('../config/dbConfig');

let pool;
try {
    pool = new sql.ConnectionPool(config);
}
catch (e) {
    console.log(e);
}

async function doSQL(sqlStatement, req, res) {
    try {
        if (!pool.connected && !pool.connecting) {
            await pool.connect();
        }
        let result = await pool.request().query(sqlStatement);
        if (result.recordset) {
            return res.json(result.recordset);
        }
        else {
            return res.json({ rowsAffected: result.rowsAffected });

        }
    } catch (err) {
        return res.json(500, { err: err });
    }
}


async function doTransaction(queries, req, res) {
    //let queries = [];
    let rolledBack = false;
    let errArray = [];
    let doneArray = [];
    let arrayCount = 0;

    try {
        if (!pool.connected && !pool.connecting) {
            await pool.connect();
        }
        /* Declare Transaction */
        const transaction = pool.transaction();
        try {
            await transaction.begin()
            const request = transaction.request()
            let result;
            try {
                for (let sql in queries) {
                    arrayCount++;
                    result = await request.query(queries[sql]);
                    doneArray.push({ row: arrayCount });
                }
                try {
                    await transaction.commit();
                    res.status(200).json({ "total": queries.length, "success": doneArray.length, "err": errArray.length, "errMsg": errArray });
                } /* Catch Error During Transaction Commit */
                catch (commitErr) {
                    errArray.push({ row: arrayCount, err: commitErr });
                    res.status(500).json({ "total": queries.length, "success": doneArray.length, "err": errArray.length, "errMsg": errArray });

                }
            } /* Catch Error During Insert */
            catch (errInsert) {
                if (!rolledBack) {
                    await transaction.rollback()
                }
                errArray.push({ row: arrayCount, err: errInsert });
                res.status(500).json({ "total": queries.length, "success": doneArray.length, "err": errArray.length, "errMsg": errArray });
            }
        }/* Catch Error During Transaction */
        catch (errTxn) {
            errArray.push({ row: arrayCount, err: errTxn });
            res.status(500).json({ "total": queries.length, "success": doneArray.length, "err": errArray.length, "errMsg": errArray });
        }
        transaction.on('rollback', aborted => {
            rolledBack = true;
        });
    } catch (err) {
        return res.json(500, { err: err });
    }
}



module.exports.pool = pool;
module.exports.doSQL = doSQL;
module.exports.doTransaction = doTransaction;