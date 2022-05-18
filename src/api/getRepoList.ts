import { Repo, RepoList } from "api";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";

/**
 * 키워드로 레포지토리 리스트 조회
 */

const getRepoListByKeyword = async (keyword: string, pageNumber = 1) => {
  try {
    const res = await axios.get<RepoList>(
      `https://api.github.com/search/repositories?q=${keyword}&page=${pageNumber}`,
    );
    return res.data;
  } catch {
    throw new Error("에러 발생");
  }
};

const useFetchRepoList = (keyword: string, pageNumber: number) => {
  return useQuery<RepoList, AxiosError<AxiosResponse>, Repo[]>(
    ["keyword", keyword],
    () => getRepoListByKeyword(keyword, pageNumber),
    {
      enabled: !!keyword,
      select: (data) => data?.items.filter((item) => item.open_issues_count),
    },
  );
};

export default useFetchRepoList;
