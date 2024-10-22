import './App.css';
import { useState,useContext} from 'react';
import { ThemeContext, themes } from "./themeContext";
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
export const StickyNotes =()=>{
        const [favoritedTitles, setFavoritedTitles] = useState<string[]>([]);
        const toggleFavorite = (noteTitle: string) => {
          setFavoritedTitles((prevTitles) =>
            prevTitles.includes(noteTitle)
              ? prevTitles.filter(title => title !== noteTitle)
              : [...prevTitles, noteTitle]
      );
        };
        const [currentTheme, setCurrentTheme] = useState(themes.light);
        const toggleTheme =()=>{
          setCurrentTheme(currentTheme===themes.light ? themes.dark : themes.light);
        };
        const theme = useContext(ThemeContext);
        const [notes, setNotes] = useState(dummyNotesList); 
      const initialNote = {
         id: -1,
         title: "",
         content: "",
         label: Label.other,
       };
      const [createNote, setCreateNote] = useState(initialNote);
      
      const createNoteHandler = (event: React.FormEvent) => {
         event.preventDefault();
         console.log("title: ", createNote.title);
         console.log("content: ", createNote.content);
         createNote.id = notes.length + 1;
         setNotes([createNote, ...notes]);
         setCreateNote(initialNote);
       };
       const [selectedNote, setSelectedNote] = useState<Note>(initialNote);
       const handleRemoveNote =(id:number)=>{
        console.log(notes);
        const newNotes=notes.filter(note=>note.id!==id);
        setNotes(newNotes);
        console.log(newNotes);
       };
       interface FavoritedProp{
        isClicked:boolean;
        handleClick:()=> void;
      }
       function Favorited({isClicked,handleClick}:FavoritedProp){
      
        return(
           <div><button data-testid="favButton" onClick={handleClick} style={{ background: currentTheme.background,color: currentTheme.foreground}}>{isClicked ? <FaHeart color='red'/>:<CiHeart />}</button></div>
      
        );
      };
      
       return (
        <ThemeContext.Provider value={currentTheme} >
         <div className='app-container' style={{ background: currentTheme.background,color: currentTheme.foreground}}   data-testid="background">
          <form className="note-form" onSubmit={createNoteHandler}>
             <div><input placeholder="Note Title" 	onChange={(event) =>setCreateNote({ ...createNote, title:event.target.value})}
                 required></input></div>
      
             <div><textarea placeholder="Note Content"onChange={(event) =>
                    setCreateNote({ ...createNote, content: event.target.value })}
                  required></textarea></div>
         <div>
               <select
                 onChange={(event) =>setCreateNote({ ...createNote, label:event.target.value as Label})}
                 required>
              <option>--Please Select a Label--</option>
                 <option value={Label.personal}>Personal</option>
                 <option value={Label.study}>Study</option>
                 <option value={Label.work}>Work</option>
                 <option value={Label.other}>Other</option>
               </select>
             </div>
             <div><button type="submit">Create Note</button></div>
          </form>
          
          <div className="notes-grid">
             {notes.map((note) => (
               <div
                 key={note.id}
                 className="note-item" data-testid="note-grid" style={{ background: currentTheme.background,color: currentTheme.foreground}}>
                 <div className="notes-header">
                 <Favorited 
                      isClicked={favoritedTitles.includes(note.title)} 
                      handleClick={() => toggleFavorite(note.title)} 
                    />
                   <button onClick={()=>handleRemoveNote(note.id)}style={{ background: currentTheme.background,color: currentTheme.foreground}}>x</button>
                 </div>
                 <h2 contentEditable='true' > {note.title} </h2>
                 <p contentEditable='true'> {note.content} </p>
                 <p contentEditable='true'> {note.label} </p>
               </div>
             ))}
           </div>
          <div className='favorites'style={{color: currentTheme.foreground}}>
           <h2>Favorited Notes: </h2>
           <ul>
            {favoritedTitles.map((title, index) => (
              <li key={index}>
                {title}
              </li>
            ))}
           </ul>
          </div>
          <div>
            <button onClick={toggleTheme}> Toggle Theme </button>
          </div>
        </div>
        </ThemeContext.Provider>
       );
      }      