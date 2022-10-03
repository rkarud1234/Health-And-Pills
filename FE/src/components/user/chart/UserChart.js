import { useEffect } from "react";
import { client } from "../../../api";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import React from "react";
import { useState } from "react";
import Loading from "../../layouts/Loading";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const UserChart = () => {
  const [inbodyAvg, setInbodyAvg] = useState({ isLoading: true });
  const {
    userProfileHeight,
    userProfileWeight,
    userProfileFat,
    userProfileSkeleton,
    userProfileWater,
  } = useSelector((state) => state.user.data);
  const getInbodyAvg = async () => {
    const res = await client
      .get("/users/inbody")
      .then((response) => response.data);
    setInbodyAvg({ ...res, isLoading: false });
  };
  useEffect(() => {
    getInbodyAvg();
  }, []);

  const data = {
    labels: ["키", "몸무게", "골격근량", "체지방량", "체수분량"],
    datasets: [
      {
        label: "내 인바디",
        data: [
          userProfileHeight,
          userProfileWeight,
          userProfileFat,
          userProfileSkeleton,
          userProfileWater,
        ],
        fill: true,
        backgroundColor: "rgb(210 218 255 / 80%)",
        borderColor: "rgb(210 218 255 / 80%)",
        pointBackgroundColor: "rgb(210 218 255)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(210 218 255)",
      },
      {
        label: "사용자 평균 인바디",
        data: [
          inbodyAvg.userProfileHeight,
          inbodyAvg.userProfileWeight,
          inbodyAvg.userProfileFat,
          inbodyAvg.userProfileSkeleton,
          inbodyAvg.userProfileWater,
        ],
        fill: true,
        backgroundColor: "rgb(255 235 173 / 50%)",
        borderColor: "rgb(255 235 173 / 50%)",
        pointBackgroundColor: "rgb(255 235 173)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255 235 173)",
      },
    ],
  };

  return inbodyAvg.isLoading ? (
    <>
      <Loading />
    </>
  ) : (
    <div>{<Radar data={data} />}</div>
  );
};

export default React.memo(UserChart);
