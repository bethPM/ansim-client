import React from "react";
import { useAppSelector } from "../../../hooks/useRedux";
import { selectAnsimInfo } from "../../../toolkit/ansim/ansimInfoSlice";
import { selectGeo } from "../../../toolkit/geo/geoSlice";

const AnsimInfo = () => {
  const geo = useAppSelector(selectGeo);
  const ansimInfo = useAppSelector(selectAnsimInfo);

  return (
    <div className="ansim-info">
      <h1>
        <p>{ansimInfo.bsshNm}</p>
      </h1>
      <h2>
        <p>{ansimInfo.adres}</p>
      </h2>
      <h3>
        <p>
          {ansimInfo.telno === "--" ? "전화번호가 없습니다." : ansimInfo.telno}
        </p>
      </h3>
      <a
        target="blank"
        href={`http://map.naver.com/index.nhn?slng=${geo.lng}&slat=${geo.lat}&stext=출발&elng=${ansimInfo.lcinfoLo}&elat=${ansimInfo.lcinfoLa}&pathType=0&showMap=true&etext=${ansimInfo.adres}&menu=route`}
      >
        길찾기
      </a>
    </div>
  );
};

export default AnsimInfo;
