import { ContactsSection } from "@/constants/models";
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

export function filterContacts(
  sections: ContactsSection[],
  q: string,
): ContactsSection[] {
  if (q === "") return sections;

  const qLowercase = q.toLowerCase();
  const res = sections
    .map((section) => ({
      ...section,
      data: section.data.filter((contact) =>
        contact.name.toLowerCase().includes(qLowercase),
      ),
    }))
    .filter((section) => section.data.length > 0);

  return res;
}
