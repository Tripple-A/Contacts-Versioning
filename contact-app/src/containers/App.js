import { useState } from "react";
import { useQuery } from "react-query";
import { fetchContacts } from "../api";

import Form from "../components/ContactForm";
import List from "../components/ContactList";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const hideForm = () => setShowForm(false);
  const { isLoading, error, data } = useQuery("fetchContacts", fetchContacts, {
    staleTime: Infinity,
  });

  return (
    <div className="container">
      <div className="jumbotron jumbotron-fluid bg-dark text-white mb-3">
        <div className="container d-flex">
          <h1 className="display-4">Contact Application</h1>
          <p className="lead">
            Store, modify, delete and view the edit history of your contacts.{" "}
          </p>
          <Button onClick={() => setShowForm(true)} className="m-4">
            {" "}
            Add Contact
          </Button>
        </div>
      </div>
      {showForm && <Form hideForm={hideForm} />}
      <div className="mx-auto text-center">
        {error && <h3>There was an error loading the contacts</h3>}
        {isLoading && <Spinner animation="border" />}
        {data && <List data={data.data} />}
      </div>
    </div>
  );
};

export default App;