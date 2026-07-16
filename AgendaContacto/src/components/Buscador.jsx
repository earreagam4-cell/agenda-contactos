function Buscador({ busqueda, manejarBusqueda }) {

  return (

    <div style={{ marginBottom: '15px' }}>

      <input

        type="text"

        className="search-input"

        placeholder="Buscar contacto por nombre..."

        value={busqueda}

        onChange={function(e) { manejarBusqueda(e.target.value); }}

      />

    </div>

  );

}



export default Buscador;