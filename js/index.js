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

    printResult = async (result) => {

        await eachElement($('#apostaNumeros').find('input'), 'hide');
        $('#title').fadeOut('fast');
        await eachElement(numeros.find('input'), 'hide');
        await eachElement(resultados.find('h4'), 'show');

        const { sorted, win } = result;
        for (let i = 0; i < sorted.length; i++) {
            resultados.append(`<input disabled type="checkbox" id="${'Resultado' + sorted[i]}" name="${'Resultado' + sorted[i]}" value=${sorted[i]}>`);
        }

        await eachElement(resultados.find('input'), 'show');
        await eachElement(acertos.find('h4'), 'show');

        if (win.length > 0) {
            for (let i = 0; i < win.length; i++) {
                acertos.append(`<input disabled type="checkbox" id="${'Resultado' + win[i]}" name="${'Resultado' + win[i]}" value=${win[i]}>`);
            }
            await eachElement(acertos.find('input'), 'show');
        }
        else {
            acertos.append('<h5>Infelizmente não houve acertos. Tente novamente.</h5>')
        }
    };

    const Ammout = setAmmountBet();
    const numberSelected = createInput();

    eachElement = async (conjunto, functionName) => {
        for (let i = 0; i < conjunto.length; i++) {

            if (functionName == "show") {
                await showElement(conjunto[i]);
            }
            else if (functionName == "hide") {
                await hideElement(conjunto[i]);
            }
        }
    }

    function showElement(elemento) {
        return new Promise((resolve, reject) => {
            $(elemento).fadeIn("slow");
            setTimeout(function () {
                resolve();
            }, 20);
        });
    }

    function hideElement(elemento) {
        return new Promise((resolve, reject) => {
            $(elemento).fadeOut("slow");
            setTimeout(function () {
                resolve();
            }, 20);
        });
    }

    $('#realizarSorteio button').click(async function () {
        $(this).prop('disabled', true);
        if ($(this).attr('data-id') == 'btnRealizar') {
            $.ajax({
                method: "GET",
                url: 'http://localhost:3000/sortear.php',
                data: apostas,
                success: function (result) {
                    printResult(JSON.parse(result));
                    $('#realizarSorteio button').text('Refazer Sorteio').prop('disabled', false).attr('data-id', 'btnRefazer');
                },
                error: function (result) {
                    console.log(result);
                    await()
                }
            });
        }
        else if ($(this).attr('data-id') == 'btnRefazer') {
            $('#apostaNumeros').find('input').prop('disabled', false);
            $('#apostaNumeros').find('input').prop('checked', false);
            numeros.find('input').prop('disabled', false);
            numeros.find('input').prop('checked', false);
            $('#title').fadeIn('fast');
            await eachElement($('#apostaNumeros').find('input'), 'show');
            await eachElement(resultados.find('h4'), 'hide');
            resultados.find('input').remove();
            await eachElement(numeros.find('input'), 'show');
            await eachElement(acertos.find('h4'), 'hide');
            await eachElement(acertos.find('h5'), 'hide');
            acertos.find('input').remove();
            $('#realizarSorteio button').text('Refazer Sorteio').prop('disabled', true).attr('data-id', 'btnRealizar');
        }
    });


    numberSelected.on('click', () => {
        //event.preventDefault();
        apostas.valoresApostados = $("#numeros input:checkbox:checked").map(function () {
            return +$(this).val();
        }).get(); // <----
        if (apostas.valoresApostados.length == apostas.quantidade) {
            numberSelected.each(function () {
                $('#apostaNumeros input').prop('disabled', true);
                $(this).prop('disabled', true);
                // apostas.valor = apostas.value;
                $('#realizarSorteio').fadeIn('slow');
                $('#realizarSorteio button').fadeIn('slow').attr('data-id', 'btnRealizar').prop('disabled', false);

            });
        }
    });

    $('#apostaNumeros input').on('change', async () => {
        apostas.quantidade = +$('input[name=aposta]:checked').val();
        numeros.css({
            'display': 'block'
        });
        await eachElement(numeros.find('input'), "show");
    });

});
