import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const MonthlyMails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [monthlyData, setMonthlyData] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);

  // fetching monthly mails data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let res = await axios.post(
        "https://bulk-email-backend-mnvn.onrender.com/api/mail/monthly-mails",
        {
          email: userInfo.email,
        }
      );
      if (res.status === 200) {
        setIsLoading(false);
        setMonthlyData(res.data.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h3 className="my-5">
        Total mails sent by {userInfo.username} this month: {monthlyData.length}
      </h3>
      <h1 className="my-5 text-center">
        Mails sent by {userInfo.username} this month
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
          {monthlyData.map((item, index) => (
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

export default MonthlyMails;
