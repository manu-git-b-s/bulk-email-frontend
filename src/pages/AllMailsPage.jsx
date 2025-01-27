import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader";

const AllMailsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [allMails, setAllMails] = useState([]);

  // fetching all mails sent by user
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios.post(
        "http://3.86.235.191/api/mail/all-mails",
        {
          email: userInfo.email,
        }
      );
      if (res.status === 200) {
        setIsLoading(false);
        setAllMails(res.data.data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <h3 className="my-5">Total mails sent by user:{allMails.length}</h3>
      <h1 className="my-5 text-center">
        All mails created by {userInfo.username}
        {isLoading && <Loader />}
      </h1>
      <table className="table table-striped w-100">
        <thead>
          <tr>
            <th>Date</th>
            <th>Recipients</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {allMails.map((item, index) => (
            <tr className="w-100" key={index}>
              <td>{format(new Date(item.createdAt), "dd/MM/yyyy")}</td>
              <td>{item.recipients}</td>
              <td>{item.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllMailsPage;
