export const getCustomAPI = ({
  content,
  page,
  userId,
  query,
}: {
  content: string;
  page: number;
  userId: number;
  query: string;
}) =>
  `${process.env.REACT_APP_BASEURL}/${content}/${userId}?${
    query ? `search=${query}&` : ""
  }page=${page}`;
