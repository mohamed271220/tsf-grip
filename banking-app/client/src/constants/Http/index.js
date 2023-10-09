import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();


export async function fetchUsers({ signal, searchTerm, max }) {
    console.log(searchTerm);
    let url = "http://localhost:8080/api";

    if (searchTerm && max) {
        url += "?search=" + searchTerm + "&max=" + max;
    } else if (searchTerm) {
        url += "?search=" + searchTerm;
    } else if (max) {
        url += "?max=" + max;
    } else {
        url = "http://localhost:8080/api";
    }

    const response = await fetch(url, { signal: signal });

    if (!response.ok) {
        const error = new Error("An error occurred while fetching the users");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const {users} = await response.json();

    return users;
}