const { Router } = require('express')
const router = Router()
const fs = require('fs')

const contactsFile = fs.readFileSync('./contacts.json', 'utf-8')
let contacts = JSON.parse(contactsFile)

router.get("/contacts", (req, res) => {
    res.status(200).json(contacts)
})

router.post("/contacts", (req, res) => {
    const { nombre, telefono_1, telefono_2, email } = req.body
    if (!nombre || !telefono_1 || !telefono_2 || !email) {
        res.status(409).json({
            ok: false,
            msg: 'Todos los campos son obligatorios'
        })
    } else {
        const id = contacts.length + 1
        const contact = {
            id,
            nombre,
            telefono_1,
            telefono_2,
            email
        }
        contacts.push(contact)
        fs.writeFileSync('./contacts.json', JSON.stringify(contacts), 'utf-8')
        res.status(200).json(contact)
    }
})

router.put("/contacts/:id", (req, res) => {
    const { nombre, telefono_1, telefono_2, email } = req.body
    const id = req.params.id
    if (!nombre || !telefono_1 || !telefono_2 || !email) {
        res.status(409).json({ "error": "Todos los campos son obligatorios en este metodo" })
    } else {
        contacts.filter(contact => {
            if (contact.id == id) {
                contact.name = nombre,
                    contact.telefono_1 = telefono_1,
                    contact.telefono_2 = telefono_2,
                    contact.email = email
            }
        })
        const json_contacts = JSON.stringify(contacts)
        fs.writeFileSync('./contacts.json', json_contacts, 'utf-8')
        res.status(200).json(contacts)
    }
})

router.delete("/contacts/:id", (req, res) => {
    if (!req.params.id) {
        res.status(409).json({ "error": "El id es obligatorio" })
    } else {
        const indice = contacts.findIndex(contact => contact.id === req.params.id)
        contacts.splice(indice, 1)
        const json_contacts = JSON.stringify(contacts)
        fs.writeFileSync('./contacts.json', json_contacts, 'utf-8')
        res.status(200).json(contacts)
    }
})

router.get('/', (req, res) => {
    res.status(200).json('Api Rest Movies')
})


module.exports = router