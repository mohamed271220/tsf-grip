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

    const { users } = await response.json();

    return users;
}

export async function fetchUser({ signal, id }) {
    let url = "http://localhost:8080/api/" + id;
    const response = await fetch(url, { signal: signal });


    if (!response.ok) {
        const error = new Error("An error occurred while fetching the users");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { user } = await response.json();

    return user;
}

// get transactors by id of a certain user
export async function fetchTransactions({ signal, id }) {
    let url = 'http://localhost:8080/api/transactions/' + id
    const response = await fetch(url, { signal: signal });

    if (!response.ok) {
        const error = new Error("An error occurred while fetching the transactions");
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const { transactions } = await response.json();

    return transactions;
}