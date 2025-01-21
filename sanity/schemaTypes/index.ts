import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import checkout from './checkout'
import users from './users'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,checkout,users],
}
