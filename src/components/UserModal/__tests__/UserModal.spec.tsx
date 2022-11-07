import { render, fireEvent, screen } from "@testing-library/react";

import { IUser } from "../../../interfaces";
import UserModal from "../UserModal";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: () => ({
    isUserModalOpen: true,
    users: [
      {
        id: 1,
        name: "John Doe",
        email: "johndoe@email.com",
      },
      {
        id: 2,
        name: "Jane Doe",
        email: "janedoe@email.com",
      },
    ],
  }),
  useDispatch: () => mockDispatch,
}));

const mockCloseUserModal = jest.fn();

jest.mock("../../../store/slices/usersSlice", () => ({
  closeUserModal: () => mockCloseUserModal(),
  selectUsers: jest.fn(),
  createUser: (user: IUser) => ({ type: "createUser", payload: user }),
}));

describe("#UserModal", () => {
  describe("when filling the form correctly", () => {
    const mockUserName = "new user";
    const mockUserEmail = "email@email.com";

    beforeEach(() => {
      const tree = render(<UserModal />);

      fireEvent.change(tree.getByLabelText("User name"), {
        target: { value: mockUserName },
      });

      fireEvent.change(tree.getByLabelText("User email"), {
        target: { value: mockUserEmail },
      });

      fireEvent.click(screen.getByText("Save"));
    });

    it("saves the user to store", () => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "createUser",
        payload: { name: mockUserName, email: mockUserEmail },
      });
    });
  });

  describe("when not filling all fields", () => {
    const mockUserName = "new user";

    beforeEach(() => {
      const tree = render(<UserModal />);

      fireEvent.change(tree.getByLabelText("User name"), {
        target: { value: mockUserName },
      });

      fireEvent.click(screen.getByText("Save"));
    });

    it("does not save the user to store", () => {
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it("renders a snackbar with the required error message", () => {
      expect(screen.getByText("All field are required")).toBeDefined();
    });
  });

  describe("when filling an existing email", () => {
    const mockUserName = "new user";
    const mockUserEmail = "johndoe@email.com";

    beforeEach(() => {
      const tree = render(<UserModal />);

      fireEvent.change(tree.getByLabelText("User name"), {
        target: { value: mockUserName },
      });

      fireEvent.change(tree.getByLabelText("User email"), {
        target: { value: mockUserEmail },
      });

      fireEvent.click(screen.getByText("Save"));
    });

    it("does not save the user to store", () => {
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it("renders a snackbar with the email in use error message", () => {
      expect(screen.getByText("This email is already in use")).toBeDefined();
    });
  });
});
