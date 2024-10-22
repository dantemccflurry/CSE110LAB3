import { render, screen, fireEvent, getByTestId, getAllByTestId } from "@testing-library/react";
import { ToDoList } from "./toDoList";

//Test 1 Expect all elements to be displayed
describe("Default StickyNotes",()=>{
    test("renders create note form", () => {
        render(<ToDoList />);

        const title=screen.getByText("'s To Do List")
        expect(title).toBeInTheDocument();

        const bought=screen.getByText("Items bought: 0")
        expect(bought).toBeInTheDocument();

        const apples=screen.getByText("Apples")
        expect(apples).toBeInTheDocument();

        const bananas=screen.getByText("Bananas")
        expect(bananas).toBeInTheDocument();
      });
});

// Test 2 Check and Uncheck boxes
describe("Check and uncheck items in To Do List", () => {
    test("correctly updates number of bought items when an item is checked", () => {
        render(<ToDoList />);
    
        expect(screen.getByText("Items bought: 0")).toBeInTheDocument();

        const applesCheckbox = screen.getByLabelText("Apples");
        fireEvent.click(applesCheckbox);
    
        expect(screen.getByText("Items bought: 1")).toBeInTheDocument();
      });

      test("check and uncheck each item one at a time", () => {
        render(<ToDoList />);
    
        expect(screen.getByText("Items bought: 0")).toBeInTheDocument();

        const bananasCheckbox = screen.getByLabelText("Bananas");
        fireEvent.click(bananasCheckbox);
        expect(screen.getByText("Items bought: 1")).toBeInTheDocument();

        fireEvent.click(bananasCheckbox);
        expect(screen.getByText("Items bought: 0")).toBeInTheDocument();

        const applesCheckbox = screen.getByLabelText("Apples");
        fireEvent.click(applesCheckbox);
        expect(screen.getByText("Items bought: 1")).toBeInTheDocument(); 
        fireEvent.click(applesCheckbox);
        expect(screen.getByText("Items bought: 0")).toBeInTheDocument();
      });

      test("check both and uncheck both items", () => {
        render(<ToDoList />);
    
        expect(screen.getByText("Items bought: 0")).toBeInTheDocument();

        const applesCheckbox = screen.getByLabelText("Apples");
        fireEvent.click(applesCheckbox);
        expect(screen.getByText("Items bought: 1")).toBeInTheDocument();

        const bananasCheckbox = screen.getByLabelText("Bananas");
        fireEvent.click(bananasCheckbox);
        expect(screen.getByText("Items bought: 2")).toBeInTheDocument();

        fireEvent.click(applesCheckbox);
        expect(screen.getByText("Items bought: 1")).toBeInTheDocument();

        fireEvent.click(bananasCheckbox);
        expect(screen.getByText("Items bought: 0")).toBeInTheDocument();
      });
});