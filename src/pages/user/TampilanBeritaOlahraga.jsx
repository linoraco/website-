import React, { useEffect, useState } from "react";
import Navbar from "../../components/ComponenRespon/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import Config from "../../config/config.js";

const TampilanBeritaOlahraga = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [beritas, setBerita] = useState([]);

  const getBeritaOlahraga = async () => {
    try {
      const response = await axios.get(`${Config.ipPUBLIC}/beritaolahraga`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.data);
    }
  };

  useEffect(() => {
    getBeritaOlahragaById(id);
  }, [id]);

  const getBeritaOlahragaById = async (id) => {
    try {
      const response = await axios.get(
        `${Config.ipPUBLIC}/beritaolahraga/${id}`
      );
      setBerita(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("berita_olahraga", beritas);

  useEffect(() => {
    getBeritaOlahraga();
  }, []);
  return (
    <div className="flex-col ">
      {/* <!-- navbar --> */}
      <Navbar />
      {/* <!-- navbar end --> */}

      {/* <!-- Content --> */}
      <div className="flex justify-center pb-10 ">
        <h1 className="text-lg mt-20 sm:text-xl md:text-2xl lg:mx-56 md:mx-40 sm:mx-24 min-[320px]:mx-auto  lg:text-3xl text-center">
          {" "}
          {beritas && beritas.judul_berita_olahraga}
        </h1>
      </div>

      <hr className="mx-[10%]" />

      <div className=" mx-[10%] md:mx-[15%] lg:mx-[20%]  ">
        <p className="text-sm sm:text-[16px]   mt-1 w-auto text-justify text-[#888888]">
          Author : {beritas && beritas.nama_pembuat_berita_olahraga}
        </p>
        <p className="text-sm sm:text-[16px]  mt-1 w-auto text-justify text-[#888888]  ">
          {" "}
          {beritas && beritas.tanggal_berita_olahraga}
        </p>
        <img
          className="py-10 rounded-lg min-[319px]:mx-0 w-[1250px]"
          src={beritas && beritas.URL}
          alt=""
        />
      </div>

      <div className="mx-[10%] pb-20 md:mx-[15%] lg:mx-[20%]  ">
        <p className="min-[320px]:text-[10px] mx-auto leading-normal  sm:text-sm  md:text-lg   mt-1 text-justify">
          {" "}
          {beritas && beritas.isi_berita_olahraga}
        </p>
      </div>
      {/* <!-- content end --> */}

      {/* <!-- footer --> */}
      <Footer />
      {/* <!-- footer end --> */}
    </div>
  );
};

export default TampilanBeritaOlahraga;
