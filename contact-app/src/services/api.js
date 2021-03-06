import axios from "axios";

const fetchContacts = () =>
  axios("http://localhost:5000/api/contacts").then((res) => res.data);

const fetchHistory = (id) =>
  axios(`http://localhost:5000/api/history/${id}`).then((res) => res.data);

const saveContact = async (data) => {
  await axios.post("http://localhost:5000/api/contacts", data);
};

const editContact = async (data) => {
  await axios.put(`http://localhost:5000/api/contacts/${data.id}`, data);
};

const deleteContact = async (id) => {
  await axios.delete(`http://localhost:5000/api/contacts/${id}`);
};

export { fetchContacts, fetchHistory, saveContact, editContact, deleteContact };
