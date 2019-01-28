/**
 * Created by ivan on 15.03.18.
 */
import { schema } from 'normalizr';

export const usersSchema = new schema.Entity('users', {}, { idAttribute: 'id' });
export const contactsSchema = new schema.Entity('contacts', {}, { idAttribute: 'id' });
export const conversationsSchema = new schema.Entity('conversations', {}, { idAttribute: 'id' });
