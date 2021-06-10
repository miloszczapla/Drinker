interface Props {
  query: string[];
  url: string[];
}

const useFetch = ({ query, url }: Props) => {
  return (
    <div>
      {query}
      {url}
    </div>
  );
};

export default useFetch;
