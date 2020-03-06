<?php
header("Access-Control-Allow-Origin: *"); 

$total = $_GET['quantidade'];
$valoresApostados = $_GET['valoresApostados'];

if(!is_numeric($total) || sizeof($valoresApostados) != $total || $total < 6 || $total > 15) {
	echo 'error';
	exit;
}

$rnd = [];

while(sizeof($rnd) != 6) {
	$val = random_int(1,60);
	
	
	if(!in_array($val, $rnd)) {
		array_push($rnd, $val);
	}
}

$win = [];
for($i = 0; $i < $total; $i++) {
	if(in_array($valoresApostados[$i], $rnd)) {
		array_push($win, $valoresApostados[$i]);
	}
}

echo json_encode(array("sorted" => $rnd, "win" => $win));