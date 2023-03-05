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
| POST	  | /api/login					    | Para iniciar sesión con un usuario registrado					 	|
| POST	  | /api/register				    | Para registrar un usuario nuevo							 	|
| GET	  | /api/fail-login				    | Se obtiene al ingresar credenciales no válidas en el POST de loggin		 	|
| GET	  | /api/fail-register				    | Se obtiene al no poder concretar el registro de un nuevo usuario			 	|
| GET	  | /api/home					    | Se obtiene al realizar un loggin exitoso, o se puede acceder para ver el de la sesion	|
| GET	  | /api/succesfull-register			    | Se obtiene al realizar un registro de nuevo usuario exitoso		 		|
| GET	  | /api/logout					    | Permite cerrar una sesion activa						 		|
| POST	  | /api/pedido					    | Continua el proceso de confirmar la compra del carrito de la sesion activa		|

<br>

## REQUESTS/RESPONSES

<details>
<summary>GET <b>/api/productos</b></summary> 

```js
GET http://localhost:8080/api/productos
```
### Ejemplo respuesta

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

<details>
<summary>GET <b>/api/productos/:id</b></summary> 

```js
GET http://localhost:8080/api/productos/1
```
### Ejemplo respuesta

```json
{
	"codigo": "Raqueta",
	"foto": "https://cdn1.iconfinder.com/data/icons/rcons-basic-sport/16/fitness_tennis_game_raquet_training_play_sport-512.png",
	"stock": 25,
	"descripcion": "Raqueta",
	"precio": 100,
	"timestamp": 1670096837624,
	"idStore": 1,
	"nombre": "Raqueta"
}
```
</details>
<br>

<details>
<summary>POST <b>/api/productos/</b></summary> 

```js
POST http://localhost:8080/api/productos/
```
### Ejemplo solicitud

```json
{
	"codigo": "Raqueta2",
	"foto": "https://cdn1.iconfinder.com/data/icons/rcons-basic-sport/16/fitness_tennis_game_raquet_training_play_sport-512.png",
	"stock": 25,
	"descripcion": "Raqueta",
	"precio": 500,
	"idStore": 4,
	"nombre": "Raqueta2"
}
```

### Ejemplo respuesta

```json
{
	"codigo": "Raqueta2",
	"foto": "https://cdn1.iconfinder.com/data/icons/rcons-basic-sport/16/fitness_tennis_game_raquet_training_play_sport-512.png",
	"stock": 25,
	"descripcion": "Raqueta",
	"precio": 500,
	"idStore": 4,
	"nombre": "Raqueta2",
	"timestamp": 1678033395055,
	"id": 4
}
```
</details>
<br>


<details>
<summary>PUT <b>/api/productos/:id</b></summary> 

```js
PUT http://localhost:8080/api/productos/4
```
### Ejemplo solicitud

```json
{
	"codigo": "Raqueta2",
	"foto": "https://cdn1.iconfinder.com/data/icons/rcons-basic-sport/16/fitness_tennis_game_raquet_training_play_sport-512.png",
	"stock": 6,
	"descripcion": "Raqueta2",
	"precio": 5000000,
	"idStore": 4,
	"nombre": "Raqueta2"
}
```

### Ejemplo respuesta

```json
{
	"ok": "producto actualizado"
}
```
</details>
<br>


<details>
<summary>DELETE <b>/api/productos/:id</b></summary> 

```js
DELETE http://localhost:8080/api/productos/4
```

### Ejemplo respuesta

```json
{
	"ok": "producto eliminado"
}
```
</details>
<br>

<details>
<summary>GET <b>/api/carrito/</b></summary> 

```js
GET http://localhost:8080/api/carrito/
```

### Ejemplo respuesta

```json
[
	{
		"_id": "63acb3f740a3d442f972f4c1",
		"timestamp": 1672262647281,
		"productos": [
			{
				"idStore": 1,
				"timestamp": 1670096837624,
				"nombre": "Raqueta",
				"descripcion": "Raqueta",
				"codigo": "Raqueta",
				"foto": "https://cdn1.iconfinder.com/data/icons/rcons-basic-sport/16/fitness_tennis_game_raquet_training_play_sport-512.png",
				"precio": 100,
				"stock": 25,
				"_id": "63acb41840a3d442f972f4c9"
			},
			{
				"idStore": 2,
				"timestamp": 1670096837624,
				"nombre": "Pelota de futbol",
				"descripcion": "Pelota de futbol",
				"codigo": "Pelota de futbol",
				"foto": "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/football-512.png",
				"precio": 35,
				"stock": 78,
				"_id": "63acb41e40a3d442f972f4d3"
			}
		],
		"__v": 0
	},
	{
		"_id": "640241997d58d47da33ddf90",
		"timestamp": 1677869465621,
		"productos": [],
		"__v": 0
	},
	{
		"_id": "640241de63d5e918cbdb83bc",
		"timestamp": 1677869534518,
		"productos": [],
		"__v": 0
	}	
]
```
</details>
<br>


