import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "u5copk5q",
  dataset: "production",
  useCdn: true,
  apiVersion: "2025-01-13",
  token:
    "sksDLrdri80UXDpEXW7saLmKpsyzkkJM94KycCtC7cWrE5pxvtshPXlpHzg9wlErzMYW19S3xacgjSFqTEapLYABjT6dCcnz3SrKrHGEMqeOxINnvHGSIJhKhcqbpOx3KXscyf6WEM5faZXuoQStlXkLh1QtiGvzZD7ZLjdoVccPrbWOYSpG",
});

// Replace with your query condition, like deleting 'checkout' documents
async function deleteCheckoutDocuments() {
    try {
      // First, query all the documents of type "checkout"
      const documentsToDelete = await client.fetch('*[_type == "checkout"]{_id}'); // Fetch the document IDs
  
      // Check if documents exist
      if (documentsToDelete.length === 0) {
        console.log('No "checkout" documents to delete.');
        return;
      }
  
      // Create a delete operation for each document ID
      const deleteOperations = documentsToDelete.map((doc) =>
        client.delete(doc._id) // Use each document's ID to delete it
      );
  
      // Perform the deletions in a batch
      await Promise.all(deleteOperations);
      console.log('Successfully deleted all "checkout" documents!');
    } catch (error) {
      console.error('Error deleting documents:', error);
    }
  }
  
  deleteCheckoutDocuments();
