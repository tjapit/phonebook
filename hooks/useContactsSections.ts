import { ContactsSection } from "@/constants/models";
import { useAppDispatch, useAppSelector } from ".";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchContacts } from "@/store/features/contacts/contactsSlice";
import { filterContacts } from "@/utils";
import { useFocusEffect } from "expo-router";
import { Contact } from "expo-contacts";

export function useContactsSections() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.contacts);
  const [filteredData, setFilteredData] = useState<Contact[]>([]);
  const [query, setQuery] = useState("");

  const refetch = useCallback(() => {
    dispatch(fetchContacts());
    setFilteredData(data);
  }, [dispatch]);

  useFocusEffect(refetch);

  useEffect(() => {
    if (data.length > 0) setFilteredData(data);
  }, [data]);

  // useMemo to avoid recalculating on every render unless data changes
  const contactsSections = useMemo(() => {
    const sectionsMap = filteredData.reduce<Record<string, ContactsSection>>(
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

    // return sections;
    return Object.values(sectionsMap);
  }, [filteredData]);

  const handleChangeQuery = (q: string) => {
    const qLowercase = q.toLowerCase();
    setQuery(qLowercase);
    setFilteredData(filterContacts(data, qLowercase));
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
