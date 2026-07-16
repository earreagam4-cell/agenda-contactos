// src/components/FormularioContacto.jsx

function FormularioContacto({ nombre, correo, telefono, manejarCambio, alGuardar, editando, errores }) {

  return (
    <form onSubmit={alGuardar} style={{ background: '#f9f9f9', padding: '15px', marginBottom: '20px' }}>
      <h3>{editando ? "Editar Contacto" : "Nuevo Contacto"}</h3>
      <div className="form-group">

        <label>Nombre:</label>
        <input type="text" name="nombre" className="form-control" value={nombre} onChange={manejarCambio} />
        {errores.nombre ? <span className="error-message">{errores.nombre}</span> : null}
      </div>

      <div className="form-group">

        <label>Correo:</label>
        <input type="text" name="correo" className="form-control" value={correo} onChange={manejarCambio} />
        {errores.correo ? <span className="error-message">{errores.correo}</span> : null}
      </div>

      <div className="form-group">
        <label>Teléfono:</label>
        <input type="text" name="telefono" className="form-control" value={telefono} onChange={manejarCambio} />
        {errores.telefono ? <span className="error-message">{errores.telefono}</span> : null}
      </div>

      <button type="submit" className="btn-submit">{editando ? "Actualizar" : "Guardar"}</button>
    </form>
  );
}

export default FormularioContacto;