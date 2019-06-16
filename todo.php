<?php
    require('autenticacao.php');
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $path = $_SERVER['DOCUMENT_ROOT'] . '/lista_tarefas/listas/' . $_SESSION['username'] . ".json";
        $tarefas = fopen($path, "r") or die("impossível abrir arquivo de lista de tarefas");
        while(!feof($tarefas)) {
            echo fgets($tarefas);
        }
        fclose($tarefas);
    }    
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $path = $_SERVER['DOCUMENT_ROOT'] . "/lista_tarefas/listas/" . $_SESSION['username'] . ".json";
        $tarefas = fopen($path,"w+") or die("impossível abrir arquivo de lista de tarefas");
        foreach ($_POST as $tarefas_enviadas) {
            fwrite($tarefas, $tarefas_enviadas);
            echo "dados do arquivo salvos";
        }
        fclose($tarefas);
    }
?>