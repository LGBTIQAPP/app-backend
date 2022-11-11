import { StatusHttp } from '../libs/errorCustom.js';
import {Event} from '../models/events.model.js';
//import bcrypt from '../libs/bcrypt.js';

async function create(newEvent) {
    // Modificar
    const {name} = newEvent;
    // find({}) -> []
    const eventFound = await Event.findOne({name});

    // Si encuentra al Event -> {}
    // Si no encuentra al Event -> undefined

    if(eventFound) throw new StatusHttp('Ya existe un evento con este nombre', 404);

    // Encriptar el password
    //const encryptedPassword = await bcrypt.hash(password); // 
    //console.log({...newWriter, password: encryptedPassword})

    const event = await event.create({...newEvent});
    console.log(event)
    return await event.create({...newEvent});
};

async function update(idEvent, newData) {
    const eventFound = await Event.findById(idEvent);

    if(!eventFound) throw new StatusHttp('No existe este evento', 404);

    return await Event.updateOne({_id: idEvent}, newData);
};

async function deleteById(idEvent) {
    const eventFound = await Event.findById(idEvent);

    if(!eventFound) throw new StatusHttp('No existe este evento', 404);

    return await Event.deleteOne({_id: idEvent});
};

async function getById(idEvent) {
    return await Event.findById(idEvent);
};

async function getAll() {
    return await Event.find({}); // Regresa una promesa
};

async function getAllByPage(page, limit) { //TBD numero de eventos por página
    return await Event.find().sort({'createdAt': -1}).skip((page - 1) * limit).limit(limit);
};

// Find; Sort: ordena forma descendente, por fecha de creación; Skip -> Saltar por límite de 10 Writers

export {
    create,
    update,
    deleteById,
    getById,
    getAll,
    getAllByPage
};
