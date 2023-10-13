import { useRef, useState } from "react";
import ErrorBlock from "./ErrorBlock";
import LoadingSpinner from "./Loading/LoadingSpinner/LoadingSpinner";
import Modal from "./Modal";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../constants/Http";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const TransferModal = ({ onClose, id }) => {

    const [amountValue, setAmountValue] = useState('');
    const searchElement = useRef();
    const amount = useRef();
    const [search, setSearch] = useState()
    // the to and the id is the from
    const [selectedRow, setSelectedRow] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
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

    function handleSubmit(event) {
        event.preventDefault();
        setSearch(searchElement.current.value);
    }

    const handleTransfer = async (event) => {
        event.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post('/api/transactions', {
                amount: amount.current.value,
                from: id,
                to: selectedRow
            })
            setLoading(false)
            if (response.status === 200) {
                onClose()

            }
        } catch (err) {
            setLoading(false)
            console.log(err);
        }

    }

    if (data) {
        console.log(data);
        content = (
            <table className="">
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Balance</th>
                    <th>Email</th>
                </tr>
                {data.filter((user) => user._id !== id).map((user)=> (
                    <tr key={user._id} onClick={() => setSelectedRow(user._id)}
                        className="cursor-pointer">
                        <td>
                            <input type="checkbox" checked={selectedRow === user._id} onChange={() => { }} />
                        </td>
                        <td>{user.name}</td>
                        <td>{user.balance}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
            </table>

        );
    }



    return (
        <Modal onClose={onClose}>
            {loading ? <div className="flex justify-center items-center h-[80vh] w-full">
                <LoadingSpinner asOverlay />
            </div> :
                <div id="customers" className="px-[6vh] flex flex-col  overflow-auto w-full h-[100vh] ">
                    <h1 className="text-[#00567a] font-sans font-bold md:text-[4vh]
                text-[2.5vh] ">Transfer Money To</h1>
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
                    <div className="overflow-auto text-[2vh] w-full ">
                        {content}
                    </div>
                    <div id='action' className=" flex flex-col  mt-[3vh]">
                        <label htmlFor="amount" className="text-[#00567a] font-sans font-bold md:text-[2.5vh]
                text-[1.5vh] ">Amount of payment</label>
                        <input type="number" ref={amount} value={amountValue} onChange={(e) => setAmountValue(e.target.value)} className="w-full h-[6vh] rounded-lg border-2 border-[#00567a] pl-[3vh] pr-[10vh] font-sans font-bold text-[2vh] focus:outline-none" placeholder="999.99 (min 100)" id="amount" name="amount" required pattern="[0-9]*" step="0.01" min="100" />
                        <br />
                        <button onClick={handleTransfer} disabled={!selectedRow || amountValue === '' || amountValue === '0'} className="bg-[#00567a] text-white h-[6vh] w-[10vh] rounded-lg font-sans font-bold text-[2vh] hover:bg-[#005b4a] transition-all duration-300 ease-in-out flex justify-center items-center disabled:cursor-not-allowed disabled:bg-slate-300">
                            Transfer
                        </button>

                        <p className="text-red-500 text-[1vh]">{errorMsg}</p>

                    </div>
                </div>
            }
        </Modal>
    )
}

export default TransferModal