<details>
<summary>POST <b>/api/carrito/</b></summary> 

```js
POST http://localhost:8080/api/carrito/
```

### Ejemplo respuesta

```json
{
	"id del carrito nuevo": "6404c4361a63250879cf29f9"
}
```
</details>
<br>

<details>
<summary>DELETE <b>/api/carrito/:id</b></summary> 

```js
DELETE http://localhost:8080/api/carrito/6404c4361a63250879cf29f9
```

### Ejemplo respuesta

```json
{
	"ok": "carrito eliminado"
}
```
</details>
<br>

<details>
<summary>GET <b>/api/carrito/:id/productos</b></summary> 

```js
GET http://localhost:8080/api/carrito/63acb3f740a3d442f972f4c1/productos
```

### Ejemplo respuesta

```json
[
	{
		"idStore": 1,
		"timestamp": 1670096837624,
		"nombre": "Raqueta",
		"descripcion": "Raqueta",
		"codigo": "Raqueta",
		"foto": "https://cdn1.iconfinder.com/data/icons/rcons-basic-sport/16/fitness_tennis_game_raquet_training_play_sport-512.png",
		"precio": 100,
		"stock": 25,
		"_id": "63acb41840a3d442f972f4c9"
	},
	{
		"idStore": 2,
		"timestamp": 1670096837624,
		"nombre": "Pelota de futbol",
		"descripcion": "Pelota de futbol",
		"codigo": "Pelota de futbol",
		"foto": "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/football-512.png",
		"precio": 35,
		"stock": 78,
		"_id": "63acb41e40a3d442f972f4d3"
	}
]
```
</details>
<br>

<details>
<summary>POST <b>/api/carrito/:id1/productos/:id2 </b></summary> 

```js
POST http://localhost:8080/api/carrito/640241de63d5e918cbdb83bc/productos/1
```

### Ejemplo respuesta

```json
{
	"ok": "se agrego el producto al carrito"
}
```
</details>
<br>



<details>
<summary>DELETE <b>/api/carrito/:id1/productos/:id_prod </b></summary> 

```js
DELETE http://localhost:8080/api/carrito/640241de63d5e918cbdb83bc/productos/1
```

### Ejemplo respuesta

```json
{
	"ok": "El producto fue quitado del carrito"
}
```
</details>
<br>


<details>
<summary>POST <b>/api/login </b></summary> 

```js
POST http://localhost:8080/api/login
```
### Ejemplo solicitud

```json
{	
	"username": "fede@fede.com",
	"password": "fede-password"
}
```
	
### Ejemplo respuesta

```json
{
	"ok": "sesion iniciada correctamente",
	"productos disponibles": {
		"0": {
			"idStore": 3,
			"descripcion": "Pelota de basket",
			"timestamp": 1670096837624,
			"nombre": "Pelota de basket",
			"foto": "https://cdn4.iconfinder.com/data/icons/sports-flat-2/48/Basketball-512.png",
			"stock": "50",
			"precio": "30",
			"codigo": "Pelota de basket"
		},
		"1": {
			"codigo": "Pelota de futbol",
			"precio": 35,
			"timestamp": 1670096837624,
			"foto": "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/football-512.png",
			"nombre": "Pelota de futbol",
			"descripcion": "Pelota de futbol",
			"stock": 78,
			"idStore": 2
		},
		"2": {
			"foto": "https://cdn1.iconfinder.com/data/icons/rcons-basic-sport/16/fitness_tennis_game_raquet_training_play_sport-512.png",
			"codigo": "Raqueta",
			"idStore": 1,
			"stock": 25,
			"timestamp": 1670096837624,
			"precio": 100,
			"descripcion": "Raqueta",
			"nombre": "Raqueta"
		}
	},
	"su carrito": {
		"_id": "640271314e5af1b4ad62c59f",
		"timestamp": 1677881649798,
		"productos": [],
		"__v": 0
	}
}
```
</details>
<br>


