import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Header from "../Header";

import Copyofdispora from "../../assets/img/Copy of Dispora (1) 1.png";
import { useSelector } from "react-redux";

const DashboardPemuda = () => {
  return (
    <>
      <div>
        <Header />
      </div>

      {/* content */}
      <div
        className="grid grid-cols-2 place-items-center place-content-center gap-4
       py-30 mx-10"
      >
        <button className="px-20">
          <Link to={"/add-berita-pemuda"}>
            <img src={Copyofdispora} alt="" />
            <p className="text-xl font-semibold">
              Berita dan Pengumuman Pemuda
            </p>
          </Link>
        </button>

        <button className="px-20">
          <Link to={"/add-program-pemuda"}>
            <img src={Copyofdispora} alt="" />
            <p className="text-xl font-semibold">Program Pemuda</p>
          </Link>
        </button>

        <button className="px-20">
          <Link to={"/data-pendaftar-pemuda"}>
            <img src={Copyofdispora} alt="" />
            <p className="text-xl font-semibold">Program Beasiswa</p>
          </Link>
        </button>
      </div>
      {/* content end */}
      {/* <!-- Logout --> */}
      <div className="flex justify-end mt-[-90px] mr-6">
        <Link to={"/login"}>
          <button className="bg-red-700 py-2 px-10 text-white rounded-lg">
            Logout
          </button>
        </Link>
      </div>
    </>
  );
};

export default DashboardPemuda;
