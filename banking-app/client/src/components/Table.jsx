import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react"
import { fetchUsers } from "../constants/Http";

import { FaSearch } from "react-icons/fa";
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
            <table className="w-full text-[2vh]">
                <tr>
                    <th>Username</th>
                    <th>Balance</th>
                    <th>Email</th>
                </tr>
                {data.map((user) => (
                    <tr key={user._id} onClick={() => window.location.href = `/${user._id}`}
                        className="cursor-pointer">
                        {/* <Link key={user._id} to={`/${user._id}`}> */}
                        <td>{user.name}</td>
                        <td>{user.balance}</td>
                        <td>{user.email}</td>
                        {/* </Link> */}
                    </tr>
                ))}
            </table>
        );
    }

    return (
        <div id="customers" className="px-[6vh] flex flex-col justify-center items-center w-full overflow-x-auto">
            <h1 className="text-[#00567a] font-sans font-bold text-[6vh]">Our Renowned Customers</h1>
            <header className="w-full">
                <form onSubmit={handleSubmit} id="search-form" className="relative mb-[3vh]" >
                    <input
                        type="search"
                        placeholder="Search users"
                        ref={searchElement}
                        className="w-full h-[6vh]
                        rounded-lg border-2 border-[#00567a] pl-[3vh] pr-[10vh] font-sans font-bold text-[2vh] focus:outline-none
                        "
                    />
                    <button className="absolute top-0 right-0 bg-[#00567a] text-white h-[6vh] w-[4vh] rounded-tr-lg rounded-br-lg font-sans font-bold text-[2vh] hover:bg-[#005b4a] transition-all duration-300 ease-in-out flex justify-center items-center"><FaSearch /></button>
                </form>
            </header>
            {content}
        </div>
    )
}

export default Table