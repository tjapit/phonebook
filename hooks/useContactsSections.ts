import { ContactsSection } from "@/constants/models";
import { useAppDispatch, useAppSelector } from ".";
import { useEffect } from "react";
import { fetchContacts } from "@/store/features/contacts/contactsSlice";

export function useContactsSections() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state) => state.contactsList,
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  const contactsSections = data.reduce<ContactsSection[]>(
    (sections, contact) => {
      const firstLetter = contact.name[0].toUpperCase();
      let section = sections.find((sec) => sec.title === firstLetter);

      if (!section) {
        section = { title: firstLetter, data: [] };
        sections.push(section);
      }

      section.data.push(contact);

      return sections;
    },
    [],
  );

  contactsSections.sort((a, b) => a.title.localeCompare(b.title));

  return { contactsSections, loading, error };
}
