interface Props {
  isAlcoholic: string;
  glassType: string;
}

const DetailsMain = ({ isAlcoholic, glassType }: Props) => {
  return (
    <h2 className='details-main'>
      {isAlcoholic}
      <br />
      {glassType}
    </h2>
  );
};

export default DetailsMain;
