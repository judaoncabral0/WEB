<?PHP
    require('autenticacao.php');
?>
<!DOCTYPE html>
<html lang = "pt-br">
    <head>
        <meta charset = "utf-8">
    </head>
    <body>
        <?PHP
            echo "<p>logado em " . $_SESSION['username'] . ".</p><a href = \"logout.php\">Sair</a>";
        ?>

        <h1>Lista de Tarefas</h1>
        <form>
            <input type = "text" id = "nome_projeto" placeholder="Nome do Projeto">
            <input type = "button" value = "Adicionar Projeto" onclick = "add_projeto()">
            <br>
            <input type = "button" value = "Carregar Lista" onclick = "carregar()">
            <input type = "button" value = "Salvar Lista" onclick = "salvar()">
        </form>
        <hr>
        <div id = "lista_tarefas"></div>

        <script src = "/lista_tarefas/lista_tarefas.js"></script>
    </body>
</html>