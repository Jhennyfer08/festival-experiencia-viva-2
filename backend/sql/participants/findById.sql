SELECT 
    P.*,
    (
        SELECT 
            JSON_ARRAYAGG(id_activity)
        FROM
            inscriptions
        WHERE 
            id_participant = P.id
    ) AS inscripted
FROM 
    participants P
WHERE 
    P.id = ?