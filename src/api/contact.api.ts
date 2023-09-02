import client from "@/config/apolloClient";
import { ApolloQueryResult, FetchResult, gql } from "@apollo/client";

export type Contact = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  message: string;
  phone: string;
  website: string;
};

export type ContactParams = Partial<{
  limit: number;
  p: number;
  sortBy: string;
  sortType: string;
  keyword: string;
}>;

export type ContactsInput = {
  contactsInput: ContactParams;
};

export type Contacts = {
  contacts: Contact[];
  count: number;
  totalPages: number;
};

export type ContactsResponse = {
  contacts: Contacts;
};

export type DeleteContactsResponse = {
  deleteContacts: boolean;
};

export const CONTACTS = gql`
  query Query($contactsInput: ContactsInput) {
    contacts(contactsInput: $contactsInput) {
      contacts {
        _id
        email
        firstName
        lastName
        phone
        message
        createdAt
      }
      totalPages
      count
    }
  }
`;

export const DELETE_CONTACTS = gql`
  mutation Mutation($idList: [String]) {
    deleteContacts(idList: $idList)
  }
`;

export const contactApi = {
  contacts: async (params?: ContactParams): Promise<Contacts> => {
    try {
      const { data }: ApolloQueryResult<ContactsResponse> = await client.query({
        query: CONTACTS,
        variables: {
          contactsInput: params || {},
        },
      });
      if (data) return data.contacts;
    } catch (error) {}
    return {
      contacts: [],
      count: 0,
      totalPages: 0,
    };
  },
  deleteMany: async (idList: string[]): Promise<boolean> => {
    try {
      const { data }: FetchResult<DeleteContactsResponse> = await client.mutate(
        {
          mutation: DELETE_CONTACTS,
          variables: {
            idList,
          },
        }
      );
      if (data) return data.deleteContacts;
    } catch (error) {}
    return false;
  },
};
