import {EntitySchema} from 'typeorm';
import Adapters from "next-auth/adapters"

const {model, schema} = Adapters.TypeORM.Models.User

export default new EntitySchema(schema)