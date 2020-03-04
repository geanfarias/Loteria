$(document).ready(function () {
    var searchIDs = [];
    var numerosSorteados = [];
    var numerosAcertos = [];
    var apostas = {
        valor: ''
    };
    var numeros = $('#numeros');

    const createInput = () => {
        for (var i = 1; i <= Ammout; i++) {
            numeros.append(`<input type="checkbox" id="${'Sortear' + i}" name="${'Sortear' + i}" value=${i}>`);
        }
        return $(numeros).find('input');
    }

    const setAmmountBet = () => {
        return 60;
    }

    printResult = (numerosSorteados) => {
        for (var i = 0; i < searchIDs.length; i++) {
            if (numerosSorteados.sorted.indexOf(searchIDs[i]) !== -1) {
                numerosAcertos.push(searchIDs[i]);
                console.log(numerosAcertos);
            }
        }
    };

    const Ammout = setAmmountBet();
    const numberSelected = createInput();

    $('#realizarSorteio').click(function () {
        $(this).prop('disabled', true);
        $.ajax({
            method: "GET",
            url: 'http://localhost:3000/sortear.php',
            data: {
                total: apostas.valor
            },
            success: function (result) {
                console.log(result);
                printResult(JSON.parse(result));
            },
            error: function (result) {
                console.log(result);
            }
        });
    });


    numberSelected.on('click', () => {
        //event.preventDefault();
        searchIDs = $("#numeros input:checkbox:checked").map(function () {
            return +$(this).val();
        }).get(); // <----
        if (searchIDs.length == apostas.valor) {
            numberSelected.each(function () {
                $(this).prop('disabled', true);
                // apostas.valor = apostas.value;
                $('#realizarSorteio').css({
                    'opacity': '1',
                    'visibility': 'visible'
                });
            });
        }
        console.log(searchIDs);
    });

    $('#apostaNumeros input').on('change', () => {
        apostas.valor = $('input[name=aposta]:checked').val();
        numeros.css({
            'opacity': '1',
            'visibility': 'visible'
        });
    });
});