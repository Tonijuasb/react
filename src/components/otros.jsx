import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importamos axios para hacer las peticiones a la API

function Other() {
    const [formData, setFormData] = useState({
        id: 1,
        nombre: '',
        email: '',
        telefono: '',
        edad: '',
        sexo: '',
        checkbox: false,
        listbox: '',
        fecha: '',
    });

    const [users, setUsers] = useState([]);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        // Cargar datos desde la API al montar el componente
        loadUsersFromAPI();
    }, []);

    // Función para cargar datos desde la API
    const loadUsersFromAPI = () => {
        axios
            .get('https://api.example.com/users')
            .then((response) => {
                setUsers(response.data); // Actualizamos el estado con los usuarios obtenidos
            })
            .catch((error) => {
                console.error('Error al cargar datos desde la API:', error);
            });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación de datos
        if (formData.nombre.trim() === '') {
            alert('El nombre es requerido');
            return;
        }

        if (formData.email.trim() === '') {
            alert('El email es requerido');
            return;
        }

        if (!formData.fecha) {
            alert('La fecha es requerida');
            return;
        }

        // Resto de la lógica para guardar datos en Local Storage
        if (editMode) {
            setUsers(users.map((user) => (user.id === formData.id ? formData : user)));
        } else {
            setUsers([...users, formData]);
            setFormData({ ...formData, id: formData.id + 1 });
        }

        // Limpiar el formulario después de enviarlo
        setFormData({
            nombre: '',
            email: '',
            telefono: '',
            edad: '',
            sexo: '',
            checkbox: false,
            listbox: '',
            fecha: '',
        });

        setEditMode(false);
    };

    const handleEdit = (user) => {
        setFormData(user);
        setEditMode(true);
    };

    const handleDelete = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    return (
        <div className="other-container">
            <h1>Otra sección</h1>
            <div className="image-container">
                <img
                    className="styled-image"
                    src="https://i.pinimg.com/originals/f5/51/1a/f5511a1fe1a2de9ed31f61d380b048db.jpg"
                    alt="Imagen de inicio"
                />
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Nombre"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            placeholder="Teléfono"
                        />
                        <input
                            type="number"
                            name="edad"
                            value={formData.edad}
                            onChange={handleChange}
                            placeholder="Edad"
                        />
                        <select name="sexo" value={formData.sexo} onChange={handleChange}>
                            <option value="">Seleccionar Sexo</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                            <option value="otro">Otro</option>
                        </select>
                        <input
                            type="checkbox"
                            name="checkbox"
                            checked={formData.checkbox}
                            onChange={handleChange}
                        />
                        <select name="listbox" value={formData.listbox} onChange={handleChange}>
                            <option value="">Seleccionar opción</option>
                            <option value="opcion1">Opción 1</option>
                            <option value="opcion2">Opción 2</option>
                            <option value="opcion3">Opción 3</option>
                        </select>
                        <input
                            type="date"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                            placeholder="Fecha"
                        />
                        <button type="submit">{editMode ? 'Guardar Cambios' : 'Guardar'}</button>
                    </form>
                    <div>
                        <h2 className="form-container-2">Usuarios registrados:</h2>
                        <ul>
                            {users.map((user) => (
                                <li key={user.id}>
                                    <strong>{user.nombre}</strong>
                                    <br />
                                    Email: {user.email}
                                    <br />
                                    Teléfono: {user.telefono}
                                    <br />
                                    Edad: {user.edad}
                                    <br />  
                                    Sexo: {user.sexo}
                                    <br />
                                    fecha: {user.fecha}
                                    <br />

                                    <button onClick={() => handleEdit(user)}>Editar</button>
                                    <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Other;




