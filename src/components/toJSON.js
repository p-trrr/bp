export function noteToJSON(note){
    return({"id": note.getID(), "index": note.getIndex(), "tone": note.getTone(), "frequency": note.getFrequency(), "html": note.getHTMLelement()});
}
export function staveToJSON(stave){
    return({"id": stave.getID(), "index": stave.getIndex(), "notes": stave.getNotes().map(noteToJSON)});
}