<details>
<summary>POST <b>/api/register </b></summary> 

```js
POST http://localhost:8080/api/register
```
### Ejemplo solicitud

```json
{
	"username": "fede@fede.com",
	"password": "fede-password",
	"nombre": "fede",
	"direccion": "avenida siempre viva 123",
	"edad": 30,
	"telefono": 1155550000,
	"avatar": "https://pics.filmaffinity.com/avatar_the_way_of_water-722646748-mmed.jpg"
}
```
	
### Ejemplo respuesta

```json
{
	"ok": "registro de usuario realizado correctamente"
}
```
</details>
<br>

<details>
<summary>GET <b>/api/fail-login </b></summary> 

```js
POST http://localhost:8080/api/login
```
### Ejemplo solicitud

```json
{	
	"username": "usuario-incorrecto",
	"password": "contraseña-incorrecta"
}
```
	
### Ejemplo respuesta

```json
{
	"error": "no fue posible completar el login, verifique usuario y contraseña"
}
```
</details>
<br>

<details>
<summary>GET <b>/api/fail-register </b></summary> 

```js
POST http://localhost:8080/api/register
```
### Ejemplo solicitud

```json
{
	"username": "usuario-en-uso",
	"password": "password",
	"nombre": "federico",
	"direccion": "avenida siempre viva 123",
	"edad": 30,
	"telefono": 1155550000,
	"avatar": "https://pics.filmaffinity.com/avatar_the_way_of_water-722646748-mmed.jpg"
}
```
	
### Ejemplo respuesta

```json
{
	"error": "el usuario ya esta en uso"
}
```
</details>
<br>

<details>
<summary>GET <b>/api/home </b></summary> 

```js
GET http://localhost:8080/api/home
```
	
### Ejemplo respuesta

```json
{
	"ok": "sesion iniciada correctamente",
	"productos disponibles": {
		"0": {
			"stock": "50",
			"foto": "https://cdn4.iconfinder.com/data/icons/sports-flat-2/48/Basketball-512.png",
			"timestamp": 1670096837624,
			"descripcion": "Pelota de basket",
			"nombre": "Pelota de basket",
			"codigo": "Pelota de basket",
			"idStore": 3,
			"precio": "30"
		},
		"1": {
			"codigo": "Pelota de futbol",
			"nombre": "Pelota de futbol",
			"foto": "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/football-512.png",
			"descripcion": "Pelota de futbol",
			"timestamp": 1670096837624,
			"stock": 78,
			"idStore": 2,
			"precio": 35
		},
		"2": {
			"foto": "https://cdn1.iconfinder.com/data/icons/rcons-basic-sport/16/fitness_tennis_game_raquet_training_play_sport-512.png",
			"codigo": "Raqueta",
			"descripcion": "Raqueta",
			"timestamp": 1670096837624,
			"idStore": 1,
			"precio": 100,
			"stock": 25,
			"nombre": "Raqueta"
		}
	},
	"su carrito": {
		"_id": "640271314e5af1b4ad62c59f",
		"timestamp": 1677881649798,
		"productos": [],
		"__v": 0
	}
}
```
</details>
<br>

<details>
<summary>GET <b>/api/succesfull-register </b></summary> 

```js
POST http://localhost:8080/api/register
```
### Ejemplo solicitud

```json
{
	"username": "fede@fede.com",
	"password": "fede-password",
	"nombre": "fede",
	"direccion": "avenida siempre viva 123",
	"edad": 30,
	"telefono": 1155550000,
	"avatar": "https://pics.filmaffinity.com/avatar_the_way_of_water-722646748-mmed.jpg"
}
```
	
### Ejemplo respuesta

```json
{
	"ok": "registro de usuario realizado correctamente"
}
```
</details>


<details>
<summary>GET <b>/api/logout </b></summary> 

```js
GET http://localhost:8080/api/logout
```
	
### Ejemplo respuesta

```json
{
	"ok": "sesion cerrada correctamente"
}
```
</details>


<details>
<summary>POST <b>/api/pedido </b></summary> 

```js
POST http://localhost:8080/api/pedido
```
	
### Ejemplo respuesta

```json
{
	"ok": "su compra está confirmada bajo el código: 6404c8f71a63250879cf2a23"
}
```
</details>
