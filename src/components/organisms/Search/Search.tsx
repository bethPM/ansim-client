import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useAppDispatch } from "../../../hooks/useRedux";
import { getAnsimsAction } from "../../../toolkit/ansim/func/ansimListSlice.func";
import { geoAction } from "../../../toolkit/geo/geoSlice";
import { isOpenTrigger } from "../../../toolkit/isOpen/isOpenSlice";
import { IKeywordInfo } from "../../template/interface/IndexTemplate.interface";

const Search = () => {
  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [keywords, setKeywords] = useState<IKeywordInfo[]>([]);

  const isOpenAction = (type: "isSearch" | "isAnsimInfo", boolean: boolean) => {
    dispatch(isOpenTrigger({ [type]: boolean }));
  };

  const handleSearchAnsims = async (lat: number, lng: number) => {
    try {
      await dispatch(getAnsimsAction({ lat, lng }));

      dispatch(geoAction({ lat, lng }));
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleSearchKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      const keyword = e.currentTarget.value;

      if (keyword) {
        const ps = new kakao.maps.services.Places();

        ps.keywordSearch(
          keyword,
          (data: any, status: any, _pagination: any) => {
            if (status === kakao.maps.services.Status.OK) {
              setKeywords(data);
            } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
              enqueueSnackbar("검색 결과가 존재하지 않습니다.", {
                variant: "warning",
              });
              return;
            } else if (status === kakao.maps.services.Status.ERROR) {
              enqueueSnackbar("검색 결과 중 오류가 발생했습니다.", {
                variant: "error",
              });
              return;
            }
          }
        );
      }
    }
  };

  return (
    <div className="search-container">
      <div className="search-top">
        <button
          className="go-to-back"
          onClick={() => {
            isOpenAction("isSearch", false);
          }}
        >
          뒤로
        </button>
        <input
          placeholder="도로명, 건물명을 입력해주세요."
          onKeyUp={handleSearchKeyword}
        />
      </div>
      <ul>
        {keywords.map((keyword, i) => (
          <li
            style={{ padding: "5px 8px", cursor: "pointer" }}
            key={keyword.address_name + i}
            onClick={() => {
              isOpenAction("isSearch", false);
              setTimeout(() =>
                handleSearchAnsims(parseFloat(keyword.y), parseFloat(keyword.x))
              );
              setKeywords([]);
            }}
          >
            <h3>{keyword.place_name}</h3>
            <p>{keyword.address_name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
