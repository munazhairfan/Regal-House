import { defineType } from "sanity"

export default defineType({
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        {
            name: "id",
            title: "ID",
            validation: (rule) => rule.required(),
            type: "string"
        },
        {
            name: "name",
            title: "Name",
            validation: (rule) => rule.required(),
            type: "string"
        },
        {
            name:"description",
            type:"text",
            validation: (rule) => rule.required(),
            title:"Description",
        },
        {
            name: "imagePath",
            type: "image",
            validation: (rule) => rule.required(),
            title: "Image Path"
        },
        {
            name: "price",
            type: "string",
            validation: (rule) => rule.required(),
            title: "Price",
        },
        {
            name:"discountPercentage",
            type:"number",
            title:"Discount Percentage",
        },
        {
            name:"category",
            type:"string",
            title:"Category",
        },
        {
            name: 'isFeaturedProduct',
            title: 'Is Featured Product',
            type: 'boolean',
          },
        {
            name: 'stockLevel',
            title: 'Stock Level',
            type: 'number',
        },
      
    ]
})