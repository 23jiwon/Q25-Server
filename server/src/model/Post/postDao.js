
async function addNewRows(connection, addNewRowsParams){
    const addNewRowsQuery = `
        INSERT INTO pagetbl(userIdx, questionIdx)
        VALUES (?, ?);
    `;
    const addNewRowsRow = await connection.query(addNewRowsQuery, addNewRowsParams);

    return addNewRowsRow;
};

module.exports = {
    addNewRows
};
