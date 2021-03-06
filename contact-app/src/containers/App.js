import { useFetchContacts } from "../hooks";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import List from "../components/ContactList";
import Spinner from "react-bootstrap/Spinner";
import Details from "../components/ContactDetails";

const App = () => {
  const { isLoading, error, data } = useFetchContacts();
  const getContact = (id) => {
    return data.find((contact) => id == contact.id);
  };

  return (
    <Router>
      <div className="container text-center">
        <div className="jumbotron jumbotron-fluid bg-dark text-white mb-3">
          <div className="container">
            <h1 className="display-4">Contact Application</h1>
            <p className="lead p-2">
              Store, modify, delete and view the edit history of your contacts.{" "}
            </p>
          </div>
        </div>
        <div className="mx-auto text-center">
          {error && <h3>There was an error loading the contacts</h3>}
          {isLoading && <Spinner data-testid="spinner" animation="border" />}
        </div>
      </div>

      {data && (
        <Switch>
          <Route path="/" exact render={() => <List data={data} />} />
          <Route
            path="/contact/:id"
            exact
            render={() => <Details getContact={getContact} />}
          />
        </Switch>
      )}
    </Router>
  );
};

export default App;
