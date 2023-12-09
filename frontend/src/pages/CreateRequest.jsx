import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
//Auto fill NAME & APT-NUMBER

const createRequest = () => {
  const [tenant, setTenant] = useState({});
  const [name, setName] = useState("");
  const [aptNum, setaptNum] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [date_time, setdateTime] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

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

  const handleSaveRequest = () => {
    const data = {
      name,
      aptNum,
      area,
      description,
      date_time,
      status,
    };
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;

    data.name = tenant.name;
    data.aptNum = tenant.aptNum;
    data.area = area;
    data.description = description;
    data.status = false;
    data.date_time = currentDate;

    // console.log(data);
    setLoading(true);
    axios
      .post("http://localhost:5555/requests", data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occured. Please check Console");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton destination={`/tenants/details/${tenant._id}`} />
      <h1 className="text-3xl my-4">Add Request</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">
            Name: {tenant.name}
          </label>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">
            Apt Number: {tenant.aptNum}
          </label>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Area</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="border-2 border-gray-500 px-4 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            cols="50"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-500 px-4 w-full"
          ></textarea>
        </div>

        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveRequest}>
          Save
        </button>
      </div>
    </div>
  );
};

export default createRequest;
