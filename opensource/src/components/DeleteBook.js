export const deleteBook = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:5189/api/Books/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
  
      return true;
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  };