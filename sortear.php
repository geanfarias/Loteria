<?php
header("Access-Control-Allow-Origin: *"); 

$total = $_GET['total'];

if(!is_numeric($total) || $total < 6 || $total > 15) {
	echo 'error';
	exit;
}

$rnd = [];

while(sizeof($rnd) != $total) {
	$val = random_int(1,60);
	
	
	if(!in_array($val, $rnd)) {
		array_push($rnd, $val);
	}
}


echo json_encode(array("sorted" => $rnd));