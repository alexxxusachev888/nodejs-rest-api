const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const getAllContacts = await fs.readFile(contactsPath);
    return JSON.parse(getAllContacts);
}

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
    const foundContact = contactsList.find(contact=> contact.id === contactId)
    return foundContact || null;
}

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
    const contactIndex = contactsList.findIndex(contact => contact.id === contactId);;
    if(contactIndex === -1){
        return null;
    }

    const [removedContact] = contactsList.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
    return removedContact;
}

const addContact = async (body) => {
  const {name, email, phone} = body;

  const contactsList = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contactsList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2))
    return newContact;
}

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();
    const contactIndex = contactsList.findIndex(contact => contact.id === contactId);;
    if(contactIndex === -1){
        return null;
    }

  contactsList[contactIndex] = { ...contactsList[contactIndex], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2))
  return contactsList[contactIndex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
