import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "u5copk5q",
  dataset: "production",
  useCdn: true,
  apiVersion: "2025-01-13",
  token:
    "sksDLrdri80UXDpEXW7saLmKpsyzkkJM94KycCtC7cWrE5pxvtshPXlpHzg9wlErzMYW19S3xacgjSFqTEapLYABjT6dCcnz3SrKrHGEMqeOxINnvHGSIJhKhcqbpOx3KXscyf6WEM5faZXuoQStlXkLh1QtiGvzZD7ZLjdoVccPrbWOYSpG",
});

// migration script
async function uploadImageToSanity(imagePath) {
  try {
    console.log(`Uploading image: ${imagePath}`);

    const response = await fetch(imagePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${imagePath}`);
    }

    const buffer = await response.arrayBuffer();
    const bufferImage = Buffer.from(buffer);

    const asset = await client.assets.upload("image", bufferImage, {
      filename: imagePath.split("/").pop(),
    });

    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error("Failed to upload image:", imagePath, error);
    return null;
  }
}

async function uploadProduct(product) {
  try {
    const imageId = await uploadImageToSanity(product.imagePath);

    if (imageId) {
      const document = {
        _type: "product",
        id: product.id,
        name: product.name,
        price: product.price,
        imagePath: {
          _type: "image",
          asset: {
            _ref: imageId,
          },
        },
        discountPercentage: product.discountPercentage,
        description: product.description,
        category: product.category,
        stockLevel: product.stockLevel,
      };

      const createdProduct = await client.create(document);
      console.log(
        `Product ${product.name} uploaded successfully:`,
        createdProduct
      );
    } else {
      console.log(
        `Product ${product.name} skipped due to image upload failure.`
      );
    }
  } catch (error) {
    console.error("Error uploading product:", error);
  }
}
// Api integration
async function importProducts() {
  try {
    // Fetch products from two different URLs concurrently
    const [response1, response2] = await Promise.all([
      fetch("https://template-0-beta.vercel.app/api/product"),
      fetch("https://678d1855f067bf9e24e93f90.mockapi.io/id") // Second URL here
    ]);

    // Check if both responses are ok
    if (!response1.ok) {
      throw new Error(`HTTP error for URL 1! Status: ${response1.status}`);
    }
    if (!response2.ok) {
      throw new Error(`HTTP error for URL 2! Status: ${response2.status}`);
    }

    // Parse both responses to JSON
    const products1 = await response1.json();
    const products2 = await response2.json();

    // Combine products from both sources
    const allProducts = [...products1, ...products2];

    // Upload each product
    for (const product of allProducts) {
      await uploadProduct(product);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

importProducts();
// END

// async function importProducts() {
//   try {
//     const response = await fetch(
//       "https://template-0-beta.vercel.app/api/product"
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const products = await response.json();

//     for (const product of products) {
//       await uploadProduct(product);
//     }
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// }

// importProducts();

// import { createClient } from '@sanity/client';

// const client = createClient({
//   projectId: "u5copk5q",
//   dataset: "production",
//   useCdn: true,
//   apiVersion: '2025-01-13',
//   token: "sksDLrdri80UXDpEXW7saLmKpsyzkkJM94KycCtC7cWrE5pxvtshPXlpHzg9wlErzMYW19S3xacgjSFqTEapLYABjT6dCcnz3SrKrHGEMqeOxINnvHGSIJhKhcqbpOx3KXscyf6WEM5faZXuoQStlXkLh1QtiGvzZD7ZLjdoVccPrbWOYSpG"
// });

// async function deleteAllProducts() {
//   try {
//     // Get all product documents
//     const products = await client.fetch('*[_type == "product"]')

//     if (products.length === 0) {
//       console.log('No products found to delete.')
//       return
//     }

//     // Deleting each product
//     const deletePromises = products.map(product =>
//       client.delete(product._id)
//     )

//     // Wait for all deletions to complete
//     await Promise.all(deletePromises)
//     console.log(`Deleted ${products.length} products.`)
//   } catch (error) {
//     console.error('Error deleting products:', error)
//   }
// }

// deleteAllProducts()
