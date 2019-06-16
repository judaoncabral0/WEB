<?php    
    session_start();
    if (isset($_SESSION['username'])) {
        header('location: lista_tarefas.php');
    }
    
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $usuario = $_POST['username'];
        $senha = $_POST['password'];
        $usuario_bool = FALSE;
        $senha_bool = FALSE;
        $file = fopen($_SERVER['DOCUMENT_ROOT'] . "/lista_tarefas/users.txt", "r") or die("Não foi possível abrir o arquivo de usuários!");

        while (!feof($file)){
            $linha = fgets($file);
            $pos = strpos($linha, ";");
            $username = substr($linha, 0, $pos);
            $password = substr($linha, $pos+1);
            if ($username == $usuario){
                $usuario_bool = TRUE;
                if ($password == $senha or substr($password, 0, -2) == $senha) {
                    $senha_bool = TRUE;
                }
            }
        }

        if ($usuario_bool == FALSE) {
            echo "<span style = \"color:red\">Usuário Inválido</span><br>";
        }
        if ($senha_bool == FALSE) {
            echo "<span style = \"color:red\">Senha Inválida</span><br>";
        }
        if (($usuario_bool == TRUE) && ($senha_bool == TRUE)) {
            $_SESSION['username'] = $usuario;
            header('location: lista_tarefas.php');
        }
        fclose($file);
    }
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <meta charset = 'utf-8'>
</head>
<body> 
    <h1>LOGIN</h1>
    <form name = "login" method = 'POST'>
        Username: <input name = "username" type = "text"><br><br>
        Password: <input name = "password" type = "password"><br>
        <input type = "submit" value = "Login">
    </form>
    <p>Não tem uma conta ainda? <a href = "signup.php">Registre-se</a></p>
</body>



</html>