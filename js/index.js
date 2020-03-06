$(document).ready(function () {
    var apostas = {
        quantidade: '',
        valoresApostados: []
    };
    var numeros = $('#numeros');
    var resultados = $('#resultados');
    var acertos = $('#acertos');

    const createInput = () => {
        for (let i = 1; i <= Ammout; i++) {
            numeros.append(`<input type="checkbox" id="${'Sortear' + i}" name="${'Sortear' + i}" value=${i}>`);
        }
        return $(numeros).find('input');
    }

    const setAmmountBet = () => {
        return 60;
    }

    printResult = (result) => {

        resultados.fadeIn('slow')

        const {sorted, win} = result;

        for (let i = 0; i < sorted.length; i++) {
            resultados.append(`<input disabled type="checkbox" id="${'Resultado' + sorted[i]}" name="${'Resultado' + sorted[i]}" value=${sorted[i]}>`);
        }

        if(win.length >0){
            acertos.fadeIn('fast')
            for (let i = 0; i < win.length; i++) {
                acertos.append(`<input type="checkbox" id="${'Resultado' + win[i]}" name="${'Resultado' + win[i]}" value=${win[i]}>`);
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
            data: apostas,
            success: function (result) {
                console.log(JSON.parse(result));
                printResult(JSON.parse(result));
            },
            error: function (result) {
                console.log(result);
            }
        });
    });


    numberSelected.on('click', () => {
        //event.preventDefault();
        apostas.valoresApostados = $("#numeros input:checkbox:checked").map(function () {
            return +$(this).val();
        }).get(); // <----
        if (apostas.valoresApostados.length == apostas.quantidade) {
            numberSelected.each(function () {
                $(this).prop('disabled', true);
                // apostas.valor = apostas.value;
                $('#realizarSorteio').css({
                    'opacity': '1',
                    'visibility': 'visible'
                });
            });
        }
        console.log(apostas.valoresApostados);
    });

    $('#apostaNumeros input').on('change', () => {
        apostas.quantidade = +$('input[name=aposta]:checked').val();
        numeros.css({
            'display': 'block'
        });
        numeros.find('input').each(function(){
            $(this).fadeIn("slow");
        })
    });
});