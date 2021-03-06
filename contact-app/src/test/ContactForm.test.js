import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Form from "../components/ContactForm";

const queryClient = new QueryClient();
const handleSubmit = jest.fn();
const hideForm = jest.fn();
const renderForm = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <Form
        saveContact={{ mutate: handleSubmit, reset: jest.fn() }}
        hideForm={hideForm}
      />
    </QueryClientProvider>
  );

test("it renders without crashing", () => {
  renderForm();

  expect(screen.getByPlaceholderText("First name")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Last name")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Phone number")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
});

test("the form fields update on user type event and submits successfully", async () => {
  renderForm();

  const firstName = screen.getByPlaceholderText("First name");
  fireEvent.change(firstName, { target: { value: "Software" } });
  expect(firstName.value).toBe("Software");

  const lastName = screen.getByPlaceholderText("Last name");
  fireEvent.change(lastName, { target: { value: "Dev" } });
  expect(lastName.value).toBe("Dev");

  const email = screen.getByPlaceholderText("Email");
  fireEvent.change(email, { target: { value: "soft@dev.com" } });
  expect(email.value).toBe("soft@dev.com");

  const phone = screen.getByPlaceholderText("Phone number");
  fireEvent.change(phone, { target: { value: "2548695" } });
  expect(phone.value).toBe("2548695");

  const saveButton = screen.getByRole("button", { name: /save/i });
  fireEvent.click(saveButton);

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith({
      email: "soft@dev.com",
      first_name: "Software",
      last_name: "Dev",
      phone_number: "2548695",
    })
  );
});

test("save button shows the update text when edit prop is passed", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Form saveContact={{ mutate: handleSubmit }} edit hideForm={jest.fn()} />
    </QueryClientProvider>
  );

  const saveButton = screen.getByRole("button", { name: /update/i });
  expect(saveButton).toHaveTextContent("Update");
});

test("form will not submit if all fields are not filled", () => {
  renderForm();
  const email = screen.getByPlaceholderText("Email");
  fireEvent.change(email, { target: { value: "soft@dev.com" } });
  expect(email.value).toBe("soft@dev.com");
  const saveButton = screen.getByRole("button", { name: /save/i });
  fireEvent.click(saveButton);
  expect(handleSubmit).not.toHaveBeenCalled;
});

test("clicking cancel calls the hideForm function", () => {
  renderForm();
  const cancelButton = screen.getByRole("button", { name: /cancel/i });
  fireEvent.click(cancelButton);
  expect(hideForm).toHaveBeenCalledTimes(1);
});
