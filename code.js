let lista = document.getElementById("lista");
let editname = document.getElementById("editname");
let editjob = document.getElementById("editjob");

const obtenerPersonas = async () => {
  try {
    const data = await fetch('https://reqres.in/api/users?page=2');
    const users = await data.json();

    const html = users.data.map(user => {
      return `
        <li class="card">
          <img src="${user.avatar}" style="width: 10%" alt="">
          <p>${user.id}${user.first_name} ${user.last_name}</p>
          <p>${user.email}</p>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalEditar" style="margin-right: 5px">Editar</button>
          <button class="btn btn-danger" style="margin-right: 5px" onclick="eliminarPersona(${user.id})">Eliminar</button>
        </li>`;
    }).join("");
    
    lista.innerHTML = html;
  } catch (error) {
    console.error('Error al obtener personas:', error);
  }
};



const crearPersona = async (nombre, trabajo) => {
  try {
    const data = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nombre,
        job: trabajo,
      }),
    });
    const user = await data.json();
    console.log('Persona creada:', user);
  } catch (error) {
    console.error('Error al crear persona:', error);
  }
};

const eliminarPersona = async (id) => {
    let ids = parseInt(id);
  try {
    const data = await fetch(`https://reqres.in/api/users/${ids}`, {
      method: 'DELETE',
    });
    const response =data;
    console.log('Persona eliminada:', response);
  } catch (error) {
    console.log('Error al eliminar persona:', error);
  }
};


obtenerPersonas();
