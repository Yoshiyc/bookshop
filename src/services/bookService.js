const STORAGE_KEY = "books";

export function getBooks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addBook(book) {
  const books = getBooks();
  books.push(book);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

export function updateBook(updatedBook) {
  const books = getBooks();
  const updated = books.map(book => 
    book.id === updatedBook.id ? updatedBook : book
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function removeBook(id) {
  const books = getBooks();
  const updated = books.filter(book => book.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

