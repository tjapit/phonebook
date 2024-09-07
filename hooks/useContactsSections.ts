import { ContactsSection } from "@/constants/models";
import { useAppDispatch, useAppSelector } from ".";
import { useCallback, useMemo, useState } from "react";
import { fetchContacts } from "@/store/features/contacts/contactsSlice";
import { filterContacts } from "@/utils";
import { useFocusEffect } from "expo-router";

export function useContactsSections() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.contacts);
  const [query, setQuery] = useState("");

  const refetch = useCallback(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useFocusEffect(refetch);

  // useMemo to avoid recalculating on every render unless data changes
  const contactsSections = useMemo(() => {
    const sectionsMap = data.reduce<Record<string, ContactsSection>>(
      (map, contact) => {
        const firstLetter = contact.name[0].toUpperCase();

        if (!map[firstLetter]) {
          map[firstLetter] = { title: firstLetter, data: [] };
        }
        map[firstLetter].data.push(contact);

        return map;
      },
      {},
    ); // use map instead of finding the section and pushing data into it

    const sections = Object.values(sectionsMap).sort((a, b) =>
      a.title.localeCompare(b.title),
    ); // sort by section
    sections.forEach((section) =>
      section.data.sort((a, b) => a.name.localeCompare(b.name)),
    ); // sort by name within the section

    return query ? filterContacts(sections, query) : sections;
  }, [data, query]);

  const handleChangeQuery = (q: string): ContactsSection[] => {
    const qLowercase = q.toLowerCase();
    setQuery(qLowercase);
    return filterContacts(contactsSections, qLowercase);
  };

  return {
    contactsSections,
    loading,
    error,
    refetch,
    query,
    handleChangeQuery,
  };
}
