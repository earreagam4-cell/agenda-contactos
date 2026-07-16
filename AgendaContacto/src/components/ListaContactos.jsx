// src/components/ListaContactos.jsx

function ListaContactos({ contactos, alEditar, alEliminar }) {
  if (contactos.length === 0) return <p>No hay contactos.</p>;
  return (
    <div>
      {contactos.map(function(contacto) {
        return (
          <div key={contacto.id} className="contact-item">
            <div>
              <strong>{contacto.nombre}</strong>
              <p style={{ margin: '2px 0' }}>{contacto.correo} | {contacto.telefono}</p>
            </div>

            <div>
              <button className="btn" onClick={function() { alEditar(contacto); }}>Editar</button>
              <button className="btn" style={{ color: 'red' }} onClick={function() { alEliminar(contacto.id); }}>X</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default ListaContactos;