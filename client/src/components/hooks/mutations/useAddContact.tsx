import {useMutation} from "@tanstack/react-query";
import {useState} from "react";
import {createContact} from "@/components/api/userApi";
import useModalContext from "@/components/context/modalContext";
import errorHandler from "@/components/utils/EHandler";
import useContactsContext from "@/components/context/ContactContext";
const useAddContactMutation = () => {
  const {closeModal} = useModalContext();
  const {addContact} = useContactsContext();
  const [error, setError] = useState("");

  const {mutate, isLoading} = useMutation((username: string) => createContact(username), {
    onSuccess: (response) => {
      addContact(response.contact);
      closeModal();
    },
    onError: (error) => {
      setError(errorHandler(error));
    },
  });

  return {mutate, error, isLoading};
};

export default useAddContactMutation;