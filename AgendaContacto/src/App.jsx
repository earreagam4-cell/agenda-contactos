import { useState } from 'react'
// src/App.jsx
import './App.css';
import Buscador from './components/Buscador';
import FormularioContacto from './components/FormularioContacto';
import ListaContactos from './components/ListaContactos';
function App() {
  // Lista inicial de prueba
  const [lista, establecerLista] = useState([
    { id: 1, nombre: "Juan Pérez", correo: "juan@gmail.com", telefono: "0999999999" },
    { id: 2, nombre: "María López", correo: "maria@gmail.com", telefono: "0977777777" }
  ]);
  // Variables simples para controlar lo que se escribe en el formulario
  const [nombre, establecerNombre] = useState('');
  const [correo, establecerCorreo] = useState('');
  const [telefono, establecerTelefono] = useState('');
  const [busqueda, establecerBusqueda] = useState('');
  const [errores, establecerErrores] = useState({});
  const [contactoParaEditar, establecerContactoParaEditar] = useState(null);
  // Función básica para detectar qué campo está cambiando
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    if (name === 'nombre') establecerNombre(value);
    if (name === 'correo') establecerCorreo(value);
    if (name === 'telefono') establecerTelefono(value);
  };
  // Guardar o Editar
  const alGuardar = (e) => {
    e.preventDefault();
    // Validación súper fácil con IF-ELSE
    let erroresTemporales = {};
    if (nombre.trim() === '') erroresTemporales.nombre = "Nombre obligatorio";
    if (correo.trim() === '') erroresTemporales.correo = "Correo obligatorio";
    if (telefono.trim() === '') erroresTemporales.telefono = "Teléfono obligatorio";
    if (Object.keys(erroresTemporales).length > 0) {
      establecerErrores(erroresTemporales);
      return; // Detiene la función si hay errores
    }
    if (contactoParaEditar !== null) {
      // Editar usando .map()
      const listaEditada = lista.map(function(item) {
        if (item.id === contactoParaEditar.id) {
          return { id: item.id, nombre, correo, telefono };
        }
        return item;
      });
      establecerLista(listaEditada);
      establecerContactoParaEditar(null);
    } else {
      // Guardar nuevo
      const nuevo = { id: Date.now(), nombre, correo, telefono };
      establecerLista([...lista, nuevo]);
    }
    // Limpiar formulario
    establecerNombre(''); establecerCorreo(''); establecerTelefono(''); establecerErrores({});
  };
  // Cargar datos al formulario para editar
  const alEditar = (contacto) => {
    establecerContactoParaEditar(contacto);
    establecerNombre(contacto.nombre);
    establecerCorreo(contacto.correo);
    establecerTelefono(contacto.telefono);
  };
  // Eliminar usando .filter()
  const alEliminar = (id) => {
    if (window.confirm("¿Eliminar?")) {
      const nuevaLista = lista.filter(function(item) {
        return item.id !== id;
      });
      establecerLista(nuevaLista);
    }
  };
  // Filtrar la lista en tiempo real con .filter()
  const contactosFiltrados = lista.filter(function(item) {
    return item.nombre.toLowerCase().includes(busqueda.toLowerCase());
  });
  return (
    <div className="app-container">
      <h1>Agenda de Contactos</h1>
      <Buscador busqueda={busqueda} manejarBusqueda={establecerBusqueda} />
      <div className="contenedor-columnas">
        <div className="columna-izquierda">
          <FormularioContacto
            nombre={nombre} correo={correo} telefono={telefono}
            manejarCambio={manejarCambio} alGuardar={alGuardar}
            editando={contactoParaEditar} errores={errores}
          />
        </div>
        <div className="columna-derecha">
          <ListaContactos
            contactos={contactosFiltrados}
            alEditar={alEditar}
            alEliminar={alEliminar}
          />
        </div>
      </div>
    </div>
  );
}
export default App; 