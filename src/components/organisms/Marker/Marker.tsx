import React from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import { useAppDispatch } from "../../../hooks/useRedux";
import { ansimInfoAction } from "../../../toolkit/ansim/ansimInfoSlice";
import { isOpenTrigger } from "../../../toolkit/isOpen/isOpenSlice";
import { IAnsimInfo } from "../../template/interface/IndexTemplate.interface";

interface IProps {
  ansim: IAnsimInfo;
}

const Marker = ({ ansim }: IProps) => {
  const dispatch = useAppDispatch();

  const isOpenAction = (type: "isSearch" | "isAnsimInfo", boolean: boolean) => {
    dispatch(isOpenTrigger({ [type]: boolean }));
  };

  return (
    <MapMarker
      position={{ lat: ansim.lcinfoLa, lng: ansim.lcinfoLo }}
      onClick={() => {
        dispatch(ansimInfoAction(ansim));
        isOpenAction("isAnsimInfo", true);
      }}
    />
  );
};

export default Marker;
