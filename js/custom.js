var presionados = [];
var numeros = "";
var numerosOrd = "";

$('.ordenadorIngreso').on('keypress', function (e) {
	if(e.which < 48 || 57 < e.which || presionados.includes(e.which)) {
		e.preventDefault();
	} else {
		presionados.push(e.which);
	}
});

//Acción: Limpiar texto
$('.resetButton').on('click', function(){
	resetear();
})

var resetear = function(){
	$('.ordenadorIngreso').val('');
	presionados = []; //limpiar memoria de presionados
	numeros = 0;
	numerosOrd = 0;
	$('.overlay').hide().html('');
}


//Acción: Ordenar
$('.sortButton').on('click', function(event) {

	$('.overlay').fadeIn('200');
	if(numeros == 0){
		numeros = $('.ordenadorIngreso').val();
		numeros = numeros.split('');
		numerosOrd = $('.ordenadorIngreso').val().split('');
		numerosOrd.sort();
		console.log("numerosOrd",numerosOrd);
	}

	if(!compareArrays(numeros,numerosOrd)) { //si el array inicial no está ordendo
		/*Mostrar*/
		mostrarPantalla(numeros);

		//seteando valores iniciales
		var x = 0;
		animateArr(numeros,x);

	} else {
		alert('Esta serie no necesita ser ordenada');
	}

});

//The Animation Process
var animateArr = function(arr,x){
	
	//Lets do samething with passed variables
	arrIndexCallBack(arr, x, function(){		
		//lets increment the index to keep this working (>>next is coming)
		x++; 
		
		if(x < arr.length) { //if true means there is still work to do
      animateArr(arr,x);
    } else { //the iteration reach the last array element
    	
    	//So lets check if the work til this point has been enough to get the array sorted
    	if(!compareArrays(numeros,numerosOrd)){
				x=0;
				animateArr(arr,x);
			} else {
				//Yes, the worked array and the sorted one are both equals
				console.log("Thanks for your patience");
			}

    }
	});
}

var arrIndexCallBack = function(arr, x ,callback){
	if(x!=0) {
		var $actual = $('.overlay').children().eq(x);
		var $anterior = $('.overlay').children().eq(x-1);

		var vactual = $actual.find('span').text();
		var vanterior = $anterior.find('span').text();
				
		//Si el valor de indice anterior es mayor al valor del indice actual
		if(vactual < vanterior) { 
			var t = vactual;

			//actualizando array
			numeros[x] = vanterior;
			numeros[x-1] = t;

			vactual = vanterior;
			vanterior = t;

			$actual.find('span').fadeOut('fast', function(){
				$(this).text(vactual).fadeIn('fast', function(){
					$anterior.find('span').fadeOut('fast', function(){
						$(this).text(vanterior).fadeIn('fast', function(){
							callback();
							console.log(numeros);
							x=0;
						});
					});
				});
			});	
			
		} else {
			x++;
			//comparando si el array transformado es igual al array ordenado (que es el objetivo final)
			if(!compareArrays(numeros,numerosOrd)){
				console.log('aun no es igual');
				x=0;
				callback();
			} else {
				console.log(119);
				console.log("FIN");
			}
		}		
	}
	else {
		console.log('inicio');
		callback();
	}
}

var sortNumber = function (a,b) {
  return a - b;
}

var compareArrays = function(arr1, arr2){
	var is_same = (arr1.length == arr2.length) && arr1.every(function(element, index) {
    return element === arr2[index]; 
	});	
	return is_same;
}

var mostrarPantalla = function(arrNums) {
	var $contenedor = $('.overlay');
	$contenedor.html('');
	for (var i = 0; i < arrNums.length; i++) {
		$contenedor.append('<div><span>' + arrNums[i] + '</span></div>');
	}
}