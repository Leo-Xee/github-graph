import React from "react";
import { GoLocation } from "react-icons/go";
import { BiBuildings } from "react-icons/bi";
import { AiOutlineMail, AiOutlineLink } from "react-icons/ai";

import * as S from "./Profile.style";
import { GetUserQuery } from "@/graphql/generated";
import SkeletonProfile from "../common/Skeleton/SkeletonProfile";

type BoardProps = {
  userData: GetUserQuery | undefined;
  loading: boolean;
};

function Board({ userData, loading }: BoardProps) {
  return (
    <S.Container>
      {loading || !userData ? (
        <SkeletonProfile />
      ) : (
        <S.Profile>
          <S.ImageWrapper>
            <img src={userData?.user?.avatarUrl} alt="Avatar" />
          </S.ImageWrapper>
          <S.Info>
            <h1>
              {userData?.user?.login}
              <span> ({userData?.user?.name})</span>
            </h1>
            <ul>
              {userData?.user?.company && (
                <li>
                  <BiBuildings size={18} />
                  <p>{userData?.user?.company}</p>
                </li>
              )}
              {userData?.user?.location && (
                <li>
                  <GoLocation size={16} />
                  <p>{userData?.user?.location}</p>
                </li>
              )}
              {userData?.user?.email && (
                <li>
                  <AiOutlineMail size={16} />
                  <a href={`mailto:${userData?.user?.email}`}>{userData?.user?.email}</a>
                </li>
              )}
              {userData?.user?.websiteUrl && (
                <li>
                  <AiOutlineLink size={16} />
                  <a href={userData?.user?.websiteUrl} target="_blank" rel="noreferrer noopener">
                    {userData?.user?.websiteUrl}
                  </a>
                </li>
              )}
            </ul>
          </S.Info>
        </S.Profile>
      )}
    </S.Container>
  );
}

export default Board;
