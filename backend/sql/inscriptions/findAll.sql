SELECT 
    I.*,
    A.name AS activity,
    P.name AS participant
FROM 
    inscriptions I
LEFT JOIN 
    activities A ON I.id_activity = A.id
LEFT JOIN 
    participants A ON I.id_participant = P.id