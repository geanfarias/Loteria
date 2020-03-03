$(document).ready(function () {
    var searchIDs = [];
    var numerosSorteados = [];
    var numerosAcertos = [];
    var apostas = $('#apostaNumeros');
    var numeros = $('#numeros');

    const createInput = ()=> {
        for (var i = 1; i <= Ammout; i++) {
            numeros.append(`<input type="checkbox" id="${'Sortear' + i}" name="${'Sortear' + i}" value=${i}>`);
        }
        return $(numeros).find('input');
    }

    const setAmmountBet = () =>{
        return 60;
    }

    compareValue = () => {
        for (var i = 0; i < searchIDs.length; i++) {
            if (searchIDs[i] == numerosSorteados[i]) {
                numerosAcertos.push(searchIDs[i]);
                console.log(numerosAcertos[i]);
            }
        }
    };

    function getRandomInt() {
        return Math.floor(Math.random() * (Ammout - 1)) + 1;
    }

    const Ammout = setAmmountBet();
    const numberSelected = createInput();
    
    $('#realizarSorteio').click(function () {
        $(this).prop('disabled', true);
        for (var i = 1; i <= searchIDs.length; i++) {
            numerosSorteados.push(getRandomInt());
            console.log(numerosSorteados);
        }
        compareValue();
    });

    numberSelected.on('click', () => {
        //event.preventDefault();
        searchIDs = $("#numeros input:checkbox:checked").map(function () {
            return $(this).val();
        }).get(); // <----
        if (searchIDs.length == apostas.valor) {
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

    $('#apostaNumeros input').on('click', () => {
        apostas.valor = $('input[name=aposta]:checked').val();
        numeros.css({
            'opacity': '1',
            'visibility': 'visible'
        });
    });
});