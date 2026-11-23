const STORAGE_KEY = "campusnotes.notes.v1";
const titleInput = document.querySelector("#note-title");
const bodyInput = document.querySelector("#note-body");
const saveButton = document.querySelector("#save-note");
const notesList = document.querySelector("#notes-list");
const emptyState = document.querySelector("#empty-state");
const message = document.querySelector("#message");
const searchInput = document.querySelector("#search");

let notes = loadNotes();

function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function persistNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function renderNotes() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = notes.filter(note =>
    `${note.title} ${note.body}`.toLowerCase().includes(query)
  );
  notesList.replaceChildren();
  emptyState.hidden = visible.length > 0;
  if (notes.length > 0 && visible.length === 0) {
    emptyState.textContent = "No notes match your search.";
    emptyState.hidden = false;
  } else {
    emptyState.textContent = "No notes yet. Add your first note above.";
  }

  visible.forEach(note => {
    const card = document.createElement("article");
    card.className = "note-card";
    const heading = document.createElement("h3");
    heading.textContent = note.title;
    const paragraph = document.createElement("p");
    paragraph.textContent = note.body;
    const date = document.createElement("small");
    date.textContent = new Date(note.updatedAt).toLocaleString();
    const actions = document.createElement("div");
    actions.className = "note-actions";
    const remove = document.createElement("button");
    remove.className = "delete";
    remove.type = "button";
    remove.textContent = "Delete";
    remove.addEventListener("click", () => {
      notes = notes.filter(item => item.id !== note.id);
      persistNotes();
      renderNotes();
    });
    actions.append(remove);
    card.append(heading, paragraph, date, actions);
    notesList.append(card);
  });
}

saveButton.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();
  if (!title || !body) {
    message.textContent = "Please enter both a title and note.";
    return;
  }
  notes.unshift({
    id: (globalThis.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()),
    title,
    body,
    updatedAt: new Date().toISOString()
  });
  persistNotes();
  titleInput.value = "";
  bodyInput.value = "";
  message.textContent = "Note saved.";
  renderNotes();
});

searchInput.addEventListener("input", renderNotes);
renderNotes();
