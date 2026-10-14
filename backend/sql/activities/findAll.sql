SELECT
    A.*,
    COUNT(I.id) AS quantity,
    (
        SELECT 
            JSON_ARRAYAGG(P.name)
        FROM
            inscriptions I2
        INNER JOIN 
            participants P ON I2.id_participant = P.id
        WHERE 
            I2.id_activity = A.id
    ) AS participants
FROM 
    activities A
LEFT JOIN 
    inscriptions I ON I.id_activity = A.id
GROUP BY A.id
 