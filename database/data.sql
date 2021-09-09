/*------------------------------- [USERS DATA TABLE] -------------------------------*/

INSERT INTO "users" ("name", "age", "email", "password", "is_admin") 
VALUES ('Marc Riddick Verano', 27, 'marc_riddick_verano@ligph.com', '$2b$10$Wg2EQZEb/DuzU3lKogZ6E.enxixx9tWFHhys51.Wm8FW2Tm.iaOr2', 'TRUE');

/*------------------------------- [BOOKS DATA TABLE] -------------------------------*/

INSERT INTO "books" ("name", "description", "author", "price", "quantity") VALUES 
('Lord of the Rings', 'Set in Middle-earth, a place like Earth at some distant time in the past, the story began as a sequel to Tolkien''s 1937 children''s book The Hobbit, but eventually developed into a much larger work.', 'J. R. R. Tolkien', 700, 10), 
('A Dance with Dragons', 'A Dance with Dragons is the fifth novel of seven planned in the epic fantasy series A Song of Ice and Fire by American author George R. R. Martin.', 'George R. R. Martin', 600, 15), 
('Fantastic Beasts & Where to Find Them', 'An approved textbook at Hogwarts School of Witchcraft and Wizardry since publication, Newt Scamander''s masterpiece has entertained wizarding families through the generations.', 'J. K. Rowling', 750, 25);