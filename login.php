<?php
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$password = "";
$dbname = "login_system";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Erro na conexão com o banco de dados."]));
}

$data = json_decode(file_get_contents("php://input"), true);
$email = $data["email"];
$password = $data["password"];

$sql = "SELECT cpf, nome, nivel_acesso, senha FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->bind_result($cpf, $nome, $nivel_acesso, $hashed_password);
$stmt->fetch();

if ($hashed_password && hash("sha256", $password) === $hashed_password) {
    echo json_encode([
        "success" => true,
        "user" => [
            "cpf" => $cpf,
            "nome" => $nome,
            "nivel_acesso" => $nivel_acesso
        ]
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Email ou senha incorretos."]);
}

$stmt->close();
$conn->close();
?>
