import { Contact } from "expo-contacts";

export function getBirthday(contact: Contact): string | undefined {
  if (!contact.birthday) return undefined;
  const day = contact.birthday.day;
  const month = contact.birthday.month;
  const year = contact.birthday.year;
  if (!day || !month || !year) return undefined;

  const birthdayString = `${year}-${month}-${day}`;
  return new Date(birthdayString).toLocaleDateString();
}

export function filterContacts(contacts: Contact[], q: string): Contact[] {
  if (q === "") return contacts;

  const qLowercase = q.toLowerCase();
  const res = contacts.filter((contact) => contact.name.includes(qLowercase));

  return res;
}
