export async function notesFromJSON(jsonFile) {
    // Načíst JSON soubor
    const response = await fetch(jsonFile);
    const jsonData = await response.json();

    // Vytvoření pole instancí třídy Note
    const notesFromJSON = jsonData.map(data => new Note(
        data.id,
        data.index,
        data.tone,
        data.frequency,
        data.html
    ));

    return notesFromJSON;
}