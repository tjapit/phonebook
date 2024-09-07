import { ContactsSection } from "@/constants/models";
import { useAppDispatch, useAppSelector } from ".";
import { useEffect, useState } from "react";
import { fetchContacts } from "@/store/features/contacts/contactsSlice";
import { filterContacts } from "@/utils";

export function useContactsSections() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.contacts);
  const [query, setQuery] = useState("");

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

      sections
        .sort((a, b) => a.title.localeCompare(b.title))
        .forEach((section) =>
          section.data.sort((a, b) => a.name.localeCompare(b.name)),
        );

      return query ? filterContacts(sections, query) : sections;
    },
    [],
  );

  const handleChangeQuery = (q: string): ContactsSection[] => {
    const qLowercase = q.toLowerCase();
    setQuery(qLowercase);
    return filterContacts(contactsSections, qLowercase);
  };

  return { contactsSections, loading, error, query, handleChangeQuery };
}
