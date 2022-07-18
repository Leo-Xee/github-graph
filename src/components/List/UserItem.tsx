import { User } from "api";
import React from "react";
import { BiBuildings } from "react-icons/bi";
import { GoLocation } from "react-icons/go";

import * as S from "./UserItem.style";

type UserItemProps = {
  user: User | null;
};

function UserItem({ user }: UserItemProps) {
  return (
    <S.Container>
      <S.ImageWrapper>
        <img src={user?.avatarUrl} alt="Avatar" />
      </S.ImageWrapper>
      <S.Info>
        <h2>
          {user?.login}
          <span> ({user?.name})</span>
        </h2>
        <p>{user?.bio}</p>
        <S.InfoList>
          {user?.company && (
            <li>
              <BiBuildings size={18} />
              {user?.company}
            </li>
          )}
          {user?.location && (
            <li>
              <GoLocation size={16} />
              {user?.location}
            </li>
          )}
        </S.InfoList>
      </S.Info>
    </S.Container>
  );
}

export default UserItem;
