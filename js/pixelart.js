var myPixelDraw = {
	colorPicked: 0,
	cellColor:"#ecf0f1",
	defaultCells: 30,
	coloring: false,
	fns: {
		calcSize: function(cantCeldas){
				// pregunto si cantCeldas vino sin valor
			if (cantCeldas === undefined) {
					// que valga 30
				cantCeldas = myPixelDraw.defaultCells;
			}
				// el total de las celdas
			var totalCeldas = cantCeldas * cantCeldas;
				// vacio el contenedor
			myPixelDraw.container.empty();
				//incerta celdas
			for (var i = 0; i < totalCeldas; i++) {
				myPixelDraw.container.append('<div class="celdas" draggable></div>');
			}

			var tamDeCelda = myPixelDraw.container.width() / cantCeldas;
			$(".celdas").css({width: (100/cantCeldas) + "%"});  // seteo el ancho
			$(".celdas").css({height: (100/cantCeldas) + "%"});  // seteo el ancho
			//$(".celdas").width(tamDeCelda);  // seteo el ancho
			//$(".celdas").height(tamDeCelda);  // seteo el alto	
		},
		
		reSize: function(){
				// evento cuando se hace click el botón
			$("#botonParaSetearGrilla").click(function (){
				var valorGrillaInput = $("#cambiarGrilla").val();
					// si el valor es un número
				if (isNaN(valorGrillaInput)) {
					alert("Ingrese un número")
				}
					// para que el valor no valla con coma y utilizar el valor
				else if (valorGrillaInput > 0 && valorGrillaInput <=50) {
					valorGrillaInput = Math.floor(valorGrillaInput);
					myPixelDraw.fns.calcSize(valorGrillaInput);
				}
					// si el valor es entre los números seteados
				else {
					alert("Ingrese un valor entre 1 y 50")
				}
			});
		},
		
		detectedMouseUp: function(){
			$(document).mouseup(function () {
				myPixelDraw.coloring = false;
			});
		},
		
		colorPalette: function(){
			$("#color-pick div").each(function (posicion, elemento){
				var color = $(elemento).attr("class"); // filtrar clase
				$(elemento).css("background-color", color) // darle el color de la clase
			});
		},
		
		pickColor: function(){
			$("#color-pick div").click(function (){
				myPixelDraw.colorPicked = $(this).attr("class"); // filtrar clase otra ves
				$("#color-pick div.colorParaPintar").removeClass("colorParaPintar"); // remover la clase para que quede uno solo marcado
				$(this).addClass("colorParaPintar"); // añadir las clases
			});
		},
		
		colorIt: function(){
			$(document).on("mousedown", ".celdas", function(evento){
				evento.preventDefault();
				myPixelDraw.coloring = true;
				if (evento.button === 0) {
					// para pintar
					$(this).css("background-color", myPixelDraw.colorPicked);
				}
				else {
					// para borrar
					$(this).css("background-color", myPixelDraw.cellColor);
				}
			});
		},
		
		colorOnDrag: function(){
					// para que no se salga del container
			$(document).mousemove(function(evento){
				
				var elementoSeleccionado = $(evento.target);

				if (elementoSeleccionado.hasClass("celdas") && myPixelDraw.coloring) {
					
					if (evento.button === 0) {  // para pintar
						
						$(elementoSeleccionado).css("background-color", myPixelDraw.colorPicked);
					}
					else {  // para borrar
						
						$(elementoSeleccionado).css("background-color", myPixelDraw.cellColor);
					}
				}
			});
		},
		
		reset: function(){
			$("#reset").click(function (){
				$(".celdas").css("background-color", myPixelDraw.cellColor);
			});
		},
		
		toggleBorders: function(){
			$("#toggle-border").click(function (){
				$(".celdas").toggleClass("sacar-bordes");
			});
		},
		
		disableRightClick: function(){
			myPixelDraw.container.on("contextmenu", function(){
				return false;
			});
		},
		
		grabImage: function(){
			$('#grab-it').on('click', function(e) {
                	html2canvas(container, {
	                onrendered: function(canvas) {
	                    $("#dibujosEnImagenes").append(canvas);
	                }
                });
                console.log('Se ejecutó correctamente grabImage');
            });
		}
	},
	init: function($contenedor){
		this.container = $contenedor;
		var arrayDeFunciones = Object.keys(myPixelDraw.fns);

		for (var i = 0; i < arrayDeFunciones.length; i++) {
			myPixelDraw.fns[arrayDeFunciones[i]]();
		}
	}
};

$(document).ready(function (){
	myPixelDraw.init($("#container"));
});