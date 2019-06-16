<?PHP
    session_start();
    if (isset($_SESSION['username'])) {
        header('location: lista_tarefas.php');
    }
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){
        $usuario = $_POST['username'];
        $senha = $_POST['password'];
        $confirmacao_senha = $_POST["password_confirm"];
        $usuario_bool = FALSE;
        $senha_bool = FALSE;
        $confirmacao_bool = FALSE;

        $usuarioER = '/[\d|\w]{1,8}/';
        $senhaER = '/[\d|\w]{1,8}/';

        if (preg_match($usuarioER, $usuario)){
            $usuario_bool = TRUE;
        }else {
            echo "<span style = \"color:red\">Usuário Inválido</span><br>";
        }

        if (preg_match($senhaER, $senha)){
            $senha_bool = TRUE;
        } else{
            echo "<span style = \"color:red\">Senha Inválida</span><br>";
        }

        if ($senha == $confirmacao_senha){
            $confirmacao_bool = TRUE;
        }else {
            echo "<span style = \"color:red\">Senhas não conferem</span><br>";
        }

        if ($usuario_bool and $senha_bool and $confirmacao_bool) {
            $file = fopen($_SERVER['DOCUMENT_ROOT'] . "/lista_tarefas/users.txt", "a") or die("impossivel abrir arquivo users.txt");
            fwrite($file, PHP_EOL . $usuario . ";" . $senha);
            $path2 = $_SERVER['DOCUMENT_ROOT']."/lista_tarefas/listas/".$usuario.".json";
            $file2 = fopen($path2, 'w+') or die ("impossivel abrir arquivo de lista de tarefas");
            fclose($file);
            fclose($file2);
            header('location: login.php');
        }

    }
?>

<!DOCTYPE html>
<html>
<head>
    <title>Sign Up</title>
    <meta charset = 'utf-8'>
</head>
<body> 
    <h1>SIGN UP</h1>
    <form name = "signup" method = 'POST'>
        Username: <input name = "username" type = "text"><br><br>
        Password: <input name = "password" type = "password"><br>
        Confirmação de Password: <input name = "password_confirm" type = "password"><br>
        <input type = "submit" value = "Sign Up">
    </form>
    <p>Já tem uma conta? <a href = "login.php">Entre</a></p>
</body>
</html>