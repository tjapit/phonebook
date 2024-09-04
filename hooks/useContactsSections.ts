import { ContactsSection } from "@/constants/models";
import { useAppDispatch, useAppSelector } from ".";
import { useEffect, useMemo } from "react";
import { fetchContacts } from "@/store/features/contacts/contactsSlice";

export function useContactsSections() {
  const dispatch = useAppDispatch();
  const {
    data = [], // handle empty data gracefully
    loading,
    error,
  } = useAppSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]); // added dispatch to dep array to avoid potential issues with stale closures

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
      {}, // use map instead of finding the section and pushing data into it
    );

    return Object.values(sectionsMap).sort((a, b) =>
      a.title.localeCompare(b.title),
    );
  }, [data]);

  return { contactsSections, loading, error };
}
