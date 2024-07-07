import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../Header";
import config from "../../config/config.js";

const EditProgramOlahraga = () => {
  const [title, setTitle] = useState([]);
  const [file, setFile] = useState([]);
  const [kontak, setKontak] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [preview, setPreview] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getProgramOlahragaById(id);
  }, [id]);

  const getProgramOlahragaById = async (id) => {
    try {
      const response = await axios.get(
        `${config.ipPUBLIC}/programolahraga/${id}`
      );

      setTitle(response.data.nama_program_olahraga);
      setKontak(response.data.kontak_admin_program_olahraga);
      setAdmin(response.data.nama_pembuat_program_olahraga);
      setFile(response.data.gambar_program_olahraga);
      setPreview(response.data.URL);
    } catch (error) {
      console.log(error);
    }
  };

  const [openModal, setOpenModal] = useState(false);
  let navigate = useNavigate();

  const loadImage = async (e) => {
    const gambar_program = e.target.files[0];
    setFile(gambar_program);
    setPreview(URL.createObjectURL(gambar_program));
  };

  const updateProgramOlahraga = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nama_program_olahraga", title);
    formData.append("nama_pembuat_program_olahraga", admin);
    formData.append("kontak_admin_program_olahraga", kontak);
    try {
      await axios.patch(`${config.ipPUBLIC}/programolahraga/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/add-program-olahraga-kadis");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex-col">
      {/* <!-- navbar --> */}
      <Header />
      {/* <!-- navbar end -->  */}
      <div className="flex justify-between">
        <Link to={"/add-program-olahraga-kadis"}>
          <p className="flex items-start justify-center bg-red-500 w-[80px] p-3 rounded-br-xl">
            Kembali
          </p>
        </Link>
        <Link to={"/home-admin-kadis"}>
          <p className="flex items-start justify-center bg-red-500 w-[80px] p-3 rounded-bl-xl">
            Beranda
          </p>
        </Link>
      </div>

      <div className="mx-auto">
        <h1 className="text-lg mt-20 sm:text-xl md:text-2xl  lg:text-3xl text-center">
          Program Olahraga
        </h1>
      </div>

      {/* form prgram star */}
      <form
        onSubmit={updateProgramOlahraga}
        className="flex flex-col mx-[5%] sm:mx-[10%] md:mx-[15%]  lg:mx-[20%] mt-10 "
      >
        <label className="p-2  text-md sm:text-md md:text-lg lg:text-xl" for="">
          Logo Program
        </label>
        <input
          onChange={loadImage}
          className="mt-4"
          type="file"
          name=""
          id=""
        />

        {preview ? (
          <figure className="img ">
            <img src={preview} alt="Preview img" />
          </figure>
        ) : (
          ""
        )}

        <label className="mt-4 text-md sm:text-md md:text-lg lg:text-xl" for="">
          Judul
        </label>
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-black p-1 h-24 rounded-xl my-4 text-xs sm:text-sm md:text-md lg:text-lg"
          type="text"
        />

        <label
          className="mt-10 text-md sm:text-md md:text-lg lg:text-xl"
          for=""
        >
          Nama Pembuat Berita Pemuda
        </label>
        <input
          value={admin}
          onChange={(e) => setAdmin(e.target.value)}
          className="border-2 p-1 border-black  rounded-xl my-4 text-xs sm:text-sm md:text-md lg:text-lg"
          type="text"
          name=""
          id=""
        />

        <label
          className="mt-10 text-md sm:text-md md:text-lg lg:text-xl"
          for=""
        >
          Kontak Admin
        </label>
        <input
          value={kontak}
          onChange={(e) => setKontak(e.target.value)}
          className="border-2 p-1 border-black  rounded-xl my-4 text-xs sm:text-sm md:text-md lg:text-lg"
          type="text"
          name=""
          id=""
          placeholder="Contoh: https://wa.me/082348135155"
        />
        <button
          type="submit"
          value=""
          className="flex justify-center bg-green-500 py-3  rounded-xl my-10"
        >
          Update
        </button>
      </form>
      {/* Popup Massage */}
      <div>
        <div
          id="popup-modal"
          tabIndex="-1"
          className={`${
            openModal ? "flex" : "hidden"
          } fixed top-0 left-0 right-0 z-50 justify-center items-center  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <div className="p-6 text-center">
                <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">
                  Program Olahraga Berhasil Ditambahkan
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProgramOlahraga;
