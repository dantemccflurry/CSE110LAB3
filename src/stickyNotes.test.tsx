import { render, screen, fireEvent, getByTestId, getAllByTestId } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { ThemeContext, themes } from "./themeContext";
import { dummyNotesList } from "./constants";

//Test 1
test("renders create note form", () => {
 render(<StickyNotes />);
 const createNoteButton = screen.getByText("Create Note");
 expect(createNoteButton).toBeInTheDocument();
 
});

//Test 2 creating a new Note
describe("Create StickyNote", () => {
    test("renders create note form", () => {
      render(<StickyNotes />);
   
      const createNoteButton = screen.getByText("Create Note");
      expect(createNoteButton).toBeInTheDocument();
    });
   
    test("creates a new note", () => {
      render(<StickyNotes />);
   
   // Please make sure your sticky note has a title and content input field with the following placeholders.
      const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
      const createNoteContentTextarea =
        screen.getByPlaceholderText("Note Content");
      const createNoteButton = screen.getByText("Create Note");
   
      fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
      fireEvent.change(createNoteContentTextarea, {
        target: { value: "Note content" },
      });
      fireEvent.click(createNoteButton);
   
      const newNoteTitle = screen.getByText("New Note");
      const newNoteContent = screen.getByText("Note content");
   
      expect(newNoteTitle).toBeInTheDocument();
      expect(newNoteContent).toBeInTheDocument();
    });
});

//Test 3 for loading default Notes
describe("Default StickyNotes",()=>{
    test("renders create note form", () => {
        render(<StickyNotes />);
      
        const defaultNoteTitle1=screen.getByText("test note 1 title")
        const defaultNoteTitle2=screen.getByText("test note 2 title")
        const defaultNoteTitle3=screen.getByText("test note 3 title")
        const defaultNoteTitle4=screen.getByText("test note 4 title")
        const defaultNoteTitle5=screen.getByText("test note 5 title")
        const defaultNoteTitle6=screen.getByText("test note 6 title")
        const noteLength=screen.getAllByTestId("note-grid");
        expect(defaultNoteTitle1).toBeInTheDocument();
        expect(defaultNoteTitle2).toBeInTheDocument();
        expect(defaultNoteTitle3).toBeInTheDocument();
        expect(defaultNoteTitle4).toBeInTheDocument();
        expect(defaultNoteTitle5).toBeInTheDocument();
        expect(defaultNoteTitle6).toBeInTheDocument();
        expect(noteLength).toHaveLength(6);
      });
});


//Test 4 for displaying accurate amount of notes after creation
describe("Display correct amount of Notes",()=>{

test("creates a new note", () => {
    render(<StickyNotes />);
 
 // Please make sure your sticky note has a title and content input field with the following placeholders.
    const defaultNoteTitle1=screen.getByText("test note 1 title")
    const defaultNoteTitle2=screen.getByText("test note 2 title")
    const defaultNoteTitle3=screen.getByText("test note 3 title")
    const defaultNoteTitle4=screen.getByText("test note 4 title")
    const defaultNoteTitle5=screen.getByText("test note 5 title")
    const defaultNoteTitle6=screen.getByText("test note 6 title")
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
      screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");
 
    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);
    const noteLength=screen.getAllByTestId("note-grid")
    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");
 
    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
    expect(defaultNoteTitle1).toBeInTheDocument();
    expect(defaultNoteTitle2).toBeInTheDocument();
    expect(defaultNoteTitle3).toBeInTheDocument();
    expect(defaultNoteTitle4).toBeInTheDocument();
    expect(defaultNoteTitle5).toBeInTheDocument();
    expect(defaultNoteTitle6).toBeInTheDocument();
    expect(noteLength).toHaveLength(7);
  });
});


//Test 5 for Toggle Theme
describe("Note Added and Editied",()=>{
  test("Turn to Dark Mode and Back to Light Mode",()=>{
      render (<StickyNotes/>);
      const toggleButton=screen.getByText("Toggle Theme");
      fireEvent.click(toggleButton);
      const element=screen.getByText("test note 1 title");
      expect(element).toHaveStyle('background-color:themes.dark.background');
      expect(element).toHaveStyle('color:themes.dark.foreground');
      fireEvent.click(toggleButton);
      expect(element).toHaveStyle('background-color:themes.light.background');
      expect(element).toHaveStyle('color:themes.light.foreground');
  });
});

