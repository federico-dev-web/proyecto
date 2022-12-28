# PROYECTO FINAL PARA EL CURSO DE PROGRAMACIÓN BACKEND
## CODERHOUSE - COMISIÓN 32190
### FEDERICO LA SELVA

<br>

Este documento está en progreso. 

Actualmente se están documentando los métodos correspondientes a la primer entrega partial de dicho proyecto integrador.

Se actualizará el presente documento en las próximas entregas.


### URL DEL PROYECTO EN GLITCH : `https://horn-valley-caravel.glitch.me/`


## METODOS

| Metodos | Routes                                          | Descripción                                                              			|
| :---    |     :---                                        | :---                                                                			|
| GET     | /api/productos                                  | Devuelve todos los productos                                       			|
| GET     | /api/productos/:id 		                    | Devuelve un producto según su id                            	 			|
| POST    | /api/productos                                  | Recibe y agrega un producto, y lo devuelve con su id asignado	 			|
| PUT     | /api/productos/:id       		            | Recibe y actualiza un producto según su id		         			|
| DELETE  | /api/productos/:id 		                    | Elimina un producto según su id		                         			|
| GET     | /api/carrito/		    		    | Devuelve todos los carritos					 			|
| POST    | /api/carrito/		    		    | Crea un carrito y devuelve su id					 			|
| DELETE  | /api/carrito/:id		                    | Vacía un carrito y lo elimina	                                 			|
| GET     | /api/carrito/:id/productos    		    | Permite listar todos los productos guardados en el carrito por su id  	 		|
| POST    | /api/carrito/:id1/productos/:id2   		    | Para incorporar productos a un carrito id1 = id carrito, id2 = id producto 		|
| DELETE  | /api/carrito/:id1/productos/:id_prod	    | Eliminar un producto del carrito por su id (id1) de carrito y de producto (id_prod) 	|

<br>

## RESPUESTAS

<details>
<summary>GET <b>/api/productos</b></summary> 

```js
GET https://horn-valley-caravel.glitch.me/api/productos
```
### Ejemplo

```json
[
	{"id":1,
	"timestamp":1670096837624,
	"nombre":"Raqueta",
	"descripcion":"Raqueta",
	"código":"Raqueta",
	"foto":"https://cdn1.iconfinder.com/data/icons/rcons-basic-sport/16/fitness_tennis_game_raquet_training_play_sport-512.png",
	"precio":100,"stock":25
	},
	{"id":2,
	"timestamp":1670096837624,
	"nombre":"Pelota de futbol",
	"descripcion":"Pelota de futbol",
	"código":"Pelota de futbol",
	"foto":"https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/football-512.png",
	"precio":35,"stock":78
	}
]
```
</details>
<br>