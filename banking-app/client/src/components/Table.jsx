import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react"
import { fetchUsers } from "../constants/Http";

import { FaSearch } from "react-icons/fa";
import ErrorBlock from "./ErrorBlock";
import LoadingSpinner from '../components/Loading/LoadingSpinner/LoadingSpinner'
const Table = () => {
    const searchElement = useRef();
    const [search, setSearch] = useState()

    const { data, isLoading, isError, error } = useQuery({
        queryKey: [
            "customers",
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
        content = <div className="flex justify-center items-center h-[80vh] w-full">
            <LoadingSpinner />
        </div>
    }
    if (isError) {
        content = (
            <ErrorBlock title={'Error'} message={error.message || 'Something went wrong. Please try again later.'} />
        );
    }

    if (data) {
        console.log(data);
        content = (

            <table className="">
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
        <div id="customers" className="px-[6vh] flex flex-col  overflow-x-auto w-full">
            <h1 className="text-[#00567a] font-sans font-bold text-[6vh]">Our Renowned Customers</h1>
            <header className="w-full">
                <form onSubmit={handleSubmit} id="search-form" className="relative my-[3vh]" >
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
            <div className="overflow-x-auto text-[2vh] w-full ">

                {content}
            </div>
        </div>
    )
}

export default Table