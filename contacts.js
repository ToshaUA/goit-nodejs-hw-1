const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contact = await listContacts();
  const result = contact.find((contact) => contact.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contact = await listContacts();
  const index = contact.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contact.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return result;
};

const addContact = async (name, email, phone) => {
  const contact = await listContacts();

  let id =
    contact.length > 0 ? parseInt(contact[contact.length - 1].id) + 1 : 1;

  const newContact = {
    id: id.toString(),
    name: name,
    email: email,
    phone: phone,
  };
  contact.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
