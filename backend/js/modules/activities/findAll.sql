SELECT 
    A.*,
    COUNT(*) AS quantity
FROM 
    activities A
LEFT JOIN 
    inscriptions I
ON 
    I.id_activity = A.id
GROUP BY A.id