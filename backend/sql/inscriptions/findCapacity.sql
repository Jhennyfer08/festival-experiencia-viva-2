SELECT 
    A.capacity AS capacity,
    COUNT(*) AS total
FROM 
    inscriptions I
LEFT JOIN 
    activities A ON I.id_activity = A.id
WHERE 
    I.id_activity = ?
GROUP BY A.id, A.capacity