//Test 5 for Deleting Note
describe("Create and Delete a Note",()=>{
  test("Deleteing Note",()=>{
     render(<StickyNotes/>);
      const notesLength=screen.getAllByTestId("note-grid");
      const notetitle1=screen.getByText('test note 1 title');
      expect(notesLength).toHaveLength(6);
      const deleteButton=screen.getAllByText('x');
      fireEvent.click(deleteButton[0]);
      expect(notetitle1).not.toBeInTheDocument();
      const newNotesLength=screen.getAllByTestId("note-grid");
      expect(newNotesLength).toHaveLength(5);
  });
});

// Test 6 for changing title, content, and label
describe("Edit Note Title and Content", () => {
  test("Changes the note title", () => {
    render(<StickyNotes/>);

    const noteTitle = screen.getByText("test note 1 title");
    expect(noteTitle).toBeInTheDocument();

    fireEvent.focus(noteTitle);
    fireEvent.change(noteTitle, { target: { innerHTML: "Title 1 Changed" } });
    fireEvent.blur(noteTitle);

    const updatedTitle = screen.getByText("Title 1 Changed");
    expect(updatedTitle).toBeInTheDocument();
  });
  test("Changes the note content", () => {
    render(<StickyNotes/>);

    const noteContent = screen.getByText("test note 1 content");
    expect(noteContent).toBeInTheDocument();

    fireEvent.focus(noteContent);
    fireEvent.change(noteContent, { target: { innerHTML: "Content 1 Changed" } });
    fireEvent.blur(noteContent);

    const updatedContent = screen.getByText("Content 1 Changed");
    expect(updatedContent).toBeInTheDocument();
  });
});

// Test 7 for favorites
describe("Toggle Favorite functionality", () => {
  test("Favoriting and unfavoriting a note", () => {
    render(<StickyNotes />);

    const notesLength=screen.getAllByTestId("note-grid");
    const notetitle1=screen.getByText('test note 1 title');
    expect(notetitle1).toBeInTheDocument();
    expect(notesLength).toHaveLength(6);

    const favoriteButton=screen.getAllByTestId("favButton");
    fireEvent.click(favoriteButton[0]);
  
    const favoriteNotesLabel = screen.getByText("Favorited Notes:");
    expect(favoriteNotesLabel).toBeInTheDocument();

    const note1Favorited = screen.getAllByText("test note 1 title")
    expect(note1Favorited).toHaveLength(2);

    const favoriteButton1=screen.getAllByTestId("favButton");
    fireEvent.click(favoriteButton1[0]);
    const newFavorited = screen.getAllByText("test note 1 title")
    expect(newFavorited).toHaveLength(1);
  });
});

// Test 8 delete all notes
describe("Delete all notes", () => {
  test("delete all notes", () => {
    render(<StickyNotes />);

      const notesLength=screen.getAllByTestId("note-grid");
      const notetitle1=screen.getByText('test note 1 title');
      expect(notesLength).toHaveLength(6);
      const deleteButton1=screen.getAllByText('x');
      fireEvent.click(deleteButton1[0]);
      expect(notetitle1).not.toBeInTheDocument();
      const newNotesLength=screen.getAllByTestId("note-grid");
      expect(newNotesLength).toHaveLength(5);

      const notesLengthNew=screen.getAllByTestId("note-grid");

      expect(notesLengthNew).toHaveLength(5);


      const deleteButton2=screen.getAllByText('x');
      fireEvent.click(deleteButton2[0]);
      const deleteButton3=screen.getAllByText('x');
      fireEvent.click(deleteButton3[0]);
      const deleteButton4=screen.getAllByText('x');
      fireEvent.click(deleteButton4[0]);
      const deleteButton5=screen.getAllByText('x');
      fireEvent.click(deleteButton5[0]);
      const deleteButton6=screen.getAllByText('x');
      fireEvent.click(deleteButton6[0]);
      
      const testNote = screen.queryByText('test note');
      expect(testNote).toBeNull();

      const deleteButton = screen.queryByText('x');
      expect(deleteButton).toBeNull();


  });
});