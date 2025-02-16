CREATE DATABASE login_system;
USE login_system;

CREATE TABLE users (
    cpf VARCHAR(11) PRIMARY KEY,  -- CPF agora é o identificador único
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(64) NOT NULL,  -- Armazena a senha já criptografada
    nivel_acesso ENUM('admin', 'supervisor', 'atendente') NOT NULL,
    telefone VARCHAR(20) NOT NULL
);

-- Inserindo os usuários com senha criptografada
INSERT INTO users (cpf, nome, email, senha, nivel_acesso, telefone) VALUES
('01234567899', 'Almir', 'almir@email.com', SHA2('senha', 256), 'admin', '81 9 9999 9999'),
('01234578988', 'Michael', 'michael@email.com', SHA2('senha', 256), 'supervisor', '81 99999 9990'),
('01234567877', 'Gabriela', 'gabriela@email.com', SHA2('senha', 256), 'atendente', '81 99999 9991');
