import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [tenants, setTenants] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/tenants")
      .then((response) => {
        setTenants(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/requests")
      .then((response) => {
        setRequests(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // const handleStatusUpdate = async (requestId) => {
  //   try {
  //     setLoading(true);

  //     // Send a PUT request to update the status
  //     await axios.put(`http://localhost:5555/requests/${requestId}`, {
  //       status: "Completed",
  //     });

  //     // Fetch the updated requests data
  //     const response = await axios.get("http://localhost:5555/requests");
  //     setRequests(response.data.data);

  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //     setLoading(false);
  //   }
  // };

  // const handleSearch = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  // // Filter requests based on search query
  // const filteredRequests = requests.filter((request) =>
  //   request.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );


  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Tenants List</h1>
        <Link to="/tenants/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Name</th>
              <th className="border border-slate-600 rounded-md">
                phonenumber
              </th>
              <th className="border border-slate-600 rounded-md">Email</th>
              <th className="border border-slate-600 rounded-md">DateofCin</th>
              <th className="border border-slate-600 rounded-md">DateofCout</th>
              <th className="border border-slate-600 rounded-md">AptNum</th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant, index) => (
              <tr key={tenant._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {tenant.name}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {tenant.phonenumber}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {tenant.email}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {tenant.dateofCin}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {tenant.dateofCout}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {tenant.aptNum}
                </td>
                <td className="border border-slate-7s00 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/tenants/details/${tenant._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/tenants/edit/${tenant._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/tenants/delete/${tenant._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Request List</h1>
        <input
          type="text"
          placeholder="Search by name, date created, apt Number, Status"
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Name</th>
              <th className="border border-slate-600 rounded-md">
                Date Created
              </th>
              <th className="border border-slate-600 rounded-md">
                Description
              </th>
              <th className="border border-slate-600 rounded-md">AptNum</th>
              <th className="border border-slate-600 rounded-md">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={index} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {request.name}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {request.date_time}
                </td>

                <td className="border border-slate-700 rounded-md text-center">
                  {request.description}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {request.aptNum}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {request.status ? "Completed" : "Pending"}
                </td>

                <td className="border border-slate-7s00 rounded-md text-center">
                  <button onClick={() => handleStatusUpdate(request._id)}>Update Status</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
