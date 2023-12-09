import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
const ShowTenant = () => {
  const [tenant, setTenant] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  let tenantDateCin = "";
  let tenantDateCout = "";
  useEffect(() => {
    // console.log(tenant == true);
    if (id) {
      setLoading(true);
      axios
        .get(`http://localhost:5555/tenants/${id}`)
        .then((response) => {
          console.log(response);
          setTenant(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [id]);

  tenantDateCin = tenant?.dateofCin;
  tenantDateCout = tenant?.dateofCout;

  if (tenantDateCin) {
    tenantDateCin = tenantDateCin.split("T")[0];
  }
  if (tenantDateCout) {
    tenantDateCout = tenantDateCout.split("T")[0];
  }
  // console.log(JSON.parse(JSON.stringify(tenant)));

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Tenant</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray 500">Id</span>
            <span>{tenant._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray 500">Name</span>
            <span>{tenant.name}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray 500">PhoneNum</span>
            <span>{tenant.phonenumber}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray 500">Email</span>
            <span>{tenant.email}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray 500">dateofCin</span>
            <span>{tenantDateCin}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray 500">dateofCout</span>
            <span>{tenantDateCout}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray 500">aptNum</span>
            <span>{tenant.aptNum}</span>
          </div>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link to={`/tenants/requests/${tenant._id}`}>Make Request</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowTenant;
