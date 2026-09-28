DROP DATABASE IF EXISTS festival;
CREATE DATABASE IF NOT EXISTS festival;
USE festival;

CREATE TABLE IF NOT EXISTS participants(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250) NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    password VARCHAR(250) NOT NULL,
    admin BOOLEAN DEFAULT(FALSE)
);

CREATE TABLE IF NOT EXISTS activities(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250) NOT NULL,
    description TEXT,
    position VARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    image TEXT,
    date DATE NOT NULL,
    time TIME NOT NULL,

    CHECK(capacity > 0)
);

CREATE TABLE IF NOT EXISTS inscriptions(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_activity INT NOT NULL,
    id_participant INT NOT NULL,

    UNIQUE(id_activity, id_participant),
    FOREIGN KEY (id_activity) REFERENCES activities(id) ON DELETE CASCADE,
    FOREIGN KEY (id_participant) REFERENCES participants(id) ON DELETE CASCADE
);

INSERT INTO participants(
    name,
    email,
    password,
    admin
) VALUES (
    "Karine ALves",
    "kaka@gmail.com",
    "123",
    0
),(
    "Jonathan William",
    "jonathanjr@gmail.com",
    "123",
    0
),(
    "Josiane de Moura",
    "jojhela@gmail.com",
    "123",
    0
),(
    "Jhennyfer Kamilli",
    "jhenny@gmail.com",
    "0000",
    1
);


INSERT INTO activities(
    name,  
    description,   
    position,  
    capacity,  
    image, 
    date,  
    time
) VALUES 
(
    "Pintura de Panos de Prato",
    "Nessa oficina vamos trabalhar conceitos fundamentais da pintura e decoração de tecidos, além de aprofundar nosso conhecimento no mundo da arte e do artesanato.",
    "Estande 3",
    20,
    "",
    "2026-10-10",
    "13:00:00"
), 
(
    "Confecção de Bonecas de Pano",
    "Nessa oficina vamos trabalhar conceitos fundamentais da construção de bonecas de pano, além de aprofundar nosso conhecimento no mundo da arte e do artesanato.",
    "Estande 4",
    2,
    "",
    "2026-10-12",
    "15:00:00"
), 
(
    "Palestra Sobre Energias Renováveis e Seu Futuro",
    "Nessa palestra vamos trabalhar conceitos sobre as Energias Renováveis e Seu Futuro, venha participar dessa conversa, você tem um papel importante nessa hitória.",
    "Estande 1",
    100,
    "",
    "2026-10-10",
    "09:00:00"
);

INSERT INTO inscriptions(
    id_activity,
    id_participant
) VALUES
    (1,1),
    (1,2),
    (1,3),
    (3,1),
    (3,2)
;
