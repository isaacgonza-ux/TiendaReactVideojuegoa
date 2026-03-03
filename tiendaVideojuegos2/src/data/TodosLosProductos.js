// src/data/todosLosProductos.js
import productos from '../data/Producto'
import estrenos from '../data/estrenos'
import noticias from '../data/NewsData'
import descuentos from '../data/DescuentosData'

export const todosLosProductos = [...productos, ...estrenos, ...noticias, ...descuentos];