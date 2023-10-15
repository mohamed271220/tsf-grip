import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { fetchUser, fetchTransactions } from "../constants/Http";
import Avatar from "../assets/Avatar.png"
import LoadingSpinner from "../components/Loading/LoadingSpinner/LoadingSpinner";
import ErrorBlock from "../components/ErrorBlock";
import TransferModal from "../components/TransferModal";
import { useState } from "react";
const Customer = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleStartModal() {
    setIsModalOpen(true);
  }
  function handleCloseModal() {
    setIsModalOpen(false);
  }

  const { data: user, isLoading: userLoading, isError: userError, error: userErrorMsg, refetch:userRefetch } = useQuery({
    queryKey: ['customer', id],
    queryFn: ({ signal }) => fetchUser({ signal, id })
  })

  const { data: transactions, isLoading: transactionsLoading, isError: transactionsError, error: transactionsErrorMsg,refetch } = useQuery({
    queryKey: ['transactions', id],
    queryFn: ({ signal }) => fetchTransactions({ signal, id })
  })

  let content;
  if (userLoading) {
    content = <div className="flex justify-center items-center h-[80vh] w-full">
      <LoadingSpinner />
    </div>
  }
  if (userError) {
    content = (
      <ErrorBlock title={'Error'} message={userErrorMsg.message || 'Something went wrong. Please try again later.'} />
    );
  }

  if (user) {
    content = <>
      <div className="relative mb-[6vh] bg-gray-400 h-[40vh]">
        <img className="w-[30vh]  rounded-full border-2 border-white absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3  
   " src={Avatar} alt="" />
      </div>
      <div className="lg:text-[5vh] text-[3vh]  flex flex-col justify-center items-center">
        <p className="font-bold"> {user?.name}</p>
        <p className="font-bold text-[#00567a]"> ${user?.balance.toFixed(2)}</p>
        <p className="lg:text-[4vh] text-[2vh]"> {user?.email}</p>
        <p className="lg:text-[4vh] text-[2vh]"> {user?.socialId}</p>
      </div>
    </>
  }

  //table 
  let table
  if (transactionsLoading) {
    table = <div className="flex justify-center items-center h-[80vh] w-full">
      <LoadingSpinner />
    </div>
  }
  if (transactionsError) {
    table = (
      <ErrorBlock title={'Error'} message={transactionsErrorMsg.message || 'Something went wrong. Please try again later.'} />
    );
  }



  if (transactions && transactions?.length > 0) {
    table = <div className="overflow-x-auto text-[2vh] w-full flex flex-col gap-[5vh] p-[3vh]">
      <table className="">
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Amount</th>
        </tr>
        {transactions.map((transaction) => (
          <tr key={transaction._id}
            className="cursor-pointer">
            {/* <Link key={transaction._id} to={`/${transaction._id}`}> */}
            <td className={`${transaction.from === id ? 'text-[#00567a] font-bold' : ''}`}>{transaction.from}</td>
            <td className={`${transaction.to === id ? 'text-[#00567a] font-bold' : ''}`}>{transaction.to}</td>
            <td>{transaction.amount.toFixed(2)}</td>
            {/* </Link> */}
          </tr>
        ))}
      </table>
      <button className=' px-[4vh] py-[1vh] bg-orange-400 btn' onClick={handleStartModal}>Transfer Money Now</button>
    </div>
  }

  if (transactions?.length === 0) {
    table = <div className="flex flex-col gap-[5vh] justify-center items-center h-[40vh] w-full">
      <h1 className="text-[#00567a] font-sans font-bold lg:text-[5vh] text-[3vh] ">No transactions yet</h1>
      <button className=' px-[4vh] py-[1vh] bg-orange-400 btn' onClick={handleStartModal} >Transfer Money Now</button>
    </div>
  }


  return (
    <div className="flex flex-col gap-[5vh]">
      {isModalOpen && <TransferModal userRefetch={userRefetch} id={id} refetch={refetch} onClose={handleCloseModal} />}
      {content}
      {table}
    </div>
  )
}

export default Customer