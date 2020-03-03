$(document).ready(function () {
    var searchIDs = '';
    var numerosSorteados = [];
    var numerosAcertos = [];
    var inputNumber = '<input type="checkbox" id="{{id}}" name="{{nome}}" value={{value}}>';
    var apostas = $('#apostaNumeros');
    var numeros = document.getElementById('numeros');
    for (var i = 1; i <= 60; i++) {
        let res = inputNumber.replace('{{id}}', 'Sortear' + i);
        res = res.replace('{{nome}}', 'Sortear' + i);
        res = res.replace('{{value}}', i);
        numeros.innerHTML += res;
    }
    var numberSelected = $(numeros).find('input');
    $('#apostaNumeros input').on('change', function () {
        apostas.valor = $('input[name=aposta]:checked').val();
        numeros.style.opacity = '1';
        numeros.style.visibility = 'visible';
    });
    // apostas.onchange = function () {
    //     apostas.valor = apostas.value;
    //     numeros.style.opacity = '1';
    //     numeros.style.visibility = 'visible';
    // }
    // apostas.on('change', ()=>{
    //     if($("#apostaNumeros").val() == "none"){
    //         apostas.valor = null;
    //         numeros.style.opacity = '0';
    //         numeros.style.visibility = 'hidden';
    //     }else{
    //         apostas.valor = apostas.val();
    //         numeros.style.opacity = '1';
    //         numeros.style.visibility = 'visible';
    //     }
    // });

    numberSelected.click(() => {
        //event.preventDefault();
        searchIDs = $("#numeros input:checkbox:checked").map(function () {
            return $(this).val();
        }).get(); // <----
        if (searchIDs.length == apostas.valor) {
            console.log('to completo');
            numberSelected.each(function () {
                $(this).prop('disabled', true);
                apostas.valor = apostas.value;
                $('#realizarSorteio').css({
                    'opacity': '1',
                    'visibility': 'visible'
                });
            });
        }
        console.log(searchIDs);
    });

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    $('#realizarSorteio').click(function () {
        $(this).prop('disabled', true);
        for (var i = 1; i <= searchIDs.length; i++) {
            numerosSorteados.push(getRandomInt(1, 60));
            console.log(numerosSorteados);
        }
        compareValue();
    });

    compareValue = function () {
        for (var i = 0; i < searchIDs.length; i++) {
            if (searchIDs[i] == numerosSorteados[i]) {
                numerosAcertos.push(searchIDs[i]);
                console.log(numerosAcertos[i]);
            }
        }
    };
});