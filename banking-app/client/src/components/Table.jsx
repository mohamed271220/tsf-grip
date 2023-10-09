import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react"
import { fetchUsers } from "../constants/Http";
import { Link } from "react-router-dom";

const Table = () => {
    const searchElement = useRef();
    const [search, setSearch] = useState()

    const { data, isLoading, isError, error } = useQuery({
        queryKey: [
            "events",
            {
                search: search,
            },
        ],
        // controlled function pass
        queryFn: ({ signal }) => fetchUsers({ signal, searchTerm: search }),
        //not to send the query immediately

    })

    function handleSubmit(event) {
        event.preventDefault();
        setSearch(searchElement.current.value);
    }
    let content
    if (isLoading) {
        content = <p>loading</p>;
    }
    if (isError) {
        content = (
            <p
            >An error occurred while fetching the events {error.message}</p>
        );
    }

    if (data) {
        console.log(data);
        content = (
            <ul className="">
                {data.map((user) => (
                    <li key={user._id}>
                        <Link to={`/${user._id}`}>
                            {user.name}
                        </Link>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div>
            <header>

                <form onSubmit={handleSubmit} id="search-form">
                    <input
                        type="search"
                        placeholder="Search events"
                        ref={searchElement}
                    />
                    <button>Search</button>
                </form>
            </header>
            {content}
        </div>
    )
}

export default Table