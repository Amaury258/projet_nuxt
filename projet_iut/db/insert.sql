INSERT INTO "User" ("id", "username", "password", "role") VALUES
(0, "admin", "admin", 1);

INSERT INTO "Forums" ("id", "titre", "description") VALUES
(1, "Consigne d'utilisation du forum", "Les différentes consignes d'utilisation du forum et les explications des différentes fonctionnalités");

INSERT INTO "Sujet" ("id", "title", "description", "forum_id") VALUES
(1, "Règles d'utilisation", "Les règles d'utilisation du forum", 1),
(2, "Comment poster un message", "Explication sur comment poster un message sur le forum", 1),
(3, "Comment répondre à un message", "Explication sur comment répondre à un message sur le forum", 1);

INSERT INTO "Message" ("id", "content", "sujet_id", "user_id") VALUES
(1, "Les règles d'utilisation sont les suivantes : ...", 1, 0),
(2, "Pour poster un message, il suffit de cliquer sur le bouton "Nouveau message"", 2, 0),
(3, "Pour répondre à un message, il suffit de cliquer sur le bouton "Répondre"", 3, 0);