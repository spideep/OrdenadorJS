var presionados = [];
		var numeros = "";
		var numerosOrd = "";
		var v= "";

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
		}


		//Acción: Ordenar
		$('.sortButton').on('click', function(event) {
			if(numeros==0){
				numeros = $('.ordenadorIngreso').val();
				numeros = numeros.split('');
				numerosOrd = $('.ordenadorIngreso').val().split('');
				numerosOrd.sort();
				console.log("numerosOrd",numerosOrd);
			}


			/*Mostrar*/
			mostrarNums(numeros);

			var x = 0;
			var v = 0;
			animateArr(numeros,x);

		});

		var mostrarNums = function(arrNums) {
			$('.overlay').html('');
			for (var i = 0; i < arrNums.length; i++) {
				$('.overlay').append('<div><span>' + arrNums[i] + '</span></div>');
			}
		}

		var animateArr = function(arr,x){
			cuFunCallBack(arr, x, function(){
				x++;
				v++;
				if(x < arr.length) {
          animateArr(arr,x);
          v=0;
        } else {
        	console.log('terminó: la iteración');
        	if(!compareArrays(numeros,numerosOrd)){
						x=0;
						v=0;
						animateArr(arr,x);
					} else {
						console.log("FIN");
					}
        	// resetear();
        }
			});
		}

		var cuFunCallBack = function(arr, x ,callback){
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
					v++;
					x++;
					console.log('AAAA');
					console.log(numeros);
					if(!compareArrays(numeros,numerosOrd)){
						x=0;
						v=0;
						callback();
					} else {
						console.log("FIN");
					}
				}

				
			}
			else {
				console.log('inicio');
				callback();
			}
		}

		function sortNumber(a,b) {
	    return a - b;
		}

		var compareArrays = function(arr1, arr2){
			var is_same = (arr1.length == arr2.length) && arr1.every(function(element, index) {
		    return element === arr2[index]; 
			});	
			return is_same;
		}